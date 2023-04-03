import { Box, Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsFillHouseFill, BsList } from "react-icons/bs";

type Props = {};

export const MobileHeaderBurgar = ({ ...props }: Props) => {
  return (
    <>
      <Menu>
        <MenuButton width={50} as={Button} bgColor="black" _hover={{ bg: "gray.700" }} _expanded={{ bg: "gray.700" }}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <BsList size={40} color="white" />
          </Box>
        </MenuButton>
        <MenuList bgColor="black">
          <MenuItem as={Button} bgColor="black" _hover={{ bg: "gray.700" }} color="white" leftIcon={<BsFillHouseFill />}>
            ホーム
          </MenuItem>
          <MenuItem as={Button} bgColor="black" _hover={{ bg: "gray.700" }} color="white">
            マイリスト
          </MenuItem>
          <MenuItem as={Button} bgColor="black" _hover={{ bg: "gray.700" }} color="white">
            マイアイテム
          </MenuItem>
          <MenuItem as={Button} bgColor="black" _hover={{ bg: "gray.700" }} color="white">
            アカウント設定
          </MenuItem>
          <MenuItem as={Button} bgColor="black" _hover={{ bg: "gray.700" }} color="white">
            ログイン
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
