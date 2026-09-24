/** @type {import('next-sitemap').IConfig} */

const siteUrl = process.env.NEXT_PUBLIC_DOMAIN || 'https://www.matarrese.it'

// In build si prerenderizzano solo i contenuti più recenti (vedi getStaticPaths): gli altri
// dettagli li aggiungiamo qui leggendo gli slug da WordPress, con qualche tentativo di riserva.
const WP_API = process.env.NEXT_PUBLIC_WP_API_URL
const DETAIL = [
  ['posts', '/news'],
  ['projects', '/realizzazioni'],
  ['events', '/eventi'],
]

async function wpQuery(query) {
  for (const wait of [0, 2000, 5000, 10000]) {
    await new Promise(r => setTimeout(r, wait))
    try {
      const res = await fetch(WP_API, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query}),
      })
      if (res.ok) return (await res.json()).data
    } catch {
      // riprova
    }
  }
  throw new Error('next-sitemap: WordPress non risponde')
}

// WPGraphQL restituisce al massimo 100 voci per richiesta: si scorre con il cursore.
async function wpSlugs(type) {
  const slugs = []
  let after = null
  do {
    const cursor = after ? `, after: "${after}"` : ''
    const data = await wpQuery(
      `{ ${type}(first: 100${cursor}) { pageInfo { hasNextPage endCursor } nodes { slug } } }`,
    )
    slugs.push(...data[type].nodes.map(n => n.slug))
    after = data[type].pageInfo.hasNextPage ? data[type].pageInfo.endCursor : null
  } while (after)
  return slugs
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
    for (const [type, base] of DETAIL) {
      for (const slug of await wpSlugs(type)) {
        paths.push(await config.transform(config, `${base}/${slug}`))
      }
    }
    return paths
  },
  exclude: [
    '/preview',
    '/preview/*',
    '/auth/*',
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
      {userAgent: '*', allow: '/', disallow: ['/api/', '/auth/', '/preview', '/dev/']},
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
