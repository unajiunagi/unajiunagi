import { Box, Divider, Heading, VStack, Text } from "@chakra-ui/react";

type Props = {}

export const Staff = ({ ...props }: Props) => {
  const staff: string[] = ["監督", "脚本", "プロデューサー", "撮影", "録音", "編集"];

  return (
    <>
      <VStack spacing={2}>
        <Heading fontSize="md">スタッフ</Heading>
        <Divider></Divider>
        <Box height={2}></Box>
        {staff.map((role) => {
          return (
            <>
              <Text fontSize="sm" fontWeight="bold">
                {role}
              </Text>
              <Text fontSize="md">たけだたけし</Text>
              <Divider></Divider>
            </>
          );
        })}
      </VStack>
    </>
  );
}
