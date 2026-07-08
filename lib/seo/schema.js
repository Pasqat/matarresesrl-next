/**
 * Builder centralizzati per i dati strutturati JSON-LD (schema.org).
 *
 * I nodi globali (Organization/LocalBusiness, WebSite) usano @id stabili così
 * gli altri schema (es. publisher di un articolo) possono referenziarli senza
 * duplicare i dati. Renderizzare l'output con <StructuredData data={...} />.
 */

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'https://matarrese.it'

// @id stabili per il knowledge graph del sito
export const ORG_ID = `${DOMAIN}/#organization`
export const WEBSITE_ID = `${DOMAIN}/#website`

// Dati anagrafici dell'azienda (NAP) — tenere sincronizzati con Google Business
// Profile e con la pagina /contatti per la coerenza delle citazioni.
export const COMPANY = {
  name: 'Matarrese srl',
  alternateName: 'Matarrese',
  email: 'matarrese@matarrese.it',
  telephone: '+39 080 4323 431',
  foundingDate: '1983',
  address: {
    streetAddress: 'Contrada Popoleto',
    addressLocality: 'Alberobello',
    addressRegion: 'BA',
    postalCode: '70011',
    addressCountry: 'IT',
  },
  geo: {latitude: 40.791522, longitude: 17.2448473},
  sameAs: [
    'https://www.facebook.com/matarresesrl',
    'https://www.linkedin.com/company/matarrese-srl/',
    'https://www.instagram.com/matarrese.srl/',
  ],
  logo: `${DOMAIN}/img/logo-matarrese-grigio-350.png`,
  image: `${DOMAIN}/img/piazza_grande_61.jpg`,
}

/**
 * Organization + LocalBusiness: il nodo più importante per la SEO locale e per
 * le risposte AI (azienda con showroom fisico ad Alberobello).
 * NB: openingHoursSpecification volutamente omesso per non pubblicare orari non
 * verificati — aggiungerlo qui quando saranno allineati a Google Business Profile.
 */
export function organizationSchema() {
  return {
    '@type': ['Organization', 'LocalBusiness'],
    '@id': ORG_ID,
    name: COMPANY.name,
    alternateName: COMPANY.alternateName,
    url: DOMAIN,
    logo: {
      '@type': 'ImageObject',
      url: COMPANY.logo,
    },
    image: COMPANY.image,
    email: COMPANY.email,
    telephone: COMPANY.telephone,
    vatID: 'IT04356890725',
    foundingDate: COMPANY.foundingDate,
    priceRange: '€€',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '13:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '15:00',
        closes: '18:30',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      ...COMPANY.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: COMPANY.geo.latitude,
      longitude: COMPANY.geo.longitude,
    },
    areaServed: [
      {'@type': 'AdministrativeArea', name: 'Puglia'},
      {'@type': 'Country', name: 'Italia'},
    ],
    knowsAbout: [
      'Attrezzature per ristorazione',
      'Cucine professionali',
      'Arredi su misura ho.re.ca.',
      'Progettazione locali commerciali',
      'Assistenza tecnica attrezzature alimentari',
      'Impianti di climatizzazione e aspirazione',
    ],
    memberOf: {
      '@type': 'Organization',
      name: 'ASSOGI',
      url: 'https://www.assogi.it',
    },
    sameAs: COMPANY.sameAs,
  }
}

/** WebSite con SearchAction (ricerca news). */
export function webSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: DOMAIN,
    name: COMPANY.name,
    inLanguage: 'it-IT',
    publisher: {'@id': ORG_ID},
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${DOMAIN}/news?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

export function aboutPageSchema({
  description = 'Matarrese srl supporta ristoranti, hotel e professionisti della ristorazione con consulenza, progettazione di spazi, attrezzature e servizi post-vendita.',
  url = `${DOMAIN}/azienda`,
} = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Chi siamo',
    url,
    description,
    about: {'@id': ORG_ID},
    publisher: {'@id': ORG_ID},
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${DOMAIN}/img/piazza_grande_61.jpg`,
    },
  }
}

/** Grafo globale da iniettare su ogni pagina. */
export function globalSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationSchema(), webSiteSchema()],
  }
}

/**
 * BreadcrumbList. `items`: array di {name, path} dove path è relativo (es.
 * "/news") oppure assoluto. La home viene aggiunta automaticamente come primo
 * elemento.
 */
export function breadcrumbSchema(items = []) {
  const all = [{name: 'Home', path: '/'}, ...items]
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.path.startsWith('http') ? item.path : `${DOMAIN}${item.path}`,
    })),
  }
}

/** Articolo del blog (news). */
export function articleSchema({
  title,
  description,
  slug,
  image,
  datePublished,
  dateModified,
  author,
}) {
  const url = `${DOMAIN}/news/${slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {'@type': 'WebPage', '@id': url},
    headline: title,
    description,
    image: image ? [image] : undefined,
    datePublished,
    dateModified: dateModified || datePublished,
    author: author ? {'@type': 'Person', name: author} : {'@id': ORG_ID},
    publisher: {'@id': ORG_ID},
    url,
  }
}

/** FAQPage: array di {question, answer} (answer in testo semplice). */
export function faqSchema(faqs = []) {
  const valid = faqs.filter(f => f && f.question && f.answer)
  if (!valid.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: valid.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {'@type': 'Answer', text: f.answer},
    })),
  }
}

/** Evento. `event` segue i campi del WP (vedi lib/query/event.js). */
export function eventSchema({
  title,
  description,
  slug,
  image,
  startDate,
  endDate,
  venue,
  organizer,
  externalLink,
}) {
  const location = venue
    ? {
        '@type': 'Place',
        name: venue.venue || COMPANY.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: venue.address || undefined,
          addressLocality: venue.city || undefined,
          addressCountry: venue.country || 'IT',
        },
      }
    : {
        '@type': 'Place',
        name: COMPANY.name,
        address: {'@type': 'PostalAddress', ...COMPANY.address},
      }

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: title,
    description,
    startDate: startDate || undefined,
    endDate: endDate || startDate || undefined,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    image: image ? [image] : undefined,
    url: externalLink || `${DOMAIN}/eventi/${slug}`,
    location,
    organizer: organizer
      ? {
          '@type': 'Organization',
          name: organizer.title || COMPANY.name,
          url: organizer.website || DOMAIN,
        }
      : {'@id': ORG_ID},
  }
}

/** Progetto/realizzazione. */
export function creativeWorkSchema({
  title,
  description,
  slug,
  image,
  categories = [],
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description,
    image: image ? [image] : undefined,
    url: `${DOMAIN}/realizzazioni/${slug}`,
    creator: {'@id': ORG_ID},
    about: categories.length ? categories : undefined,
  }
}

/**
 * Elenco di servizi offerti (pagina /servizi). `services`: array di
 * {name, description}.
 */
export function serviceListSchema(services = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Servizi Matarrese srl',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.name,
        description: s.description,
        provider: {'@id': ORG_ID},
        areaServed: {'@type': 'AdministrativeArea', name: 'Puglia'},
      },
    })),
  }
}

/** Elenco generico di voci (es. categorie prodotto su /prodotti). */
export function itemListSchema(name, items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: typeof it === 'string' ? it : it.name,
    })),
  }
}
