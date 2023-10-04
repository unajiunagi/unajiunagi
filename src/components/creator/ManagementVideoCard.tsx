import { Button, Card, CardBody, HStack, Heading, Spacer, Stack } from '@chakra-ui/react';
import { FixedAspectImage } from 'components/feature/FixedAspectImage';
import { useIsMobile } from 'hooks/useIsMobile';
import { useRouter } from 'next/router';
import { BsBoxArrowUpRight, BsPencilSquare, BsTrash3Fill } from 'react-icons/bs';
import { staticPath } from 'type/$path';
import { VideoData } from 'type/videoData';

type Props = {
  video: VideoData;
  index: number;
  popDeleteModal: (index: VideoData) => void;
  popUploadModal: (index: number | null) => void;
};

export const ManagementVideoCard = ({ video, index, popDeleteModal, popUploadModal }: Props) => {
  const isMobile = useIsMobile();
  const { push } = useRouter();

  return (
    <Card width={isMobile ? '100%' : '49%'} mb={4} bgColor='black'>
      <FixedAspectImage src={video.thumbnail_url ?? staticPath.logo_jpg} alt={`サムネイルの画像${index}`} width={16} height={9} roundedTop='md' />
      <CardBody>
        <HStack>
          <Heading size='md'>{video.title ?? 'タイトル'}</Heading>
          <Spacer />
          <Stack>
            <Button onClick={() => popDeleteModal(video)} background='transparent' _hover={{ bgColor: 'gray.500' }}>
              <BsTrash3Fill size='20' />
            </Button>
            <Button onClick={() => popUploadModal(index)} background='transparent' _hover={{ bgColor: 'gray.500' }}>
              <BsPencilSquare size='20' />
            </Button>
            <Button onClick={() => push(`/videos/${video.id}`)} background='transparent' _hover={{ bgColor: 'gray.500' }}>
              <BsBoxArrowUpRight size='20' />
            </Button>
          </Stack>
        </HStack>
      </CardBody>
    </Card>
  );
};
