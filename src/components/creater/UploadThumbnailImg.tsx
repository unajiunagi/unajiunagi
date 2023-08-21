import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";
import { useToasts } from "hooks/useToasts";
import { Dispatch, SetStateAction, useState } from "react";
import { checkFileSize } from "util/checkFileSize";
import { uploadStorage } from "util/supabase/uploadStorage";
import { v4 } from "uuid";

type Props = {
  setThumbnailUrl: Dispatch<SetStateAction<string | null>>;
};

export const UploadThumbnailImg = ({ setThumbnailUrl }: Props) => {
  const user = useUser();
  const [isLoadingUploadImg, setIsLoadingUploadImg] = useState(false);
  const { errorToast } = useToasts();

  const uploadThumbnail = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoadingUploadImg(true);
    const files = event.target.files;
    if (!files) return;
    // ファイルサイズが32MB以上ならストップ
    const limitSize = 32;
    if (checkFileSize(files, limitSize)) return errorToast({ title: `ファイルサイズは${limitSize}メガバイトまでです` });
    // アップロードした画像のurlを取得しstateにセット
    const { url, error } = await uploadStorage("video_thumbnail_imgs", `${user?.id}/${v4()}`, files[0]);
    if (error) return errorToast({ title: "画像のアップロードに失敗しました。" });
    setThumbnailUrl(url!);
    setIsLoadingUploadImg(false);
  };

  return (
    <>
      <Stack>
        <Box>
          <Button colorScheme="blue" as="label" htmlFor="coverImg" isLoading={isLoadingUploadImg}>
            カバー画像を設定
          </Button>
        </Box>
        <Stack>
          <Text fontSize="xs">(1200✕630px推奨)</Text>
          <Text fontSize="xs">カバー画像を設定することで、支援者以外にも投稿内容をアピールすることができます</Text>
        </Stack>
      </Stack>
      <Input id="coverImg" type="file" onChange={uploadThumbnail} accept=".jpg, .png" style={{ display: "none" }} />
    </>
  );
};
