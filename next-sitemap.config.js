/** @type {import('next-sitemap').IConfig} */

const siteUrl = process.env.NEXT_PUBLIC_DOMAIN || 'https://www.matarrese.it'

// I dettagli si generano alla prima visita (getStaticPaths vuoto): li elenchiamo qui leggendo
// gli elenchi dal pannello (/dati/<tipo>), con qualche tentativo di riserva per l'hosting condiviso.
const PANNELLO = process.env.NEXT_PUBLIC_PANNELLO_URL
const DETAIL = [
  ['articoli', '/news'],
  ['realizzazioni', '/realizzazioni'],
  ['eventi', '/eventi'],
]

async function pannelloLista(tipo) {
  if (!PANNELLO) throw new Error('NEXT_PUBLIC_PANNELLO_URL non impostata')
  for (const wait of [0, 2000, 5000, 10000]) {
    await new Promise(r => setTimeout(r, wait))
    try {
      const res = await fetch(`${PANNELLO}/dati/${tipo}`)
      if (res.ok) return await res.json()
    } catch {
      // riprova
    }
  }
  throw new Error(`il pannello non risponde su /dati/${tipo}`)
}

// Il pannello scrive le date in ora italiana senza fuso ('2026-10-27T10:26' o
// '2026-10-05 09:00:00'): le restituiamo in ISO con l'offset di Europe/Rome.
// shortcut: l'offset si calcola sull'istante letto come UTC, sbaglia di un'ora solo
// nell'ora del cambio legale/solare; irrilevante per una sitemap.
function isoRoma(s) {
  const m = /^(\d{4}-\d{2}-\d{2})[T ](\d{2}:\d{2})(:\d{2})?/.exec(s || '')
  if (!m) return undefined
  const locale = `${m[1]}T${m[2]}${m[3] || ':00'}`
  const off = new Intl.DateTimeFormat('en', {
    timeZone: 'Europe/Rome',
    timeZoneName: 'longOffset',
  })
    .formatToParts(new Date(`${locale}Z`))
    .find(p => p.type === 'timeZoneName')
    .value.replace('GMT', '')
  return `${locale}${off || '+00:00'}`
}

// Data di ultima modifica di un contenuto. Gli eventi non hanno una data di modifica:
// per un evento concluso la pagina non cambia più, quindi vale la fine dell'evento;
// per uno futuro non sappiamo quando è stato modificato e non mettiamo nulla.
function lastmodOf(tipo, v) {
  if (v.aggiornato) return isoRoma(v.aggiornato)
  if (tipo !== 'eventi') return isoRoma(v.data)
  const fine = isoRoma(v.endDate || v.startDate)
  return fine && Date.parse(fine) <= Date.now() ? fine : undefined
}

const piuRecente = date =>
  date.filter(Boolean).sort((a, b) => Date.parse(b) - Date.parse(a))[0]

// Elenchi del pannello letti una volta sola, condivisi tra additionalPaths e transform:
// mappa percorso -> lastmod per dettagli, elenchi e home.
let elenchi
function lastmods() {
  elenchi ??= Promise.all(
    DETAIL.map(async ([tipo, base]) =>
      (await pannelloLista(tipo)).map(v => [
        `${base}/${v.slug}`,
        lastmodOf(tipo, v),
      ]),
    ),
  ).then(perTipo => {
    const map = new Map(perTipo.flat())
    const dettagli = [...map.keys()]
    // Home ed elenchi: la data del contenuto più recente che mostrano.
    DETAIL.forEach(([, base], i) =>
      map.set(base, piuRecente(perTipo[i].map(([, d]) => d))),
    )
    map.set('/', piuRecente([...map.values()]))
    return {map, dettagli}
  })
  return elenchi
}

// Priorità per-rotta: home > pagine principali > liste > dettaglio > legali.
function priorityFor(path) {
  if (path === '/') return 1.0
  if (['/servizi', '/prodotti', '/azienda', '/contatti', '/settori'].includes(path))
    return 0.9
  if (['/news', '/eventi', '/realizzazioni', '/faq', '/ricerca'].includes(path))
    return 0.8
  if (['/privacy-policy', '/cookie-policy'].includes(path)) return 0.3
  // pagine di dettaglio (news/eventi/realizzazioni)
  return 0.7
}

function changefreqFor(path) {
  if (path === '/' || ['/news', '/eventi'].includes(path)) return 'daily'
  if (path.startsWith('/news/') || path.startsWith('/eventi/')) return 'weekly'
  return 'monthly'
}

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  // Niente data della build su tutti gli URL: lastmod solo dove è vera (vedi transform).
  autoLastmod: false,
  additionalPaths: async config => {
    const paths = []
    try {
      for (const path of (await lastmods()).dettagli) {
        paths.push(await config.transform(config, path))
      }
    } catch (err) {
      // Pannello irraggiungibile: meglio una sitemap senza dettagli che un deploy fallito.
      console.warn(`ATTENZIONE sitemap senza news/realizzazioni/eventi: ${err.message}`)
      return []
    }
    return paths
  },
  exclude: [
    '/feed.xml',
    '/404',
    '/server-sitemap.xml',
    '/dev/*',
  ],
  // Pagine statiche senza lastmod (meglio nessuna data che quella della build);
  // dettagli, elenchi e home con la data vera presa dal pannello.
  transform: async (config, path) => ({
    loc: path,
    changefreq: changefreqFor(path),
    priority: priorityFor(path),
    lastmod: await lastmods().then(
      ({map}) => map.get(path),
      () => undefined,
    ),
  }),
  robotsTxtOptions: {
    policies: [
      {userAgent: '*', allow: '/', disallow: ['/api/', '/dev/']},
      // Crawler AI esplicitamente ammessi per massimizzare la citabilità nelle
      // risposte generative (ChatGPT, Claude, Perplexity, Gemini/Google AI).
      {userAgent: 'GPTBot', allow: '/'},
      {userAgent: 'OAI-SearchBot', allow: '/'},
      {userAgent: 'ChatGPT-User', allow: '/'},
      {userAgent: 'ClaudeBot', allow: '/'},
      {userAgent: 'Claude-Web', allow: '/'},
      {userAgent: 'PerplexityBot', allow: '/'},
      {userAgent: 'Google-Extended', allow: '/'},
      {userAgent: 'Applebot-Extended', allow: '/'},
      {userAgent: 'CCBot', allow: '/'},
    ],
  },
}
