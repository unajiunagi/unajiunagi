import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, VStack, chakra, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";

type FormData = {
  email: string;
  password: string;
};

const schema = zod.object({
  email: zod.string().nonempty("メールアドレスを入力してください。").email("正しいメールアドレスを入力してください。"),
});

export default function () {
  const auth = getAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const resetPassword = async (data: FormData) => {
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth, data.email);
      toast({
        title: "入力したメールアドレスにパスワードをリセットするリンクを送りました。",
        status: "success",
        position: "top",
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error);

        if (error.code === "auth/too-many-requests") {
          toast({
            title: "リンクを連続で送ることは出来ません。時間を空けてやり直してください。",
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
    <VStack spacing="4" width="90%" maxWidth="400px" pt="8" margin="0 auto">
      <chakra.form width="100%" onSubmit={handleSubmit(resetPassword)}>
        <FormControl isInvalid={!!formState.errors.email}>
          <FormLabel htmlFor="email" color="white">
            Eメール
          </FormLabel>
          <Input id="email" type="email" {...register("email")} color="white" />
          <FormHelperText color="white">入力したメールアドレスにパスワードをリセットするリンクを送ります。</FormHelperText>
          <FormErrorMessage>{formState.errors.email?.message}</FormErrorMessage>
        </FormControl>
        <Button mt="4" colorScheme="blue" width="100%" isLoading={isLoading} type="submit">
          パスワードをリセット
        </Button>
      </chakra.form>
    </VStack>
  );
}
