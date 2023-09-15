import { useCreatorMode } from 'hooks/useCreatorMode';
import { useToasts } from 'hooks/useToasts';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useCreatorModeGuard = () => {
  const creatorMode = useCreatorMode();
  const { replace } = useRouter();
  const { infoToast } = useToasts();

  useEffect(() => {
    // 確認中、またはtrueならreturn
    if (creatorMode === undefined || creatorMode) return;
    // falseならリダイレクト
    replace('/mypage');
    infoToast({ title: 'アカウントがクリエイターモードである必要があります。' });
  }, [creatorMode]);
};
