import { useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const isMobileBreakpoint = useBreakpointValue({ base: true, lg: false }) as boolean;

  useEffect(() => {
    setIsMobile(isMobileBreakpoint);
  }, [isMobileBreakpoint]);

  return isMobile;
};
