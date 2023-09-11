import { Spinner, VStack } from "@chakra-ui/react";
import { useWindowSize } from "hooks/useWindowSize";

export const Loading = () => {
  const [height, width] = useWindowSize();

  return (
    <>
      <VStack spacing="4" minHeight={`${height}px`} minWidth={`${width}px`} pb={16} width="90%" maxWidth="400px" pt="8" margin="0 auto" bgColor="black">
        <Spinner size="xl" color="white" />
      </VStack>
    </>
  );
};
