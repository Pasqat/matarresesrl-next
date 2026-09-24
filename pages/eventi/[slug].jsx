import {useRouter} from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import AperturaEditoriale, {
  Copertina,
} from '../../components/editoriale/AperturaEditoriale'
import Prosa from '../../components/editoriale/Prosa'
import FormModal from '../../components/Form/FormModal'
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
        className={dark ? 'cta-fiamma' : 'cta-ghisa'}
        href={event.external_link.link}
      >
        Partecipa
      </a>
    )
  return (
    <div
      className={
        dark
          ? '[&>button]:rounded-none [&>button]:border-fiamma [&>button]:bg-fiamma [&>button]:text-ghisa [&>button]:hover:border-white [&>button]:hover:bg-white'
          : '[&>button]:rounded-none'
      }
    >
      <FormModal
        buttonText="Partecipa"
        type="reservation"
        title={event.title}
        withButton
      />
    </div>
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

      <AperturaEditoriale
        back={{href: '/eventi', label: 'Tutti gli eventi'}}
        meta={
          <span
            className={`inline-block border px-3 py-1 text-sm ${
              event.isFutureDate
                ? 'border-fiamma text-fiamma'
                : 'border-inox/40 text-inox-muted'
            }`}
          >
            {event.isFutureDate ? 'In programma' : 'Evento concluso'}
          </span>
        }
        title={event.title}
      >
        <div className="type-display mt-8 text-[clamp(24px,2.6vw,40px)] text-fiamma">
          {data}
        </div>
        {orario && <p className="mt-3 text-lg text-inox">{orario}</p>}
        {event.isFutureDate && (
          <div className="mt-10">
            <Partecipa event={event} dark />
          </div>
        )}
      </AperturaEditoriale>
      <Copertina
        image={{src: image, alt: event.featuredImage?.node?.altText}}
        contain
      />

      <section
        className="bg-white text-ghisa"
        data-header="light"
        aria-label="Programma dell’evento"
      >
        <div className="site-shell grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="min-w-0 lg:col-span-7">
            <Prosa content={event.content} />
            <SocialShareBar route={router.asPath} title={event.title} />
          </div>
          <aside
            className="self-start bg-calce p-8 lg:sticky lg:top-32 lg:col-span-4 lg:col-start-9"
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
                <Link
                  href="/eventi"
                  className="inline-block border-b border-ghisa py-2 hover:text-fiamma-testo"
                >
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
