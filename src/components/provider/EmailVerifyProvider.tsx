import { useToast } from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/router";
import { ReactNode } from "react";

type props = {
  children: ReactNode;
};

export const EmailVerifyProvider = ({ children }: props) => {
  const auth = getAuth();
  const router = useRouter();
  const toast = useToast();

  const verify = async () => {
    if (router.pathname !== "/firebaseAction" || "/signup" || '/login' || '/resetPassword' || '/commercialTransaction' || '/privacy' || '/termsOfService') {
      try {
        router.push("/signup");
        await sendEmailVerification(auth.currentUser!);
        toast({
          title: "メールアドレスが認証されていません。認証メールを送信したので、メールアドレスを認証してください。",
          status: "error",
          position: "top",
        });
      } catch (error) {
        if (error instanceof FirebaseError) {
          if (error.code === "auth/too-many-requests") {
            toast({
              title: "メールアドレスが認証されていません。既に認証メールを送信したので、メールアドレスを認証してください。",
              status: "error",
              position: "top",
            });
          } else {
            toast({
              title: "エラーが発生しました。通信環境の良いところでやり直してみてください。",
              status: "error",
              position: "top",
            });
          }
        }
      }
    }
  };

  if (auth.currentUser?.emailVerified === false) {
    verify();
    return null;
  }

  return <>{children}</>;
};
