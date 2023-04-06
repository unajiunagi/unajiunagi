import { Image, Spacer } from "@chakra-ui/react";
import { MobileHeaderBurgar } from "components/header/MobileHeaderBurgar";
import { HeaderItem } from "./HeaderItem";

type Props = {};

export const MobileHeader = ({ ...props }: Props) => {
  return (
    <>
      <HeaderItem href="/">
        <Image src="logo.png" alt="ロゴ" width="12" pl="4" />
      </HeaderItem>
      <Spacer />
      <MobileHeaderBurgar />
    </>
  );
};
