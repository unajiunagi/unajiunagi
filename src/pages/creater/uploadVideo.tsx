import { BreadcrumbPageBody } from "components/common/BreadcrumbPageBody";
import { UploadVideo } from "components/creater/UploadVideo";
import { useAuthGuard } from "hooks/useAuthGuard";
import { useCreaterModeGuard } from "hooks/useCreaterModeGuard";

export default function () {
  useAuthGuard();
  useCreaterModeGuard();

  return (
    <>
      <BreadcrumbPageBody title="作品のアップロード" type="creater" typeText="クリエイターページ">
        <UploadVideo />
      </BreadcrumbPageBody>
    </>
  );
}
