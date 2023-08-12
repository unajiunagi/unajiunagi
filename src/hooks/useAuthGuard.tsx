import { useToast } from "@chakra-ui/toast";
import { Loading } from "components/common/Loading";
import { useAuthContext } from "components/provider/AuthProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAuthGuard = () => {
  const user = useAuthContext();
  const { replace } = useRouter();
  const infoToast = useToast({ status: "info" });

  useEffect(() => {
    //サインイン確認中、またはサインインしている状態ならreturn
    if (user === null || user) {
      return;
      //サインインしていないならリダイレクト
    } else {
      replace("/auth/signin");
      infoToast({ title: "サインインが必要です。" });
    }
  }, [user]);

  if (user === null) {
    return <Loading />;
  }
};
