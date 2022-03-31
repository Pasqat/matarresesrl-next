// next.config.js
module.exports = {
  images: {
    // TODO: cdn wp domain can be other than this. Find a better way.
    // at today 07/13/2021 next don't accept wildcards
    domains: ['localhost', 'www.matarrese.it', 'matarrese.it'],
  },
  async redirects() {
    return [
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
        source: '/news/projects/:slug',
        destination: '/realizzazioni/:slug',
        permanent: true,
      },
      {
        source: '/news/portfolio_category/:slug',
        // TODO: maybe `realizzazioni?q=:slug` doesn't work properly, pls check
        destination: '/realizzazioni?q=:slug',
        permanent: true,
      },
      {
        source: '/news/portfolio_tag/:slug',
        // TODO: maybe `realizzazioni?q=:slug` doesn't work properly, pls check
        destination: '/realizzazioni?q=:slug',
        permanent: true,
      },
      // Eventi
      {
        source: '/evento/:slug',
        destination: '/eventi/:slug',
        permanent: true,
      },
      // News
      {
        source: '/category/:slug',
        // TODO: maybe `news?q=:slug` doesn't work properly, pls check
        destination: '/news?q=:slug',
        permanent: true,
      },
      {
        source: '/news/tag/:slug',
        destination: '/news?=q:slug',
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
    ]
  },
}
