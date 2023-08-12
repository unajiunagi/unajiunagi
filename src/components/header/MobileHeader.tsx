import { Image } from "@chakra-ui/next-js";
import { Spacer } from "@chakra-ui/react";
import { MobileHeaderBurgar } from "components/header/MobileHeaderBurgar";
import { HeaderItem } from "./HeaderItem";

type Props = {};

export const MobileHeader = ({ ...props }: Props) => {
  return (
    <>
      <HeaderItem href="/" p="0">
        <Image src="/logo.svg" alt="ロゴ" height={16} width={20} />
      </HeaderItem>
      <Spacer />
      <MobileHeaderBurgar />
    </>
  );
};
