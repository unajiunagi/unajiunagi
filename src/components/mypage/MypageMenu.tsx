import { Link, LinkProps } from "@chakra-ui/next-js";
import { Card, CardBody, HStack, Spacer, Stack, StackDivider, Text } from "@chakra-ui/react";
import { useCreaterMode } from "hooks/useCreaterMode";
import { ReactNode } from "react";
import { ChangeCreaterModeButton } from "components/mypage/ChangeCreaterModeButton";

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
  const createrMode = useCreaterMode();

  return (
    <Stack width="100%">
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
      {createrMode ? (
        <Card bgColor="black">
          <CardBody>
            <Stack>
              <CardLink href="/creater">クリエイターページ</CardLink>
            </Stack>
          </CardBody>
        </Card>
      ) : (
        <ChangeCreaterModeButton />
      )}
    </Stack>
  );
};
