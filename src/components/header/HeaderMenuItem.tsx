import { Link } from "@chakra-ui/next-js";
import { Button, MenuItem } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode
  href: string;
};

export const HeaderMenuItem = ({children, href}: Props) => {
  return (
    <MenuItem as={Button} bgColor="black" _hover={{ bg: "none" }} color="white">
      <Link href={href} variant="ghost" _hover={{ bg: "none" }} color="white">
        {children}
      </Link>
    </MenuItem>
  );
};
