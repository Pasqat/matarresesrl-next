import React from 'react'
import Head from 'next/head'

export default function StructuredData({data}) {
  if (!data) return null
  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    </Head>
  )
}
