import { Card, CardBody, HStack, Heading, Spacer, Stack, StackDivider, Text } from '@chakra-ui/react';
import { useUser } from '@supabase/auth-helpers-react';
import { CardLink } from 'components/feature/CardLink';
import { useToasts } from 'hooks/useToasts';
import { useRouter } from 'next/router';
import axios from 'redaxios';
import { pagesPath } from 'type/$path';

export const CreatorPageMenu = () => {
  const user = useUser();
  const { errorToast } = useToasts();
  const { push } = useRouter();

  const pushDashboardLink = async () => {
    const { data } = await axios.post('/api/stripe/createLoginLink', { id: user?.id }).catch((err) => {
      errorToast({ title: 'ダッシュボードへのログインリンクの作成に失敗しました。' });
      throw err;
    });
    push(data.url);
  };

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
            <HStack as='button' onClick={pushDashboardLink} width='100%' textAlign='left' fontWeight='bold' fontSize='xl'>
              <Text>ダッシュボード</Text>
              <Spacer />
            </HStack>
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
