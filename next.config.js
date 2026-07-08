// next.config.js
module.exports = {
  // Limita i worker di build a 1: l'hosting condiviso del backend WordPress
  // (be.matarrese.it) va in 508 "Resource Limit Is Reached" se il prerender
  // SSG delle ~210 pagine spara troppe query GraphQL concorrenti.
  experimental: {
    cpus: 1,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {protocol: 'https', hostname: 'be.matarrese.it'},
      {protocol: 'https', hostname: 'www.matarrese.it'},
      {protocol: 'https', hostname: 'matarrese.it'},
      // local dev server (http), include port if needed
      {protocol: 'http', hostname: 'localhost', port: '3000'},
    ],
    deviceSizes: [320, 480, 640, 768, 1024, 1280, 1600, 1920, 2560, 3840],
    imageSizes: [
      16, 32, 48, 64, 96, 128, 256, 384, 512, 768, 1024, 1280, 1600, 1920, 3840,
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{type: 'host', value: 'matarrese.it'}],
        destination: 'https://www.matarrese.it/:path*',
        permanent: true,
      },
      {
        source: '/it/index.asp',
        destination: '/',
        permanent: true,
      },
      {
        source: '/mio-account',
        destination: '/',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contatti',
        permanent: true,
      },
      {
        source: '/index.php/azienda',
        destination: '/azienda',
        permanent: true,
      },
      {
        source: '/qucino',
        destination: '/prodotti',
        permanent: false,
      },
      {
        source: '/assogi',
        destination: '/#assogi',
        permanent: true,
      },
      {
        source: '/ottieni-il-catalogo-macelleria/',
        destination: '/contatti',
        permanent: true,
      },
      {
        source: '/grazie-scarica-il-catalogo/',
        destination: '/contatti',
        permanent: true,
      },
      // Servizi sub-pages
      {
        source: '/servizi/progettazione-tecnica',
        destination: '/servizi',
        permanent: false,
      },
      {
        source: '/servizi/progettazione-tecnica/:path',
        destination: '/servizi',
        permanent: true,
      },
      {
        source: '/servizi/impianti',
        destination: '/servizi',
        permanent: false,
      },
      {
        source: '/servizi/forniture',
        destination: '/servizi',
        permanent: false,
      },
      {
        source: '/servizi/assistenza-tecnica',
        destination: '/servizi',
        permanent: false,
      },
      {
        source: '/servizi/formazione',
        destination: '/servizi',
        permanent: false,
      },
      {
        source: '/servizi/produzione-arredi',
        destination: '/servizi',
        permanent: false,
      },
      // Prodotti sub-pages
      {
        source: '/index.php/prodotti/:slug',
        destination: '/prodotti',
        permanent: true,
      },
      {
        source: '/prodotti/arredisumisura',
        destination: '/prodotti',
        permanent: false,
      },
      {
        source: '/prodotti/arredo-e-complementi',
        destination: '/prodotti',
        permanent: false,
      },
      {
        source: '/prodotti/aspirazione',
        destination: '/prodotti',
        permanent: false,
      },
      {
        source: '/prodotti/attrezzature',
        destination: '/prodotti',
        permanent: false,
      },
      {
        source: '/prodotti/climatizzazione',
        destination: '/prodotti',
        permanent: false,
      },
      {
        source: '/prodotti/forniturealberghiere',
        destination: '/prodotti',
        permanent: false,
      },
      {
        source: '/prodotti/lavanderia',
        destination: '/prodotti',
        permanent: false,
      },
      {
        source: '/prodotti/refrigerazione-2',
        destination: '/prodotti',
        permanent: false,
      },
      {
        source: '/prodotti/lavaggio',
        destination: '/prodotti',
        permanent: false,
      },
      {
        source: '/prodotti/attrezzature-cottura',
        destination: '/prodotti',
        permanent: false,
      },
      {
        source: '/prodotti/sanificazione',
        destination: '/prodotti',
        permanent: false,
      },
      // Projects redirect
      {
        source: '/lavori',
        destination: '/realizzazioni',
        permanent: true,
      },
      {
        source: '/project/:slug',
        destination: '/realizzazioni',
        permanent: true,
      },
      {
        source: '/news/projects/:slug',
        destination: '/realizzazioni/:slug',
        permanent: true,
      },
      {
        source: '/news/portfolio_category/:slug',
        // TODO: this is right, but at the moment the search with query parameters
        // doesn't work
        destination: '/realizzazioni?q=:slug',
        permanent: true,
      },
      {
        source: '/news/portfolio_tag/:slug',
        // NOTE: same as before
        destination: '/realizzazioni?q=:slug',
        permanent: true,
      },
      // Eventi
      {
        source: '/events/:slug',
        destination: '/eventi/:slug',
        permanent: true,
      },
      {
        source: '/evento/:slug',
        destination: '/eventi/:slug',
        permanent: true,
      },
      {
        source: '/eventi-categorie/:slug',
        destination: '/eventi/:slug',
        permanent: true,
      },
      // News
      {
        source: '/category/:slug',
        // NOTE: same as before
        destination: '/news?q=:slug',
        permanent: true,
      },
      {
        source: '/news/tag/:slug',
        destination: '/news?q=:slug',
        permanent: true,
      },
      {
        source: '/news/page/:slug',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/index.php/news/page/:slug',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/ricetta-monoporzioni-amorini',
        destination: '/news/ricetta-monoporzioni-amorini',
        permanent: true,
      },
      {
        source: '/iperammortammento-del-250-tutto-quello-che-devi-sapere/',
        destination:
          '/news/iperammortammento-del-250-tutto-quello-che-devi-sapere',
        permanent: true,
      },
      {
        source: '/ritorna-festa-a-mare-una-festa-per-la-vita',
        destination: '/news/ritorna-festa-a-mare-una-festa-per-la-vita',
        permanent: true,
      },
      {
        source: '/1444',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/arredamento-supermarcati-e-gdo-novita-e-tendenze',
        destination: '/news/arredamento-supermarcati-e-gdo-novita-e-tendenze',
        permanent: true,
      },
      {
        source: '/miyabi-la-bellezza-della-affilatura-giapponese',
        destination: '/news/miyabi-la-bellezza-della-affilatura-giapponese',
        permanent: true,
      },
      {
        source: '/bully-essay',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/to-kill-a-mockingbird-essay-topics',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/2000-words-essay',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/1620',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/website-to-check-essay-for-plagiarism',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/themes-of-macbeth-essay',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/science-and-human-life-essay',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/art-critique-essay',
        destination: '/news',
        permanent: true,
      },
      // Old woocommerce pages
      {
        source: '/occasioni',
        destination: '/prodotti',
        permanent: true,
      },
      {
        source: '/negozio',
        destination: '/prodotti',
        permanent: true,
      },
      {
        source: '/carrello',
        destination: '/prodotti',
        permanent: true,
      },
      {
        source: '/checkout',
        destination: '/prodotti',
        permanent: true,
      },
      {
        source: '/m/negozio',
        destination: '/prodotti',
        permanent: true,
      },
      {
        source: '/index.php/negozio',
        destination: '/prodotti',
        permanent: true,
      },
    ]
  },
  async headers() {
    // Header di sicurezza applicati a tutte le rotte.
    // NOTA: Content-Security-Policy NON è inclusa di proposito: una CSP
    // enforced dovrebbe autorizzare esplicitamente Plausible, Google Tag
    // Manager, Facebook Pixel, le immagini di be.matarrese.it e gli script
    // inline, altrimenti rompe il sito. Va introdotta con un passaggio
    // dedicato (preferibilmente prima in modalità Report-Only).
    const securityHeaders = [
      {key: 'X-Content-Type-Options', value: 'nosniff'},
      {key: 'X-Frame-Options', value: 'SAMEORIGIN'},
      {key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'},
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
      },
      {key: 'X-DNS-Prefetch-Control', value: 'on'},
    ]

    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
