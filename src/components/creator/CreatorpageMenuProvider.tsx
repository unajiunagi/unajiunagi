import { HStack, Stack } from "@chakra-ui/react";
import { CreatorpageMenu } from "components/creator/creatorpageMenu";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const CreatorpageMenuProvider = ({ children }: Props) => {
  return (
    <Stack spacing={4} width="90%" margin="auto" pt={4} pb={6}>
      <HStack spacing="20" align="start">
        <Stack width="30%">
          <CreatorpageMenu />
        </Stack>
        <Stack width="100%" mt={10}>
          {children}
        </Stack>
      </HStack>
    </Stack>
  );
};
