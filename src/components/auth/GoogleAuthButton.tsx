import { Button, useToast } from "@chakra-ui/react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { FcGoogle } from "react-icons/fc";
import { Database } from "../../../schema";

type Props = {};

export const GoogleAuthButton = ({}: Props) => {
  const supabaseClient = createPagesBrowserClient<Database>();
  const errorToast = useToast({ status: "error" });
  const sucessToast = useToast({ status: "success" });
  const googleAuth = async () => {
    // const provider = new GoogleAuthProvider();
    try {
      await supabaseClient.auth.signInWithOAuth({
        provider: "google",
      });
      sucessToast({ title: "ログインしました。" });
    } catch (error) {
      errorToast({ title: "エラーが発生しました。通信環境の良いところでやり直してみてください。" });
    }
  };

  return (
    <>
      <Button leftIcon={<FcGoogle size={24} />} bgColor="white" variant="outline" width="100%" onClick={googleAuth}>
        Googleでサインイン
      </Button>
    </>
  );
};
