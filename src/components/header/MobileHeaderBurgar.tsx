import { Box, Button, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { HeaderMenuItem } from "components/header/HeaderMenuItem";
import { HeaderMenuSigninButton } from "components/header/HeaderMenuSigninButton";
import { usecreatorMode } from "hooks/usecreatorMode";
import { BsList } from "react-icons/bs";

type Props = {};

export const MobileHeaderBurgar = ({ ...props }: Props) => {
  const creatorMode = usecreatorMode();

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
          <HeaderMenuItem href="/mypage">アカウント設定</HeaderMenuItem>
          {creatorMode && <HeaderMenuItem href="/creator">クリエイターページ</HeaderMenuItem>}
          <HeaderMenuSigninButton />
        </MenuList>
      </Menu>
    </>
  );
};
