import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "components/provider/AuthProvider";
import { CreaterModeProvider } from "components/provider/CreaterModeProvider";
import { LayoutProvider } from "components/provider/LayoutProvider";
import { initializeFirebaseApp } from "lib/firebase/client";
import type { AppProps } from "next/app";
import "styles/globals.scss";

initializeFirebaseApp();
export default function App({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider>
      <AuthProvider>
        <CreaterModeProvider>
          <LayoutProvider>
            <Component {...pageProps} />
          </LayoutProvider>
        </CreaterModeProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
