import { Button, CircularProgress, CircularProgressLabel, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { useToasts } from "hooks/useToasts";
import { useState } from "react";
import { Upload } from "tus-js-client";

type Props = {};

export const UploadVideoComponent = ({}: Props) => {
  const [isLoading, setisLoading] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [uploadState, setUploadState] = useState<Upload | null>(null);
  const [uri, setUri] = useState<string>("");
  const { successToast, errorToast } = useToasts();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    setisLoading(true);

    try {
      // アップロードの条件を設定
      const upload = await new Upload(file, {
        onProgress(bytesUploded, bytesTotal) {
          const percentage = Math.round((bytesUploded / bytesTotal) * 100);
          setProgress(percentage);
        },
        onSuccess() {
          console.log("sucess");

          setProgress(100);
          successToast({ title: "動画がアップロードされました" });
        },
        onError(error) {
          throw error;
        },
      });

      const previousUploads = await upload.findPreviousUploads();
      console.log("previousUploads:");
      console.log(previousUploads);

      if (previousUploads.length) {
        //　以前同じファイルで途中のアップロードがあれば該当するvimeoの枠を取得し、アップロードを再開
        const previousUpload = previousUploads[0];
        console.log(previousUpload);
        upload.resumeFromPreviousUpload(previousUpload);
      } else {
        // 初めてのアップロードならvimeoに枠を作り、そのuploadURLを取得しアップロードを開始
        const response = await axios.post("/api/vimeo/uploadVimeo", {
          name: file.name,
          size: file.size,
        });
        setUri(response.data.uri);
        upload.options.uploadUrl = response.data.uploadLink;
      }
      upload.start();
      setUploadState(upload);
    } catch (error) {
      console.log(`error: ${error}`);
      errorToast({ title: `${error}` });
    } finally {
      setisLoading(false);
    }
  };

  const deleteUpload = async () => {
    console.log("abort");
    try {
      await uploadState?.abort(true);
      successToast({ title: "アップロードをキャンセルしました" });
      setUploadState(null);
      setProgress(0);
      await axios.post("/api/vimeo/deleteVimeo", { uri });
    } catch (error) {
      console.log(`error: ${error}`);
      errorToast({ title: `${error}` });
    }
  };

  return (
    <>
      <Input type="file" id="inputFile" accept=".mp4, .flv, .mov" onChange={handleUpload} style={{ display: "none" }} />
      <Button colorScheme="blue" as="label" htmlFor="inputFile" isLoading={isLoading}>
        ファイルを選択
      </Button>
      {progress > 0 && progress < 100 && (
        <CircularProgress value={progress}>
          <CircularProgressLabel>{`${progress}%`}</CircularProgressLabel>
        </CircularProgress>
      )}
      <Text color="white">{progress}</Text>
      {uploadState && progress > 0 && progress < 100 && (
        <Button colorScheme="red" onClick={deleteUpload}>
          キャンセル
        </Button>
      )}
    </>
  );
};
