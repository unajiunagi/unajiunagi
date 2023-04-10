import { Heading, Stack, useBreakpointValue } from "@chakra-ui/react";
import { DesktopCreaterPage } from "components/creater/DesktopCreaterPage";
import { MobileCreaterPage } from "components/creater/MobileCreaterPage";
import { AuthGuardProvider } from "components/provider/AuthGuardProvider";
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
        <Stack spacing={4} width="90%" margin="auto" pt={4} pb={6}>
          <Heading fontSize="4xl">マイページ</Heading>
          {isMobile ? <MobileCreaterPage /> : <DesktopCreaterPage />}
        </Stack>
      </EmailAuthGuardProvider>
    </AuthGuardProvider>
  );
}
