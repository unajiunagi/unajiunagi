import { Card, CardBody, HStack, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";
import { CardLink } from "components/mypage/MypageMenu";
import { useAuthContext } from "components/provider/AuthProvider";

type Props = {};

export const CreaterpageMenu = ({}: Props) => {
  const user = useAuthContext();

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
            <CardLink href="/creater/managementVideo">作品の管理</CardLink>
            <CardLink href="/creater/uploadVideo">作品のアップロード</CardLink>
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
