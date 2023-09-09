import { Image } from "@chakra-ui/next-js";
import { Spacer } from "@chakra-ui/react";
import { HeaderItem } from "components/header/HeaderItem";
import { MobileHeaderBurgar } from "components/header/MobileHeaderBurgar";
import { pagesPath } from "type/$path";

type Props = {};

export const MobileHeader = ({ ...props }: Props) => {
  return (
    <>
      <HeaderItem href={pagesPath.$url().pathname} pl={2}>
        <Image src="/logo.svg" alt="ロゴ" height={16} width={20} />
      </HeaderItem>
      <Spacer />
      <MobileHeaderBurgar />
    </>
  );
};
