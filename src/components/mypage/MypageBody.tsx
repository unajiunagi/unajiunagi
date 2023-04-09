import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Stack } from "@chakra-ui/react";
import { AuthGuardProvider } from "components/provider/AuthGuardProvider";
import { EmailAuthGuardProvider } from "components/provider/EmailAuthGuardProvider";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { BsChevronRight } from "react-icons/bs";

type Props = {
  children: ReactNode;
  title: string;
};

export const MypageBody = ({ children, title }: Props) => {
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
                    router.push("/mypage");
                  }}
                >
                  マイページ
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>{title}</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            {children}
          </Stack>
        </EmailAuthGuardProvider>
      </AuthGuardProvider>
    </>
  );
};
