import '../styles/globals.css'
import '../styles/index.css'
import {ApolloProvider} from '@apollo/client'
import Script from 'next/script'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import * as fbq from '../lib/fpixel'
// import {GTM_ID, pageview} from '../lib/gtm'
import CookieConsent, {getCookieConsentValue} from 'react-cookie-consent'
import { Analytics } from '@vercel/analytics/react'

import ScrollToTop from '../components/ScrollToTop'
import PlausibleProvider from 'next-plausible'

import client from '../lib/apolloClient'

function MyApp({Component, pageProps}) {
  const router = useRouter()
  const [isCookieConsentAccept, setIsCookieConsentAccept] = useState(false)

  useEffect(() => {
    setIsCookieConsentAccept(getCookieConsentValue())
  }, [isCookieConsentAccept])

  useEffect(() => {
    if (!isCookieConsentAccept) return
    // this pageviewonly triggers th first time (it's important for Pixel to have real information)
    fbq.pageview()

    const handleRouteChange = () => {
      fbq.pageview()
      // pageview()
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events, isCookieConsentAccept])

  return (
    <ApolloProvider client={client}>
      <PlausibleProvider domain="matarrese.it">
        {/* Global Site Code Pixel - Facebook Pixel */}
        {isCookieConsentAccept ? (
          <>
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
            {/*
            <Script
              id="tag-manager"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}')
              `,
              }}
            />
            */}
          </>
        ) : null}
        <Component {...pageProps} />
        <Analytics />
        <ScrollToTop />
        <CookieConsent
          enableDeclineButton
          onDecline={() => {
            setIsCookieConsentAccept(false)
            return router.reload(window.location.pathname)
          }}
          declineButtonText="Declino"
          // acceptOnScroll
          // onAccept={() => {
          //   setIsCookieConsentAccept(true)
          //   return router.reload(window.location.pathname)
          // }}
          location="bottom"
          buttonText="Accetto tutti i cookies"
          style={{background: '#2B373B', fontSize: '1rem'}}
          buttonStyle={{
            background: '#DE7C00',
            color: '#fff',
            // fontSize: '16px',
          }}
          expires={getCookieConsentValue == false ? 1 : 365}
        >
          Questo sito web utilizza alcuni cookie per poter miglorare
          l&apos;esperinza dell&apos;utente.{' '}
          <a
            href="/cookie-policy"
            target="_blank"
            className="text-xs text-white"
          >
            Qui le info sui cookies utilizzati
          </a>
        </CookieConsent>
      </PlausibleProvider>
    </ApolloProvider>
  )
}

export default MyApp
