import { ChangeEmail } from "components/mypage/ChangeEmail";
import { MypageBody } from "components/mypage/MypageBody";

export default function () {
  return (
    <>
      <MypageBody title='メールアドレスの確認･変更'>
        <ChangeEmail />
      </MypageBody>
    </>
  );
}
