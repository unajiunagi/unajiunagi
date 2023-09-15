import { LinkProps } from "@chakra-ui/next-js";
import { HStack, Spacer, Text } from "@chakra-ui/react";
import { ChakraNextLink } from "components/feature/ChakraNextLink";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href: string;
};

export const CardLink = ({ children, href, ...props }: Props & LinkProps) => {
  return (
    <ChakraNextLink href={href} width="100%" textAlign="left" fontWeight="bold" fontSize="xl" {...props}>
      <HStack>
        <Text>{children}</Text>
        <Spacer />
      </HStack>
    </ChakraNextLink>
  );
};
