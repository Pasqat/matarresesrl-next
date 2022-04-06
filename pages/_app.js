import '../styles/globals.css'
import '../styles/index.css'
import {ApolloProvider} from '@apollo/client'
import Script from 'next/script'
import {useEffect} from 'react'
import {useRouter} from 'next/router'
import * as fbq from '../lib/fpixel'
import {GTM_ID, pageview} from '../lib/gtm'

import ScrollToTop from '../components/ScrollToTop'

import client from '../lib/apolloClient'

function MyApp({Component, pageProps}) {
  const router = useRouter()

  useEffect(() => {
    // this pageviewonly triggers th first time (it's important for Pixel to have real information)
    fbq.pageview()

    const handleRouteChange = () => {
      fbq.pageview()
      pageview()
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <ApolloProvider client={client}>
      {/* <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-00G4B92CP8"
      /> */}
      {/* Global Site Code Pixel - Facebook Pixel */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', ${fbq.FB_PIXEL_ID});
          `,
        }}
      />
      <Script
        id="tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function (w, d, s, l, i) {
            w[l] = w[l] || []
            w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'})
            var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != 'dataLayer' ? '&l=' + l : ''
            j.async = true
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
            f.parentNode.insertBefore(j, f)
          })(window, document, 'script', 'dataLayer', ${GTM_ID})`,
        }}
        // dangerouslySetInnerHTML={{
        //   __html: `
        //       window.dataLayer = window.dataLayer || [];
        //       function gtag(){dataLayer.push(arguments);}
        //       gtag('js', new Date());
        //  Check if the gtag('config', ...) is right;
        //       gtag('config', 'GTM-5M9RQ4B');
        //     `,
        // }}
      />
      <Component {...pageProps} />
      <ScrollToTop />
    </ApolloProvider>
  )
}

export default MyApp
