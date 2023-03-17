import { Image, Link } from "@chakra-ui/react";
import NextLink from "next/link";

type Props = { src: string; alt: string; href: string;};

export const Tumbnail = ({ src, alt, href }: Props) => {
  return (
    <>
      <Link as={NextLink} href={href}>
        <Image
          src={src}
          alt={alt}
          borderRadius="10px"
          width="320px"
          height="180px"
          maxWidth="100%"
          background="#D9D9D9"
        />
      </Link>
    </>
  );
};
