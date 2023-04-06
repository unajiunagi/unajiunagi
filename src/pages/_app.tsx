import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "components/provider/AuthProvider";
import { Layout } from "components/provider/Layout";
import { initializeFirebaseApp } from "lib/firebase";
import type { AppProps } from "next/app";
import "styles/globals.scss";

initializeFirebaseApp();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ChakraProvider>
  );
}
