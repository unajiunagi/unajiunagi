import { Stack } from "@chakra-ui/react";
import { BreadcrumbPageBody } from "components/common/BreadcrumbPageBody";
import { CreatorpageMenuProvider } from "components/creator/CreatorpageProvider";
import { UploadVideo } from "components/creator/UploadVideo";
import { useAuthGuard } from "hooks/useAuthGuard";
import { useCreatorModeGuard } from "hooks/useCreatorModeGuard";
import { useIsMobile } from "hooks/useIsMobile";

export default function () {
  const isMobile = useIsMobile();
  useAuthGuard();
  useCreatorModeGuard();

  return (
    <>
      {isMobile ? (
        <Stack spacing={4} width="90%" margin="auto" pt={4} pb={6}>
          <BreadcrumbPageBody title="作品のアップロード" type="creator" typeText="クリエイターページ">
            <UploadVideo />
          </BreadcrumbPageBody>
        </Stack>
      ) : (
        <CreatorpageMenuProvider>
          <UploadVideo />
        </CreatorpageMenuProvider>
      )}
    </>
  );
}
