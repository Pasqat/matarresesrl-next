import {useRouter} from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../../components/Layout'
import EventBody from '../../components/Events/event-body'
import FormModal from '../../components/Form/FormModal'
import SocialShareBar from '../../components/SocialShareBar/SocialShareBar'
import {getAllEventsWithSlug, getEvent} from '../../lib/query/event'
import {SeoDataSection} from '../../components/sections/seodata-section'
import StructuredData from '../../components/StructuredData'
import {eventSchema, breadcrumbSchema} from '../../lib/seo/schema'
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
  return (
    <Layout>
      <Head>
        {SeoDataSection({seoData: event.seo, slug: `eventi/${event.slug}`})}
      </Head>
      <StructuredData data={eventStructuredData} />
      <StructuredData data={eventBreadcrumb} />
      <div className="site-shell detail-shell">
        <header className="detail-intro">
          <Link href="/eventi" className="text-link">
            Tutti gli eventi
          </Link>
          <h1 dangerouslySetInnerHTML={{__html: event.title}} />
          <div className="detail-meta">
            <time dateTime={event.startDateISO}>
              {event.startDate}
              {event.endDate !== event.startDate && ` – ${event.endDate}`}
            </time>
            {!event.allDay && (
              <span>
                {event.startHour} – {event.endHour}
              </span>
            )}
            {!event.isFutureDate && <span>Evento concluso</span>}
          </div>
          {event.venue && (
            <p className="mt-6">
              <a
                className="text-link"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  [event.venue.title, event.venue.address, event.venue.city]
                    .filter(Boolean)
                    .join(', '),
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                {event.venue.title} · {event.venue.city}
              </a>
            </p>
          )}
          {event.isFutureDate && (
            <div className="mt-8">
              {event.external_link?.link ? (
                <a className="site-button" href={event.external_link.link}>
                  Partecipa
                </a>
              ) : (
                <FormModal
                  buttonText="Partecipa"
                  buttonClassName="site-button"
                  type="reservation"
                  title={event.title}
                  withButton
                />
              )}
            </div>
          )}
        </header>
        {image && (
          <div className="detail-cover">
            <Image
              src={image}
              alt={event.featuredImage.node.altText || event.title}
              fill
              priority
              sizes="90vw"
              style={{objectFit: 'contain'}}
            />
          </div>
        )}
        <div className="detail-body">
          <EventBody content={event.content} />
        </div>
        <SocialShareBar route={router.asPath} title={event.title} />
        <Link className="text-link" href="/eventi">
          Torna agli eventi
        </Link>
      </div>
    </Layout>
  )
}
export async function getStaticProps({params}) {
  const event = await getEvent(params.slug)
  if (!event?.slug) return {notFound: true, revalidate: 60}
  return {props: {event}, revalidate: 86400}
}
export async function getStaticPaths() {
  const allEvents = await getAllEventsWithSlug()
  return {
    paths: (allEvents?.edges || []).map(({node}) => `/eventi/${node.slug}`),
    fallback: true,
  }
}
