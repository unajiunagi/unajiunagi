import { Button, useToast } from "@chakra-ui/react";
import { AuthError } from "@supabase/supabase-js";
import { useToasts } from "hooks/useToasts";
import supabaseClient from "lib/supabase/supabaseClient";
import { FcGoogle } from "react-icons/fc";

type Props = {};

export const GoogleAuthButton = ({}: Props) => {
  const { sucessToast, errorToast } = useToasts();
  const googleAuth = async () => {
    try {
      const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) throw error;
      sucessToast({ title: "サインインしました。" });
    } catch (error) {
      if (!(error instanceof AuthError)) return;

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
