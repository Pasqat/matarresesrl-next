import Head from 'next/head'
import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import SectorList from '../../components/home/SectorList'
import StructuredData from '../../components/StructuredData'
import {breadcrumbSchema} from '../../lib/seo/schema'
import settori from '../../data/settori'

// copy da approvare
const intro =
  'Ristoranti, bar, hotel, collettiva, GDO, laboratori e dark kitchen: ogni settore ha flussi, norme e ritmi diversi. Scegli il tuo.'

export default function Settori() {
  const url = `${process.env.NEXT_PUBLIC_DOMAIN}/settori`
  return (
    <>
      <Head>
        <title>Settori | Matarrese srl</title>
        <link rel="canonical" href={url} />
        <meta name="description" content={intro} />
        <meta property="og:title" content="Settori | Matarrese srl" />
        <meta property="og:description" content={intro} />
        <meta property="og:url" content={url} />
        <meta property="og:locale" content="it_IT" />
      </Head>
      <StructuredData
        data={breadcrumbSchema([{name: 'Settori', path: '/settori'}])}
      />
      <Layout navbarTransparent>
        <PageHero title="Per chi lavoriamo." intro={intro} />
        <SectorList
          settori={settori}
          href={s => `/settori/${s.slug}`}
          title="Ogni cucina ha il suo mestiere."
          intro="Passa sui settori per vedere alcuni dei nostri lavori, poi apri quello che ti interessa."
        />
      </Layout>
    </>
  )
}
