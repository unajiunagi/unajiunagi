import { Button, Card, CardBody, HStack, Heading, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Stack, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { FixedAspectImage } from "components/common/FixedAspectImage";
import { UploadVideoModal } from "components/creator/UploadVideoModal";
import { useIsMobile } from "hooks/useIsMobile";
import { useToasts } from "hooks/useToasts";
import supabaseClient from "lib/supabase/supabaseClient";
import { useState } from "react";
import { BsPencilSquare, BsTrash3Fill } from "react-icons/bs";
import useSWR from "swr";
import { VideoData } from "type/videoData";
import { fetcherDefault } from "util/fetcherDefault";

export const UploadVideo = () => {
  const { successToast, errorToast } = useToasts();
  const isMobile = useIsMobile();
  const [removeIndex, setRemoveIndex] = useState<number | null>(null);
  const [uploadVideoModalIndex, setUploadVideoModalIndex] = useState<number | null>(null);
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const { data, error } = useSWR<VideoData[]>("/api/supabase/getUnuploadedVideos", fetcherDefault);

  if (error) {
    console.error(error);
    errorToast({ title: "動画の取得に失敗しました。" });
    return <></>;
  }

  const popModal = (index: number) => {
    setRemoveIndex(index);
    onOpenDelete();
  };

  const popUploadModal = (index: number | null) => {
    setUploadVideoModalIndex(index);
    onOpen();
  };

  const removeVideo = async () => {
    setIsLoading(true);
    try {
      // supabaseとvimeoの両方から削除する
      const { error } = await supabaseClient.from("videos").delete().eq("id", data![removeIndex!].id);
      if (error) throw error;
      if (data![removeIndex!].vimeo_uri) await axios.post("/api/vimeo/deleteVideo", { uri: data![removeIndex!].vimeo_uri });

      successToast({ title: "動画を削除しました。" });
    } catch (err) {
      errorToast({ title: "動画の削除に失敗しました。" });
      console.error(`error: ${err}`);
    }
    setIsLoading(false);
    onCloseDelete();
  };

  return (
    <>
      {data?.length && (
        <Heading size="lg" mb={1} textAlign="center">
          公開途中の動画
        </Heading>
      )}
      <Button onClick={() => popUploadModal(null)} colorScheme="blue" mb={2}>
        動画をアップロード
      </Button>
      <HStack wrap={"wrap"} width="100%" spacing="2%">
        {data?.map((video, index) => (
          <>
            <Card width={isMobile ? "100%" : "49%"} mb={4} backgroundColor={"black"} id={video.id}>
              <FixedAspectImage src={video.thumbnail_url ?? "/img.png"} alt={`サムネイルの画像${index}`} width={16} height={9} />
              <CardBody>
                <HStack>
                  <Heading size="md">{video.title ?? "無題"}</Heading>
                  <Spacer />
                  <Stack>
                    <Button onClick={() => popModal(index)} color="white" background="transparent" _hover={{ backgroundColor: "gray.300" }}>
                      <BsTrash3Fill size={"20"} />
                    </Button>
                    <Button onClick={() => popUploadModal(index)} color="white" background="transparent" _hover={{ backgroundColor: "gray.300" }}>
                      <BsPencilSquare size={"20"} />
                    </Button>
                  </Stack>
                </HStack>
              </CardBody>
            </Card>
          </>
        ))}
      </HStack>

      {/* {動画を削除するモーダル} */}
      <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>この動画を削除してもよろしいですか？削除した動画は戻せません。</ModalHeader>
          <ModalFooter>
            <Button colorScheme="blackAlpha" mr={3} onClick={onCloseDelete}>
              キャンセル
            </Button>
            <Button colorScheme="red" onClick={removeVideo} isLoading={isLoading}>
              削除する
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <UploadVideoModal isOpen={isOpen} onClose={onClose} data={uploadVideoModalIndex !== null ? data![uploadVideoModalIndex!] : null} />
    </>
  );
};
