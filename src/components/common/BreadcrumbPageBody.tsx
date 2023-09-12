import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Stack, VStack } from '@chakra-ui/react';
import { useAuthGuard } from 'hooks/useAuthGuard';
import { ReactNode } from 'react';
import { FaChevronRight } from 'react-icons/fa';

type Props = {
  children: ReactNode;
  href: string;
  typeText: string;
  title: string;
};

export const BreadcrumbPageBody = ({ children, href, typeText, title }: Props) => {
  useAuthGuard();

  return (
    <Stack width='100%'>
      <Breadcrumb spacing='2' mb='4' separator={<FaChevronRight size='12' />}>
        <BreadcrumbItem>
          <BreadcrumbLink href={href} fontSize='md'>
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
