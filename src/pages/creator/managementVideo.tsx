import { Stack } from "@chakra-ui/react";
import { BreadcrumbPageBody } from "components/common/BreadcrumbPageBody";
import { ManagementVideo } from "components/creator/ManagementVideo";
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
          <BreadcrumbPageBody title="作品の管理" type="creator" typeText="クリエイターページ">
            <ManagementVideo />
          </BreadcrumbPageBody>
        </Stack>
      ) : (
        <creatorpageMenuProvider>
          <ManagementVideo />
        </creatorpageMenuProvider>
      )}
    </>
  );
}
