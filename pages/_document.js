import Document, {Head, Html, Main, NextScript} from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="it" data-scroll-behavior="smooth">
        <Head>
          {/* scelta sui cookie già fatta: il banner (nell'HTML del server) non si disegna */}
          <script
            dangerouslySetInnerHTML={{
              __html:
                "if(/(^|; )CookieConsent=/.test(document.cookie))document.documentElement.classList.add('cc-scelto')",
            }}
          />
          {/* foto dal pannello e statistiche: connessione aperta prima */}
          {process.env.NEXT_PUBLIC_PANNELLO_URL ? (
            <link rel="preconnect" href={process.env.NEXT_PUBLIC_PANNELLO_URL} />
          ) : null}
          <link rel="preconnect" href="https://plausible.io" />
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
