import { BreadcrumbPageBody } from "components/common/BreadcrumbPageBody";
import { ManagementVideo } from "components/creater/ManagementVideo";
import { AuthGuardProvider } from "components/provider/AuthGuardProvider";
import { CreaterModeGuardProvider } from "components/provider/CreaterModeGuardProvider";
import { EmailAuthGuardProvider } from "components/provider/EmailAuthGuardProvider";

export default function () {
  return (
    <>
      <AuthGuardProvider>
        <EmailAuthGuardProvider>
          <CreaterModeGuardProvider>
            <BreadcrumbPageBody title="作品の管理" type="creater" typeText="クリエイターページ">
              <ManagementVideo />
            </BreadcrumbPageBody>
          </CreaterModeGuardProvider>
        </EmailAuthGuardProvider>
      </AuthGuardProvider>
    </>
  );
}
