import { Box, Button, Menu, MenuButton, MenuItem, MenuList, Spacer } from "@chakra-ui/react";
import { BsFillHouseFill, BsPersonCircle } from "react-icons/bs";

type Props = {};

export const DesktopHeader = ({ ...props }: Props) => {
  return (
    <>
      <Box p="2">
        <Button leftIcon={<BsFillHouseFill />} variant="ghost" color="white" _hover={{ bg: "gray.700" }}>
          ホーム
        </Button>
      </Box>
      <Box p="2">
        <Button variant="ghost" color="white" _hover={{ bg: "gray.700" }}>
          マイリスト
        </Button>
      </Box>
      <Box p="2">
        <Button variant="ghost" color="white" _hover={{ bg: "gray.700" }}>
          マイアイテム
        </Button>
      </Box>
      <Spacer />
      <Box p="2">
        <Button variant="ghost" color="white" _hover={{ bg: "gray.700" }}>
          Search
        </Button>
      </Box>
      <Box p="2">
        <Menu>
          <MenuButton as={Button} bgColor="black" _hover={{ bg: "gray.700" }} _expanded={{ bg: "gray.700" }}>
            <BsPersonCircle size={30} color="white" />
          </MenuButton>
          <MenuList bgColor="black">
            <MenuItem as={Button} bgColor="black" _hover={{ bg: "gray.700" }} color="white">
              アカウント設定
            </MenuItem>
            <MenuItem as={Button} bgColor="black" _hover={{ bg: "gray.700" }} color="white">
              ログイン
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </>
  );
};
