import { Box, Stack } from "@chakra-ui/react";
import { MovieDescription } from "components/common/MovieDescription";
import { EmailAuthGuardProvider } from "components/provider/EmailAuthGuardProvider";
import { RecommendBox } from "components/top/RecommendBox";

export default function () {
  return (
    <EmailAuthGuardProvider>
      <MovieDescription bgimg="/img.png" title="title" description="紹介文" />
      <Box width="90%" margin="auto" mt={6} pb={6}>
        <Stack spacing={8}>
          <RecommendBox heading="こちらもオススメ" />
          <RecommendBox heading="こちらオススメしない" />
        </Stack>
      </Box>
    </EmailAuthGuardProvider>
  );
}
