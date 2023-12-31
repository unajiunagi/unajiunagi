import { Box, Stack } from "@chakra-ui/react";
import { MovieDescription } from "components/common/MovieDescription";
import { RecommendBox } from "components/top/RecommendBox";

export default () => {
  return (
    <>
      <MovieDescription bgimg="/logo.png" title="title" description="紹介文" />
      <Box width="90%" margin="auto" mt={6} pb={6}>
        <Stack spacing={8}>
          <RecommendBox heading="こちらもオススメ" />
          <RecommendBox heading="こちらオススメしない" />
        </Stack>
      </Box>
    </>
  );
}
