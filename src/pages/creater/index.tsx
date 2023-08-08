import { Heading, Stack, useBreakpointValue } from "@chakra-ui/react";
import { DesktopCreaterPage } from "components/creater/DesktopCreaterPage";
import { MobileCreaterPage } from "components/creater/MobileCreaterPage";
import { AuthGuardProvider } from "components/provider/AuthGuardProvider";
import { CreaterModeGuardProvider } from "components/provider/CreaterModeGuardProvider";
import { EmailAuthGuardProvider } from "components/provider/EmailAuthGuardProvider";
import { useEffect, useState } from "react";

export default function () {
  const [isMobile, setIsMobile] = useState(false);

  const isMobileBreakpoint = useBreakpointValue({ base: true, lg: false }) as boolean;

  useEffect(() => {
    setIsMobile(isMobileBreakpoint);
  }, [isMobileBreakpoint]);

  return (
    <AuthGuardProvider>
      <EmailAuthGuardProvider>
        <CreaterModeGuardProvider>
          <Stack spacing={4} width="90%" margin="auto" pt={4} pb={6}>
            <Heading fontSize="4xl">クリエイターページ</Heading>
            {isMobile ? <MobileCreaterPage /> : <DesktopCreaterPage />}
          </Stack>
        </CreaterModeGuardProvider>
      </EmailAuthGuardProvider>
    </AuthGuardProvider>
  );
}
