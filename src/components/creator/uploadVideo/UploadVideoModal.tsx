import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Spinner, chakra, useBoolean } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@supabase/auth-helpers-react";
import axios from "axios";
import { UploadThumbnailImg } from "components/creator/uploadVideo/UploadThumbnailImg";
import { UploadVideoComponent } from "components/creator/uploadVideo/UploadVideoComponent";
import { UploadVideoForms } from "components/creator/uploadVideo/UploadVideoForms";
import { useToasts } from "hooks/useToasts";
import supabaseClient from "lib/supabase/supabaseClient";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { Upload } from "tus-js-client";
import { VideoData } from "type/videoData";
import { UploadVideoFormData, uploadVideoFormDefaults, uploadVideoFormsSchema, uploadVideoFormsStaffs } from "util/uploadVideoFormsSchema";
import { v4 } from "uuid";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: VideoData | null;
};

export const UploadVideoModal = ({ isOpen, onClose, data }: Props) => {
  const user = useUser();
  const [videoId, setVideoId] = useState<string>(data?.id ?? v4());
  const [progress, setProgress] = useState<number>(0);
  const [uploadState, setUploadState] = useState<Upload | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCancel, setIsCancel] = useBoolean(false);
  const [isRelease, setIsRelease] = useBoolean(false);
  const { successToast, infoToast, errorToast } = useToasts();

  console.log("data.id_def", data?.id);
  console.log("videoId_def", videoId);

  const schema = uploadVideoFormsSchema;
  const { register, handleSubmit, formState, setValue } = useForm<UploadVideoFormData>({
    resolver: zodResolver(schema),
  });

  const initModal = () => {
    uploadVideoFormDefaults(data, setValue); // フォームの初期値を設定
    setVideoId(data ? data.id : v4()); // videoIdを初期化
    setUploadState(null); // uploadStateをリセット
    setProgress(0); // progressをリセット
  };

  useEffect(() => {
    initModal(); // modalに元の情報が残らないように初期化
  }, [data]);

  const uploadDatabase = async (formData: UploadVideoFormData) => {
    setIsLoading(true);

    const casts = { no_name: formData.casts };
    const staffs = uploadVideoFormsStaffs(formData);
    try {
      const { error } = await supabaseClient.from("videos").upsert({ id: videoId, title: formData.title, description: formData.description, creator_id: user?.id, birth_year: Number(formData.birth_year), running_time: Number(formData.running_time), casts, staffs }, { onConflict: "id" });
      if (error) throw error;

      // 動画とサムネイル画像のアップロードのが完了している状態なら実行
      if (isRelease) {
        await axios.post("/api/vimeo/updateVideo", { uri: data?.vimeo_uri, object: { name: data?.title, privacy: { embed: "whitelist" } } }); // vimeoにタイトルを設定と埋め込みを許可されたドメインのみに設定
        await axios.post("/api/vimeo/addAllowdEmbedDomain", { uri: data?.vimeo_uri }); // vimeoに埋め込みを許可するドメインを追加
        const { error: e } = await supabaseClient.from("videos").update({ is_uploaded: true }).eq("id", data?.id); // is_uploadedをtrueにする
        if (e) throw e;

        onClose();
        data ?? initModal(); // modalに元の情報が残らないように初期化
        return successToast({ title: "動画を公開しました。" });
      }

      successToast({ title: "情報が保存されました。" });
      if (isCancel) {
        onClose();
        data ?? initModal(); // modalに元の情報が残らないように初期化
      }
    } catch (e) {
      console.error(e);
      errorToast({ title: "エラーが発生しました。情報が保存されませんでした。" });
    } finally {
      if (isCancel) {
        uploadState?.abort();
        infoToast({ title: "アップロードを中断しました" });
      }
      if (isCancel || isRelease) mutate("/api/supabase/getUnuploadedVideos");
      setIsLoading(false);
      setIsCancel.off();
      setIsRelease.off();
    }
  };

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <chakra.form onSubmit={handleSubmit(uploadDatabase)} width="100%">
          <ModalContent backgroundColor="blue" maxHeight="80%">
            <ModalBody overflowY={"scroll"}>
              <UploadThumbnailImg videoId={videoId} thumbnailUrl={data?.thumbnail_url ?? null} thumbnailPath={data?.thumbnail_path ?? null} />
              <UploadVideoComponent videoId={videoId} progress={progress} setProgress={setProgress} uploadState={uploadState} setUploadState={setUploadState} />
              <UploadVideoForms errors={formState.errors} register={register} data={data} />
            </ModalBody>
            <ModalFooter>
              {isLoading && <Spinner color="white" mr={2} />}
              {progress === 100 && data?.thumbnail_url && (
                <Button type="submit" onClick={setIsRelease.on} colorScheme="blue" mr={3}>
                  公開
                </Button>
              )}
              <Button type="submit" colorScheme="blue" mr={3}>
                保存
              </Button>
              <Button type="submit" onClick={setIsCancel.on}>
                キャンセル
              </Button>
            </ModalFooter>
          </ModalContent>
        </chakra.form>
      </Modal>
    </>
  );
};
