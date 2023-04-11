import { BreadcrumbPageBody } from "components/common/BreadcrumbPageBody";
import { ChangeEmail } from "components/mypage/ChangeEmail";

export default function () {
  return (
    <BreadcrumbPageBody title="メールアドレスの確認･変更" type="mypage" typeText="マイページ">
      <ChangeEmail />
    </BreadcrumbPageBody>
  );
}
