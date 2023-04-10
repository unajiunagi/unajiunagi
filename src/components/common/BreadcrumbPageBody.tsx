import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Stack, VStack } from "@chakra-ui/react";
import { AuthGuardProvider } from "components/provider/AuthGuardProvider";
import { EmailAuthGuardProvider } from "components/provider/EmailAuthGuardProvider";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { BsChevronRight } from "react-icons/bs";

type Props = {
  children: ReactNode;
  type: string;
  typeText: string;
  title: string;
};

export const BreadcrumbPageBody = ({ children, type, typeText, title }: Props) => {
  const router = useRouter();

  return (
    <>
      <AuthGuardProvider>
        <EmailAuthGuardProvider>
          <Stack width="100%" ml="5%" pt="8">
            <Breadcrumb spacing="2" separator={<BsChevronRight color="white" />}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => {
                    router.push(`/${type}`);
                  }}
                >
                  {typeText}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>{title}</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <VStack spacing="4" width="90%" margin="0 auto">
              {children}
            </VStack>
          </Stack>
        </EmailAuthGuardProvider>
      </AuthGuardProvider>
    </>
  );
};
