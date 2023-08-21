import { Button, Input, Progress, Text } from "@chakra-ui/react";
import { useToasts } from "hooks/useToasts";
import { useState } from "react";
import { Upload } from "tus-js-client";

type Props = {};

export const UploadVideoComponent = ({}: Props) => {
  const [progress, setProgress] = useState<number>(0);
  const [uploadState, setUploadState] = useState<Upload | null>(null);
  const [uri, setUri] = useState<string>("");
  const { sucessToast, errorToast } = useToasts();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let file: File | null = null;
    const files = event.target.files;
    if (files && files.length > 0) {
      file = files[0];
    }
    if (!file) return;

    try {
      console.log(`file.size: ${file.size}`);

      const upload = await new Upload(file, {
        retryDelays: [0, 3000, 5000, 10000, 20000],
        chunkSize: 256 * 1024 * 1024,
        onProgress(bytesUploded, bytesTotal) {
          const percentComplete = Math.round((bytesUploded / bytesTotal) * 100);
          setProgress(percentComplete);
        },
        onSuccess() {
          console.log("sucess");

          setProgress(100);
          sucessToast({ title: "動画がアップロードされました" });
        },
      });

      const previousUploads = await upload.findPreviousUploads();
      console.log(previousUploads);

      if (previousUploads.length > 0) {
        const previousUpload = previousUploads[0];
        console.log(previousUpload);

        upload.options.uploadUrl = (previousUpload as any).uploadUrl;
        console.log(`uploadUrl: ${upload.options.uploadUrl}`);
      } else {
        console.log("getURL");

        const response = await fetch("/api/uploadVimeo", {
          method: "POST",
          body: JSON.stringify({
            name: file.name,
            size: file.size.toString(),
          }),
        });
        console.log("getURLFinish!!");
        const data = await response.json();

        console.log(data);
        setUri(data.uri);
        console.log("getData");

        upload.options.uploadUrl = data.uploadUrl;
      }
      console.log("upload");
      upload.start();
      setUploadState(upload);

      console.log("complete");
    } catch (error) {
      console.log(`error: ${error}`);
      errorToast({ title: `${error}` });
    }
  };

  const deleteUpload = async () => {
    console.log("abort");
    try {
      await uploadState?.abort(true);
      sucessToast({ title: "アップロードをキャンセルしました" });
      setUploadState(null);
      setProgress(0);
      await fetch("/api/deleteVimeo", {
        method: "POST",
        body: JSON.stringify({
          uri: uri,
        }),
      });
    } catch (error) {
      console.log(`error: ${error}`);
      errorToast({ title: `${error}` });
    }
  };

  return (
    <>
      <Input type="file" id="inputFile" accept=".mp4, .flv, .mov" onChange={handleUpload} style={{ display: "none" }} />
      <Button colorScheme="blue" as="label" htmlFor="inputFile">
        ファイルを選択
      </Button>
      {progress > 0 && progress < 100 && <Progress size="lg" width="800px" value={progress} />}
      <Text color="white">{progress}</Text>
      {uploadState && (
        <Button colorScheme="red" onClick={deleteUpload}>
          キャンセル
        </Button>
      )}
    </>
  );
};
