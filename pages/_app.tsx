import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import Script from "next/script";
import Head from "next/head";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Import Murphy.js only on the client side
    if (process.env.NODE_ENV === "development") {
      require("../src/core/index.js");
      // Call play() after the script is loaded
      if (typeof window !== "undefined" && window.murphy) {
        window.murphy.play();
      }
    }
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Jersey+15&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/static/favicon.ico" />
      </Head>
      {process.env.NODE_ENV === "production" && (
        <Script
          src="https://unpkg.com/murphyjs@2.4.1/dist/index.js"
          strategy="beforeInteractive"
          onLoad={() => {
            // Call play() after the script is loaded
            if (typeof window !== "undefined" && window.murphy) {
              window.murphy.play();
            }
          }}
        />
      )}
      <Component {...pageProps} />
    </>
  );
}
