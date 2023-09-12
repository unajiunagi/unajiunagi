import { Box, Divider, Heading, Text, VStack } from '@chakra-ui/react';

export const Staff = () => {
  const staff: string[] = ['監督', '脚本', 'プロデューサー', '撮影', '録音', '編集'];

  return (
    <>
      <VStack spacing={2}>
        <Heading fontSize='md'>スタッフ</Heading>
        <Divider />
        <Box height={2} />
        {staff.map((role) => {
          return (
            <>
              <Text fontSize='sm' fontWeight='bold'>
                {role}
              </Text>
              <Text fontSize='md'>たけだたけし</Text>
              <Divider />
            </>
          );
        })}
      </VStack>
    </>
  );
};
