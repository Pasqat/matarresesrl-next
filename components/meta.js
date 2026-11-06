import Head from 'next/head'

export default function Meta() {
  return (
    <Head>
      <link rel="icon" href="/img/favicon/favicon.ico" sizes="32x32" />
      <link rel="icon" href="/img/favicon/icon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/img/favicon/apple-icon-180x180.png" />
      <link rel="manifest" href="/img/favicon/manifest.json" />
      <meta name="theme-color" content="#1e2226" />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="Matarrese srl — News"
        href="/feed.xml"
      />
      <meta property="og:site_name" content="Matarrese srl" />
      <meta property="og:locale" content="it_IT" />
    </Head>
  )
}
