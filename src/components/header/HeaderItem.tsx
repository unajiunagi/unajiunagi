import { Link } from "@chakra-ui/next-js";
import { Box, BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href: string;
};

export const HeaderItem = ({ href, children, ...props }: Props & BoxProps) => {
  return (
    <Box p="2" {...props}>
      <Link href={href} variant="ghost" color="white" fontSize={24} _hover={{ bg: "none" }}>
        {children}
      </Link>
    </Box>
  );
};
