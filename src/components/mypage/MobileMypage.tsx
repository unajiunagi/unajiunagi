import { Link } from "@chakra-ui/next-js";
import { Card, CardBody, HStack, LinkProps, Spacer, Stack, StackDivider, Text } from "@chakra-ui/react";
import { Loading } from "components/common/Loading";
import { ChangeCreaterModeButton } from "components/mypage/ChangeCreaterModeButton";
import { useCreaterModeContext } from "components/provider/CreaterModeProvider";
import { ReactNode } from "react";

type Props = {};

export const MobileMypage = ({}: Props) => {
  const { createrMode } = useCreaterModeContext();

  type CardLinkProps = {
    children: ReactNode;
    href: string;
  };

  const CardLink = ({ children, href, ...props }: CardLinkProps & LinkProps) => {
    return (
      <Link href={`/mypage/${href}`} _hover={{}} width="100%" textAlign="left" colorScheme="black" color="white" fontWeight="bold" fontSize="xl" {...props}>
        <HStack>
          <Text>{children}</Text>
          <Spacer />
        </HStack>
      </Link>
    );
  };
  if (createrMode === null) {
    return <Loading />;
  } else {
    return (
      <>
        <HStack spacing="20" align="start">
          <Stack width="100%">
            <Card bgColor="black">
              <CardBody>
                <Stack spacing={4} divider={<StackDivider />}>
                  <CardLink href="changeEmail">メールアドレスの確認･変更</CardLink>
                  <CardLink href="changePassword">パスワードの変更</CardLink>
                  <CardLink href="deleteAccount">退会</CardLink>
                </Stack>
              </CardBody>
            </Card>
            {createrMode ? <></> : <ChangeCreaterModeButton />}
          </Stack>
        </HStack>
      </>
    );
  }
};
