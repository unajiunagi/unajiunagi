import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack, chakra, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { confirmPasswordReset, getAuth, signInWithEmailAndPassword, verifyPasswordResetCode } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type props = {
  oobCode: string;
};

type FormData = {
  password: string;
  confirmPassword: string;
};

const schema = z
  .object({
    password: z
      .string()
      .nonempty("パスワードは必須項目です。")
      .min(8, "最低８文字含めてください。")
      .max(32, "32文字以内にしてください。")
      .regex(/^[a-zA-Z0-9-]+$/, "使える文字は大文字と小文字、数字、-(ハイフン)だけです")
      .regex(/^(?=.*?[a-z])(?=.*?\d).+$/, "小文字と数字を必ず含んでください"),
    confirmPassword: z
      .string()
      .nonempty("パスワードは必須項目です。")
      .min(8, "最低８文字含めてください。")
      .max(32, "32文字以内にしてください。")
      .regex(/^[a-zA-Z0-9-]+$/, "使える文字は大文字と小文字、数字、-(ハイフン)だけです")
      .regex(/^(?=.*?[a-z])(?=.*?\d).+$/, "小文字と数字を必ず含んでください"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "パスワードが一致しません",
      });
    }
  });

export const ActionResetPassword = ({ oobCode }: props) => {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const toast = useToast();
  const auth = getAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const email = await verifyPasswordResetCode(auth, oobCode);
      await confirmPasswordReset(auth, oobCode, data.confirmPassword);
      await signInWithEmailAndPassword(auth, email, data.confirmPassword)
      toast({
        title: "パスワードを再設定して、ログインしました。",
        status: "success",
        position: "top",
      });
      router.push("/top");
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast({
          title: "エラーが発生しました。通信環境の良いところでやり直してみてください。",
          status: "error",
          position: "top",
        });
        router.push("/top");
      }
    }
    setIsLoading(false);
  };

  return (
    <VStack spacing="4" width="90%" maxWidth="400px" pt="8" margin="0 auto">
      <chakra.form width="100%" onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!formState.errors.password}>
          <FormLabel htmlFor="email" color="white">
            パスワード
          </FormLabel>
          <Input id="password" type="password" {...register("password")} color="white" />
          <FormErrorMessage>{formState.errors.password?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!formState.errors.confirmPassword}>
          <FormLabel htmlFor="password" color="white">
            パスワードの確認
          </FormLabel>
          <Input id="confirmPassword" type="password" {...register("confirmPassword")} color="white" />
          <FormErrorMessage>{formState.errors.confirmPassword?.message}</FormErrorMessage>
        </FormControl>
        <Button mt="4" colorScheme="blue" width="100%" isLoading={isLoading} type="submit">
          送信
        </Button>
      </chakra.form>
    </VStack>
  );
};
