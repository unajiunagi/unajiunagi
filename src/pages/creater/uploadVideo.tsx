import { Stack } from "@chakra-ui/react";
import { BreadcrumbPageBody } from "components/common/BreadcrumbPageBody";
import { CreaterpageMenuProvider } from "components/creater/CreaterpageProvider";
import { UploadVideo } from "components/creater/UploadVideo";
import { useAuthGuard } from "hooks/useAuthGuard";
import { useCreaterModeGuard } from "hooks/useCreaterModeGuard";
import { useIsMobile } from "hooks/useIsMobile";

export default function () {
  const isMobile = useIsMobile();
  useAuthGuard();
  useCreaterModeGuard();

  return (
    <>
      {isMobile ? (
        <Stack spacing={4} width="90%" margin="auto" pt={4} pb={6}>
          <BreadcrumbPageBody title="作品のアップロード" type="creater" typeText="クリエイターページ">
            <UploadVideo />
          </BreadcrumbPageBody>
        </Stack>
      ) : (
        <CreaterpageMenuProvider>
          <UploadVideo />
        </CreaterpageMenuProvider>
      )}
    </>
  );
}
