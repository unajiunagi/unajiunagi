import { Button, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Progress, Stack, Text, Textarea, chakra, useDisclosure, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFields } from "components/creater/FormFields";
import { getAuth } from "firebase/auth";
import { doc, getFirestore } from "firebase/firestore";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Upload } from "tus-js-client";
import zod from "zod";

export type FormData = {
  title: string;
  description: string;
  birthyear: string;
  running_minutes: string;
  casts: string[];
  directors: string[];
  screen_writers: string[];
  cinematographers: string[];
  sound_designers: string[];
  lighting_designers: string[];
  sound_recordists: string[];
  music_directors: string[];
  art_directors: string[];
  editors: string[];
  producers: string[];
  uploadImg: File;
};

const schema = zod.object({
  title: zod.string().nonempty("タイトルを入力してください。"),
  description: zod.string().nonempty("あらすじを入力してください。"),
  birthyear: zod.string().nonempty("公開年を入力してください。"),
  running_minutes: zod.string().nonempty("上映時間を入力してください。"),
  uploadImg: zod
    .custom<FileList>()
    .refine((file) => file.length !== 0, { message: "必須です" })
    .transform((file) => file[0])
    .refine((file) => file.size < 500000, { message: "ファイルサイズは最大5MBです" }),
});

export const UploadVideo = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [progress, setProgress] = useState<number>(0);
  const [uploadState, setUploadState] = useState<Upload | null>(null);
  const [uri, setUri] = useState<string>("");
  const [isImgUploded, setIsImgUploded] = useState<string | null>(null);

  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

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
          toast({
            title: "動画がアップロードされました",
            status: "success",
            position: "top",
          });
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
      toast({
        title: `${error}`,
        status: "error",
        position: "top",
      });
    }
  };

  const deleteUpload = async () => {
    console.log("abort");
    try {
      await uploadState?.abort(true);
      toast({
        title: "アップロードをキャンセルしました",
        status: "success",
        position: "top",
      });
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
      toast({
        title: `${error}`,
        status: "error",
        position: "top",
      });
    }
  };

  const showImg = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0]
    setIsImgUploded(window.URL.createObjectURL(file))
  };

  const storeData = (data: FormData) => {
    const user = getAuth().currentUser;
    const db = getFirestore();
    const uid = user?.uid!;
    const docRef = doc(db, "movies", uid);
  };

  return (
    <Stack>
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

      <Button onClick={onOpen} colorScheme="blue">
        Open Modal
      </Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="blue" maxHeight="80%">
          <chakra.form width="100%" onSubmit={handleSubmit(storeData)} overflowY="scroll">
            <ModalBody>
              <FormControl isInvalid={!!formState.errors.title}>
                <FormLabel htmlFor="title" color="white">
                  タイトル
                </FormLabel>
                <Input id="title" type="text" {...register("title")} color="white" />
                <FormErrorMessage>{formState.errors.title?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!formState.errors.description}>
                <FormLabel htmlFor="description" color="white">
                  あらすじ
                </FormLabel>
                <Textarea id="description" {...register("description")} color="white" />
                <FormErrorMessage>{formState.errors.description?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!formState.errors.birthyear}>
                <FormLabel htmlFor="birthyear" color="white">
                  公開年(西暦)
                </FormLabel>
                <Input id="birthyear" type="number" {...register("birthyear")} color="white" />
                <FormErrorMessage>{formState.errors.birthyear?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!formState.errors.running_minutes}>
                <FormLabel htmlFor="running_minutes" color="white">
                  上映時間
                </FormLabel>
                <Input id="running_minutes" type="text" {...register("running_minutes")} color="white" />
                <FormErrorMessage>{formState.errors.running_minutes?.message}</FormErrorMessage>
              </FormControl>
              <FormLabel color="white">スタッフ</FormLabel>
              <FormFields roles={formState.errors.directors} roleName="directors" labelName="監督" register={register} />
              <FormFields roles={formState.errors.screen_writers} roleName="screen_writers" labelName="脚本" register={register} />
              <FormFields roles={formState.errors.cinematographers} roleName="cinematographers" labelName="撮影" register={register} />
              <FormFields roles={formState.errors.sound_designers} roleName="sound_designers" labelName="音響" register={register} />
              <FormFields roles={formState.errors.lighting_designers} roleName="lighting_designers" labelName="照明" register={register} />
              <FormFields roles={formState.errors.sound_recordists} roleName="sound_recordists" labelName="録音" register={register} />
              <FormFields roles={formState.errors.music_directors} roleName="music_directors" labelName="音楽" register={register} />
              <FormFields roles={formState.errors.art_directors} roleName="art_directors" labelName="美術" register={register} />
              <FormFields roles={formState.errors.editors} roleName="editors" labelName="編集" register={register} />
              <FormFields roles={formState.errors.producers} roleName="producers" labelName="プロデューサー" register={register} />
              <FormLabel color="white">キャスト</FormLabel>
              <FormFields roles={formState.errors.casts} roleName="casts" labelName="" register={register} />
              {isImgUploded ? <Image src={isImgUploded} alt="アップロードされた画像"/> : }
              <FormControl isInvalid={!!formState.errors.uploadImg}>
                <Button colorScheme="blue" as="label" htmlFor="uploadImg">
                  ファイルを選択
                </Button>
                <Input id="uploadImg" type="file" {...register("uploadImg")} onChange={showImg} accept=".jpg, .png" style={{ display: "none" }} />
                <FormErrorMessage>{formState.errors.uploadImg?.message}</FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                保存
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </chakra.form>
        </ModalContent>
      </Modal>
    </Stack>
  );
};
