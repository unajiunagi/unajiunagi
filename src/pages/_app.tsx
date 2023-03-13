import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return;
  <ChakraProvider>
    <Head>
      <title>バーチャル映画館 うなじうなぎ</title>
    </Head>
    <Component {...pageProps} />
  </ChakraProvider>;
}
