import { useAuthContext } from 'components/provider/AuthProvider';
import { useToasts } from 'hooks/useToasts';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useAuthGuard = () => {
  const user = useAuthContext();
  const { replace } = useRouter();
  const { infoToast } = useToasts();

  useEffect(() => {
    // サインイン確認中、またはサインインしている状態ならreturn
    if (user === undefined || user) return;
    // サインインしていないならリダイレクト
    replace('/auth/signin');
    infoToast({ title: 'サインインが必要です。' });
  }, [user]);
};
