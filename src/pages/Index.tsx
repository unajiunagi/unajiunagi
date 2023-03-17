import { MovieDescription } from "@/components/common/MovieDescription";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <MovieDescription bgimg="img.jpg" title="title" description="紹介文" />
    </>
  );
}
