import { Spinner, VStack, useToast } from "@chakra-ui/react";
import { useAuthContext } from "components/provider/AuthProvider";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const AuthGuardProvider = ({ children }: Props) => {
  const { user } = useAuthContext();
  const toast = useToast();
  const router = useRouter();

  if (typeof user === "undefined") {
    return (
      <VStack spacing="4" width="90%" maxWidth="400px" pt="8" margin="0 auto">
        <Spinner color="white" size="xl" />
      </VStack>
    );
  }

  if (user === null) {
    toast({
      title: "ログインしてください。",
      status: "warning",
      position: "top",
    });
    router.replace("/login");
    return null;
  }

  return <>{children}</>;
};
