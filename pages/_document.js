import Document, { Head, Html, Main, NextScript } from "next/document";
import { GTM_ID } from "../lib/gtm";
import { FB_PIXEL_ID } from "../lib/fpixel";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="it">
        <Head>
          {/* Preload dei font principali per ridurre il layout shift (CLS) */}
          <link
            rel="preload"
            href="/fonts/Matter-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Matter-Medium.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&dev=PageView&noscript=1`}
            />
          </noscript>
        </Head>
        <body>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          <div id="page-transition"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
