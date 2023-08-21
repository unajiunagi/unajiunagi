import { Box, Button, Card, CardBody, Divider, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";
import { AuthError } from "@supabase/supabase-js";
import { useToasts } from "hooks/useToasts";
import supabaseClient from "lib/supabase/supabaseClient";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {};

export const ChangeCreaterModeButton = ({}: Props) => {
  const user = useUser();
  const { sucessToast, errorToast } = useToasts();
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const changeCreaterMode = async () => {
    setIsLoading(true);
    try {
      if (!user) return;
      const { error } = await supabaseClient.from("users").update({ creater_mode: true }).eq("id", user.id);
      if (error) return error;
      sucessToast({ title: "アカウントがクリエイターモードに変更されました。" });
      push("/creater");
    } catch (error) {
      if (!(error instanceof AuthError)) return;
      console.log(error.message);

      errorToast({ title: `${error.message}` });
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
