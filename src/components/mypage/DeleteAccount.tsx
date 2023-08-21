import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure } from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";
import { AuthError } from "@supabase/supabase-js";
import axios from "axios";
import { useToasts } from "hooks/useToasts";
import supabaseClient from "lib/supabase/supabaseClient";
import { useRouter } from "next/router";
import { useRef } from "react";

type Props = {};

export const DeleteAccount = ({}: Props) => {
  const user = useUser();
  const { sucessToast, errorToast } = useToasts();
  const { push } = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const deleteAccount = async () => {
    try {
      console.log("trigger");

      await axios.get(`/api/auth/deleteUser/${user?.id}`);
      const { error } = await supabaseClient.auth.signOut();
      if (error) throw error;
      sucessToast({ title: "アカウントを削除しました。" });
      push("/");
    } catch (error) {
      if (!(error instanceof AuthError)) return;

      console.log(error);
      errorToast({ title: "エラーが発生しました。通信環境の良いところでやり直してみてください。" });
    } finally {
      onClose();
    }
  };

  return (
    <>
      <Button mt="4" colorScheme="red" width="100%" onClick={onOpen}>
        アカウントの削除
      </Button>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              本当に削除しますか？
            </AlertDialogHeader>
            <AlertDialogBody>アカウントを削除すると作品の購入情報は削除されます。よろしいですか？</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} colorScheme="facebook">
                キャンセル
              </Button>
              <Button colorScheme="red" onClick={deleteAccount} ml={3}>
                削除する
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
