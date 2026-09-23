import Head from 'next/head'
import Link from 'next/link'

import {getEvents} from '../../lib/query/event'

import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import FormModal from '../../components/Form/FormModal'

// Riga evento: data in evidenza (le date arrivano già formattate, es. "3 marzo 2026").
function RigaEvento({event, futuro}) {
  const [giorno, ...resto] = String(event.startDate).split(' ')
  const periodo =
    event.startDate === event.endDate
      ? null
      : `${event.startDate} – ${event.endDate}`
  return (
    <li>
      <Link
        href={`/eventi/${event.slug}`}
        className="group grid grid-cols-[4.5rem_1fr] items-start gap-5 border-t border-ghisa/15 py-8 md:grid-cols-[8rem_1fr_auto] md:items-center md:gap-8"
      >
        <div className="type-display">
          <span
            className={`block text-[40px] leading-none md:text-[56px] ${
              futuro ? 'text-fiamma-testo' : ''
            }`}
          >
            {giorno}
          </span>
          <span className="mt-2 block text-sm text-acciaio">
            {resto.join(' ')}
          </span>
        </div>
        <div>
          <h3
            className="type-display text-[clamp(20px,2.2vw,32px)] leading-tight transition-colors group-hover:text-fiamma-testo"
            dangerouslySetInnerHTML={{__html: event.title}}
          />
          {periodo && (
            <span className="mt-2 block text-sm text-acciaio">{periodo}</span>
          )}
        </div>
        {futuro && (
          <span className="col-start-2 self-start border-b border-ghisa py-1 transition-colors group-hover:text-fiamma-testo md:col-start-3 md:self-center">
            Partecipa
          </span>
        )}
      </Link>
    </li>
  )
}

export default function Events({data}) {
  return (
    <>
      <Head>
        <title>Eventi per l&apos;ho.re.ca | Matarrese srl</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_DOMAIN}/eventi`}
        />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta
          name="description"
          content="Laboratori di cucina attrezzati, formazione professionale in cucina, show cooking e dimostrazione attrezzature per la ristorazione"
        />
        <meta property="og:title" content="Eventi" />
        <meta
          property="og:description"
          content="I prossimi eventi che si terranno a cura di Matarrese srl. Approfondimenti, master class, demo ed altro"
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/eventi`}
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/img/piazza_grande_61.jpg`}
        />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Matarrese srl" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Layout navbarTransparent>
        <PageHero
          title="Eventi formativi e dimostrativi per la ristorazione"
          intro="Incontriamoci in cucina."
        />

        <section
          className="bg-white text-ghisa"
          data-header="light"
          aria-labelledby="prossimi-title"
        >
          <div className="site-shell py-24 lg:py-32">
            <h2
              id="prossimi-title"
              className="type-display text-[clamp(30px,3.4vw,52px)]"
            >
              Prossimi eventi
            </h2>
            {data.futureEvent.length ? (
              <ul className="mt-12 border-b border-ghisa/15">
                {data.futureEvent.map(event => (
                  <RigaEvento key={event.id} event={event} futuro />
                ))}
              </ul>
            ) : (
              <p className="mt-6 max-w-[48ch] text-lg text-acciaio">
                Non ci sono eventi disponibili al momento.
              </p>
            )}
          </div>
        </section>

        <section
          className="bg-ghisa text-white [&_:focus-visible]:outline-fiamma"
          data-header="dark"
          aria-label="Presentazioni e demo nei nostri laboratori"
        >
          <div className="site-shell grid gap-x-10 gap-y-14 py-24 md:grid-cols-2 lg:py-32">
            <div className="border-t border-inox/25 pt-8">
              <h3 className="type-display max-w-[24ch] text-[clamp(22px,2.2vw,32px)] leading-tight">
                Sei un’azienda e vuoi presentare un tuo prodotto o
                un’attrezzatura nei nostri laboratori?
              </h3>
              <p className="mt-5 max-w-[48ch] text-inox-muted">
                Disponiamo di ampi laboratori attrezzati per realizzare eventi
                formativi, informativi e commerciali per il settore food.
              </p>
              <Link
                href="/contatti"
                className="mt-8 inline-block border-b border-inox/60 py-2 text-white transition-colors hover:border-white"
              >
                Contattaci
              </Link>
            </div>
            <div className="border-t border-inox/25 pt-8">
              <h3 className="type-display max-w-[24ch] text-[clamp(22px,2.2vw,32px)] leading-tight">
                Vuoi venire a toccare con mano attrezzature innovative?
              </h3>
              <p className="mt-5 max-w-[48ch] text-inox-muted">
                Scegli tu il giorno e l&apos;ora, noi organizzeremo una demo
                personalizzata per mostrarti il funzionamento delle attrezzature
                ho.re.ca. che desideri conoscere.
              </p>
              <div className="mt-8 [&>button]:rounded-none [&>button]:border-fiamma [&>button]:bg-fiamma [&>button]:text-ghisa [&>button]:hover:border-white [&>button]:hover:bg-white">
                <FormModal
                  title="Richiedi una demo personalizzata"
                  buttonText="Richiedi una demo"
                  withButton
                />
              </div>
            </div>
          </div>
        </section>

        {data.pastEvent.length > 0 && (
          <section
            className="bg-white text-ghisa"
            data-header="light"
            aria-labelledby="conclusi-title"
          >
            <div className="site-shell py-24 lg:py-32">
              <h2
                id="conclusi-title"
                className="type-display text-[clamp(30px,3.4vw,52px)]"
              >
                Eventi conclusi
              </h2>
              <ul className="mt-12 border-b border-ghisa/15">
                {data.pastEvent.map(event => (
                  <RigaEvento key={event.id} event={event} />
                ))}
              </ul>
            </div>
          </section>
        )}
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const data = await getEvents()

  return {
    props: {
      data,
    },
    revalidate: 60 * 60 * 12,
  }
}
