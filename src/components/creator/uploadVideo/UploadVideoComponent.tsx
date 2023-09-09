import { Box, Button, CircularProgress, CircularProgressLabel, HStack, Input, Stack, Text, VStack, VisuallyHiddenInput } from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";
import axios from "axios";
import { useToasts } from "hooks/useToasts";
import supabaseClient from "lib/supabase/supabaseClient";
import { useState } from "react";
import { BsCheck, BsFillPlayFill, BsSquareFill } from "react-icons/bs";
import { Upload } from "tus-js-client";

type Props = {
  videoId: string;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  uploadState: Upload | null;
  setUploadState: React.Dispatch<React.SetStateAction<Upload | null>>;
};

export const UploadVideoComponent = ({ videoId, progress, setProgress, uploadState, setUploadState }: Props) => {
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [fileState, setFileState] = useState<File | null>(null);
  const { successToast, infoToast, errorToast } = useToasts();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    setFileState(file);
    setIsLoading(true);

    let uri = "";

    try {
      // アップロードの条件を設定
      const upload = new Upload(file, {
        onProgress(bytesUploded, bytesTotal) {
          const percentage = Math.round((bytesUploded / bytesTotal) * 100);
          setProgress(percentage);
        },
        onSuccess() {
          setProgress(100);
          successToast({ title: "動画がアップロードされました" });
        },
        onError(error) {
          throw error;
        },
        // 128MBごとに分割
        chunkSize: 1024 * 1024 * 128,
      });

      const previousUploads = await upload.findPreviousUploads();
      const sortdPreviousUploads = previousUploads.sort((a, b) => {
        const dateA = new Date(a.creationTime);
        const dateB = new Date(b.creationTime);
        return dateB.getTime() - dateA.getTime();
      }); // 時刻が新しい順にソート
      console.log("previousUploads:");
      console.log(previousUploads);
      console.log("sortdPreviousUploads:");
      console.log(sortdPreviousUploads);

      try {
        if (sortdPreviousUploads.length === 0) throw new Error("sortdPreviousUploads.length === 0");
        // 以前同じファイルで途中のアップロードがあれば該当するvimeoの枠を取得し、アップロードを再開
        const previousUpload = sortdPreviousUploads[0];
        console.log("previousUpload:");
        console.log(previousUpload);

        uri = previousUpload.metadata.uri;
        await axios.post("/api/vimeo/getVideo", { uri }); // previousUploadsに設定されているuriの動画が、存在しているか確認
        const { data, error } = await supabaseClient.from("videos").select("id").eq("vimeo_uri", uri).single();
        if (error) throw error;
        if (data.id === user?.id) throw new Error("すでに同じ動画がアップロードされています"); // 同じuriですでに別の動画に登録されているならエラーを投げる
        upload.resumeFromPreviousUpload(previousUpload);
      } catch (error) {
        const { responseUri, uploadUrl } = await newUpload(file); // 初めてのアップロードならvimeoに枠を作る
        uri = responseUri;
        upload.options.metadata = { responseUri };
        upload.options.uploadUrl = uploadUrl;
      }
      const { error } = await supabaseClient.from("videos").upsert({ id: videoId, creator_id: user?.id, vimeo_uri: uri }, { onConflict: "id" }); // uriをsupabaseに保存
      if (error) throw error;

      upload.start();
      setUploadState(upload);
      setIsUploading(true);
    } catch (error) {
      console.log(`error: ${error}`);
      errorToast({ title: `${error}` });
    } finally {
      // mutate("/api/supabase/getUnuploadedVideos");
      setIsLoading(false);
    }
  };

  const newUpload = async (file: File) => {
    const response = await axios.post("/api/vimeo/uploadVideo", { name: file.name, size: file.size }).catch((error) => {
      throw error;
    }); // vimeoに枠を作り、そのuploadURLとuriを取得しアップロードを開始
    const responseUri: string = response.data.uri;
    const uploadUrl: string = response.data.uploadLink;
    return { responseUri, uploadUrl };
  };

  const abortUpload = () => {
    uploadState?.abort();
    setIsUploading(false);
    infoToast({ title: "アップロードを中断しました" });
  };

  const resumeUpload = () => {
    uploadState?.start();
    setIsUploading(true);
    infoToast({ title: "アップロードを再開しました" });
  };

  return (
    <Stack mb={2}>
      <VisuallyHiddenInput type="file" id="inputFile" accept=".mp4, .flv, .mov" onChange={handleUpload}  />
      <HStack flexWrap={"wrap"}>
        {progress === 100 && (
          <HStack>
            <CircularProgress value={100}>
              <CircularProgressLabel>
                <VStack width={"100%"}>
                  <BsCheck color="white" size="30" />
                </VStack>
              </CircularProgressLabel>
            </CircularProgress>
            <Text>{fileState?.name}</Text>
            <Text fontWeight={"bold"}>アップロード完了</Text>
          </HStack>
        )}
        {0 < progress && progress < 100 && (
          <>
            <CircularProgress value={progress}>
              <CircularProgressLabel>
                <VStack width={"100%"} ml={isUploading ? "0" : "2px"}>
                  {isUploading ? (
                    <Box as="button" onClick={abortUpload}>
                      <BsSquareFill color="white" size="16" />
                    </Box>
                  ) : (
                    <Box as="button" onClick={resumeUpload}>
                      <BsFillPlayFill color="white" size="30" />
                    </Box>
                  )}
                </VStack>
              </CircularProgressLabel>
            </CircularProgress>
          </>
        )}
        <Button colorScheme="blue" as="label" htmlFor="inputFile" isLoading={isLoading}>
          動画ファイルを選択
        </Button>
      </HStack>
      <Text fontSize="xs">アップロードが中断された場合でも、再度同じファイルを選択することで続きから再開出来ます。</Text>
    </Stack>
  );
};
