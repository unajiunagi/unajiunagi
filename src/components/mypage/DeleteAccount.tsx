import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, VStack, chakra, useDisclosure, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { EmailAuthProvider, getAuth, reauthenticateWithCredential } from "firebase/auth";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import zod from "zod";

type Props = {};

type FormData = {
  password: string;
};

const schema = zod.object({
  password: zod.string().nonempty("パスワードを入力してください。"),
});

export const DeleteAccount = ({}: Props) => {
  const user = getAuth().currentUser;
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const deleteAccount = async () => {
    try {
      await user?.delete();
      toast({
        title: "アカウントを削除しました。",
        status: "success",
        position: "top",
      });
      router.push("/top");
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/requires-recent-login") {
          toast({
            title: "ユーザーが最近ログインしたことがないため、再認証が必要です。",
            status: "error",
            position: "top",
          });
        } else if (error.code === "auth/user-not-found") {
          toast({
            title: "存在しないアカウントです。",
            status: "error",
            position: "top",
          });
        } else if (error.code === "auth/too-many-requests") {
          toast({
            title: "多数のリクエストが送信されたため、一時的に削除できません。",
            status: "error",
            position: "top",
          });
        } else {
          toast({
            title: "エラーが発生しました。通信環境の良いところでやり直してみてください。",
            status: "error",
            position: "top",
          });
        }
      }
    } finally {
      onClose();
    }
  };

  const onSubmit = async (data: FormData) => {
    console.log("submit");
    setIsLoading(true);
    try {
      const credential = await EmailAuthProvider.credential(user?.email ?? "", data.password);
      user && (await reauthenticateWithCredential(user, credential));
      onOpen();
    } catch (error) {
      console.log(error);

      if (error instanceof FirebaseError) {
        if (error.code === "auth/too-many-requests") {
          toast({
            title: "試行回数が制限を超えました。後でもう一度お試しください。",
            status: "error",
            position: "top",
          });
        } else if (error.code === "auth/invalid-email") {
          toast({
            title: "メールアドレスが無効です。",
            status: "error",
            position: "top",
          });
        } else if (error.code === "auth/wrong-password") {
          toast({
            title: "パスワードが違います。",
            status: "error",
            position: "top",
          });
        } else if (error.code === "auth/invalid-credential") {
          toast({
            title: "提供された認証情報が無効です。認証情報が不足している可能性があります。",
            status: "error",
            position: "top",
          });
        } else {
          toast({
            title: "エラーが発生しました。通信環境の良いところでやり直してみてください。",
            status: "error",
            position: "top",
          });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack spacing="4" width="90%" margin="0 auto">
      <chakra.form width="100%" onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!formState.errors.password}>
          <FormLabel htmlFor="password" color="white">
            パスワード
          </FormLabel>
          <Input id="password" type="password" {...register("password")} color="white" />
          <FormHelperText>アカウントを削除するにはパスワードを入力してください。</FormHelperText>
          <FormErrorMessage>{formState.errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button mt="4" colorScheme="red" width="100%" isLoading={isLoading} type="submit">
          アカウントの削除
        </Button>
      </chakra.form>

      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              本当に削除しますか？
            </AlertDialogHeader>
            <AlertDialogBody>アカウントを削除すると購入した作品は見れなくなり、二度と戻せません。よろしいですか？</AlertDialogBody>
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
    </VStack>
  );
};
