import { ChangePassword } from "components/mypage/ChangePassword";
import { MypageBody } from "components/mypage/MypageBody";

export default function () {
  return (
    <>
      <MypageBody title="メールアドレスの確認･変更">
        <ChangePassword />
      </MypageBody>
    </>
  );
}
