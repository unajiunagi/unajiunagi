import { Link } from "@chakra-ui/next-js";
import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href: string;
};

export const HeaderItem = ({children, href}: Props) => {
  return (
    <Box p="2">
      <Link href={href} variant="ghost" color="white" fontSize={24} _hover={{ bg: "none" }}>
        {children}
      </Link>
    </Box>
  );
};
