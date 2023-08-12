import { HStack } from "@chakra-ui/react";
import { DesktopHeader } from "components/header/DesktopHeader";
import { MobileHeader } from "components/header/MobileHeader";
import { useIsMobile } from "hooks/useIsMobile";

type Props = {};

export const Header = ({}: Props) => {
  const isMobile = useIsMobile();

  return (
    <HStack as="header" bgColor="#000000" spacing={4}>
      {isMobile ? <MobileHeader /> : <DesktopHeader />}
    </HStack>
  );
};
