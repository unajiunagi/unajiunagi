import { Button, Card, CardBody, HStack, Heading, Spacer, Stack } from '@chakra-ui/react';
import { FixedAspectImage } from 'components/feature/FixedAspectImage';
import { useIsMobile } from 'hooks/useIsMobile';
import { BsPencilSquare, BsTrash3Fill } from 'react-icons/bs';
import { staticPath } from 'type/$path';
import { VideoData } from 'type/videoData';

type Props = {
  video: VideoData;
  index: number;
  popDeleteModal: (index: VideoData) => void;
  popUploadModal: (index: number | null) => void;
};

export const UploadVideoCard = ({ video, index, popDeleteModal, popUploadModal }: Props) => {
  const isMobile = useIsMobile();

  return (
    <Card width={isMobile ? '100%' : '49%'} mb={4} bgColor='black' key={video.id}>
      <FixedAspectImage src={video.thumbnail_url ?? staticPath.logo_jpg} alt={`サムネイルの画像${index}`} width={16} height={9} roundedTop='md' />
      <CardBody>
        <HStack>
          <Heading size='md'>{video.title ?? 'タイトル'}</Heading>
          <Spacer />
          <Stack>
            <Button onClick={() => popDeleteModal(video)} background='transparent' _hover={{ bgColor: 'gray.300' }}>
              <BsTrash3Fill size='20' />
            </Button>
            <Button onClick={() => popUploadModal(index)} background='transparent' _hover={{ bgColor: 'gray.300' }}>
              <BsPencilSquare size='20' />
            </Button>
          </Stack>
        </HStack>
      </CardBody>
    </Card>
  );
};
