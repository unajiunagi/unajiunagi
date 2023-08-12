import { ChakraProvider } from "@chakra-ui/react";
import { LayoutProvider } from "components/provider/LayoutProvider";
import { AuthProvider } from "components/provider/AuthProvider";
import { initializeFirebaseApp } from "lib/firebase/client";
import type { AppProps } from "next/app";
import "styles/globals.scss";

initializeFirebaseApp();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider toastOptions={{ defaultOptions: { position: "top" } }}>
      <AuthProvider>
        <LayoutProvider>
          <Component {...pageProps} />
        </LayoutProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
