import { Box } from "@chakra-ui/react";
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
    return <Box color='white'>読み込み中...</Box>;
  }

  if (user === null) {
    router.push("/login");
    return null;
  }

  return <>{children}</>;
};
