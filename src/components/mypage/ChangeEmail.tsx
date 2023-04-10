import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, VStack, chakra, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FirebaseError } from "firebase/app";
import { EmailAuthProvider, getAuth, reauthenticateWithCredential, updateEmail } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import zod from "zod";

type Props = {};

type FormData = {
  newEmail: string;
  password: string;
};

const schema = zod.object({
  newEmail: zod.string().nonempty("メールアドレスを入力してください。").email("正しいメールアドレスを入力してください。"),
  password: zod.string().nonempty("パスワードを入力してください。"),
});

export const ChangeEmail = ({}: Props) => {
  const user = getAuth().currentUser;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      newEmail: `${user?.email ?? ""}`,
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("submit");
    setIsLoading(true);
    try {
      const credential = await EmailAuthProvider.credential(user?.email ?? "", data.password);
      user && (await reauthenticateWithCredential(user, credential));
      user && (await updateEmail(user, data.newEmail));
      toast({
        title: "メールアドレスを変更しました。",
        status: "success",
        position: "top",
      });
    } catch (error) {
      console.log(error);

      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          toast({
            title: "このメールアドレスは既に使用されています。",
            status: "error",
            position: "top",
          });
        } else if (error.code === "auth/too-many-requests") {
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
    <>
      <chakra.form width="100%" onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!formState.errors.newEmail}>
          <FormLabel htmlFor="email" color="white">
            メールアドレス
          </FormLabel>
          <Input id="email" type="email" placeholder="メールアドレスが設定されていません。" {...register("newEmail")} color="white" />
          <FormErrorMessage>{formState.errors.newEmail?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!formState.errors.password}>
          <FormLabel htmlFor="password" color="white">
            パスワード
          </FormLabel>
          <Input id="password" type="password" {...register("password")} color="white" />
          <FormHelperText>メールアドレスの変更にはパスワードに入力が必要です。</FormHelperText>
          <FormErrorMessage>{formState.errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button mt="4" colorScheme="blue" width="100%" isLoading={isLoading} type="submit">
          メールアドレスを変更
        </Button>
      </chakra.form>
    </>
  );
};
