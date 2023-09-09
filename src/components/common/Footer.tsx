import { Link } from "@chakra-ui/next-js";
import { HStack, Stack, Text } from "@chakra-ui/react";
import { pagesPath } from "type/$path";

type Props = {};

export const Footer = ({}: Props) => {
  return (
    <>
      <Stack as='footer' bgColor="black" p={8}>
        <HStack spacing={8}>
          <Link color="white" href={pagesPath.document.terms.$url()}>
            利用規約
          </Link>
          <Link color="white" href={pagesPath.document.commercialTransaction.$url()}>
            特定商取引法に基づく表示
          </Link>
          <Link color="white" href={pagesPath.document.privacy.$url()}>
            プライバシーポリシー
          </Link>
        </HStack>
        <Text>©2023 うなじうなぎ Inc.</Text>
      </Stack>
    </>
  );
};
