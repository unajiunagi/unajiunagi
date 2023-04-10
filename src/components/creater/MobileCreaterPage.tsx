import { Link } from "@chakra-ui/next-js";
import { Card, CardBody, HStack, LinkProps, Spacer, Stack, StackDivider, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {};

export const MobileCreaterPage = ({}: Props) => {
  type CardLinkProps = {
    children: ReactNode;
    href: string;
  };

  const CardLink = ({ children, href, ...props }: CardLinkProps & LinkProps) => {
    return (
      <Link href={`/creater/${href}`} _hover={{}} width="100%" textAlign="left" colorScheme="black" color="white" fontWeight="bold" fontSize="xl" {...props}>
        <HStack>
          <Text>{children}</Text>
          <Spacer />
        </HStack>
      </Link>
    );
  };

  return (
    <>
      <HStack spacing="20" align="start">
        <Stack width="100%">
          <Card bgColor="black">
            <CardBody>
              <Stack spacing={4} divider={<StackDivider />}>
                <CardLink href="managementVideo">作品の管理</CardLink>
                <CardLink href="uploadVideo">作品のアップロード</CardLink>
              </Stack>
            </CardBody>
          </Card>
        </Stack>
      </HStack>
    </>
  );
};
