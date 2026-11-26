import {useRouter} from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import {Freccia} from '../../components/cinema/BottoneFreccia'
import Prosa from '../../components/editoriale/Prosa'
import ContactModal from '../../components/Form/ContactModal'
import SocialShareBar from '../../components/SocialShareBar/SocialShareBar'
import {getAnnuncio} from '../../lib/query/annuncio'
import {dettagliAnnuncio as dettagli, ogni} from '../../lib/pannello'
import {SeoDataSection} from '../../components/sections/seodata-section'
import StructuredData from '../../components/StructuredData'
import {jobPostingSchema, breadcrumbSchema} from '../../lib/seo/schema'

function Candidati({annuncio, dark}) {
  return (
    <ContactModal
      variant="info"
      className={dark ? 'cin-btn' : 'cta-ghisa'}
      candidatura={{titolo: annuncio.titolo}}
    >
      Candidati
      {dark && <Freccia />}
    </ContactModal>
  )
}

export default function Annuncio({annuncio}) {
  const router = useRouter()
  if (router.isFallback || !annuncio)
    return (
      <Layout>
        <p className="site-shell py-24" role="status">
          Caricamento dell’annuncio…
        </p>
      </Layout>
    )

  const percorso = `lavora-con-noi/${annuncio.slug}`
  const scheda = [
    ['Sede di lavoro', annuncio.sede],
    ['Impiego', annuncio.impiegoNome],
    ['Contratto', annuncio.contratto],
    // obbligatoria negli annunci dal D.Lgs. 96/2026 (trasparenza retributiva)
    [
      'Retribuzione',
      annuncio.ral > 0 &&
        `RAL da ${annuncio.ral.toLocaleString('it-IT')} € lordi l’anno`,
    ],
    [
      'Pubblicato il',
      // mezzogiorno: la data resta quella anche con il fuso del server
      <time key="data" dateTime={annuncio.data}>
        {new Date(`${annuncio.data}T12:00`).toLocaleDateString('it-IT', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </time>,
    ],
  ].filter(([, valore]) => valore)

  return (
    <Layout navbarTransparent>
      <Head>{SeoDataSection({seoData: annuncio.seo, slug: percorso})}</Head>
      <StructuredData data={jobPostingSchema(annuncio)} />
      <StructuredData
        data={breadcrumbSchema([
          {name: 'Lavora con noi', path: '/lavora-con-noi'},
          {name: annuncio.titolo, path: `/${percorso}`},
        ])}
      />

      <section
        className="bg-[#0d0e0f] text-white [&_:focus-visible]:outline-fiamma"
        data-header="dark"
        aria-labelledby="page-title"
      >
        <div className="site-shell pb-20 pt-36 lg:pb-28 lg:pt-44">
          <span className="eyebrow-cinema">Posizione aperta</span>
          <h1
            id="page-title"
            className="type-display mt-6 max-w-[18ch] hyphens-auto text-[clamp(36px,4.6vw,72px)] !leading-[0.98] [overflow-wrap:break-word]"
          >
            {annuncio.titolo}
          </h1>
          <p className="mt-8 font-[family-name:var(--font-accent)] text-[clamp(22px,2.4vw,34px)] italic text-fiamma">
            {dettagli(annuncio)}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Candidati annuncio={annuncio} dark />
            <Link href="/lavora-con-noi" className="cin-link whitespace-nowrap">
              Tutte le posizioni
            </Link>
          </div>
        </div>
      </section>

      <section
        className="bg-[var(--carta)] text-ghisa"
        data-header="light"
        aria-label="Testo dell’annuncio"
      >
        <div className="site-shell grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="min-w-0 lg:col-span-7">
            <Prosa content={annuncio.testo} />
            <div className="mt-12">
              <SocialShareBar route={router.asPath} title={annuncio.titolo} />
            </div>
          </div>
          <aside
            className="self-start rounded-[28px] bg-white p-8 lg:sticky lg:top-32 lg:col-span-4 lg:col-start-9"
            aria-labelledby="candidatura-title"
          >
            <h2
              id="candidatura-title"
              className="type-display text-[clamp(22px,2vw,28px)]"
            >
              Candidatura
            </h2>
            <dl className="mt-6">
              {scheda.map(([voce, valore]) => (
                <div key={voce} className="border-t border-ghisa/15 py-3">
                  <dt className="text-sm text-acciaio">{voce}</dt>
                  <dd className="mt-1">{valore}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6">
              <Candidati annuncio={annuncio} />
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps({params}) {
  const annuncio = await getAnnuncio(params.slug)
  // un annuncio tolto dal sito (posizione coperta) dà 404
  if (!annuncio?.slug) return {notFound: true, revalidate: 60}
  return {props: {annuncio}, revalidate: ogni(3600)}
}
// Generata alla prima visita: se il pannello è lento i tentativi di riserva superano i 10 s di Vercel
export const config = {maxDuration: 60}

export async function getStaticPaths() {
  return {paths: [], fallback: 'blocking'}
}
