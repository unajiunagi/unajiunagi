import { BreadcrumbPageBody } from "components/common/BreadcrumbPageBody";
import { UploadVideo } from "components/creater/UploadVideo";
import { AuthGuardProvider } from "components/provider/AuthGuardProvider";
import { CreaterModeGuardProvider } from "components/provider/CreaterModeGuardProvider";
import { EmailAuthGuardProvider } from "components/provider/EmailAuthGuardProvider";

export default function () {
  return (
    <>
      <AuthGuardProvider>
        <EmailAuthGuardProvider>
          <CreaterModeGuardProvider>
            <BreadcrumbPageBody title="作品のアップロード" type="creater" typeText="クリエイターページ">
              <UploadVideo />
            </BreadcrumbPageBody>
          </CreaterModeGuardProvider>
        </EmailAuthGuardProvider>
      </AuthGuardProvider>
    </>
  );
}
