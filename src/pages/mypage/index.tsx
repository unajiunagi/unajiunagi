import { Box, Stack } from "@chakra-ui/react";
import { ChangeEmail } from "components/mypage/ChangeEmail";
import { MypageMenu } from "components/mypage/MypageMenu";
import { MypageMenuProvider } from "components/mypage/MypageMenuProvider";
import { useAuthGuard } from "hooks/useAuthGuard";
import { useIsMobile } from "hooks/useIsMobile";

export default () => {
  const isMobile = useIsMobile();
  useAuthGuard();

  return (
    <Box>
      {isMobile ? (
        <Stack spacing={4} width="90%" margin="auto" pt={4} pb={6}>
          <MypageMenu />
        </Stack>
      ) : (
        <MypageMenuProvider>
          <ChangeEmail />
        </MypageMenuProvider>
      )}
    </Box>
  );
}
