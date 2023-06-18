"use client";

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CacheProvider>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </CacheProvider>
    </ChakraProvider>
  );
}
