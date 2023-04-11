import { BreadcrumbPageBody } from "components/common/BreadcrumbPageBody";
import { DeleteAccount } from "components/mypage/DeleteAccount";

export default function () {
  return (
    <BreadcrumbPageBody title="退会" type="mypage" typeText="マイページ">
      <DeleteAccount />
    </BreadcrumbPageBody>
  );
}
