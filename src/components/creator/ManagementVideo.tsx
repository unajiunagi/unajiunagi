import { HStack, Heading, useDisclosure } from '@chakra-ui/react';
import { ManagementVideoCard } from 'components/creator/ManagementVideoCard';
import { ManagementVideoDeleteModal } from 'components/creator/ManagementVideoDeleteModal';
import { ManagementVideoModal } from 'components/creator/ManagementVideoModal';
import { useToasts } from 'hooks/useToasts';
import { useState } from 'react';
import useSWR from 'swr';
import { VideoData } from 'type/videoData';
import { fetcherDefault } from 'util/fetcherDefault';

export const ManagementVideo = () => {
  const { errorToast } = useToasts();
  const [removeData, setRemoveData] = useState<VideoData | null>(null);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, error } = useSWR<VideoData[]>('/api/supabase/getUploadedVideos', fetcherDefault);

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
      {data && data?.length === 0 && (
        <Heading size='lg' mb={1} textAlign='center'>
          公開している作品はありません
        </Heading>
      )}
      <HStack wrap='wrap' width='100%' spacing='2%'>
        {data?.map((video, index) => <ManagementVideoCard video={video} index={index} popDeleteModal={popDeleteModal} popUploadModal={popUploadModal} key={video.id} />)}
      </HStack>
      {/* {動画を削除するモーダル} */}
      <ManagementVideoDeleteModal isOpenDelete={isOpenDelete} onCloseDelete={onCloseDelete} removeData={removeData} />
      {/* {動画をアップロードするモーダル} */}
      {data && modalIndex !== null && <ManagementVideoModal isOpen={isOpen} onClose={onClose} data={data[modalIndex]} />}
    </>
  );
};
