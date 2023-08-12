import { Image } from "@chakra-ui/next-js";
import { Avatar, Box, Button, Menu, MenuButton, MenuList, Spacer } from "@chakra-ui/react";
import { HeaderItem } from "components/header/HeaderItem";
import { HeaderMenuItem } from "components/header/HeaderMenuItem";
import { HeaderMenuSigninButton } from "components/header/HeaderMenuSigninButton";
import { useCreaterMode } from "hooks/useCreaterMode";

type Props = {};

export const DesktopHeader = ({ ...props }: Props) => {
  const createrMode = useCreaterMode();

  return (
    <>
      <HeaderItem href="/" p="0">
        <Image src="/logo.svg" alt="ロゴ" height={20} width={36} pl="4" />
      </HeaderItem>
      <HeaderItem href="/mylist">マイリスト</HeaderItem>
      <HeaderItem href="/myitem">マイアイテム</HeaderItem>
      <Spacer />
      <HeaderItem href="/">検索</HeaderItem>
      <Box p="2">
        <Menu>
          <MenuButton as={Button} bgColor="black" _hover={{ bg: "none" }} _expanded={{ bg: "none" }}>
            <Avatar />
          </MenuButton>
          <MenuList bgColor="black">
            <HeaderMenuItem href="/mypage">アカウント設定</HeaderMenuItem>
            {createrMode && <HeaderMenuItem href="/creater">クリエイターページ</HeaderMenuItem>}
            <HeaderMenuSigninButton />
          </MenuList>
        </Menu>
      </Box>
    </>
  );
};
