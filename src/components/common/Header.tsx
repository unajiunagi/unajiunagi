import { useEffect, useState } from "react";
import { Flex, useBreakpointValue } from "@chakra-ui/react";
import { MobileHeader } from "components/header/MobileHeader";
import { DesktopHeader } from "components/header/DesktopHeader";

type Props = {};

export const Header = ({}: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  const isMobileBreakpoint = useBreakpointValue({ base: true, md: false }) as boolean;

  useEffect(() => {
    setIsMobile(isMobileBreakpoint);
  }, [isMobileBreakpoint]);

  return (
    <Flex bgColor="#000000" p={4}>
      {isMobile && <MobileHeader />}
      {!isMobile && <DesktopHeader />}
    </Flex>
  );
};
