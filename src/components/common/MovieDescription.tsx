import { Box, Spacer, Stack, Text } from "@chakra-ui/react";

type Props = { bgimg: string; title: string; description: string };

export const MovieDescription = ({
  bgimg = "logo.png",
  title = "title",
  description = "紹介文",
}: Props) => (
    <Box
      bgImage={`url("${bgimg}")`}
      bgSize="100% auto"
      bgPosition="center"
      bgRepeat="no-repeat"
      width="100%"
      height={["sm", "md", "lg"]}
    >
      <Box
        bgGradient="linear(to-r, RGBA(0,0,0,100%) 0%, RGBA(0,0,0,0%) 80%)"
        bgSize="100% auto"
        bgPosition="center"
        width="100%"
        height={["sm", "md", "lg"]}
      >
        <Box p="100">
          <Stack>
            <Text fontSize={["xl", "2xl", "4xl"]} fontWeight="bold">
              {title}
            </Text>
            <Spacer />
            <Text fontSize={["lg", "xl", "2xl"]} fontWeight="bold">
              {description}
            </Text>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
