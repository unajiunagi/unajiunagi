import { Box, BoxProps, Card, CardBody, HStack, Stack, StackDivider } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { ChangeEmail } from "components/mypage/ChangeEmail";
import { ChangePassword } from "components/mypage/ChangePassword";
import { DeleteAccount } from "components/mypage/DeleteAccount";
import { ChangeCreaterModeButton } from "components/mypage/ChangeCreaterModeButton";

type Props = {};

export const DesktopMypage = ({}: Props) => {
  const [menu, setMenu] = useState("email");

  type CardButtonProps = {
    children: ReactNode;
    menu: string;
  };

  const CardButton = ({ children, menu, ...props }: CardButtonProps & BoxProps) => {
    return (
      <Box
        as="button"
        width="100%"
        textAlign="left"
        colorScheme="black"
        color="white"
        fontWeight="bold"
        fontSize="xl"
        onClick={() => {
          setMenu(menu);
        }}
        {...props}
      >
        {children}
      </Box>
    );
  };

  const MyPageBody = () => {
    switch (menu) {
      case "email":
        return <ChangeEmail />;
      case "password":
        return <ChangePassword />;
      case "deleteAccount":
        return <DeleteAccount />;
      default:
        return null;
    }
  };

  return (
    <>
      <HStack spacing="20" align="start">
        <Stack width="30%">
          <Card bgColor="black">
            <CardBody>
              <Stack spacing={4} divider={<StackDivider />}>
                <CardButton menu="email">メールアドレスの確認･変更</CardButton>
                <CardButton menu="password">パスワードの変更</CardButton>
                <CardButton menu="deleteAccount">退会</CardButton>
              </Stack>
            </CardBody>
          </Card>
          <ChangeCreaterModeButton />
        </Stack>
        <MyPageBody />
      </HStack>
    </>
  );
};
