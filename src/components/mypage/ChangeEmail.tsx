import { Button, FormLabel, Input, Stack, chakra, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { AuthError } from "@supabase/supabase-js";
import { EmailForm } from "components/forms/EmailForm";
import { useAuthContext } from "components/provider/AuthProvider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import zod from "zod";
import { Database } from "../../../schema";

type Props = {};

type FormData = {
  email: string;
};

const schema = zod.object({
  email: zod.string().nonempty("メールアドレスを入力してください。").email("正しいメールアドレスを入力してください。"),
});

export const ChangeEmail = ({}: Props) => {
  const supabaseClient = createPagesBrowserClient<Database>();
  const user = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const errorToast = useToast({ status: "error" });
  const sucessToast = useToast({ status: "success" });

  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabaseClient.auth.updateUser({ email: data.email });
      if (error) throw error;
      sucessToast({ title: "新しいメールアドレスに「メールアドレス変更の確認」のメールを送信しました。" });
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
      <FormLabel htmlFor="old-email" color="white">
        現在のメールアドレス
      </FormLabel>
      <Input id="old-email" value={user?.email} color="white" />
      <chakra.form width="100%" onSubmit={handleSubmit(onSubmit)}>
        <EmailForm formError={formState.errors.email} register={register} id="email" label="新しいメールアドレス" placeholder="メールアドレスが設定されていません。" />
        <Button mt="4" colorScheme="blue" width="100%" isLoading={isLoading} type="submit">
          メールアドレスを変更
        </Button>
      </chakra.form>
    </Stack>
  );
};
