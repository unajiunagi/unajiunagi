import { Image } from "@chakra-ui/next-js";
import { Avatar, Box, Button, Menu, MenuButton, MenuList, Spacer } from "@chakra-ui/react";
import { HeaderItem } from "components/header/HeaderItem";
import { HeaderMenuItem } from "components/header/HeaderMenuItem";
import { HeaderMenuSigninButton } from "components/header/HeaderMenuSigninButton";
import { useCreatorMode } from "hooks/useCreatorMode";
import { pagesPath } from "type/$path";

type Props = {};

export const DesktopHeader = ({ ...props }: Props) => {
  const creatorMode = useCreatorMode();

  return (
    <>
      <HeaderItem href={pagesPath.$url().pathname} pl="4">
        <Image src="/logo.svg" alt="ロゴ" height={20} width={32} />
      </HeaderItem>
      <HeaderItem href={pagesPath.mylist.$url().pathname}>マイリスト</HeaderItem>
      <HeaderItem href={pagesPath.myitem.$url().pathname}>マイアイテム</HeaderItem>
      <Spacer />
      <HeaderItem href={pagesPath.$url().pathname}>検索</HeaderItem>
      <Box p="2">
        <Menu>
          <MenuButton as={Button} bgColor="black" _hover={{ bg: "none" }} _expanded={{ bg: "none" }}>
            <Avatar />
          </MenuButton>
          <MenuList bgColor="black">
            <HeaderMenuItem href={pagesPath.mypage.$url().pathname}>アカウント設定</HeaderMenuItem>
            {creatorMode && <HeaderMenuItem href={pagesPath.creator.$url().pathname}>クリエイターページ</HeaderMenuItem>}
            <HeaderMenuSigninButton />
          </MenuList>
        </Menu>
      </Box>
    </>
  );
};
