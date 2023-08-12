import { Link } from "@chakra-ui/next-js";
import { Button, Divider, Text, VStack, chakra, useToast } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthError } from "@supabase/gotrue-js";
import { GoogleAuthButton } from "components/auth/GoogleAuthButton";
import { EmailForm } from "components/forms/EmailForm";
import { PassForm } from "components/forms/PassForm";
import supabase from "lib/supabase";
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
    .min(8, "最低8文字含めてください。")
    .max(32, "32文字以内にしてください。")
    .regex(/^[a-zA-Z0-9-]+$/, "使える文字は大文字と小文字、数字、-(ハイフン)だけです")
    .regex(/^(?=.*?[a-z])(?=.*?\d).+$/, "小文字と数字を必ず含んでください"),
});

export default function () {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const errorToast = useToast({ status: "error" });
  const sucessToast = useToast({ status: "success" });
  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            creater_mode: false,
          },
        },
      });
      if (error) throw error;
      // 登録されているメールアドレスの場合、空の配列が返ってくる。
      const identities = authData.user?.identities;
      if (identities?.length === 0) {
        errorToast({ title: "このメールアドレスは既に使用されています。" });
        return;
      }
      sucessToast({ title: "入力したメールアドレスに認証メールを送信しました。メールアドレスを認証してください。" });
      reset();
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
    <VStack spacing="4" width="90%" maxWidth="400px" pt="16" margin="0 auto">
      <GoogleAuthButton />
      <Divider />
      <chakra.form width="100%" onSubmit={handleSubmit(onSubmit)}>
        <EmailForm formError={formState.errors.email} register={register} id="email" label="メールアドレス" />
        <PassForm formError={formState.errors.password} register={register} id="password" label="パスワード" helperText="必ず小文字と数字を含む8文字以上のパスワードを設定してください" />
        <Button mt="4" colorScheme="blue" width="100%" isLoading={isLoading} type="submit">
          アカウントを作成
        </Button>
      </chakra.form>
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
        <Link href="/auth/signin" color="blue.400">
          サインイン
        </Link>
        してください。
      </Text>
    </VStack>
  );
}
