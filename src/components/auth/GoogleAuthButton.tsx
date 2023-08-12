import { Button, useToast } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import supabase from "lib/supabase";
import { FcGoogle } from "react-icons/fc";

type Props = {};

export const GoogleAuthButton = ({}: Props) => {
  const errorToast = useToast({ status: "error" });
  const sucessToast = useToast({ status: "success" });
  const auth = getAuth();
  const googleAuth = async () => {
    // const provider = new GoogleAuthProvider();
    try {
      await supabase.auth.signInWithOAuth({
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
