import { Button, MenuItem } from '@chakra-ui/react';
import { useUser } from '@supabase/auth-helpers-react';
import { HeaderMenuItem } from 'components/header/HeaderMenuItem';
import { useToasts } from 'hooks/useToasts';
import supabaseClient from 'lib/supabase/supabaseClient';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { pagesPath } from 'type/$path';

export const HeaderMenuAuthButton = () => {
  const user = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { successToast, errorToast } = useToasts();
  const { push } = useRouter();

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) throw error;
      successToast({ title: 'サインアウトしました。' });
      push('/');
    } catch (e) {
      errorToast({ title: 'エラーが発生しました。通信環境の良いところでやり直してみてください。' });
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    return (
      <MenuItem bgColor='black'>
        <Button onClick={handleSignOut} isLoading={isLoading} _hover={{ bg: 'none' }} height='100%' mx='auto' bgColor='black' fontWeight='normal'>
          サインアウト
        </Button>
      </MenuItem>
    );
  }
  return (
    <>
      <HeaderMenuItem href={pagesPath.auth.signin.$url().pathname}>サインイン</HeaderMenuItem>
      <HeaderMenuItem href={pagesPath.auth.signup.$url().pathname}>アカウント作成</HeaderMenuItem>
    </>
  );
};
