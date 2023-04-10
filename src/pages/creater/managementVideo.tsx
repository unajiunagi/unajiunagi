import { BreadcrumbPageBody } from "components/common/BreadcrumbPageBody";
import { ManagementVideo } from "components/creater/ManagementVideo";

export default function () {
  return (
    <>
      <BreadcrumbPageBody title="作品の管理" type="creater" typeText="クリエイターページ">
        <ManagementVideo />
      </BreadcrumbPageBody>
    </>
  );
}
