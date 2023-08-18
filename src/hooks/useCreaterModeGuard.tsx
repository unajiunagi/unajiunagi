import { useToast } from "@chakra-ui/react";
import { useCreaterMode } from "hooks/useCreaterMode";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useCreaterModeGuard = () => {
  const createrMode = useCreaterMode();
  const { replace } = useRouter();
  const infoToast = useToast({ status: "info" });

  useEffect(() => {
    // 確認中、またはtrueならreturn
    if (createrMode === undefined || createrMode) {
      return;
      // falseならリダイレクト
    } else {
      replace("/mypage");
      infoToast({ title: "アカウントがクリエイターモードである必要があります。" });
    }
  }, [createrMode]);
};
