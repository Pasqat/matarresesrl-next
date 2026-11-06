import Head from 'next/head'
import Layout from '../../components/Layout'
import HeroCinema from '../../components/cinema/HeroCinema'
import SectorList from '../../components/home/SectorList'
import StructuredData from '../../components/StructuredData'
import {breadcrumbSchema} from '../../lib/seo/schema'
import settori from '../../data/settori'
import heroImg from '../../public/img/settori/hotel-movenpick-buffet.webp'

const intro =
  'Ristoranti, bar, hotel, collettiva, GDO, laboratori, dark kitchen e non solo: ogni settore ha flussi, norme e ritmi diversi, e il progetto parte da lì.'

export default function Settori() {
  const url = `${process.env.NEXT_PUBLIC_DOMAIN}/settori`
  return (
    <>
      <Head>
        <title>Cucine e allestimenti per settore | Matarrese srl</title>
        <link rel="canonical" href={url} />
        <meta name="description" content={intro} />
        <meta
          property="og:title"
          content="Cucine e allestimenti per settore | Matarrese srl"
        />
        <meta property="og:description" content={intro} />
        <meta property="og:url" content={url} />
        <meta property="og:locale" content="it_IT" />
      </Head>
      <StructuredData
        data={breadcrumbSchema([{name: 'Settori', path: '/settori'}])}
      />
      <Layout navbarTransparent headerCta={{}}>
        <HeroCinema
          image={heroImg}
          alt="Il buffet di un hotel con banco in rame e luci calde"
          eyebrow="I settori principali, non gli unici"
          riga="Per chi"
          accento="lavoriamo."
          sottotitolo={intro}
        />
        <SectorList
          settori={settori}
          href={s => `/settori/${s.slug}`}
          title={
            <>
              Ogni cucina{' '}
              <span className="type-accento">
                ha il suo mestiere.
              </span>
            </>
          }
          intro="Passa sui settori per vedere alcuni dei nostri lavori, poi apri quello che ti interessa."
        />
      </Layout>
    </>
  )
}
