import { BreadcrumbPageBody } from "components/common/BreadcrumbPageBody";
import { UploadVideo } from "components/creater/UploadVideo";

export default function () {
  return (
    <>
      <BreadcrumbPageBody title="作品のアップロード" type="creater" typeText="クリエイターページ">
        <UploadVideo />
      </BreadcrumbPageBody>
    </>
  );
}
