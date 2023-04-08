import { Spacer } from "@chakra-ui/react";
import { MobileHeaderBurgar } from "components/header/MobileHeaderBurgar";
import { HeaderItem } from "./HeaderItem";
import { Image } from "@chakra-ui/next-js";

type Props = {};

export const MobileHeader = ({ ...props }: Props) => {
  return (
    <>
      <HeaderItem href="/top">
        <Image src="/logo.png" alt="ロゴ" height={12} width={12} pl="4" />
      </HeaderItem>
      <Spacer />
      <MobileHeaderBurgar />
    </>
  );
};
