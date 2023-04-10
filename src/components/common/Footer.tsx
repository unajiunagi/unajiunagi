import { Link } from "@chakra-ui/next-js";
import { HStack, Stack, Text } from "@chakra-ui/react";

type Props = {};

export const Footer = ({}: Props) => {
  return (
    <>
      <Stack as='footer' bgColor="black" p={8}>
        <HStack spacing={8}>
          <Link color="white" href="document/termsOfService">
            利用規約
          </Link>
          <Link color="white" href="document/commercialTransaction">
            特定商取引法に基づく表示
          </Link>
          <Link color="white" href="document/privacy">
            プライバシーポリシー
          </Link>
        </HStack>
        <Text>©2023 うなじうなぎ Inc.</Text>
      </Stack>
    </>
  );
};