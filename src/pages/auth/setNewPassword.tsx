import { Button, VStack, chakra } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthError } from '@supabase/supabase-js';
import { PassForm } from 'components/forms/PassForm';
import { useToasts } from 'hooks/useToasts';
import supabaseClient from 'lib/supabase/supabaseClient';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z
  .object({
    password: z
      .string()
      .nonempty('パスワードは必須項目です。')
      .min(8, '最低８文字含めてください。')
      .max(32, '32文字以内にしてください。')
      .regex(/^[a-zA-Z0-9-]+$/, '使える文字は大文字と小文字、数字、-(ハイフン)だけです')
      .regex(/^(?=.*?[a-z])(?=.*?\d).+$/, '小文字と数字を必ず含んでください'),
    passwordConf: z
      .string()
      .nonempty('パスワードは必須項目です。')
      .min(8, '最低８文字含めてください。')
      .max(32, '32文字以内にしてください。')
      .regex(/^[a-zA-Z0-9-]+$/, '使える文字は大文字と小文字、数字、-(ハイフン)だけです')
      .regex(/^(?=.*?[a-z])(?=.*?\d).+$/, '小文字と数字を必ず含んでください'),
  })
  .superRefine(({ password, passwordConf }, ctx) => {
    if (password !== passwordConf) {
      ctx.addIssue({
        path: ['passwordConf'],
        code: 'custom',
        message: 'パスワードが一致しません',
      });
    }
  });

type FormData = z.infer<typeof schema>;

export default () => {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { successToast, errorToast } = useToasts();
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabaseClient.auth.updateUser({
        password: data.password,
      });
      if (error) throw error;
      successToast({ title: 'パスワードを再設定しました。' });
      replace('/');
    } catch (error) {
      if (!(error instanceof AuthError)) return;
      console.log(error.message);

      errorToast({ title: 'エラーが発生しました。通信環境の良いところでやり直してみてください。' });
      replace('/');
    }
    setIsLoading(false);
  };

  return (
    <VStack spacing='4' width='90%' maxWidth='400px' pt='8' margin='0 auto'>
      <chakra.form width='100%' onSubmit={handleSubmit(onSubmit)}>
        <PassForm formError={formState.errors.password} register={register} id='password' label='パスワード' />
        <PassForm formError={formState.errors.passwordConf} register={register} id='passwordConf' label='パスワードの確認' />
        <Button mt='4' colorScheme='facebook' width='100%' isLoading={isLoading} type='submit'>
          送信
        </Button>
      </chakra.form>
    </VStack>
  );
}
