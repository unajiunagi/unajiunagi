import { Image, ImageProps } from '@chakra-ui/next-js';

export const ChakraNextImage = ({ ...props }: ImageProps) => {
  return <Image {...props} />;
};
