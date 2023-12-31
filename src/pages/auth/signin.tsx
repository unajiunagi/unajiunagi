import { Link } from '@chakra-ui/next-js';
import { Button, Divider, Text, VStack, chakra } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthError } from '@supabase/supabase-js';
import { GoogleAuthButton } from 'components/auth/GoogleAuthButton';
import { EmailForm } from 'components/forms/EmailForm';
import { PassForm } from 'components/forms/PassForm';
import { useToasts } from 'hooks/useToasts';
import supabaseClient from 'lib/supabase/supabaseClient';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { pagesPath } from 'type/$path';
import { z } from 'zod';

const schema = z.object({
  email: z.string().nonempty('メールアドレスを入力してください。').email('正しいメールアドレスを入力してください。'),
  password: z.string().nonempty('パスワードを入力してください。'),
});

type FormData = z.infer<typeof schema>;

export default () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { successToast, errorToast } = useToasts();
  const { push } = useRouter();
  const { register, handleSubmit, formState } = useForm<FormData>({ resolver: zodResolver(schema) });

  const sendEmail = async (data: FormData) => {
    try {
      const { error } = await supabaseClient.auth.signInWithOtp({
        email: data.email,
      });
      if (error) throw error;
      // 認証メール送信のエラーハンドリング
    } catch (error) {
      if (!(error instanceof AuthError)) return;

      if (error.message === 'Email rate limit exceeded') {
        errorToast({ title: 'メールリクエストの数が制限を超えています。時間をおいてからやり直してください。' });
      } else {
        errorToast({ title: '認証メールの送信に失敗しました。' });
      }
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabaseClient.auth.signInWithPassword({ email: data.email, password: data.password });
      if (error) throw error;
      successToast({ title: 'サインインしました。' });
      push('/');
    } catch (error) {
      if (!(error instanceof AuthError)) return;

      if (error.message === 'Email not confirmed') {
        errorToast({ title: 'メールアドレスがまだ認証されていません。登録されているアドレスにメールを送ったので認証してください。' });
        // 認証メールを送信
        sendEmail(data);
      } else if (error.message === 'Invalid login credentials') {
        errorToast({ title: 'メールアドレスまたはパスワードが間違っています。' });
      } else {
        errorToast({ title: 'エラーが発生しました。通信環境の良いところでやり直してみてください。' });
      }
    }
    setIsLoading(false);
  };

  return (
    <VStack spacing='4' width='90%' maxWidth='400px' pt='16' margin='0 auto'>
      <GoogleAuthButton />
      <Divider />
      <chakra.form width='100%' onSubmit={handleSubmit(onSubmit)}>
        <EmailForm formError={formState.errors.email} register={register} id='email' label='メールアドレス' />
        <PassForm formError={formState.errors.password} register={register} id='password' label='パスワード' />
        <Button mt='4' colorScheme='blue' width='100%' isLoading={isLoading} type='submit'>
          ログイン
        </Button>
      </chakra.form>
      <Text>
        パスワードを忘れた場合は
        <Link href={pagesPath.auth.resetPassword.$url()} color='blue.400'>
          こちら
        </Link>
      </Text>
      <Text>
        アカウントをお持ちでない場合は
        <Link href={pagesPath.auth.signup.$url()} color='blue.400'>
          新規登録
        </Link>
        してください。
      </Text>
    </VStack>
  );
};
