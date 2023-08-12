import { Box, Button, Card, CardBody, Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {};

export const ChangeCreaterModeButton = ({}: Props) => {
  const user = getAuth().currentUser;
  const db = getFirestore();
  const uid = user?.uid!;
  const errorToast = useToast({ status: "error" });
  const sucessToast = useToast({ status: "success" });
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const changeCreaterMode = async () => {
    setIsLoading(true);
    try {
      const docRef = doc(db, "users", uid);
      await setDoc(docRef, { createrMode: true }, { merge: true });
      sucessToast({ title: "アカウントがクリエイターモードに変更されました。" });
      push("/creater");
    } catch (error) {
      errorToast({ title: `${error}` });
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <>
      <Card bgColor="black">
        <CardBody>
          <Box as="button" width="100%" textAlign="left" bgColor="black" color="white" fontWeight="bold" fontSize="xl" onClick={onOpen}>
            クリエイターモードへ変更
          </Box>
          <Divider></Divider>
          <Text color="gray">クリエイターモードは作品の公開や管理など、クリエイターのための機能が開放されるモードです。作品を公開するためには、クリエイターモードする必要があります。</Text>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>一度クリエイターモードに変更すると通常アカウントに戻すことは出来ません。クリエイターモードに変更してよろしいですか？</ModalBody>

          <ModalFooter>
            <Button colorScheme="blackAlpha" mr={3} onClick={onClose}>
              キャンセル
            </Button>
            <Button colorScheme="blue" isLoading={isLoading} onClick={changeCreaterMode}>
              クリエイターモードへ変更
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
