import { Button, VStack, useToast } from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";

type props = {
  oobCode: string;
};

export const ActionCancelChangeEmail = ({ oobCode }: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const auth = getAuth();
  const router = useRouter();
  const toast = useToast();

  const handleCancelChangeEmail = async () => {
    setIsLoading(true);
    try {
      toast({
        title: "ログイン用メールアドレスの変更をキャンセルしました。",
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack spacing="4" width="90%" maxWidth="400px" pt="8" margin="0 auto">
      <Button mt="4" colorScheme="blue" width="100%" isLoading={isLoading} type="submit" onClick={handleCancelChangeEmail}>
        ログイン用メールアドレスの変更を元に戻す
      </Button>
    </VStack>
  );
};
