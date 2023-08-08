import { Box, BoxProps, Card, CardBody, HStack, Stack, StackDivider } from "@chakra-ui/react";
import { UploadVideo } from "components/creater//UploadVideo";
import { ManagementVideo } from "components/creater/ManagementVideo";
import { ReactNode, useState } from "react";

type Props = {};

export const DesktopCreaterPage = ({}: Props) => {
  const [menu, setMenu] = useState("managementVideo");

  type CardButtonProps = {
    children: ReactNode;
    menu: string;
  };

  const CardButton = ({ children, menu, ...props }: CardButtonProps & BoxProps) => {
    return (
      <Box
        as='button'
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
      case "managementVideo":
        return <ManagementVideo />;
      case "uploadVideo":
        return <UploadVideo />;
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
                <CardButton menu="managementVideo">作品の管理</CardButton>
                <CardButton menu="uploadVideo">作品のアップロード</CardButton>
              </Stack>
            </CardBody>
          </Card>
        </Stack>
        <MyPageBody />
      </HStack>
    </>
  );
};
