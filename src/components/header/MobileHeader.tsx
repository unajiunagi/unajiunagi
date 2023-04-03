import { Spacer } from "@chakra-ui/react";
import { MobileHeaderBurgar } from "components/header/MobileHeaderBurgar";

type Props = {};

export const MobileHeader = ({ ...props }: Props) => {
  return (
    <>
      <MobileHeaderBurgar />
      <Spacer />
    </>
  );
};
