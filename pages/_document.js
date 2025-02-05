import Document, {Head, Html, Main, NextScript} from 'next/document'
import {GTM_ID} from '../lib/gtm'
import {FB_PIXEL_ID} from '../lib/fpixel'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="it">
        <Head>
          {/* Google Tag Manager */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data: 'denied',
                'ad_personalizaiotn': 'denied',
                'analytics_storage': 'denied',
                })
              gtag('js', new Date());
              gtag('config', '${GTM_ID}', {
              page_path: window.location.pathname,
              });
            `,
            }}
          />
          {/* Facebook Pixel Code */}
          <noscript>
            <img
              height="1"
              width="1"
              style={{display: 'none'}}
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
              style={{display: 'none', visibility: 'hidden'}}
            />
          </noscript>
          <div id="page-transition"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
