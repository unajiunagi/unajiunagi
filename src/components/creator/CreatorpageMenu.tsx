import { Card, CardBody, HStack, Heading, Stack, StackDivider, Text } from '@chakra-ui/react';
import { useUser } from '@supabase/auth-helpers-react';
import { CardLink } from 'components/feature/CardLink';
import { pagesPath } from 'type/$path';

export const CreatorPageMenu = () => {
  const user = useUser();

  return (
    <Stack width='100%'>
      <HStack>
        {/* <Avatar size="xl" src={user?.user_metadata.avater_url} /> */}
        <Heading fontSize='2xl'>{user?.user_metadata.name}</Heading>
      </HStack>
      <Text fontSize='2xl' fontWeight='bold'>
        クリエイターページ
      </Text>
      <Card bgColor='black'>
        <CardBody>
          <Stack spacing={4} divider={<StackDivider />}>
            <CardLink href={pagesPath.creator.managementVideo.$url().pathname}>作品の管理</CardLink>
            <CardLink href={pagesPath.creator.uploadVideo.$url().pathname}>作品のアップロード</CardLink>
          </Stack>
        </CardBody>
      </Card>
      <Card bgColor='black'>
        <CardBody>
          <Stack>
            <CardLink href={pagesPath.mypage.$url().pathname}>マイページ</CardLink>
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
};
