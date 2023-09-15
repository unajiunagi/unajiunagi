import { Box, Stack } from '@chakra-ui/react';
import { CreatorPageMenu } from 'components/creator/CreatorPageMenu';
import { CreatorPageMenuProvider } from 'components/creator/CreatorPageMenuProvider';
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
          <CreatorPageMenu />
        </Stack>
      ) : (
        <CreatorPageMenuProvider>
          <ManagementVideo />
        </CreatorPageMenuProvider>
      )}
    </Box>
  );
};
