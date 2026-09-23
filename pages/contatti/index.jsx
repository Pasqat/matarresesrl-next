import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import ContactForm from '../../components/Form/ContactForm'
import Map from '../../components/Maps/Map'
import {getGroups} from '../../lib/newsletter'
export default function Contatti({groups}) {
  return (
    <>
      <Head>
        <title>Contatti | Matarrese srl</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_DOMAIN}/contatti/`}
        />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="Fatti ispirare dalle nostre soluzioni. Visita il nostro showroom!"
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta property="og:title" content="Contatti" />
        <meta property="og:description" content="Visita il nostro showroom!" />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/img/piazza_grande_61.jpg`}
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/contatti/`}
        />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Matarrese srl" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Layout navbarTransparent>
        <PageHero
          title={
            <>
              Conosciamoci.
              <br />
              Il tuo progetto parte da qui.
            </>
          }
          tall={false}
        >
          {/* Recapiti protagonisti: grandi e cliccabili già nell'apertura */}
          <div className="flex w-full flex-col gap-6">
            <div>
              <p className="text-sm text-inox-muted">Telefono</p>
              <a
                href="tel:+390804323431"
                className="type-display mt-1 inline-block whitespace-nowrap border-b border-inox/40 pb-1 text-[clamp(24px,6.4vw,56px)] transition-colors hover:border-fiamma hover:text-fiamma focus-visible:outline-fiamma"
              >
                +39 080 4323 431
              </a>
            </div>
            <div>
              <p className="text-sm text-inox-muted">Email</p>
              <a
                href="mailto:matarrese@matarrese.it"
                className="type-display mt-1 inline-block whitespace-nowrap border-b border-inox/40 pb-1 text-[clamp(18px,5vw,56px)] transition-colors hover:border-fiamma hover:text-fiamma focus-visible:outline-fiamma"
              >
                matarrese@matarrese.it
              </a>
            </div>
          </div>
        </PageHero>

        <section
          className="bg-calce text-ghisa"
          data-header="light"
          aria-label="Showroom, orari e assistenza"
        >
          <div className="site-shell grid gap-12 py-20 md:grid-cols-3 lg:py-28">
            <div className="border-t border-ghisa/15 pt-6">
              <h2 className="type-display text-2xl">Vieni in showroom</h2>
              <p className="mt-4 text-lg">
                Contrada Popoleto, n.c.
                <br />
                70011 Alberobello (BA)
              </p>
              <a
                className="mt-4 inline-block border-b border-ghisa py-1 transition-colors hover:text-fiamma-testo"
                href="https://www.google.com/maps/search/?api=1&query=Matarrese+srl+Alberobello"
                target="_blank"
                rel="noreferrer"
              >
                Indicazioni stradali
              </a>
            </div>
            <div className="border-t border-ghisa/15 pt-6">
              <h2 className="type-display text-2xl">Quando trovarci</h2>
              <dl className="mt-4 text-lg">
                <dt className="text-acciaio">Lunedì – venerdì</dt>
                <dd>
                  09:00 – 13:00
                  <span className="text-acciaio"> / </span>
                  15:00 – 18:30
                </dd>
                <dt className="mt-3 text-acciaio">Sabato e domenica</dt>
                <dd>chiuso</dd>
              </dl>
            </div>
            <div className="border-t border-ghisa/15 pt-6">
              {/* copy da approvare (titolo della colonna) */}
              <h2 className="type-display text-2xl">Assistenza tecnica</h2>
              <p className="mt-4 max-w-[34ch] text-acciaio">
                {/* copy da approvare */}
                Per un guasto o una manutenzione usa il modulo dedicato.
              </p>
              <a
                href="tel:+390804323651"
                className="mt-4 block w-fit whitespace-nowrap text-lg transition-colors hover:text-fiamma-testo"
              >
                +39 080 4323 651
              </a>
              <Link
                className="mt-4 inline-block border-b border-ghisa py-1 transition-colors hover:text-fiamma-testo"
                href="/assistenza"
              >
                Hai bisogno di assistenza?
              </Link>
            </div>
          </div>
        </section>

        {/* Mappa a tutta larghezza: Map è `absolute inset-0`, l'altezza è qui.
            Senza NEXT_PUBLIC_MAPS_API mostra il suo fallback con il link. */}
        <section
          className="relative h-[360px] bg-[var(--steel)] lg:h-[520px]"
          data-header="light"
          aria-label="Mappa dello showroom"
        >
          <Map />
        </section>

        <section
          id="contatto"
          className="bg-white text-ghisa"
          data-header="light"
          aria-labelledby="contatto-title"
        >
          <div className="site-shell pb-4 pt-24">
            <h2
              id="contatto-title"
              className="type-display max-w-[22ch] text-[clamp(30px,3.6vw,56px)]"
            >
              Hai un progetto da realizzare o hai bisogno di informazioni?
            </h2>
            <p className="mt-6 max-w-[52ch] text-lg text-acciaio">
              Completa questo modulo, un nostro consulente ti ricontatterà.
            </p>
          </div>
          <div className="pb-24">
            <ContactForm groups={groups} compact />
          </div>
        </section>
      </Layout>
    </>
  )
}
export async function getStaticProps() {
  const groups = await getGroups()

  return {
    props: {
      groups,
    },
  }
}
