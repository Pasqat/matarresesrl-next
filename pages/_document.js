import Document, {Html, Head, Main, NextScript} from 'next/document'
import {FB_PIXEL_ID} from '../lib/fpixel'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="it">
        <Head>
          <noscript>
            <img
              height="1"
              width="1"
              style={{display: 'none'}}
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&dev=PageView&noscript=1`}
            />
          </noscript>
        </Head>
        <body>
          <noscript>
            {/* Google Tag manager (noscript) */}
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-5M9RQ4B"
              height="0"
              width="0"
              style={{display: 'none', visibility: 'hidden'}}
            ></iframe>
            {/* Google Tag manager (noscript) */}
          </noscript>
          <div id="page-transition"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
