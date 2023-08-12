import { Heading, Stack } from "@chakra-ui/react";
import { DesktopCreaterPage } from "components/creater/DesktopCreaterPage";
import { MobileCreaterPage } from "components/creater/MobileCreaterPage";
import { useAuthGuard } from "hooks/useAuthGuard";
import { useCreaterModeGuard } from "hooks/useCreaterModeGuard";
import { useIsMobile } from "hooks/useIsMobile";

export default function () {
  const isMobile = useIsMobile();
  useAuthGuard();
  useCreaterModeGuard();

  return (
    <Stack spacing={4} width="90%" margin="auto" pt={4} pb={6}>
      <Heading fontSize="4xl">クリエイターページ</Heading>
      {isMobile ? <MobileCreaterPage /> : <DesktopCreaterPage />}
    </Stack>
  );
}
