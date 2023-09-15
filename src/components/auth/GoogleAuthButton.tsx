import { Button } from '@chakra-ui/react';
import { AuthError } from '@supabase/supabase-js';
import { useToasts } from 'hooks/useToasts';
import supabaseClient from 'lib/supabase/supabaseClient';
import { FcGoogle } from 'react-icons/fc';

export const GoogleAuthButton = () => {
  const { successToast, errorToast } = useToasts();
  const googleAuth = async () => {
    try {
      const { error } =
        await supabaseClient.auth.signInWithOAuth({
          provider: 'google',
        });
      if (error) throw error;
      successToast({ title: 'サインインしました。' });
    } catch (error) {
      if (!(error instanceof AuthError)) return;

      errorToast({
        title:
          'エラーが発生しました。通信環境の良いところでやり直してみてください。',
      });
    }
  };

  return (
    <Button
      onClick={googleAuth}
      leftIcon={<FcGoogle size={24} />}
      colorScheme='blackAlpha'
      color='black'
      variant='outline'
      width='100%'
    >
      Googleでサインイン
    </Button>
  );
};
