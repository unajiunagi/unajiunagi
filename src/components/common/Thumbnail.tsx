import { Image } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

type Props = { src: string; alt: string; href: string };

export const Thumbnail = ({ src, alt, href }: Props) => {
  return (
    <>
      <Link href={href}>
        <Image
          src={src}
          alt={alt}
          width="320px"
          height="180px"
          minWidth='320px'
          background="#D9D9D9"
          rounded={8}
        />
      </Link>
    </>
  );
};
