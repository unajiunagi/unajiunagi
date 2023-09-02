import { Card, CardBody, HStack, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";
import { CardLink } from "components/mypage/MypageMenu";

type Props = {};

export const CreatorpageMenu = ({}: Props) => {
  const user = useUser();

  return (
    <Stack width="100%">
      <HStack>
        {/* <Avatar size="xl" src={user?.user_metadata.avater_url} /> */}
        <Heading fontSize="2xl">{user?.user_metadata.name}</Heading>
      </HStack>
      <Text fontSize="2xl" fontWeight="bold">
        クリエイターページ
      </Text>
      <Card bgColor="black">
        <CardBody>
          <Stack spacing={4} divider={<StackDivider />}>
            <CardLink href="/creator/managementVideo">作品の管理</CardLink>
            <CardLink href="/creator/uploadVideo">作品のアップロード</CardLink>
          </Stack>
        </CardBody>
      </Card>
      <Card bgColor="black">
        <CardBody>
          <Stack>
            <CardLink href="/mypage">マイページ</CardLink>
          </Stack>
        </CardBody>
      </Card>
    </Stack>
  );
};
