import { HStack, useBreakpointValue } from "@chakra-ui/react";
import { DesktopHeader } from "components/header/DesktopHeader";
import { MobileHeader } from "components/header/MobileHeader";
import { CreaterModeProvider } from "components/provider/CreaterModeProvider";
import { useEffect, useState } from "react";

type Props = {};

export const Header = ({}: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  const isMobileBreakpoint = useBreakpointValue({ base: true, md: false }) as boolean;

  useEffect(() => {
    setIsMobile(isMobileBreakpoint);
  }, [isMobileBreakpoint]);

  return (
    // <CreaterModeProvider>
      <HStack as="header" bgColor="#000000" spacing={4}>
        {isMobile ? <MobileHeader /> : <DesktopHeader />}
      </HStack>
    // </CreaterModeProvider>
  );
};
