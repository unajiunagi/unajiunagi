import { Button, Modal, ModalOverlay, Stack, useDisclosure } from "@chakra-ui/react";
import { UploadVideoForms } from "components/creator/UploadVideoForms";
import { useToasts } from "hooks/useToasts";

export const UploadVideo = () => {
  const { successToast, errorToast } = useToasts();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // 下書きを編集するするときはそのvideoIdをセットして情報を取得

  return (
    <Stack>
      <Button onClick={onOpen} colorScheme="blue">
        Open Modal
      </Button>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <UploadVideoForms onClose={onClose} id={null} />
      </Modal>
    </Stack>
  );
};
