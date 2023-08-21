import { Button, VStack, chakra } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthError } from "@supabase/gotrue-js";
import { EmailForm } from "components/forms/EmailForm";
import { useToasts } from "hooks/useToasts";
import supabaseClient from "lib/supabase/supabaseClient";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { sucessToast, errorToast } = useToasts();
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const resetPassword = async (data: FormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabaseClient.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${process.env.NEXT_PUBLIC_END_POINT}/api/auth/callback`,
      });
      if (error) throw error;
      sucessToast({ title: "入力したメールアドレスにパスワードをリセットするリンクを送りました。" });
    } catch (error) {
      if (!(error instanceof AuthError)) return;

      if (error.message === "Email rate limit exceeded") {
        errorToast({ title: "メールリクエストの数が制限を超えています。時間をおいてからやり直してください。" });
      } else {
        errorToast({ title: "エラーが発生しました。通信環境の良いところでやり直してみてください。" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack spacing="4" width="90%" maxWidth="400px" pt="8" margin="0 auto">
      <chakra.form width="100%" onSubmit={handleSubmit(resetPassword)}>
        <EmailForm formError={formState.errors.email} register={register} id="email" label="Eメール" helperText="入力したメールアドレスにパスワードをリセットするリンクを送ります。" />
        <Button mt="4" colorScheme="blue" width="100%" isLoading={isLoading} type="submit">
          パスワードをリセット
        </Button>
      </chakra.form>
    </VStack>
  );
}
