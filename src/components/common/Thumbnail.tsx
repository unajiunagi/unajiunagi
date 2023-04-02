import { Image, Link } from "@chakra-ui/react";
import NextLink from "next/link";

type Props = { src: string; alt: string; href: string };

export const Thumbnail = ({ src, alt, href }: Props) => {
  return (
    <>
      <Link as={NextLink} href={href}>
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
