import { Avatar, HStack, Menu, MenuButton, MenuList, Spacer } from "@chakra-ui/react";
import { ChakraNextImage } from "components/feature/ChakraNextImage";
import { ChakraNextLink } from "components/feature/ChakraNextLink";
import { HeaderMenuAuthButton } from "components/header/HeaderMenuAuthButton";
import { HeaderMenuItem } from "components/header/HeaderMenuItem";
import { useCreatorMode } from "hooks/useCreatorMode";
import { useIsMobile } from "hooks/useIsMobile";
import { pagesPath, staticPath } from "type/$path";

export const Header = () => {
  const isMobile = useIsMobile();
  const creatorMode = useCreatorMode();

  return (
    <HStack as="header" bgColor={"black"} spacing={4}>
      <ChakraNextLink href={pagesPath.$url().pathname} my={isMobile ? 0 : -2} mr={4} ml={isMobile ? 2 : 4}>
        <ChakraNextImage src={staticPath.logo_svg} alt="ロゴ" height={isMobile ? 16 : 20} width={isMobile ? 20 : 28} />
      </ChakraNextLink>
      {isMobile ? (
        <>
          <Spacer />
        </>
      ) : (
        <>
          <ChakraNextLink href={pagesPath.mylist.$url().pathname} fontWeight={"black"} fontSize={24}>
            マイリスト
          </ChakraNextLink>
          <ChakraNextLink href={pagesPath.myitem.$url().pathname} fontWeight={"black"} fontSize={24}>
            マイアイテム
          </ChakraNextLink>
          <Spacer />
          <ChakraNextLink href={pagesPath.$url().pathname} fontWeight={"black"} fontSize={24}>
            検索
          </ChakraNextLink>
        </>
      )}

      <Menu>
        <MenuButton bgColor="black" _hover={{ bg: "none" }} mr={2}>
          <Avatar />
        </MenuButton>
        <MenuList bgColor="black">
          {isMobile && (
            <>
              <HeaderMenuItem href={pagesPath.mylist.$url().pathname}>マイリスト</HeaderMenuItem>
              <HeaderMenuItem href={pagesPath.myitem.$url().pathname}>マイアイテム</HeaderMenuItem>
            </>
          )}
          <HeaderMenuItem href={pagesPath.mypage.$url().pathname}>アカウント設定</HeaderMenuItem>
          {creatorMode && <HeaderMenuItem href={pagesPath.creator.$url().pathname}>クリエイターページ</HeaderMenuItem>}
          <HeaderMenuAuthButton />
        </MenuList>
      </Menu>
    </HStack>
  );
};
