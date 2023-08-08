import { useToast } from "@chakra-ui/react";
import { Loading } from "components/common/Loading";
import { FirebaseError } from "firebase/app";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

type props = {
  children: ReactNode;
};

export const EmailAuthGuardProvider = ({ children }: props) => {
  const auth = getAuth();
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const verify = async () => {
      try {
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
      } finally {
        router.replace("/signup");
      }
    };

    if (auth.currentUser?.emailVerified === false) {
      verify();
    }
  }, []);

  if (auth.currentUser?.emailVerified === false) {
    return <Loading />;
  }

  return <>{children}</>;
};
