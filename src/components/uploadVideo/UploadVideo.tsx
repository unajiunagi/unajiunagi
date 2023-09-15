import { Button, HStack, Heading, useDisclosure } from '@chakra-ui/react';
import { UploadVideoCard } from 'components/uploadVideo/UploadVideoCard';
import { UploadVideoDeleteModal } from 'components/uploadVideo/UploadVideoDeleteModal';
import { UploadVideoModal } from 'components/uploadVideo/UploadVideoModal';
import { useToasts } from 'hooks/useToasts';
import { useState } from 'react';
import useSWR from 'swr';
import { VideoData } from 'type/videoData';
import { fetcherDefault } from 'util/fetcherDefault';

export const UploadVideo = () => {
  const { errorToast } = useToasts();
  const [removeData, setRemoveData] = useState<VideoData | null>(null);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, error } = useSWR<VideoData[]>('/api/supabase/getUnUploadedVideos', fetcherDefault);

  if (error) {
    errorToast({ title: '動画の取得に失敗しました。' });
    return null;
  }

  const popDeleteModal = (video: VideoData) => {
    setRemoveData(video);
    onOpenDelete();
  };

  const popUploadModal = (index: number | null) => {
    setModalIndex(index);
    onOpen();
  };

  return (
    <>
      {data && data?.length > 0 && (
        <Heading size='lg' mb={1} textAlign='center'>
          下書き
        </Heading>
      )}
      <Button onClick={() => popUploadModal(null)} colorScheme='facebook' mb={2}>
        動画をアップロード
      </Button>
      <HStack wrap='wrap' width='100%' spacing='2%'>
        {data?.map((video, index) => <UploadVideoCard video={video} index={index} popDeleteModal={popDeleteModal} popUploadModal={popUploadModal} />)}
      </HStack>
      {/* {動画を削除するモーダル} */}
      <UploadVideoDeleteModal isOpenDelete={isOpenDelete} onCloseDelete={onCloseDelete} removeData={removeData} />
      {/* {動画をアップロードするモーダル} */}
      <UploadVideoModal isOpen={isOpen} onClose={onClose} data={data && modalIndex !== null ? data[modalIndex] : null} />
    </>
  );
};
