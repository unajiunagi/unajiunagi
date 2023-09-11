import { Button, FormLabel, Input, Stack, chakra } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@supabase/auth-helpers-react";
import { AuthError } from "@supabase/supabase-js";
import { EmailForm } from "components/forms/EmailForm";
import { useToasts } from "hooks/useToasts";
import supabaseClient from "lib/supabase/supabaseClient";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  email: z.string().nonempty("メールアドレスを入力してください。").email("正しいメールアドレスを入力してください。"),
});

type FormData = z.infer<typeof schema>;

export const ChangeEmail = () => {
  const user = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { successToast, errorToast } = useToasts();

  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabaseClient.auth.updateUser({ email: data.email });
      if (error) throw error;
      successToast({ title: "新しいメールアドレスに「メールアドレス変更の確認」のメールを送信しました。" });
    } catch (error) {
      if (!(error instanceof AuthError)) return;

      if (error.message === "A user with this email address has already been registered") {
        errorToast({ title: "このメールアドレスは既に使用されています。" });
      } else if (error.message === "Email rate limit exceeded") {
        errorToast({ title: "メールリクエストの数が制限を超えています。時間をおいてからやり直してください。" });
      } else {
        errorToast({ title: "エラーが発生しました。通信環境の良いところでやり直してみてください。" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack width={"100%"}>
      <FormLabel htmlFor="old-email">現在のメールアドレス</FormLabel>
      <Input id="old-email" value={user?.email} />
      <chakra.form width="100%" onSubmit={handleSubmit(onSubmit)}>
        <EmailForm formError={formState.errors.email} register={register} id="email" label="新しいメールアドレス" placeholder="メールアドレスが設定されていません。" />
        <Button mt="4" colorScheme="facebook" width="100%" isLoading={isLoading} type="submit">
          メールアドレスを変更
        </Button>
      </chakra.form>
    </Stack>
  );
};
