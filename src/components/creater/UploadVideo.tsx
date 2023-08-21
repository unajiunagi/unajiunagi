import { Button, Modal, ModalContent, ModalOverlay, Stack, useDisclosure } from "@chakra-ui/react";
import { useToasts } from "hooks/useToasts";
import { useState } from "react";
import { UploadVideoForms } from "./UploadVideoForms";

export const UploadVideo = () => {
  // 下書きを編集するするときはそのvideoIdをセットして情報を取得
  const [videoId, setVideoId] = useState<string | null>(null);
  const { sucessToast, errorToast } = useToasts();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack>
      <Button onClick={onOpen} colorScheme="blue">
        Open Modal
      </Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="blue" maxHeight="80%">
          <UploadVideoForms onClose={onClose} videoId={videoId} setVideoId={setVideoId} />
        </ModalContent>
      </Modal>
    </Stack>
  );
};
