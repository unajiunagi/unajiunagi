import { Link } from "@chakra-ui/next-js";
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Text, VStack, chakra, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { getAuth, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";

type FormData = {
  email: string;
  password: string;
};

const schema = zod.object({
  email: zod.string().nonempty("メールアドレスを入力してください。").email("正しいメールアドレスを入力してください。"),
  password: zod.string().nonempty("パスワードを入力してください。"),
});

export default function () {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);

    setIsLoading(true);
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      if (auth.currentUser?.emailVerified) {
        toast({
          title: "ログインしました。",
          status: "success",
          position: "top",
        });
        router.push("/top");
      } else {
        await sendEmailVerification(userCredential.user);
        toast({
          title: "メールアドレスが認証されていません。認証メールを送信したので、メールアドレスを認証してください。",
          status: "error",
          position: "top",
        });
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/user-disabled") {
          toast({
            title: "無効なアカウントです。",
            status: "error",
            position: "top",
          });
        } else if (error.code === "auth/user-not-found") {
          toast({
            title: "存在しないアカウントです。メールアドレスが正しいか確認してください。",
            status: "error",
            position: "top",
          });
        } else if (error.code === "auth/wrong-password") {
          toast({
            title: "パスワードが違います。",
            status: "error",
            position: "top",
          });
        } else if (error.code === "auth/too-many-requests") {
          if (error.message === "Firebase: Error (auth/too-many-requests).") {
            toast({
              title: "メールアドレスが認証されていません。既に認証メールを送信したので、メールアドレスを認証してください。",
              status: "error",
              position: "top",
            });
          } else if (error.message === "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).") {
            toast({
              title: "パスワードを間違えすぎたため、一定時間ログイン出来なくなります。",
              status: "error",
              position: "top",
            });
          }
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
      <chakra.form width="100%" onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!formState.errors.email}>
          <FormLabel htmlFor="email" color="white">
            Eメール
          </FormLabel>
          <Input id="email" type="email" {...register("email")} color="white" />
          <FormErrorMessage>{formState.errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!formState.errors.password}>
          <FormLabel htmlFor="password" color="white">
            パスワード
          </FormLabel>
          <Input id="password" type="password" {...register("password")} color="white" />
          <FormErrorMessage>{formState.errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button mt="4" colorScheme="blue" width="100%" isLoading={isLoading} type="submit">
          ログイン
        </Button>
      </chakra.form>
      <Text>
        パスワードを忘れた場合は
        <Link href="/resetPassword" color="blue.400">
          こちら
        </Link>
      </Text>
      <Text>
        アカウントをお持ちでない場合は
        <Link href="/signup" color="blue.400">
          新規登録
        </Link>
        してください。
      </Text>
    </VStack>
  );
}
