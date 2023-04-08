import { Button } from "@chakra-ui/react";
import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

type Props = {};

export const GoogleAuthButton = ({}: Props) => {
  const auth = getAuth();
  const googleAuth = async () => {
    const provider = new GoogleAuthProvider();
    try {
await signInWithRedirect(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button leftIcon={<FcGoogle size={24} />} bgColor="white" variant="outline" width="100%" onClick={googleAuth}>
        Googleでログイン
      </Button>
    </>
  );
};
