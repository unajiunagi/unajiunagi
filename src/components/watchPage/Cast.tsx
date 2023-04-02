import { Box, Divider, Heading, VStack, Text } from "@chakra-ui/react";

type Props = {}

export const Cast = ({ ...props }: Props) => {
  return (
    <>
      <VStack spacing={2}>
        <Heading fontSize="md">キャスト</Heading>
        <Divider></Divider>
        <Box height={2}></Box>
        <Text fontSize="md">たけだたけし</Text>
        <Text fontSize="md">たけだたけし</Text>
      </VStack>
    </>
  );
}
