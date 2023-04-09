import { Spinner, VStack, useToast } from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import { checkActionCode, getAuth } from "firebase/auth";
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
  const { oobCode, mode, apiKey, lang } = query;

  useEffect(() => {
    const oobCodeAuth = async () => {
      try {
        await checkActionCode(auth, oobCode as string);
        console.log('checkedActionCode');
        console.log(mode);
        console.log(oobCode);
        switch (mode) {
          case "verifyEmail":
            router.replace(`/auth/authEmail?oobCode=${oobCode}`);
            break;
          case "resetPassword":
            router.replace(`/auth/resetPasswordAction?oobCode=${oobCode}`);
            break;
          case "revertSecondFactorAddition":
            router.replace(`https://unajiunagi-d46ff.firebaseapp.com/__/auth/action?mode=${mode}&oobCode=${oobCode}&apiKey=${apiKey}&lang=${lang}`);
            break;
          case "recoverEmail":
            router.replace(`https://unajiunagi-d46ff.firebaseapp.com/__/auth/action?mode=${mode}&oobCode=${oobCode}&apiKey=${apiKey}&lang=${lang}`);
            break;
          case "verifyAndChangeEmail":
            router.replace(`https://unajiunagi-d46ff.firebaseapp.com/__/auth/action?mode=${mode}&oobCode=${oobCode}&apiKey=${apiKey}&lang=${lang}`);
            break;
          case "verifyBeforeChangeEmail":
            router.replace(`https://unajiunagi-d46ff.firebaseapp.com/__/auth/action?mode=${mode}&oobCode=${oobCode}&apiKey=${apiKey}&lang=${lang}`);
            break;
          default:
            toast({
              title: "無効なアクションコードです。",
              status: "error",
              position: "top",
            });
            router.replace("/top");
            break;
        }
      } catch (error) {
        if (error instanceof FirebaseError) {
          if (error.code === "auth/expired-action-code") {
            toast({
              title: "URLが有効期限切れです。メールを再送信して有効期限のうちにやり直してください。",
              status: "error",
              position: "top",
            });
            router.replace("/top");
          } else if (error.code === "auth/invalid-action-code" || "auth/internal-error") {
            toast({
              title: "無効なアクションコードです。",
              status: "error",
              position: "top",
            });
            router.replace("/top");
          } else {
            toast({
              title: "エラーが発生しました。通信環境の良いところでやり直してみてください。",
              status: "error",
              position: "top",
            });
            router.replace("/top");
          }
        }
      }
    };

    oobCodeAuth();
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
