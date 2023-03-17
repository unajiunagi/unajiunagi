import { Box, Stack, Text, Spacer } from "@chakra-ui/react";

type Props = { bgimg: string; title: string; description: string };

export const MovieDescription = ({ bgimg = "img.jpg", title = 'title', description = '紹介文', }: Props) => {
  return (
    <Box
      bgImage={`url("${bgimg}")`}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="100% auto"
      width="100%"
      height={["sm", "md", "lg"]}
    >
      <Box p="100">
        <Stack>
          <Text
            fontSize={["xl", "2xl", "4xl"]}
            color="white"
            fontWeight="bold"
          >
            {title}
          </Text>
          <Spacer />
          <Text
            fontSize={["lg", "xl", "2xl"]}
            color="white"
            fontWeight="bold"
          >
            {description}
          </Text>
        </Stack>
      </Box>
    </Box>
  );
};
