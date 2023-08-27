import { Link, LinkProps } from "@chakra-ui/next-js";
import { Card, CardBody, HStack, Heading, Spacer, Stack, StackDivider, Text } from "@chakra-ui/react";
import { useUser } from "@supabase/auth-helpers-react";
import { ChangecreatorModeButton } from "components/mypage/ChangecreatorModeButton";
import { usecreatorMode } from "hooks/usecreatorMode";
import { ReactNode } from "react";

type Props = {};

export type CardLinkProps = {
  children: ReactNode;
  href: string;
};

export const CardLink = ({ children, href, ...props }: CardLinkProps & LinkProps) => {
  return (
    <Link href={href} _hover={{}} width="100%" textAlign="left" colorScheme="black" color="white" fontWeight="bold" fontSize="xl" {...props}>
      <HStack>
        <Text>{children}</Text>
        <Spacer />
      </HStack>
    </Link>
  );
};

export const MypageMenu = ({}: Props) => {
  const user = useUser();
  const creatorMode = usecreatorMode();

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
            <CardLink href="/mypage/changeEmail">メールアドレスの変更</CardLink>
            <CardLink href="/mypage/changePassword">パスワードの変更</CardLink>
            <CardLink href="/mypage/deleteAccount">退会</CardLink>
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
        <ChangecreatorModeButton />
      )}
    </Stack>
  );
};
