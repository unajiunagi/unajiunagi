import { ChakraProvider } from '@chakra-ui/react';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { Session, SessionContextProvider } from '@supabase/auth-helpers-react';
import { AuthProvider } from 'components/provider/AuthProvider';
import { LayoutProvider } from 'components/provider/LayoutProvider';
import theme from 'lib/chakra/theme';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import 'styles/globals.scss';
import { SWRConfig } from 'swr';

export default ({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) => {
  // supabase/auth-helperの設定
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <ChakraProvider theme={theme}>
      <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
        <SWRConfig>
          <AuthProvider>
            <LayoutProvider>
              <Component {...pageProps} />
            </LayoutProvider>
          </AuthProvider>
        </SWRConfig>
      </SessionContextProvider>
    </ChakraProvider>
  );
};
