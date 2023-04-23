import { Button, Text, useToast } from "@chakra-ui/react";
import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

type Props = {};

export const GoogleAuthButton = ({}: Props) => {
  const toast = useToast();
  const auth = getAuth();
  const googleAuth = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
      toast({
        title: "ログインしました。",
        status: "success",
        position: "top",
      });
    } catch (error) {
      toast({
        title: "エラーが発生しました。通信環境の良いところでやり直してみてください。",
        status: "error",
        position: "top",
      });
    }
  };

  return (
    <>
      <Button leftIcon={<FcGoogle size={24} />} bgColor="white" variant="outline" width="100%" onClick={googleAuth}>
        Googleでログイン
      </Button>
      <Text fontSize='sm'>※firebaseの不具合のためsafariではgoogleログインは使えません。</Text>
    </>
  );
};
