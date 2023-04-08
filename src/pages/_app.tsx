import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "components/provider/AuthProvider";
import { EmailVerifyProvider } from "components/provider/EmailVerifyProvider";
import { LayoutProvider } from "components/provider/LayoutProvider";
import { initializeFirebaseApp } from "lib/firebase";
import type { AppProps } from "next/app";
import "styles/globals.scss";

initializeFirebaseApp();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <EmailVerifyProvider>
          <LayoutProvider>
            <Component {...pageProps} />
          </LayoutProvider>
        </EmailVerifyProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
