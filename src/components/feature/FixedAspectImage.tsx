import { Image, ImageProps } from '@chakra-ui/next-js';
import { AspectRatio } from '@chakra-ui/react';

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const FixedAspectImage = ({ src, alt, width, height, ...props }: Props & ImageProps) => {
  return (
    <AspectRatio ratio={width / height}>
      <Image src={src} alt={alt} fill style={{ objectFit: 'contain' }} position='relative' {...props} />
    </AspectRatio>
  );
};
