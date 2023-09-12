import { Box, Stack } from '@chakra-ui/react';
import { CreatorpageMenu } from 'components/creator/CreatorpageMenu';
import { CreatorpageMenuProvider } from 'components/creator/CreatorpageMenuProvider';
import { ManagementVideo } from 'components/creator/ManagementVideo';
import { useAuthGuard } from 'hooks/useAuthGuard';
import { useCreatorModeGuard } from 'hooks/useCreatorModeGuard';
import { useIsMobile } from 'hooks/useIsMobile';

export default () => {
  const isMobile = useIsMobile();
  useAuthGuard();
  useCreatorModeGuard();

  return (
    <Box>
      {isMobile ? (
        <Stack spacing={4} width='90%' margin='auto' pt={4} pb={6}>
          <CreatorpageMenu />
        </Stack>
      ) : (
        <CreatorpageMenuProvider>
          <ManagementVideo />
        </CreatorpageMenuProvider>
      )}
    </Box>
  );
};
