import { Flex, Box, Spacer, Button, IconButton, useDisclosure, useBreakpointValue, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { BsList, BsFillHouseFill, BsPersonCircle } from "react-icons/bs";
import { MobileHeaderBurgar } from "components/header/MobileHeaderBurgar";

type Props = {};

export const MobileHeader = ({ ...props }: Props) => {
  return (
    <>
      <MobileHeaderBurgar />
      <Spacer />
    </>
  );
};
