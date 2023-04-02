import { Thumbnail } from "components/common/Thumbnail";
import { Box, SimpleGrid, Stack, Heading } from "@chakra-ui/react";

export default function Mylist() {
  const org = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      <Box width="90%" margin="auto" pt={4} pb={6}>
        <Stack spacing={4}>
          <Heading fontSize="4xl">購入済みの作品</Heading>
          <SimpleGrid columns={4} gap={6}>
            {org.map((org) => (
              <Box key={org}>
                <Thumbnail src="img.jpg" alt="サムネイル" href="" />
              </Box>
            ))}
          </SimpleGrid>
        </Stack>
      </Box>
    </>
  );
}
