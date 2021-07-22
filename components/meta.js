import Head from "next/head";

export default function Meta() {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/img/favicon/apple-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/img/favicon/apple-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/img/favicon/apple-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/img/favicon/apple-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/img/favicon/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/img/favicon/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/img/favicon/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/img/favicon/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/img/favicon/apple-icon-180x180.png"
      />
      {/* TODO: what is the safari-pinned-tab? */}
      {/* <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      /> */}
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/img/favicon/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/img/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/img/favicon/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/img/favicon/favicon-16x16.png"
      />

      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#e0851f" />
      <meta name="msapplication-config" content="/img/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#e0851f" />
      {/* <link rel="alternate" type="application/rss+xml" href="/feed.xml" /> */}
      <meta
        name="description"
        content={`Traduttori di idee, creatori di spazi`}
      />
      {/*   TODO: what is og:image???     */}
      {/* <meta property="og:image" content={HOME_OG_IMAGE_URL} /> */}
      <link rel="manifest" href="/img/favicon/manifest.json" />
      <meta name="msapplication-TileImage" content="/img/favicon/ms-icon-144x144.png" />
    </Head>
  );
}
