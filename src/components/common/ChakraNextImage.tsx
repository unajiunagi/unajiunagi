import { Image, ImageProps } from "@chakra-ui/next-js";

type Props = {
  children: React.ReactNode;
};

export const ChakraNextImage = ({ children, ...props }: Props & ImageProps) => {
  return (
    <>
      <Image {...props}>{children}</Image>
    </>
  );
};
