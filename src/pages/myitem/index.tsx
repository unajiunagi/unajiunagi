import { Box, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import { Thumbnail } from "components/common/Thumbnail";
import { AuthGuardProvider } from "components/provider/AuthGuardProvider";
import { EmailAuthGuardProvider } from "components/provider/EmailAuthGuardProvider";

export default function () {
  const org = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <AuthGuardProvider>
      <EmailAuthGuardProvider>
        <Box width="90%" margin="auto" pt={4} pb={6}>
          <Stack spacing={4}>
            <Heading fontSize="4xl">購入済みの作品</Heading>
            <SimpleGrid columns={4} gap={6}>
              {org.map((org) => (
                <Box key={org}>
                  <Thumbnail src="/img.png" alt="サムネイル" href="" />
                </Box>
              ))}
            </SimpleGrid>
          </Stack>
        </Box>
      </EmailAuthGuardProvider>
    </AuthGuardProvider>
  );
}
