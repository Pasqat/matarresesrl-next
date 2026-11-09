/** @type {import('next-sitemap').IConfig} */

const siteUrl = process.env.NEXT_PUBLIC_DOMAIN || 'https://www.matarrese.it'

// I dettagli si generano alla prima visita (getStaticPaths vuoto): li elenchiamo qui leggendo
// gli slug dal pannello (/dati/<tipo>), con qualche tentativo di riserva per l'hosting condiviso.
const PANNELLO = process.env.NEXT_PUBLIC_PANNELLO_URL
const DETAIL = [
  ['articoli', '/news'],
  ['realizzazioni', '/realizzazioni'],
  ['eventi', '/eventi'],
]

async function pannelloSlugs(tipo) {
  if (!PANNELLO) throw new Error('NEXT_PUBLIC_PANNELLO_URL non impostata')
  for (const wait of [0, 2000, 5000, 10000]) {
    await new Promise(r => setTimeout(r, wait))
    try {
      const res = await fetch(`${PANNELLO}/dati/${tipo}`)
      if (res.ok) return (await res.json()).map(v => v.slug)
    } catch {
      // riprova
    }
  }
  throw new Error(`il pannello non risponde su /dati/${tipo}`)
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
  autoLastmod: true,
  additionalPaths: async config => {
    const paths = []
    try {
      for (const [tipo, base] of DETAIL) {
        for (const slug of await pannelloSlugs(tipo)) {
          paths.push(await config.transform(config, `${base}/${slug}`))
        }
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
  transform: async (config, path) => ({
    loc: path,
    changefreq: changefreqFor(path),
    priority: priorityFor(path),
    lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
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
