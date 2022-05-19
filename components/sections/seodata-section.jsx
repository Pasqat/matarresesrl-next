import * as React from 'react'

const domain = process.env.NEXT_PUBLIC_DOMAIN

function SeoDataSection({seoData, slug}) {
  return (
    <>
      <title>{seoData.title} | Matarrese srl</title>
      <link rel="canonical" href={`${domain}/${slug}`} />
      <meta
        name="robots"
        content={`${seoData.metaRobotsNoindex}, ${seoData.metaRobotsNoFollow}, max-image-preview:large, max-snippet:-1, max-video-preview:-1`}
      />
      <meta name="author" content="Matarrese srl" />
      <meta name="description" content={seoData.metaDesc} />
      <meta property="og:title" content={seoData.opengraphTitle} />
      <meta property="og:description" content={seoData.opengraphDescription} />
      <meta property="og:url" content={`${domain}/${slug}`} />
      <meta property="og:type" content={seoData.opengraphType} />
      <meta property="og:locale" content="it_IT" />
      <meta property="og:site_name" content="Matarrese srl" />
      <meta property="og:image" content={seoData.opengraphImage?.sourceUrl} />
      <meta property="article:publisher" content={seoData.opengraphPublisher} />
      <meta
        property="article:published_time"
        content={seoData.opengraphPublishedTime}
      />
      <meta
        property="article:modified_time"
        content={seoData.opengraphModifiedTime}
      />
      <meta name="twitter:card" content="summary_large_image" />
      {/* <meta property="og:image:width" content="2000">
                  <meta property="og:image:height" content="1000">
                  <meta property="og:image:type" content="image/jpeg"> */}
      {/* <meta name="twitter:label1" content="Scritto da"> */}
      {/* <meta name="twitter:data1" content="Miriana"> */}
      {/* <meta name="twitter:label2" content="Tempo di lettura stimato"> */}
      {/* <meta name="twitter:data2" content="4 minuti"></meta> */}
    </>
  )
}

export {SeoDataSection}
