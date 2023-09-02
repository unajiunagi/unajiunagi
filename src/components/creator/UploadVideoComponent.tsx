import { Button, CircularProgress, CircularProgressLabel, HStack, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useToasts } from "hooks/useToasts";
import supabaseClient from "lib/supabase/supabaseClient";
import { useState } from "react";
import { Upload } from "tus-js-client";

type Props = {
  videoId: string;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
};

export const UploadVideoComponent = ({ videoId, progress, setProgress }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadState, setUploadState] = useState<Upload | null>(null);
  const [fileState, setFileState] = useState<File | null>(null);
  const { successToast, errorToast } = useToasts();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    setFileState(file)
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
        // 512MBごとに分割
        chunkSize: 1024 * 1024 * 512,
      });

      const newUpload = async () => {
        // 初めてのアップロードならvimeoに枠を作り、そのuploadURLを取得しアップロードを開始
        const response = await axios.post("/api/vimeo/uploadVideo", { name: file.name, size: file.size }).catch((error) => {
          throw error;
        });
        uri = response.data.uri;
        upload.options.metadata = { uri };
        upload.options.uploadUrl = response.data.uploadLink;
      };

      const previousUploads = await upload.findPreviousUploads();
      const sortdPreviousUploads = previousUploads.sort((a, b) => {
        // 時刻が新しい順にソート
        const dateA = new Date(a.creationTime);
        const dateB = new Date(b.creationTime);
        return dateB.getTime() - dateA.getTime();
      });
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

        // previousUploadsに設定されているuriの動画が、存在しているか確認
        await axios.post("/api/vimeo/getVideo", { uri });
        console.log("getVideo");

        upload.resumeFromPreviousUpload(previousUpload);
      } catch (error) {
        await newUpload();
      }
      // uriをsupabaseに保存
      const { error } = await supabaseClient.from("videos").upsert({ id: videoId, vimeo_uri: uri }, { onConflict: "id" });
      if (error) throw error;

      console.log("upload:");
      console.log(upload);

      upload.start();
      setUploadState(upload);
    } catch (error) {
      console.log(`error: ${error}`);
      errorToast({ title: `${error}` });
    } finally {
      setIsLoading(false);
    }
  };

  const abortUpload = () => {
    console.log("uploadStateAbort1:");
    console.log(uploadState);

    uploadState?.abort();
    successToast({ title: "アップロードを中断しました" });

    console.log("uploadStateAbort2:");
    console.log(uploadState);
  };

  const resumeUpload = () => {
    console.log("uploadStateResume1:");
    console.log(uploadState);

    uploadState?.start();
    successToast({ title: "アップロードを再開しました" });

    console.log("uploadStateResume2:");
    console.log(uploadState);
  };

  return (
    <>
      <Input type="file" id="inputFile" accept=".mp4, .flv, .mov" onChange={handleUpload} style={{ display: "none" }} />
      {progress !== 100 ? (
        <Button colorScheme="blue" as="label" htmlFor="inputFile" isLoading={isLoading}>
          ファイルを選択
        </Button>
      ) : (
        <HStack>
          <CircularProgress value={100}>
            <CircularProgressLabel color="white">{"100%"}</CircularProgressLabel>
          </CircularProgress>
          <Text>{fileState?.name}</Text>
          <Text fontWeight={'bold'} >アップロード完了</Text>
        </HStack>
      )}
      {uploadState && progress < 100 && (
        <>
          <CircularProgress value={progress}>
            <CircularProgressLabel color="white">{`${progress}%`}</CircularProgressLabel>
          </CircularProgress>
          <Button colorScheme="cyan" onClick={resumeUpload}>
            再開
          </Button>
          <Button colorScheme="orange" onClick={abortUpload}>
            中断
          </Button>
        </>
      )}
    </>
  );
};
