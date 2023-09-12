import { Button, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Spinner, chakra, useBoolean } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@supabase/auth-helpers-react';
import { UploadThumbnailImg } from 'components/uploadVideo/UploadThumbnailImg';
import { UploadVideoComponent } from 'components/uploadVideo/UploadVideoComponent';
import { UploadVideoForms } from 'components/uploadVideo/UploadVideoForms';
import { useIsMobile } from 'hooks/useIsMobile';
import { useToasts } from 'hooks/useToasts';
import supabaseClient from 'lib/supabase/supabaseClient';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'redaxios';
import { mutate } from 'swr';
import { Upload } from 'tus-js-client';
import { VideoData } from 'type/videoData';
import { UploadVideoFormData, uploadVideoFormDefaults, uploadVideoFormsSchema, uploadVideoFormsStaffs } from 'util/uploadVideoFormsSchema';
import { v4 } from 'uuid';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: VideoData | null;
};

export const UploadVideoModal = ({ isOpen, onClose, data }: Props) => {
  const user = useUser();
  const isMobile = useIsMobile();
  const [videoId, setVideoId] = useState<string>(data?.id ?? v4());
  const [progress, setProgress] = useState<number | null>(null);
  const [uploadState, setUploadState] = useState<Upload | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCancel, setIsCancel] = useBoolean(false);
  const [isRelease, setIsRelease] = useBoolean(false);
  const { successToast, infoToast, errorToast } = useToasts();

  const schema = uploadVideoFormsSchema;
  const { register, handleSubmit, formState, setValue } = useForm<UploadVideoFormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    uploadVideoFormDefaults(data, setValue); // フォームの初期値を設定
    setVideoId(data ? data.id : v4()); // videoIdを初期化
  }, [data]);

  const release = async () => {
    await axios.post('/api/vimeo/updateVideo', { uri: data?.vimeo_uri, object: { name: data?.title, privacy: { embed: 'whitelist' } } });
    await axios.post('/api/vimeo/addAllowdEmbedDomain', { uri: data?.vimeo_uri });
    const { error } = await supabaseClient
      .from('videos')
      .update({ is_uploaded: true })
      .eq('id', data?.id);
    if (error) throw error;
    successToast({ title: '動画を公開しました。' });
  };

  const cancel = () => {
    uploadState?.abort(); // アップロードを中断
    if (progress !== null && progress < 100) infoToast({ title: 'アップロードを中断しました。' });
  };

  const submitData = async (formData: UploadVideoFormData) => {
    setIsLoading(true);
    const casts = { no_name: formData.casts };
    const staffs = uploadVideoFormsStaffs(formData);
    try {
      const { error } = await supabaseClient.from('videos').upsert({ id: videoId, title: formData.title, description: formData.description, creator_id: user?.id, birth_year: Number(formData.birth_year), running_time: Number(formData.running_time), casts, staffs }, { onConflict: 'id' }); // DBにフォームの内容を保存
      if (error) throw error;

      if (isRelease) await release();
      if (isCancel) cancel();
      if (!isRelease) successToast({ title: '情報が保存されました。' });
      if (isCancel || isRelease) {
        onClose();
        uploadVideoFormDefaults(data, setValue); // フォームの初期値を設定
        setVideoId(data ? data.id : v4()); // videoIdを初期化
        setUploadState(null); // uploadStateをリセット
        setProgress(null); // progressをリセット
        mutate('/api/supabase/getUnuploadedVideos');
      }
    } catch (e) {
      errorToast({ title: 'エラーが発生しました。情報が保存されませんでした。' });
    }
    setIsLoading(false);
    setIsCancel.off();
    setIsRelease.off();
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <chakra.form onSubmit={handleSubmit(submitData)} width='100%'>
        <ModalContent bgColor='brand' maxHeight={isMobile ? '90%' : '80%'} mb='0'>
          <ModalBody overflowY='scroll'>
            <UploadThumbnailImg videoId={videoId} thumbnailUrl={data?.thumbnail_url ?? null} thumbnailPath={data?.thumbnail_path ?? null} />
            <UploadVideoComponent videoId={videoId} progress={progress} setProgress={setProgress} uploadState={uploadState} setUploadState={setUploadState} />
            <UploadVideoForms errors={formState.errors} register={register} data={data} />
          </ModalBody>
          <Divider mb='-2' />
          <ModalFooter>
            {isLoading && <Spinner color='white' mr={2} />}
            {progress === 100 && data?.thumbnail_url && (
              <Button type='submit' onClick={setIsRelease.on} colorScheme='blue' mr={3}>
                公開
              </Button>
            )}
            <Button type='submit' colorScheme='facebook' mr={3}>
              保存
            </Button>
            <Button type='submit' colorScheme='blackAlpha' onClick={setIsCancel.on}>
              キャンセル
            </Button>
          </ModalFooter>
        </ModalContent>
      </chakra.form>
    </Modal>
  );
};
