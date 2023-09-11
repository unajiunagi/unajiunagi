import { Link, LinkProps } from "@chakra-ui/next-js";

type Props = {
  children: React.ReactNode;
};

export const ChakraNextLink = ({ children, ...props }: Props & LinkProps) => {
  return (
    <>
      <Link {...props}>{children}</Link>
    </>
  );
};
