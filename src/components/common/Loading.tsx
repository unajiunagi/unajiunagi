import { VStack, Spinner } from "@chakra-ui/react";

type Props = {};

export const Loading = ({}: Props) => {
  return (
    <>
      <VStack spacing="4" width="90%" maxWidth="400px" pt="8" margin="0 auto">
        <Spinner color="white" size="xl" />
      </VStack>
    </>
  );
};
