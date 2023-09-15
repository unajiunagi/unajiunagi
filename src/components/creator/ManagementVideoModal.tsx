import { Button, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Spinner, chakra } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '@supabase/auth-helpers-react';
import { UploadThumbnailImg } from 'components/uploadVideo/UploadThumbnailImg';
import { UploadVideoForms } from 'components/uploadVideo/UploadVideoForms';
import { useIsMobile } from 'hooks/useIsMobile';
import { useToasts } from 'hooks/useToasts';
import supabaseClient from 'lib/supabase/supabaseClient';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import { VideoData } from 'type/videoData';
import { UploadVideoFormData, uploadVideoFormDefaults, uploadVideoFormsSchema, uploadVideoFormsStaffs } from 'util/uploadVideoFormsSchema';
import { v4 } from 'uuid';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: VideoData
};

export const ManagementVideoModal = ({ isOpen, onClose, data }: Props) => {
  const user = useUser();
  const isMobile = useIsMobile();
  const [videoId, setVideoId] = useState<string>(data.id);
  const [isLoading, setIsLoading] = useState(false);
  const { successToast, errorToast } = useToasts();

  const schema = uploadVideoFormsSchema;
  const { register, handleSubmit, formState, setValue } = useForm<UploadVideoFormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    uploadVideoFormDefaults(data, setValue); // フォームの初期値を設定
    setVideoId(data.id); // videoIdを初期化
  }, [data]);

  const closeModal = () => {
    uploadVideoFormDefaults(data, setValue); // フォームの初期値を設定
    setVideoId(data ? data.id : v4()); // videoIdを初期化
    onClose(); // モーダルを閉じる
    mutate('/api/supabase/getUploadedVideos'); // SWRのキャッシュを更新
  };

  const submitData = async (formData: UploadVideoFormData) => {
    setIsLoading(true);
    const casts = { no_name: formData.casts };
    const staffs = uploadVideoFormsStaffs(formData);
    try {
      const { error } = await supabaseClient.from('videos').upsert({ id: videoId, title: formData.title, description: formData.description, creator_id: user?.id, birth_year: Number(formData.birth_year), running_time: Number(formData.running_time), casts, staffs }, { onConflict: 'id' }); // DBにフォームの内容を保存
      if (error) throw error;
      successToast({ title: '情報が保存されました。' });
      closeModal();
    } catch (e) {
      errorToast({ title: 'エラーが発生しました。情報が保存されませんでした。' });
    }
    setIsLoading(false);
  };

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <chakra.form onSubmit={handleSubmit(submitData)} width='100%'>
        <ModalContent bgColor='brand' maxHeight={isMobile ? '90%' : '80%'} mb='0'>
          <ModalBody overflowY='scroll'>
            <UploadThumbnailImg videoId={videoId} thumbnailUrl={data?.thumbnail_url ?? null} thumbnailPath={data?.thumbnail_path ?? null} />
            <UploadVideoForms errors={formState.errors} register={register} data={data} />
          </ModalBody>
          <Divider mb='-2' />
          <ModalFooter>
            {isLoading && <Spinner color='white' mr={2} />}
            <Button type='submit' colorScheme='facebook' mr={3}>
              保存
            </Button>
            <Button colorScheme='blackAlpha' onClick={closeModal}>
              キャンセル
            </Button>
          </ModalFooter>
        </ModalContent>
      </chakra.form>
    </Modal>
  );
};
