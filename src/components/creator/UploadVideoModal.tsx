import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Spinner, chakra, useBoolean } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@supabase/auth-helpers-react";
import { UploadThumbnailImg } from "components/creator/UploadThumbnailImg";
import { UploadVideoComponent } from "components/creator/UploadVideoComponent";
import { useToasts } from "hooks/useToasts";
import supabaseClient from "lib/supabase/supabaseClient";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { VideoData } from "type/videoData";
import { UploadVideoFormData, setUploadVideoFormDefaults, uploadVideoFormsSchema, uploadVideoFormsStaffs } from "util/uploadVideoFormsSchema";
import { v4 } from "uuid";
import { UploadVideoForms } from "./UploadVideoForms";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: VideoData | null;
};

export const UploadVideoModal = ({ isOpen, onClose, data }: Props) => {
  const user = useUser();
  const videoId = data?.id ?? v4();
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCancel, setIsCancel] = useBoolean(false);
  const [isRelease, setIsRelease] = useBoolean(false);
  const { successToast, errorToast } = useToasts();

  const schema = uploadVideoFormsSchema;
  const { register, handleSubmit, formState, setValue } = useForm<UploadVideoFormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => setUploadVideoFormDefaults(data, setValue), [data]);

  const uploadDatabase = async (formData: UploadVideoFormData) => {
    setIsLoading(true);

    const casts = { no_name: formData.casts };
    const staffs = uploadVideoFormsStaffs(formData);
    try {
      const { error } = await supabaseClient
        .from("videos")
        .upsert({ id: videoId, title: formData.title, description: formData.description, creator_id: user?.id, thumbnail_url: thumbnailUrl, birth_year: Number(formData.birth_year), running_time: Number(formData.running_time), casts, staffs }, { onConflict: "id" });
      if (error) throw error;
      if (isRelease) {
        // 既に同じuriの動画がアップロードされていたらエラーを出す
        const { data: fetchData, error } = await supabaseClient.from("videos").select("is_uploaded").eq("vimeo_uri", data?.vimeo_uri);
        if (error) throw error;

        const hasSameUriVideo = fetchData.some((video) => video.is_uploaded === true);
        if (hasSameUriVideo) {
          errorToast({ title: "すでに同じファイルが別の作品としてアップロードされています。" });
          throw new Error("すでに同じファイルが別の作品としてアップロードされています。");
        }
        // is_uploadedをtrueにする
        const { error: e } = await supabaseClient.from("videos").update({ is_uploaded: true }).eq("id", data?.id);
        if (e) throw e;

        onClose();
        return successToast({ title: "動画を公開しました。" });
      }

      successToast({ title: "情報が保存されました。" });
      if (isCancel) onClose();
    } catch (e) {
      errorToast({ title: "エラーが発生しました。情報が保存されませんでした。" });
    } finally {
      setIsLoading(false);
      setIsCancel.off();
      setIsRelease.off();
    }
  };

  return (
    <>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <chakra.form width="100%" onSubmit={handleSubmit(uploadDatabase)}>
          <ModalContent backgroundColor="blue" maxHeight="80%">
            <ModalBody overflowY={"scroll"}>
              <UploadThumbnailImg setThumbnailUrl={setThumbnailUrl} />
              <UploadVideoComponent videoId={videoId} progress={progress} setProgress={setProgress} />
              <UploadVideoForms errors={formState.errors} register={register} />
            </ModalBody>
            <ModalFooter>
              {isLoading && <Spinner color="white" mr={2} />}
              {progress === 100 && (
                <Button type="submit" onClick={setIsRelease.on} colorScheme="blue" mr={3}>
                  公開
                </Button>
              )}
              <Button type="submit" colorScheme="blue" mr={3}>
                保存
              </Button>
              <Button type="submit" onClick={setIsCancel.on} >
                キャンセル
              </Button>
            </ModalFooter>
          </ModalContent>
        </chakra.form>
      </Modal>
    </>
  );
};
