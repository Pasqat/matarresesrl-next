import '../styles/globals.css'
import '../styles/index.css'
import {ApolloProvider} from '@apollo/client'
import Script from 'next/script'

import ScrollToTop from '../components/ScrollToTop'

import client from '../lib/apolloClient'

function MyApp({Component, pageProps}) {
  return (
    <ApolloProvider client={client}>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-00G4B92CP8"
      />
      <Script
        id="tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-00G4B92CP8');
            `,
        }}
      />
      <Component {...pageProps} />
      <ScrollToTop />
    </ApolloProvider>
  )
}

export default MyApp
