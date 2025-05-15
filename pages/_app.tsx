import type { AppProps } from "next/app";
import React from "react";
import Script from "next/script";
import Head from "next/head";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Jersey+15&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Script
        src="https://unpkg.com/murphyjs@2.0.1/dist/index.js"
        strategy="beforeInteractive"
      />
      <Component {...pageProps} />
    </>
  );
}
