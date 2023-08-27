import { Stack } from "@chakra-ui/react";
import { BreadcrumbPageBody } from "components/common/BreadcrumbPageBody";
import { UploadVideo } from "components/creator/UploadVideo";
import { useAuthGuard } from "hooks/useAuthGuard";
import { usecreatorModeGuard } from "hooks/usecreatorModeGuard";
import { useIsMobile } from "hooks/useIsMobile";

export default function () {
  const isMobile = useIsMobile();
  useAuthGuard();
  usecreatorModeGuard();

  return (
    <>
      {isMobile ? (
        <Stack spacing={4} width="90%" margin="auto" pt={4} pb={6}>
          <BreadcrumbPageBody title="作品のアップロード" type="creator" typeText="クリエイターページ">
            <UploadVideo />
          </BreadcrumbPageBody>
        </Stack>
      ) : (
        <creatorpageMenuProvider>
          <UploadVideo />
        </creatorpageMenuProvider>
      )}
    </>
  );
}
