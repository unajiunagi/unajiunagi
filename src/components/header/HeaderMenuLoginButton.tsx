import { Button, MenuItem, useToast } from "@chakra-ui/react";
import { HeaderMenuItem } from "components/header/HeaderMenuItem";
import { useAuthContext } from "components/provider/AuthProvider";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {};

export const HeaderMenuLoginButton = ({}: Props) => {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const { push } = useRouter();

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const auth = getAuth();
      await signOut(auth);
      toast({
        title: "ログアウトしました。",
        status: "success",
        position: "top",
      });
      push("/");
    } catch (e) {
      toast({
        title: "エラーが発生しました。通信環境の良いところでやり直してみてください。",
        status: "error",
        position: "top",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    return (
      <MenuItem as={Button} bgColor="black" _hover={{ bg: "none" }} color="white">
        <Button bgColor="black" _hover={{ bg: "none" }} color="white" onClick={handleSignOut} isLoading={isLoading}>
          ログアウト
        </Button>
      </MenuItem>
    );
  } else {
    return (
      <>
        <HeaderMenuItem href="/login">ログイン</HeaderMenuItem>
        <HeaderMenuItem href="/signup">アカウント作成</HeaderMenuItem>
      </>
    );
  }
};
