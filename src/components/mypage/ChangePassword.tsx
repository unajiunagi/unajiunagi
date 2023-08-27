import { Button, Stack, chakra } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthError } from "@supabase/supabase-js";
import { PassForm } from "components/forms/PassForm";
import { useToasts } from "hooks/useToasts";
import supabaseClient from "lib/supabase/supabaseClient";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {};

const schema = z
  .object({
    newPassword: z
      .string()
      .nonempty("パスワードは必須項目です。")
      .min(8, "最低８文字含めてください。")
      .max(32, "32文字以内にしてください。")
      .regex(/^[a-zA-Z0-9-]+$/, "使える文字は大文字と小文字、数字、-(ハイフン)だけです")
      .regex(/^(?=.*?[a-z])(?=.*?\d).+$/, "小文字と数字を必ず含んでください"),
    newPasswordConf: z
      .string()
      .nonempty("パスワードは必須項目です。")
      .min(8, "最低８文字含めてください。")
      .max(32, "32文字以内にしてください。")
      .regex(/^[a-zA-Z0-9-]+$/, "使える文字は大文字と小文字、数字、-(ハイフン)だけです")
      .regex(/^(?=.*?[a-z])(?=.*?\d).+$/, "小文字と数字を必ず含んでください"),
  })
  .superRefine(({ newPassword, newPasswordConf }, ctx) => {
    if (newPassword !== newPasswordConf) {
      ctx.addIssue({
        path: ["newPasswordConf"],
        code: "custom",
        message: "パスワードが一致しません",
      });
    }
  });

type FormData = z.infer<typeof schema>;

export const ChangePassword = ({}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { successToast, errorToast } = useToasts();

  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabaseClient.auth.updateUser({ password: data.newPassword });
      if (error) throw error;
      successToast({ title: "パスワードを変更しました。" });
    } catch (error) {
      if (!(error instanceof AuthError)) return;
      errorToast({ title: "エラーが発生しました。通信環境の良いところでやり直してみてください。" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack width="100%">
      <chakra.form width="100%" onSubmit={handleSubmit(onSubmit)}>
        <PassForm formError={formState.errors.newPassword} register={register} id="newPassword" label="新しいパスワード" />
        <PassForm formError={formState.errors.newPasswordConf} register={register} id="newPasswordConf" label="新しいパスワードの確認" helperText="確認のため新しいパスワードをもう一度入力してください。" />
        <Button mt="4" colorScheme="blue" width="100%" isLoading={isLoading} type="submit">
          パスワードを変更
        </Button>
      </chakra.form>
    </Stack>
  );
};
