import { Button, Modal, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useToasts } from 'hooks/useToasts';
import supabaseClient from 'lib/supabase/supabaseClient';
import { useState } from 'react';
import axios from 'redaxios';
import { mutate } from 'swr';
import { VideoData } from 'type/videoData';

type Props = {
  isOpenDelete: boolean;
  onCloseDelete: () => void;
  removeData: VideoData | null;
};

export const UploadVideoDeleteModal = ({ isOpenDelete, onCloseDelete, removeData }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { successToast, errorToast } = useToasts();

  const removeVideo = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabaseClient.storage.from('video_thumbnail_imgs').remove([removeData?.thumbnail_path!]); // 画像をストレージから削除
      if (error) throw error;
      const { error: err } = await supabaseClient
        .from('videos')
        .delete()
        .eq('id', removeData?.id); // DBから削除
      if (err) throw err;
      if (removeData?.vimeo_uri) await axios.post('/api/vimeo/deleteVideo', { uri: removeData?.vimeo_uri }); // Vimeoから削除

      successToast({ title: '動画を削除しました。' });
    } catch (err) {
      errorToast({ title: '動画の削除に失敗しました。' });
    }
    mutate('/api/supabase/getUnuploadedVideos');
    setIsLoading(false);
    onCloseDelete();
  };

  return (
    <>
      <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>この動画を削除してもよろしいですか？削除した動画は戻せません。</ModalHeader>
          <ModalFooter>
            <Button colorScheme='blackAlpha' mr={3} onClick={onCloseDelete}>
              キャンセル
            </Button>
            <Button colorScheme='red' onClick={removeVideo} isLoading={isLoading}>
              削除する
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
