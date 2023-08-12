import { Loading } from "components/common/Loading";
import { useCreaterMode } from "hooks/useCreaterMode";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useCreaterModeGuard = () => {
  const createrMode = useCreaterMode();
  const { replace } = useRouter();

  useEffect(() => {
    // 確認中、またはtrueならreturn
    if (createrMode === null || createrMode) {
      return;
      // falseならリダイレクト
    } else {
      replace("/auth/signin");
    }
  }, [createrMode]);

  if (createrMode === null) {
    return <Loading />;
  }
};
