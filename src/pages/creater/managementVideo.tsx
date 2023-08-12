import { BreadcrumbPageBody } from "components/common/BreadcrumbPageBody";
import { ManagementVideo } from "components/creater/ManagementVideo";
import { useAuthGuard } from "hooks/useAuthGuard";
import { useCreaterModeGuard } from "hooks/useCreaterModeGuard";

export default function () {
  useAuthGuard();
  useCreaterModeGuard();

  return (
    <BreadcrumbPageBody title="作品の管理" type="creater" typeText="クリエイターページ">
      <ManagementVideo />
    </BreadcrumbPageBody>
  );
}
