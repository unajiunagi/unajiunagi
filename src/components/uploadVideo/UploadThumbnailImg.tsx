import { Button, HStack, Stack, Text, VisuallyHiddenInput } from '@chakra-ui/react';
import { useUser } from '@supabase/auth-helpers-react';
import { FixedAspectImage } from 'components/feature/FixedAspectImage';
import { useToasts } from 'hooks/useToasts';
import supabaseClient from 'lib/supabase/supabaseClient';
import { useState } from 'react';
import { staticPath } from 'type/$path';
import { checkFileSize } from 'util/checkFileSize';
import { uploadStorage } from 'util/supabase/uploadStorage';
import { v4 } from 'uuid';

type Props = {
  videoId: string;
  thumbnailUrl: string | null;
  thumbnailPath: string | null;
};

export const UploadThumbnailImg = ({ videoId, thumbnailUrl, thumbnailPath }: Props) => {
  const user = useUser();
  const [file, setFile] = useState<File | null>(null); // アップロードするファイル
  const [isLoading, setIsLoading] = useState(false);
  const { successToast, errorToast } = useToasts();

  const uploadThumbnail = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const { files } = event.target;
    if (!files) return;
    const limitSize = 32; // ファイルサイズが32MB以上ならストップ
    if (checkFileSize(files, limitSize)) {
      errorToast({ title: `ファイルサイズは${limitSize}メガバイトまでです` });
      return;
    }
    try {
      const bucket = 'video_thumbnail_imgs';
      const { path, url } = await uploadStorage(bucket, `${user?.id}/${v4()}`, files[0]); // 画像をアップロードしパスとURLを取得
      const { error: err } = await supabaseClient.storage.from(bucket).remove([thumbnailPath!]); // 以前のファイルを削除
      if (err) throw err;
      const { error: DBerrror } = await supabaseClient.from('videos').upsert({ id: videoId, creator_id: user?.id, thumbnail_url: url!, thumbnail_path: path }, { onConflict: 'id' }); // 画像のURLとパスをDBに保存
      if (DBerrror) throw DBerrror;
      setFile(files[0]);
      successToast({ title: '画像をアップロードしました。' });
    } catch (err) {
      errorToast({ title: '画像のアップロードに失敗しました。' });
    }
    setIsLoading(false);
  };

  return (
    <>
      <Stack spacing={2} mb={2}>
        <FixedAspectImage src={file ? window.URL.createObjectURL(file) : thumbnailUrl ?? staticPath.logo_jpg} alt='サムネイル画像' width={16} height={9} rounded={4} />
        <HStack>
          <Button colorScheme='facebook' as='label' htmlFor='coverImg' isLoading={isLoading}>
            サムネイル画像を設定
          </Button>
        </HStack>
        <Text fontSize='xs'>動画のサムネイルに使用されます。 (16:9推奨)</Text>
      </Stack>
      <VisuallyHiddenInput id='coverImg' type='file' onChange={uploadThumbnail} accept='image/*' />
    </>
  );
};
