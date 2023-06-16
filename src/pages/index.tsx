import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { ChakraProvider } from "@chakra-ui/react";
import Sections from "../components/sections";
import Header from "../components/header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <ChakraProvider>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <Sections />
        <Sections />
        <Sections />
      </ChakraProvider>
    </>
  );
}
