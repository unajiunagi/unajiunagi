import { useToast } from "@chakra-ui/toast";
import { useAuthContext } from "components/provider/AuthProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAuthGuard = () => {
  const user = useAuthContext();
  const { replace } = useRouter();
  const infoToast = useToast({ status: "info" });

  useEffect(() => {
    //サインイン確認中、またはサインインしている状態ならreturn
    if (user === undefined || user) {
      return;
      //サインインしていないならリダイレクト
    } else {
      replace("/auth/signin");
      infoToast({ title: "サインインが必要です。" });
    }
  }, [user]);
};
