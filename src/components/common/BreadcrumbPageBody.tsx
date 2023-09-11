import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Stack, VStack } from '@chakra-ui/react';
import { useAuthGuard } from 'hooks/useAuthGuard';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { FaChevronRight } from 'react-icons/fa';

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
    <Stack width='100%'>
      <Breadcrumb spacing='2' mb='4' separator={<FaChevronRight color='white' size='12' />}>
        <BreadcrumbItem>
          <BreadcrumbLink
            onClick={() => {
              push(`/${type}`);
            }}
            fontSize='md'
          >
            {typeText}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink fontSize='md'>{title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <VStack spacing='4' width='100%' margin='0 auto'>
        {children}
      </VStack>
    </Stack>
  );
};
