import { Spacer } from "@chakra-ui/react";
import { MobileHeaderBurgar } from "components/header/MobileHeaderBurgar";
import { HeaderItem } from "./HeaderItem";
import { Image } from "@chakra-ui/next-js";

type Props = {};

export const MobileHeader = ({ ...props }: Props) => {
  return (
    <>
      <HeaderItem href="/top">
        <Image src="/logo.svg" alt="ロゴ" height={6} width={36} />
      </HeaderItem>
      <Spacer />
      <MobileHeaderBurgar />
    </>
  );
};
