import { MenuItem } from '@chakra-ui/react';
import { ChakraNextLink } from 'components/feature/ChakraNextLink';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  href: string;
};

export const HeaderMenuItem = ({ children, href }: Props) => {
  return (
    <MenuItem bgColor='black'>
      <ChakraNextLink href={href} mx='auto'>
        {children}
      </ChakraNextLink>
    </MenuItem>
  );
};
