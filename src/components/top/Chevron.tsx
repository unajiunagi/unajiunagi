import { Center } from "@chakra-ui/react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

type Props = {
  action: (event: React.MouseEvent<HTMLInputElement>) => void;
  directionIsLeft: boolean;
};

export const Chevron = ({ action, directionIsLeft }: Props) => {
  return (
    <>
      <Center height="180px" width="80px" ps={4} position="relative" right={directionIsLeft ? 20 : -20} transition="0.25s" onClick={action} _hover={{ backgroundColor: "whiteAlpha.500" }}>
        {directionIsLeft ? <BsChevronLeft size="100" color="white" /> : <BsChevronRight size="100" color="white" />}
      </Center>
    </>
  );
};
