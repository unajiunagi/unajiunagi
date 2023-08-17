import { ChakraProvider } from "@chakra-ui/react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Session, SessionContextProvider } from "@supabase/auth-helpers-react";
import { AuthProvider } from "components/provider/AuthProvider";
import { LayoutProvider } from "components/provider/LayoutProvider";
import type { AppProps } from "next/app";
import { useState } from "react";
import "styles/globals.scss";

export default function App({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <ChakraProvider toastOptions={{ defaultOptions: { position: "top", duration: 3000 } }}>
      <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
        <AuthProvider>
          <LayoutProvider>
            <Component {...pageProps} />
          </LayoutProvider>
        </AuthProvider>
      </SessionContextProvider>
    </ChakraProvider>
  );
}
