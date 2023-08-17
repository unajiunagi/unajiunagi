import { Button, MenuItem, useToast } from "@chakra-ui/react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { HeaderMenuItem } from "components/header/HeaderMenuItem";
import { useAuthContext } from "components/provider/AuthProvider";
import { useRouter } from "next/router";
import { useState } from "react";
import { Database } from "../../../schema";

type Props = {};

export const HeaderMenuSigninButton = ({}: Props) => {
  const supabaseClient = createPagesBrowserClient<Database>();
  const user = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const errorToast = useToast({ status: "error" });
  const sucessToast = useToast({ status: "success" });
  const { push } = useRouter();

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) throw error;
      sucessToast({ title: "サインアウトしました。" });
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
