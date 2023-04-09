import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Link, Text, VStack, chakra, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import zod from "zod";

type Props = {};

type FormData = {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};

const schema = zod
  .object({
    password: zod.string().nonempty("パスワードを入力してください。"),
    newPassword: zod
      .string()
      .nonempty("パスワードは必須項目です。")
      .min(8, "最低８文字含めてください。")
      .max(32, "32文字以内にしてください。")
      .regex(/^[a-zA-Z0-9-]+$/, "使える文字は大文字と小文字、数字、-(ハイフン)だけです")
      .regex(/^(?=.*?[a-z])(?=.*?\d).+$/, "小文字と数字を必ず含んでください"),
    confirmNewPassword: zod
      .string()
      .nonempty("パスワードは必須項目です。")
      .min(8, "最低８文字含めてください。")
      .max(32, "32文字以内にしてください。")
      .regex(/^[a-zA-Z0-9-]+$/, "使える文字は大文字と小文字、数字、-(ハイフン)だけです")
      .regex(/^(?=.*?[a-z])(?=.*?\d).+$/, "小文字と数字を必ず含んでください"),
  })
  .superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if (newPassword !== confirmNewPassword) {
      ctx.addIssue({
        path: ["confirmNewPassword"],
        code: "custom",
        message: "パスワードが一致しません",
      });
    }
  });

export const ChangePassword = ({}: Props) => {
  const user = getAuth().currentUser;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("submit");
    setIsLoading(true);
    try {
      const credential = await EmailAuthProvider.credential(user?.email ?? "", data.password);
      user && (await reauthenticateWithCredential(user, credential));
      user && (await updatePassword(user, data.confirmNewPassword));
      toast({
        title: "パスワードを変更しました。",
        status: "success",
        position: "top",
      });
    } catch (error) {
      console.log(error);

      if (error instanceof FirebaseError) {
        if (error.code === "auth/too-many-requests") {
          toast({
            title: "試行回数が制限を超えました。後でもう一度お試しください。",
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
            現在のパスワード
          </FormLabel>
          <Input id="password" type="password" {...register("password")} color="white" />
          <FormErrorMessage>{formState.errors.password?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!formState.errors.newPassword}>
          <FormLabel htmlFor="newPassword" color="white">
            新しいパスワード
          </FormLabel>
          <Input id="newPassword" type="password" {...register("newPassword")} color="white" />
          <FormErrorMessage>{formState.errors.newPassword?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!formState.errors.confirmNewPassword}>
          <FormLabel htmlFor="confirmNewPassword" color="white">
            新しいパスワードの確認
          </FormLabel>
          <Input id="confirmNewPassword" type="password" {...register("confirmNewPassword")} color="white" />
          <FormHelperText>確認のため新しいパスワードをもう一度入力してください。</FormHelperText>
          <FormErrorMessage>{formState.errors.confirmNewPassword?.message}</FormErrorMessage>
        </FormControl>
        <Button mt="4" colorScheme="blue" width="100%" isLoading={isLoading} type="submit">
          パスワードを変更
        </Button>
      </chakra.form>
      <Text>
        パスワードを忘れた場合は
        <Link href="/resetPassword" color="blue.400">
          こちら
        </Link>
      </Text>
    </VStack>
  );
};
