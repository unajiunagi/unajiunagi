import { Box, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import { MovieDescription } from "components/common/MovieDescription";
import { Thumbnail } from "components/common/Thumbnail";
import { WatchUI } from "components/watchPage/WatchUI";

export default function () {
  const org = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      <MovieDescription bgimg="/img.png" title="title" description="紹介文" />
      <Box width="90%" margin="auto" pt={2} pb={6}>
        <Stack spacing={8}>
          <WatchUI />
          <Stack spacing={4}>
            <Heading fontSize="2xl">こちらもオススメ</Heading>
            <SimpleGrid columns={4} gap={6}>
              {org.map((org) => (
                <Box key={org}>
                  <Thumbnail src="/img.png" alt="サムネイル" href="" />
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
