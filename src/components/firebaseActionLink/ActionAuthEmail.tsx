import { Spinner, VStack, useToast } from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import { applyActionCode, getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

type props = {
  oobCode: string;
};

export const ActionAuthEmail = ({ oobCode }: props) => {
  const auth = getAuth();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const handleConfirmEmail = async () => {
      try {
        await applyActionCode(auth, oobCode);
        toast({
          title: "メールアドレスを認証しました。",
          status: "success",
          position: "top",
        });
        router.push("/top");
      } catch (error) {
        if (error instanceof FirebaseError) {
          toast({
            title: "エラーが発生しました。通信環境の良いところでやり直してみてください。",
            status: "error",
            position: "top",
          });
          router.push("/top");
        }
      }
    };

    handleConfirmEmail();
  }, []);

  return (
    <VStack spacing="4" width="90%" maxWidth="400px" pt="8" margin="0 auto">
      <Spinner color="white" size="xl" />
    </VStack>
  );
};
