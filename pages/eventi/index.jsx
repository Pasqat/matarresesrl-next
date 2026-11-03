import Head from 'next/head'
import Link from 'next/link'

import {getEvents} from '../../lib/query/event'

import Layout from '../../components/Layout'
import HeroCinema from '../../components/cinema/HeroCinema'
import TitoloDueTempi from '../../components/cinema/TitoloDueTempi'
import {Freccia} from '../../components/cinema/BottoneFreccia'
import posterImg from '../../public/img/home/sede-poster.webp'
import ContactModal from '../../components/Form/ContactModal'

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
        className="group grid grid-cols-[4.5rem_1fr] items-start gap-5 rounded-[24px] bg-white p-6 transition-shadow hover:shadow-[0_0_0_1px_rgb(30_34_38/.2)] md:grid-cols-[8rem_1fr_auto] md:items-center md:gap-8 md:p-8"
      >
        <div>
          <span
            className={`block font-[family-name:var(--font-accent)] text-[48px] italic leading-none md:text-[64px] ${
              futuro ? 'text-fiamma-testo' : 'text-acciaio'
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
          <span className="cin-btn col-start-2 self-start md:col-start-3 md:self-center">
            Partecipa
            <Freccia />
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
        <title>Eventi, demo e corsi per la ristorazione | Matarrese srl</title>
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
          content="Workshop, masterclass e demo nel laboratorio di Alberobello: tecniche di cottura, conservazione e uso delle attrezzature professionali."
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
        <HeroCinema
          image={posterImg}
          alt="L’arena del gusto nella sede Matarrese di Alberobello"
          objectPosition="50% 50%"
          video={[
            {src: '/video/sede-960.mp4', media: '(max-width: 767px)'},
            {src: '/video/sede-1920.mp4'},
          ]}
          eyebrow="Workshop · Masterclass · Demo · Alberobello"
          riga="Eventi formativi e dimostrativi"
          accento="per la ristorazione."
          sottotitolo="Incontriamoci in cucina: tecniche di cottura, conservazione e attrezzature al lavoro, nel laboratorio della nostra sede."
        >
          <a href="#prossimi" className="cin-btn">
            Prossimi eventi
            <Freccia />
          </a>
        </HeroCinema>

        <section
          id="prossimi"
          className="scroll-mt-20 bg-[var(--carta)] text-ghisa"
          data-header="light"
          aria-labelledby="prossimi-title"
        >
          <div className="site-shell py-24 lg:py-32">
            <TitoloDueTempi
              id="prossimi-title"
              tono="chiaro"
              riga="Prossimi"
              accento="eventi."
              className="text-[clamp(36px,4.4vw,64px)] !leading-none"
            />
            {data.futureEvent.length ? (
              <ul className="mt-12 grid gap-3">
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
          className="bg-[#121315] text-white [&_:focus-visible]:outline-fiamma"
          data-header="dark"
          aria-label="Presentazioni e demo nei nostri laboratori"
        >
          <div className="site-shell grid gap-4 py-24 md:grid-cols-2 lg:py-32">
            <div className="rounded-[28px] border border-inox/15 bg-white/[.04] p-8 md:p-10">
              <h3 className="type-display max-w-[24ch] text-[clamp(22px,2.2vw,32px)] leading-tight">
                Sei un’azienda e vuoi presentare un tuo prodotto o
                un’attrezzatura nei nostri laboratori?
              </h3>
              <p className="mt-5 max-w-[48ch] text-inox-muted">
                Disponiamo di ampi laboratori attrezzati per realizzare eventi
                formativi, informativi e commerciali per il settore food.
              </p>
              <ContactModal
                variant="info"
                className="cin-btn cin-btn--ghost mt-8"
                title="Organizza un evento nei nostri laboratori."
                subtitle="Formazione, presentazioni, incontri per il settore food: raccontaci cosa hai in mente."
              >
                Contattaci
              </ContactModal>
            </div>
            <div className="rounded-[28px] border border-inox/15 bg-white/[.04] p-8 md:p-10">
              <h3 className="type-display max-w-[24ch] text-[clamp(22px,2.2vw,32px)] leading-tight">
                Vuoi venire a toccare con mano attrezzature innovative?
              </h3>
              <p className="mt-5 max-w-[48ch] text-inox-muted">
                Scegli tu il giorno e l&apos;ora, noi organizzeremo una demo
                personalizzata per mostrarti il funzionamento delle attrezzature
                ho.re.ca. che desideri conoscere.
              </p>
              <ContactModal
                variant="showroom"
                source="eventi-demo"
                className="cin-btn mt-8"
                title="Richiedi una demo personalizzata."
                subtitle="Scegli tu il giorno: ti mostriamo al lavoro le attrezzature che vuoi conoscere, nello showroom di Alberobello."
              >
                Richiedi una demo
                <Freccia />
              </ContactModal>
            </div>
          </div>
        </section>

        {data.pastEvent.length > 0 && (
          <section
            className="bg-[var(--carta)] text-ghisa"
            data-header="light"
            aria-labelledby="conclusi-title"
          >
            <div className="site-shell py-24 lg:py-32">
              <TitoloDueTempi
                id="conclusi-title"
                tono="chiaro"
                riga="Eventi"
                accento="conclusi."
                className="text-[clamp(36px,4.4vw,64px)] !leading-none"
              />
              <ul className="mt-12 grid gap-3">
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
