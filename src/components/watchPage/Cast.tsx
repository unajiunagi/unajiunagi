import { Box, Divider, Heading, Text, VStack } from '@chakra-ui/react';

export const Cast = () => {
  return (
    <>
      <VStack spacing={2}>
        <Heading fontSize='md'>キャスト</Heading>
        <Divider />
        <Box height={2} />
        <Text fontSize='md'>たけだたけし</Text>
        <Text fontSize='md'>たけだたけし</Text>
      </VStack>
    </>
  );
};
