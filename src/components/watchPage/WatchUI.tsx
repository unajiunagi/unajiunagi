import { Box, Button, Divider, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { BsPlus } from "react-icons/bs";
import { Cast } from "components/watchPage/Cast";
import { Staff } from "components/watchPage/Staff";

type Props = {}

export const WatchUI = ({ ...props }: Props) => {

  return (
    <>
      <Text>{`0000年 | 00分`}</Text>
      <HStack>
        <Button bgColor="black" size="lg">
          レンタル 3日300¥
        </Button>
        <Button bgColor="black" size="lg">
          購入 600¥
        </Button>
      </HStack>
      <Box>
        <Button bgColor="black" size="sm" rounded="3xl">
          <BsPlus />
          お気に入り
        </Button>
      </Box>
      <HStack align="top" spacing="20">
        <Staff />
        <Cast />
      </HStack>
    </>
  );
}
