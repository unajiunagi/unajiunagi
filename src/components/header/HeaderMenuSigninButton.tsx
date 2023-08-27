import { Button, MenuItem } from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";
import { HeaderMenuItem } from "components/header/HeaderMenuItem";
import { useToasts } from "hooks/useToasts";
import supabaseClient from "lib/supabase/supabaseClient";
import { useRouter } from "next/router";
import { useState } from "react";

type Props = {};

export const HeaderMenuSigninButton = ({}: Props) => {
  const user = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { successToast, errorToast } = useToasts();
  const { push } = useRouter();

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) throw error;
      successToast({ title: "サインアウトしました。" });
      push("/");
    } catch (e) {
      errorToast({ title: "エラーが発生しました。通信環境の良いところでやり直してみてください。" });
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    return (
      <MenuItem as={Button} bgColor="black" _hover={{ bg: "none" }} color="white">
        <Button bgColor="black" _hover={{ bg: "none" }} color="white" onClick={handleSignOut} isLoading={isLoading}>
          サインアウト
        </Button>
      </MenuItem>
    );
  } else {
    return (
      <>
        <HeaderMenuItem href="/auth/signin">サインイン</HeaderMenuItem>
        <HeaderMenuItem href="/auth/signup">アカウント作成</HeaderMenuItem>
      </>
    );
  }
};
