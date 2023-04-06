import { Link } from "@chakra-ui/next-js";
import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Text, VStack, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";

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

export default function Signup() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await sendEmailVerification(userCredential.user);
      toast({
        title: "確認メールを送信しました。メールアドレスを認証してください。",
        status: "success",
        position: "top",
      });
      reset();
    } catch (error) {
      toast({
        title: "エラーが発生しました。通信環境の良いところでやり直してみてください。",
        status: "error",
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack spacing="4" width="100%" maxWidth="400px" minHeight="800" p="8" margin="0 auto">
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <FormHelperText color="white">必ず小文字と数字を含む8文字以上のパスワードを設定してください</FormHelperText>
          <FormErrorMessage>{formState.errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button mt="4" colorScheme="blue" isLoading={isLoading} type="submit">
          アカウントを作成
        </Button>
      </form>
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
