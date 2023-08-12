import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Stack, VStack } from "@chakra-ui/react";
import { useAuthGuard } from "hooks/useAuthGuard";
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
  const { push } = useRouter();
  useAuthGuard();

  return (
    <>
      <Stack width="100%">
        <Breadcrumb spacing="2" mb={"4"} separator={<BsChevronRight color="white" />}>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => {
                push(`/${type}`);
              }}
              fontSize={"xl"}
            >
              {typeText}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink fontSize={"xl"}>{title}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <VStack spacing="4" width="100%" margin="0 auto">
          {children}
        </VStack>
      </Stack>
    </>
  );
};
