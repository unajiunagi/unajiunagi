import { useToast } from "@chakra-ui/react";
import { ActionAuthEmail } from "components/firebaseActionLink/ActionAuthEmail";
// import { ActionCancel2Auth } from "components/firebaseActionLink/ActionCancel2Auth";
// import { ActionCancelChangeEmail } from "components/firebaseActionLink/ActionCancelChangeEmail";
import { ActionResetPassword } from "components/firebaseActionLink/ActionResetPassword";
import { FirebaseError } from "firebase/app";
import { checkActionCode, getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function () {
  let component = null;
  const auth = getAuth();
  const router = useRouter();
  const toast = useToast();
  const { oobCode, mode, apiKey, lang } = router.query;

  useEffect(() => {
    console.log(oobCode, mode, apiKey, lang);

    const oobCodeAuth = async () => {
      try {
        await checkActionCode(auth, oobCode as string);
        console.log('checkActionCode');

        switch (mode) {
          case "verifyEmail":
            component = <ActionAuthEmail oobCode={oobCode as string} />;
          case "resetPassword":
            console.log('resetPassword');

            component = <ActionResetPassword oobCode={oobCode as string} />;
          case "revertSecondFactorAddition":
            router.push(`https://unajiunagi-d46ff.firebaseapp.com/__/auth/action?mode=${mode}&oobCode=${oobCode}&apiKey=${apiKey}&lang=${lang}`);
          // return <ActionCancel2Auth />;
          case "verifyAndChangeEmail":
            router.push(`https://unajiunagi-d46ff.firebaseapp.com/__/auth/action?mode=${mode}&oobCode=${oobCode}&apiKey=${apiKey}&lang=${lang}`);
          // return <ActionCancelChangeEmail oobCode={oobCode as string} />;
          default:
            break;
        }
      } catch (error) {
        if (error instanceof FirebaseError) {
          console.log(error);

          if (error.code === "auth/expired-action-code") {
            toast({
              title: "URLが有効期限切れです。メールを再送信して有効期限のうちにやり直してください。",
              status: "error",
              position: "top",
            });
            router.push("/top");
          } else if (error.code === "auth/invalid-action-code" || "auth/internal-error") {
            toast({
              title: "無効なアクションコードです。",
              status: "error",
              position: "top",
            });
            router.push("/top");
          } else {
            toast({
              title: "エラーが発生しました。通信環境の良いところでやり直してみてください。",
              status: "error",
              position: "top",
            });
            router.push("/top");
          }
        }
      }
    };

    oobCodeAuth();
  }, []);

  return component;
}
