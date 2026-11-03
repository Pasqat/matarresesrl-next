import Document, {Head, Html, Main, NextScript} from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="it" data-scroll-behavior="smooth">
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
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
