import { Spinner, VStack, useToast } from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import { applyActionCode, checkActionCode, getAuth } from "firebase/auth";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";

type props = {
  query: ParsedUrlQuery;
};

export default function ({ query }: props) {
  const auth = getAuth();
  const router = useRouter();
  const toast = useToast();
  const { oobCode } = query;

  useEffect(() => {
    const handleConfirmEmail = async () => {
      try {
        await checkActionCode(auth, oobCode as string);
        await applyActionCode(auth, oobCode as string);
        await auth.currentUser?.reload()
        toast({
          title: "メールアドレスを認証しました。",
          status: "success",
          position: "top",
        });
        router.replace("/top");
      } catch (error) {
        if (error instanceof FirebaseError) {
          toast({
            title: "エラーが発生しました。通信環境の良いところでやり直してみてください。",
            status: "error",
            position: "top",
          });
          router.replace("/top");
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
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;

  return {
    props: {
      query,
    },
  };
}
