import { Card, CardBody, HStack, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";
import { CardLink } from "components/feature/CardLink";
import { ChangeCreatorModeButton } from "components/mypage/ChangeCreatorModeButton";
import { useCreatorMode } from "hooks/useCreatorMode";
import { pagesPath } from "type/$path";

export const MypageMenu = () => {
  const user = useUser();
  const creatorMode = useCreatorMode();

  return (
    <Stack width="100%">
      <HStack>
        {/* <Avatar size="xl" src={user?.user_metadata.avater_url} /> */}
        <Heading fontSize="2xl">{user?.user_metadata.name}</Heading>
      </HStack>
      <Text fontSize="2xl" fontWeight="bold">
        マイページ
      </Text>
      <Card bgColor="black">
        <CardBody>
          <Stack spacing={4} divider={<StackDivider />}>
            <CardLink href={pagesPath.mypage.changeEmail.$url().pathname}>メールアドレスの変更</CardLink>
            <CardLink href={pagesPath.mypage.changePassword.$url().pathname}>パスワードの変更</CardLink>
            <CardLink href={pagesPath.mypage.deleteAccount.$url().pathname}>退会</CardLink>
          </Stack>
        </CardBody>
      </Card>
      {creatorMode ? (
        <Card bgColor="black">
          <CardBody>
            <Stack>
              <CardLink href="/creator">クリエイターページ</CardLink>
            </Stack>
          </CardBody>
        </Card>
      ) : (
        <ChangeCreatorModeButton />
      )}
    </Stack>
  );
};
