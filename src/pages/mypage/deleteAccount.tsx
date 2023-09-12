import { Stack } from "@chakra-ui/react";
import { BreadcrumbPageBody } from "components/common/BreadcrumbPageBody";
import { DeleteAccount } from "components/mypage/DeleteAccount";
import { MypageMenuProvider } from "components/mypage/MypageMenuProvider";
import { useAuthGuard } from "hooks/useAuthGuard";
import { useIsMobile } from "hooks/useIsMobile";

export default () => {
  const isMobile = useIsMobile();
  useAuthGuard();

  return (
    <>
      {isMobile ? (
        <Stack spacing={4} width="90%" margin="auto" pt={4} pb={6}>
          <BreadcrumbPageBody title="退会" href="/mypage" typeText="マイページ">
            <DeleteAccount />
          </BreadcrumbPageBody>
        </Stack>
      ) : (
        <MypageMenuProvider>
          <DeleteAccount />
        </MypageMenuProvider>
      )}
    </>
  );
}
