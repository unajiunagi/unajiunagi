import { MovieDescription } from "components/common/MovieDescription";
import { RecommendBox } from "components/top/RecommendBox";
import { Box, Stack } from "@chakra-ui/react";

export default function() {
  return (
    <>
      <MovieDescription bgimg="/img.png" title="title" description="紹介文" />
      <Box width="90%" margin="auto" mt={6} pb={6}>
        <Stack spacing={8}>
          <RecommendBox heading="こちらもオススメ" />
          <RecommendBox heading="こちらオススメしない" />
        </Stack>
      </Box>
    </>
  );
}
