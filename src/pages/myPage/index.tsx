import { Box } from "@chakra-ui/react";
import { AuthGuardProvider } from "components/provider/AuthGuardProvider";
import { EmailAuthGuardProvider } from "components/provider/EmailAuthGuardProvider";

export default function () {
  return (
    <AuthGuardProvider>
      <EmailAuthGuardProvider>
        <Box width="90%" margin="auto" pt={4} pb={6}></Box>
      </EmailAuthGuardProvider>
    </AuthGuardProvider>
  );
}
