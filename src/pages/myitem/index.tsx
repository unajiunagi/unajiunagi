import { Box, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import { Thumbnail } from "components/common/Thumbnail";
import { useAuthGuard } from "hooks/useAuthGuard";
import { staticPath } from "type/$path";

export default () => {
  useAuthGuard();

  const org = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <Box width="90%" margin="auto" pt={4} pb={6}>
      <Stack spacing={4}>
        <Heading fontSize="4xl">購入済みの作品</Heading>
        <SimpleGrid columns={4} gap={6}>
          {org.map((value) => (
            <Box key={value}>
              <Thumbnail src={staticPath.logo_png} alt="サムネイル" href="" />
            </Box>
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
}
