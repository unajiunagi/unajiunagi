import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure, useToast } from "@chakra-ui/react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { AuthError } from "@supabase/supabase-js";
import axios from "axios";
import { useAuthContext } from "components/provider/AuthProvider";
import { useRouter } from "next/router";
import { useRef } from "react";
import { Database } from "../../../schema";

type Props = {};

// type FormData = {
//   password: string;
// };

// const schema = zod.object({
//   password: zod.string().nonempty("パスワードを入力してください。"),
// });

export const DeleteAccount = ({}: Props) => {
  const supabaseClient = createPagesBrowserClient<Database>();
  const user = useAuthContext();
  const errorToast = useToast({ status: "error" });
  const sucessToast = useToast({ status: "success" });
  const { push } = useRouter();
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  // const { register, handleSubmit, formState } = useForm<FormData>({
  //   resolver: zodResolver(schema),
  // });

  const deleteAccount = async () => {
    try {
      await axios.post("/api/deleteUser", { id: user?.id });
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
      {/* <chakra.form width="100%" onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!formState.errors.password}>
          <FormLabel htmlFor="password" color="white">
            パスワード
          </FormLabel>
          <Input id="password" type="password" {...register("password")} color="white" />
          <FormHelperText>アカウントを削除するにはパスワードを入力してください。</FormHelperText>
          <FormErrorMessage>{formState.errors.password?.message}</FormErrorMessage>
        </FormControl> */}
      <Button mt="4" colorScheme="red" width="100%" onClick={onOpen}>
        アカウントの削除
      </Button>
      {/* </chakra.form> */}

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
