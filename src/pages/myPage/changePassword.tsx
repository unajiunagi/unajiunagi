import { BreadcrumbPageBody } from "components/common/BreadcrumbPageBody";
import { ChangePassword } from "components/mypage/ChangePassword";

export default function () {
  return (
    <>
      <BreadcrumbPageBody title="パスワードの変更" type="mypage" typeText="マイページ">
        <ChangePassword />
      </BreadcrumbPageBody>
    </>
  );
}
