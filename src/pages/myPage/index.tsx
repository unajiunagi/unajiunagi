import { Box } from "@chakra-ui/react";
import { AuthGuardProvider } from "components/provider/AuthGuardProvider";

export default function () {
  return (
    <AuthGuardProvider>
      <Box width="90%" margin="auto" pt={4} pb={6}></Box>
    </AuthGuardProvider>
  );
}
