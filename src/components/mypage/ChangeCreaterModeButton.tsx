import { Box, Button, Card, CardBody, Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {};

export const ChangeCreaterModeButton = ({}: Props) => {
  const user = getAuth().currentUser;
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const changeCreaterMode = () => {
    setIsLoading(true);
    setIsLoading(false);
    onClose();
    router.push('/creater')
  }

  return (
    <>
      <Card bgColor="black">
        <CardBody>
          <Box width="100%" textAlign="left" bgColor="black" color="cyan.300" fontWeight="bold" fontSize="xl" onClick={onOpen}>
            クリエイターモードへ変更
          </Box>
          <Divider></Divider>
          <Text color="gray">クリエイターモードは作品の上映や管理など、クリエイターのための機能が開放されるモードです。映画を上映したい方はクリエイターモードする必要があります。</Text>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>一度クリエイターモードに変更すると通常アカウントに戻すことは出来ません。クリエイターモードに変更してよろしいですか？
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blackAlpha" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" isLoading={isLoading} onClick={changeCreaterMode}>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
