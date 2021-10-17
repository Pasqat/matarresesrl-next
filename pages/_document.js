import Document, {Html, Head, Main, NextScript} from 'next/document'

const MAPS_API = process.env.MAPS_API

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="it">
        <Head>
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script
            src={`https://maps.googleapis.com/maps/api/js?key=${MAPS_API}`}
          />
        </Head>
        <body>
          <div id="page-transition"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
