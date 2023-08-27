import { Stack } from "@chakra-ui/react";
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
          <creatorpageMenu />
        </Stack>
      ) : (
        <creatorpageMenuProvider>
          <ManagementVideo />
        </creatorpageMenuProvider>
      )}
    </>
  );
}
