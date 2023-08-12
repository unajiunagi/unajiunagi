import { Stack } from "@chakra-ui/react";
import { BreadcrumbPageBody } from "components/common/BreadcrumbPageBody";
import { ChangeEmail } from "components/mypage/ChangeEmail";
import { MypageMenuProvider } from "components/mypage/MypageMenuProvider";
import { useAuthGuard } from "hooks/useAuthGuard";
import { useIsMobile } from "hooks/useIsMobile";

export default function () {
  const isMobile = useIsMobile();
  useAuthGuard();

  return (
    <>
      {isMobile ? (
        <Stack spacing={4} width="90%" margin="auto" pt={4} pb={6}>
          <BreadcrumbPageBody title="メールアドレスの変更" type="mypage" typeText="マイページ">
            <ChangeEmail />
          </BreadcrumbPageBody>
        </Stack>
      ) : (
        <MypageMenuProvider>
          <ChangeEmail />
        </MypageMenuProvider>
      )}
    </>
  );
}
