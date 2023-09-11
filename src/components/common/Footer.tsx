import { Link } from '@chakra-ui/next-js';
import { HStack, Stack, Text } from '@chakra-ui/react';
import { useIsMobile } from 'hooks/useIsMobile';
import { pagesPath } from 'type/$path';

export const Footer = () => {
  const isMobile = useIsMobile();

  return (
    <Stack as='footer' bgColor='black' p={8}>
      <HStack as='nav' flexWrap='wrap' spacing={isMobile ? 2 : 8}>
        <Link href={pagesPath.document.terms.$url()}>利用規約</Link>
        <Link href={pagesPath.document.commercialTransaction.$url()}>特定商取引法に基づく表示</Link>
        <Link href={pagesPath.document.privacy.$url()}>プライバシーポリシー</Link>
      </HStack>
      <Text>©2023 うなじうなぎ Inc.</Text>
    </Stack>
  );
};
