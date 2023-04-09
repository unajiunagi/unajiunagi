import { Link } from "@chakra-ui/next-js";
import { Button, Divider, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Text, VStack, chakra, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleAuthButton } from "components/auth/GoogleAuthButton";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import zod from "zod";

type FormData = {
  email: string;
  password: string;
};

const schema = zod.object({
  email: zod.string().nonempty("メールアドレスは必須項目です。").email("正しいメールアドレスを入力してください。"),
  password: zod
    .string()
    .nonempty("パスワードは必須項目です。")
    .min(8, "最低８文字含めてください。")
    .max(32, "32文字以内にしてください。")
    .regex(/^[a-zA-Z0-9-]+$/, "使える文字は大文字と小文字、数字、-(ハイフン)だけです")
    .regex(/^(?=.*?[a-z])(?=.*?\d).+$/, "小文字と数字を必ず含んでください"),
});

export default function () {
  const auth = getAuth();
  const [isLoadingSignUp, setIsLoadingSignUp] = useState<boolean>(false);
  const [isLoadingResendEmail, setIsLoadingResendEmail] = useState<boolean>(false);
  const toast = useToast();
  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoadingSignUp(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      auth.currentUser && (await sendEmailVerification(auth.currentUser));
      toast({
        title: "認証メールを送信しました。メールアドレスを認証してください。",
        status: "success",
        position: "top",
      });
      reset();
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          toast({
            title: "このメールアドレスは既に使用されています。",
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
      setIsLoadingSignUp(false);
    }
  };

  const resendEmail = async () => {
    setIsLoadingResendEmail(true);
    try {
      auth.currentUser && (await sendEmailVerification(auth.currentUser));
      toast({
        title: "認証メールを送信しました。メールアドレスを認証してください。",
        status: "success",
        position: "top",
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/too-many-requests") {
          toast({
            title: "認証メールを連続で送ることは出来ません。時間が経ってからやり直してください。",
            status: "error",
            position: "top",
          });
        }
      }
    } finally {
      setIsLoadingResendEmail(false);
    }
  };

  return (
    <VStack spacing="4" width="90%" maxWidth="400px" pt="16" margin="0 auto">
      <GoogleAuthButton />
      <Divider />
      <chakra.form width="100%" onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!formState.errors.email}>
          <FormLabel htmlFor="email" color="white">
            メールアドレス
          </FormLabel>
          <Input id="email" type="email" {...register("email")} color="white" />
          <FormErrorMessage>{formState.errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!formState.errors.password}>
          <FormLabel htmlFor="password" color="white">
            パスワード
          </FormLabel>
          <Input id="password" type="password" {...register("password")} color="white" />
          <FormHelperText color="white">必ず小文字と数字を含む8文字以上のパスワードを設定してください</FormHelperText>
          <FormErrorMessage>{formState.errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button mt="4" colorScheme="blue" width="100%" isLoading={isLoadingSignUp} type="submit">
          アカウントを作成
        </Button>
      </chakra.form>
      {auth.currentUser?.emailVerified === false && (
        <Button onClick={resendEmail} colorScheme="green" width="100%" isLoading={isLoadingResendEmail}>
          認証メールを再送信
        </Button>
      )}
      <Text>
        アカウントを登録することにより、
        <Link href="/termsOfService" color="blue.400">
          利用規約
        </Link>
        と
        <Link href="/privacy" color="blue.400">
          プライバシーポリシー
        </Link>
        に同意したとみなされます。
      </Text>
      <Text>
        アカウントをお持ちの方は
        <Link href="/login" color="blue.400">
          ログイン
        </Link>
        してください。
      </Text>
    </VStack>
  );
}
