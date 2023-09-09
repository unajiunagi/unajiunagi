import { Box, Button, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { HeaderMenuItem } from "components/header/HeaderMenuItem";
import { HeaderMenuSigninButton } from "components/header/HeaderMenuSigninButton";
import { useCreatorMode } from "hooks/useCreatorMode";

import { BsList } from "react-icons/bs";
import { pagesPath } from "type/$path";

type Props = {};

export const MobileHeaderBurgar = ({ ...props }: Props) => {
  const creatorMode = useCreatorMode();

  return (
    <>
      <Menu>
        <MenuButton width={100} as={Button} bgColor="black" _hover={{ bg: "none" }} _expanded={{ bg: "none" }}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <BsList size={30} color="white" />
          </Box>
        </MenuButton>
        <MenuList bgColor="black">
          <HeaderMenuItem href={pagesPath.mylist.$url().pathname}>マイリスト</HeaderMenuItem>
          <HeaderMenuItem href={pagesPath.myitem.$url().pathname}>マイアイテム</HeaderMenuItem>
          <HeaderMenuItem href={pagesPath.mypage.$url().pathname}>アカウント設定</HeaderMenuItem>
          {creatorMode && <HeaderMenuItem href={pagesPath.creator.$url().pathname}>クリエイターページ</HeaderMenuItem>}
          <HeaderMenuSigninButton />
        </MenuList>
      </Menu>
    </>
  );
};
