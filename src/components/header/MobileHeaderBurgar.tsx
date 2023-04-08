import { Box, Button, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { HeaderMenuItem } from "components/header/HeaderMenuItem";
import { HeaderMenuLoginButton } from "components/header/HeaderMenuLoginButton";
import { useAuthContext } from "components/provider/AuthProvider";
import { BsList } from "react-icons/bs";

type Props = {};

export const MobileHeaderBurgar = ({ ...props }: Props) => {

  return (
    <>
      <Menu>
        <MenuButton width={100} as={Button} bgColor="black" _hover={{ bg: "none" }} _expanded={{ bg: "none" }}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <BsList size={30} color="white" />
          </Box>
        </MenuButton>
        <MenuList bgColor="black">
          <HeaderMenuItem href="/mylist">マイリスト</HeaderMenuItem>
          <HeaderMenuItem href="/myitem">マイアイテム</HeaderMenuItem>
          <HeaderMenuItem href="/mypage">マイページ</HeaderMenuItem>
          <HeaderMenuLoginButton />
        </MenuList>
      </Menu>
    </>
  );
};
