import {getAllPosts} from '../lib/query/post'

const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || 'https://matarrese.it'

function cdata(value = '') {
  return `<![CDATA[${String(value).replace(/]]>/g, ']]]]><![CDATA[>')}]]>`
}

function buildRss(posts = []) {
  const items = posts
    .map(post => {
      const url = `${DOMAIN}/news/${post.slug}`
      const pubDate = post.date ? new Date(post.date).toUTCString() : ''
      return `    <item>
      <title>${cdata(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${pubDate ? `<pubDate>${pubDate}</pubDate>` : ''}
      <description>${cdata(post.excerpt || '')}</description>
    </item>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Matarrese srl — News</title>
    <link>${DOMAIN}/news</link>
    <description>Aggiornamenti e approfondimenti sul mondo della ristorazione professionale e dell'ho.re.ca.</description>
    <language>it-IT</language>
    <atom:link href="${DOMAIN}/feed.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`
}

export async function getServerSideProps({res}) {
  const {posts} = await getAllPosts(false)
  const xml = buildRss(posts || [])

  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400',
  )
  res.write(xml)
  res.end()

  return {props: {}}
}

// Componente vuoto: la risposta è interamente generata in getServerSideProps.
export default function Feed() {
  return null
}
