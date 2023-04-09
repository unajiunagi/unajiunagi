import { DeleteAccount } from "components/mypage/DeleteAccount";
import { MypageBody } from "components/mypage/MypageBody";

export default function () {
  return (
    <>
      <MypageBody title="メールアドレスの確認･変更">
        <DeleteAccount />
      </MypageBody>
    </>
  );
}
