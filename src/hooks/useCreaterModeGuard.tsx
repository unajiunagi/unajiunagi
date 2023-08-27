import { useToast } from "@chakra-ui/react";
import { usecreatorMode } from "hooks/usecreatorMode";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const usecreatorModeGuard = () => {
  const creatorMode = usecreatorMode();
  const { replace } = useRouter();
  const infoToast = useToast({ status: "info" });

  useEffect(() => {
    // 確認中、またはtrueならreturn
    if (creatorMode === undefined || creatorMode) {
      return;
      // falseならリダイレクト
    } else {
      replace("/mypage");
      infoToast({ title: "アカウントがクリエイターモードである必要があります。" });
    }
  }, [creatorMode]);
};
