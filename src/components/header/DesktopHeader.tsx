import { Box, Button, Image, Menu, MenuButton, MenuList, Spacer } from "@chakra-ui/react";
import { HeaderItem } from "components/header/HeaderItem";
import { HeaderMenuItem } from "components/header/HeaderMenuItem";
import { HeaderMenuLoginButton } from "components/header/HeaderMenuLoginButton";
import { BsPersonCircle } from "react-icons/bs";

type Props = {};

export const DesktopHeader = ({ ...props }: Props) => {
  return (
    <>
      <HeaderItem href="/">
        <Image src="/logo.png" alt="ロゴ" width="16" pl="4" />
      </HeaderItem>
      <HeaderItem href="/mylist">マイリスト</HeaderItem>
      <HeaderItem href="/myitem">マイアイテム</HeaderItem>
      <Spacer />
      <HeaderItem href="/">検索</HeaderItem>
      <Box p="2">
        <Menu>
          <MenuButton as={Button} bgColor="black" _hover={{ bg: "none" }} _expanded={{ bg: "none" }}>
            <BsPersonCircle size={50} color="white" />
          </MenuButton>
          <MenuList bgColor="black">
            <HeaderMenuItem href="/mypage">アカウント設定</HeaderMenuItem>
            <HeaderMenuLoginButton />
          </MenuList>
        </Menu>
      </Box>
    </>
  );
};
