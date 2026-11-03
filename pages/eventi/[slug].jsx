import {useRouter} from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import Image from 'next/image'
import {Freccia} from '../../components/cinema/BottoneFreccia'
import Prosa from '../../components/editoriale/Prosa'
import ContactModal from '../../components/Form/ContactModal'
import SocialShareBar from '../../components/SocialShareBar/SocialShareBar'
import {getEvent} from '../../lib/query/event'
import {SeoDataSection} from '../../components/sections/seodata-section'
import StructuredData from '../../components/StructuredData'
import {eventSchema, breadcrumbSchema} from '../../lib/seo/schema'

// Iscrizione invariata: link esterno se presente, altrimenti il modulo di prenotazione.
function Partecipa({event, dark}) {
  if (event.external_link?.link)
    return (
      <a
        className={dark ? 'cin-btn' : 'cta-ghisa'}
        href={event.external_link.link}
      >
        Partecipa
        {dark && <Freccia />}
      </a>
    )
  return (
    <ContactModal
      variant="info"
      className={dark ? 'cin-btn' : 'cta-ghisa'}
      reservation={{title: event.title}}
    >
      Partecipa
      {dark && <Freccia />}
    </ContactModal>
  )
}

export default function Events({event}) {
  const router = useRouter()
  if (router.isFallback || !event)
    return (
      <Layout>
        <p className="site-shell py-24" role="status">
          Caricamento dell’evento…
        </p>
      </Layout>
    )
  // Schema.org Event JSON-LD
  const eventStructuredData =
    event &&
    eventSchema({
      title: event.title,
      description: event.seo?.metaDesc || event.title,
      slug: event.slug,
      image: event.featuredImage?.node?.mediaItemUrl,
      startDate: event.startDateISO,
      endDate: event.endDateISO,
      venue: event.venue
        ? {
            venue: event.venue.title,
            address: event.venue.address,
            city: event.venue.city,
            country: event.venue.country,
          }
        : null,
      externalLink: event.external_link?.link || null,
    })

  const eventBreadcrumb =
    event &&
    event.slug &&
    breadcrumbSchema([
      {name: 'Eventi', path: '/eventi'},
      {name: event.title, path: `/eventi/${event.slug}`},
    ])

  const image = event.featuredImage?.node?.mediaItemUrl
  const data = (
    <time dateTime={event.startDateISO}>
      {event.startDate}
      {event.endDate !== event.startDate && ` – ${event.endDate}`}
    </time>
  )
  const orario = !event.allDay && `${event.startHour} – ${event.endHour}`
  const luogo = event.venue && (
    <a
      className="underline decoration-1 underline-offset-4 hover:no-underline"
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        [event.venue.title, event.venue.address, event.venue.city]
          .filter(Boolean)
          .join(', '),
      )}`}
      target="_blank"
      rel="noreferrer"
    >
      {[event.venue.title, event.venue.city].filter(Boolean).join(' · ')}
    </a>
  )
  const scheda = [
    ['Data', data],
    ['Orario', orario],
    ['Luogo', luogo],
  ].filter(([, valore]) => valore)

  return (
    <Layout navbarTransparent>
      <Head>
        {SeoDataSection({seoData: event.seo, slug: `eventi/${event.slug}`})}
      </Head>
      <StructuredData data={eventStructuredData} />
      <StructuredData data={eventBreadcrumb} />

      {/* Apertura scura: la locandina resta intera (ha il testo dentro), in una card accanto al titolo */}
      <section
        className="bg-[#0d0e0f] text-white [&_:focus-visible]:outline-fiamma"
        data-header="dark"
        aria-labelledby="page-title"
      >
        <div className="site-shell grid gap-12 pb-20 pt-36 lg:grid-cols-12 lg:items-center lg:pb-28 lg:pt-44">
          <div className="lg:col-span-6">
            <span className="eyebrow-cinema">
              {event.isFutureDate ? 'In programma' : 'Evento concluso'}
            </span>
            <h1
              id="page-title"
              className="type-display mt-6 hyphens-auto text-[clamp(36px,4.6vw,72px)] !leading-[0.98] [overflow-wrap:break-word]"
              dangerouslySetInnerHTML={{__html: event.title}}
            />
            <div className="mt-8 font-[family-name:var(--font-accent)] text-[clamp(26px,2.8vw,40px)] italic text-fiamma">
              {data}
            </div>
            {orario && (
              <p className="mt-2 text-lg text-[rgb(243_238_230/.75)]">
                {orario}
              </p>
            )}
            <div className="mt-10 flex flex-wrap items-center gap-6">
              {event.isFutureDate && <Partecipa event={event} dark />}
              <Link href="/eventi" className="cin-link whitespace-nowrap">
                Tutti gli eventi
              </Link>
            </div>
          </div>
          {image && (
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-[#1b1d20] lg:col-span-5 lg:col-start-8">
              <Image
                src={image}
                alt={event.featuredImage?.node?.altText || ''}
                fill
                preload
                fetchPriority="high"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-contain"
              />
            </div>
          )}
        </div>
      </section>

      <section
        className="bg-[var(--carta)] text-ghisa"
        data-header="light"
        aria-label="Programma dell’evento"
      >
        <div className="site-shell grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="min-w-0 lg:col-span-7">
            <Prosa content={event.content} />
            <div className="mt-12">
              <SocialShareBar route={router.asPath} title={event.title} />
            </div>
          </div>
          <aside
            className="self-start rounded-[28px] bg-white p-8 lg:sticky lg:top-32 lg:col-span-4 lg:col-start-9"
            aria-labelledby="iscrizione-title"
          >
            <h2
              id="iscrizione-title"
              className="type-display text-[clamp(22px,2vw,28px)]"
            >
              {event.isFutureDate ? 'Iscrizione' : 'Evento concluso'}
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
              {event.isFutureDate ? (
                <Partecipa event={event} />
              ) : (
                <Link href="/eventi" className="cta-ghisa">
                  Guarda i prossimi eventi
                </Link>
              )}
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  )
}
export async function getStaticProps({params}) {
  const event = await getEvent(params.slug)
  if (!event?.slug) return {notFound: true, revalidate: 60}
  return {props: {event}, revalidate: 86400}
}
export async function getStaticPaths() {
  // Nessun dettaglio in build: l'hosting WordPress rifiuta le raffiche di richieste dai
  // server di build Vercel. Ogni pagina si genera alla prima visita e poi resta in cache (ISR);
  // la sitemap li elenca comunque tutti (next-sitemap.config.js).
  return {paths: [], fallback: 'blocking'}
}
