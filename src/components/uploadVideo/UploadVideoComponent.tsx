import { Box, Button, CircularProgress, CircularProgressLabel, HStack, Stack, Text, VStack, VisuallyHiddenInput } from '@chakra-ui/react';
import { useUser } from '@supabase/auth-helpers-react';
import { useToasts } from 'hooks/useToasts';
import supabaseClient from 'lib/supabase/supabaseClient';
import { useState } from 'react';
import { BsCheck, BsFillPlayFill, BsSquareFill } from 'react-icons/bs';
import axios from 'redaxios';
import { PreviousUpload, Upload } from 'tus-js-client';

type Props = {
  videoId: string;
  progress: number | null;
  setProgress: React.Dispatch<React.SetStateAction<number | null>>;
  uploadState: Upload | null;
  setUploadState: React.Dispatch<React.SetStateAction<Upload | null>>;
  setUri: React.Dispatch<React.SetStateAction<string | null>>;
};

export const UploadVideoComponent = ({ videoId, progress, setProgress, uploadState, setUploadState, setUri }: Props) => {
  const user = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false); // アップロード中かどうか
  const [fileName, setFileName] = useState<string>('');
  const { successToast, infoToast, errorToast } = useToasts();

  const getSortedPreviousUploads = (previousUploads: PreviousUpload[]) => {
    // 時刻の新しい順にソート
    return previousUploads.sort((a, b) => {
      const dateA = new Date(a.creationTime);
      const dateB = new Date(b.creationTime);
      return dateB.getTime() - dateA.getTime();
    });
  };

  const setUpload = (file: File) => {
    // アップロードの条件を設定
    return new Upload(file, {
      onProgress(bytesUploaded, bytesTotal) {
        const percentage = Math.round((bytesUploaded / bytesTotal) * 100);
        setProgress(percentage);
      },
      onSuccess() {
        setProgress(100);
        setFileName(file.name);
        successToast({ title: '動画のアップロードが完了しました' });
      },
      onError(error) {
        throw error;
      },
      chunkSize: 1024 * 1024 * 128, // 128MBごとに分割
    });
  };

  const newUpload = async (file: File) => {
    const response = await axios.post('/api/vimeo/uploadVideo', { name: file.name, size: file.size }).catch((error) => {
      throw error;
    }); // vimeoに枠を作り、そのuploadURLとuriを取得しアップロードを開始
    const responseUri: string = response.data.uri;
    const uploadUrl: string = response.data.uploadLink;
    return { responseUri, uploadUrl };
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    setIsLoading(true);
    let uri = '';
    let isFirstUpload = false;
    try {
      const upload = setUpload(file); // Updateインスタンスを作成
      const previousUploads = await upload.findPreviousUploads(); // 同じファイルの以前のアップロードを取得
      const sortedPreviousUploads = getSortedPreviousUploads(previousUploads); // デフォルトでは順番がめちゃくちゃなことがあるので時刻が新しい順にソート
      if (sortedPreviousUploads.length === 0) isFirstUpload = true; // アップロードのキャッシュが無ければ新しく作成
      const previousUpload = sortedPreviousUploads[0];
      uri = previousUpload.metadata.uri;
      const { data } = await axios.post('/api/vimeo/searchVideo', { uri }); // キャッシュに設定されているuriの動画が存在しているか確認。存在しなければアップロードを新しく作成
      console.log('data', data.res);
      if (data.res.length === 0) isFirstUpload = true;
      console.log(isFirstUpload);

      if (isFirstUpload) {
        const { responseUri, uploadUrl } = await newUpload(file); // 初めてのアップロードならvimeoに枠を作る
        uri = responseUri;
        upload.options.metadata = { uri };
        upload.options.uploadUrl = uploadUrl;
      } else {
        const { data: res, error: e } = await supabaseClient.from('videos').select('id').eq('vimeo_uri', uri); // キャッシュに設定されているuriの動画をDBから取得
        if (e) throw e;
        console.log('same_uri_data', res);

        if (res.length > 0 && res[0].id !== videoId) {
          errorToast({ title: 'すでに同じ動画がアップロードされています。' });
          throw new Error('The same video has already been uploaded.');
        } // 同じuriですでに別の動画に登録されているならエラーを投げる
        upload.resumeFromPreviousUpload(previousUpload);
      }

      setUri(uri); // uriをstateに保存
      const { error } = await supabaseClient.from('videos').upsert({ id: videoId, creator_id: user?.id, vimeo_uri: uri }, { onConflict: 'id' }); // uriをsupabaseに保存
      if (error) throw error;
      upload.start();
      setUploadState(upload);
      setIsUploading(true);
    } catch (error) {
      console.error(error);
      errorToast({ title: '動画のアップロードに失敗しました。' });
    }
    setIsLoading(false);
  };

  const abortUpload = () => {
    uploadState?.abort(); // アップロードを中断
    setIsUploading(false);
    infoToast({ title: 'アップロードを中断しました' });
  };

  const resumeUpload = () => {
    uploadState?.start(); // アップロードを再開
    setIsUploading(true);
    infoToast({ title: 'アップロードを再開しました' });
  };

  return (
    <Stack mb={2}>
      <VisuallyHiddenInput type='file' id='inputFile' accept='video/*' onChange={handleUpload} />
      <HStack flexWrap='wrap'>
        {progress === 100 && (
          <HStack>
            <CircularProgress value={100}>
              <CircularProgressLabel>
                <VStack width='100%'>
                  <BsCheck color='white' size='30' />
                </VStack>
              </CircularProgressLabel>
            </CircularProgress>
            <Text>{fileName}</Text>
            <Text fontWeight='bold'>アップロード完了</Text>
          </HStack>
        )}
        {progress !== null && progress < 100 && (
          <CircularProgress value={progress}>
            <CircularProgressLabel>
              <VStack width='100%' ml={isUploading ? '0' : '2px'}>
                {isUploading ? (
                  <Box as='button' onClick={abortUpload}>
                    <BsSquareFill color='white' size='16' />
                  </Box>
                ) : (
                  <Box as='button' onClick={resumeUpload}>
                    <BsFillPlayFill color='white' size='30' />
                  </Box>
                )}
              </VStack>
            </CircularProgressLabel>
          </CircularProgress>
        )}
        <Button colorScheme='facebook' as='label' htmlFor='inputFile' isLoading={isLoading}>
          動画ファイルを選択
        </Button>
      </HStack>
      <Text fontSize='xs'>アップロードが中断された場合でも、再度同じファイルを選択することで続きから再開出来ます。</Text>
    </Stack>
  );
};
