import * as React from 'react'

const domain = process.env.NEXT_PUBLIC_DOMAIN

function SeoDataSection({seoData, slug}) {
  return (
    <>
      <title>{seoData.title} | Matarrese srl</title>
      <link rel="canonical" href={`${domain}/${slug}`} />
      <meta
        name="robots"
        content={[
          seoData.metaRobotsNoindex || 'index',
          seoData.metaRobotsNofollow || 'follow',
          'max-image-preview:large',
          'max-snippet:-1',
          'max-video-preview:-1',
        ].join(', ')}
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
      <meta
        name="twitter:title"
        content={seoData.twitterTitle || seoData.opengraphTitle}
      />
      <meta
        name="twitter:description"
        content={seoData.twitterDescription || seoData.opengraphDescription}
      />
      <meta
        name="twitter:image"
        content={
          seoData.twitterImage?.sourceUrl || seoData.opengraphImage?.sourceUrl
        }
      />
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
