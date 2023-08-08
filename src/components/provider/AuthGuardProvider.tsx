import { Loading } from "components/common/Loading";
import { useAuthContext } from "components/provider/AuthProvider";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const AuthGuardProvider = ({ children }: Props) => {
  const { user } = useAuthContext();
  const router = useRouter();

  if (typeof user === "undefined") {
    return <Loading />;
  }

  if (user === null) {
    router.replace("/login");
    return <Loading/>
  }

  return <>{children}</>;
};
