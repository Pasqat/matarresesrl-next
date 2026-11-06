import React from 'react'
import Head from 'next/head'

export default function StructuredData({data}) {
  if (!data) return null
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          // un «</script>» dentro un titolo non deve chiudere lo script
          __html: JSON.stringify(data).replace(/</g, '\\u003c'),
        }}
      />
    </Head>
  )
}
