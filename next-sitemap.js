/** @type {import('next-sitemap').IConfig} */

const siteUrl = process.env.NEXT_PUBLIC_DOMAIN || 'https://www.matarrese.it'

// Priorità per-rotta: home > pagine principali > liste > dettaglio > legali.
function priorityFor(path) {
  if (path === '/') return 1.0
  if (['/servizi', '/prodotti', '/azienda', '/contatti'].includes(path))
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
  exclude: [
    '/preview',
    '/preview/*',
    '/auth/*',
    '/feed.xml',
    '/404',
    '/server-sitemap.xml',
  ],
  transform: async (config, path) => ({
    loc: path,
    changefreq: changefreqFor(path),
    priority: priorityFor(path),
    lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
  }),
  robotsTxtOptions: {
    policies: [
      {userAgent: '*', allow: '/', disallow: ['/api/', '/auth/', '/preview']},
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
