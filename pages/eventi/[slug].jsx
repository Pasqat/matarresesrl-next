import {useRouter} from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

import Layout from '../../components/Layout'
import Header from '../../components/Header/Header'
import EventBody from '../../components/Events/event-body'
import Date from '../../components/Date'
import HeaderBig from '../../components/Header/HeaderBig'
import FormModal from '../../components/Form/FormModal'
import SocialShareBar from '../../components/SocialShareBar/SocialShareBar'
import {H2, H3} from '../../components/typography'

import {getAllEventsWithSlug, getEvent} from '../../lib/event_api'
import {formatDate, getHour} from '../../actions/utils/formatDate'

export default function Events({event}) {
  const router = useRouter()

  if (!router.isFallback && !event.slug) {
    return <p>hmm...sembra ci sia un errore</p>
  }

  // take n String arguments and join them
  // in split case (this-is-split-case)
  function addressToMapsLink(...props) {
    let parsedAddress = []

    for (let element of props) {
      parsedAddress.push(element.split(/\W/).join('+'))
    }

    return parsedAddress.join('+')
  }

  return (
    <Layout navbarTransparent>
      {/* <Layout > */}
      {router.isFallback ? (
        <>
          <Header href="/eventi">Eventi</Header>
          <Head>
            <title>Matarrese srl | Eventi</title>
          </Head>
          <main>
            <H2 variant="secondary">Caricamento di tutti gli eventi</H2>
          </main>
        </>
      ) : (
        <>
          <HeaderBig
            noButton
            overlay="bg-gradient-to-tl from-secondary via-primary to-black opacity-80"
            slopeSectionColor="text-gray-100"
            backgroundImgSrc={
              event.featuredImage &&
              `url(${event.featuredImage.node.sourceUrl})`
            }
          />
          <section className="relative pb-24 pt-16 w-full text-gray-800 bg-gray-100">
            <div className="container mx-auto px-4">
              <div className="relative lg:flex lg:flex-row">
                <div className="relative flex flex-col -mt-80 mb-6 w-full min-w-0 break-words bg-white shadow-lg lg:-mt-64">
                  <div className="px-6">
                    <div className="flex flex-wrap justify-center mt-8">
                      <div className="flex items-center justify-center">
                        <div className="mb-2 text-left text-gray-800">
                          {formatDate(event.startDate) ===
                          formatDate(event.endDate) ? (
                            <>
                              <span className="block text-gray-600 text-xl font-bold tracking-wide uppercase">
                                <Date dateString={event.startDate} />
                              </span>
                              <span className="block text-yellow-500 text-lg font-bold">
                                h {getHour(event.startDate)} -{' '}
                                {getHour(event.endDate)}
                              </span>
                            </>
                          ) : (
                            <>
                              dal{' '}
                              <span className="text-gray-600 text-xl font-bold tracking-wide uppercase">
                                <Date dateString={event.startDate} />
                              </span>
                              <br />
                              al{' '}
                              <span className="text-gray-600 text-xl font-bold tracking-wide uppercase">
                                <Date dateString={event.startDate} />
                              </span>
                              <span className="block text-yellow-500 text-lg font-bold">
                                h {getHour(event.startDate)} -{' '}
                                {getHour(event.endDate)}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="self-center px-4 w-4/12 text-right">
                        <FormModal
                          buttonText="Partecipa"
                          buttonClassName="px-4 py-2 mb-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-gradient-to-tl from-primary to-secondary rounded shadow outline-none active:bg-yellow-500 hover:shadow-md focus:outline-none sm:mr-2"
                          type="reservation"
                          title={event.title}
                        />
                      </div>
                    </div>
                    <div className="mt-12">
                      <H3 className="mb-2 text-center" variant="secondary">
                        {event.title}
                      </H3>
                      {/* FIXME: with the latest version of the event calendar WP
                        ql-event can't fetch venue and organization */}
                      {/* {event.venue && (
                        <div className="mb-2 mt-0 text-gray-400 text-sm font-bold leading-normal uppercase">
                          <i className="fas fa-map-marker-alt mr-2 text-gray-400 text-lg"></i>{' '}
                          <a
                            href={`https://maps.google.com/?q=${addressToMapsLink(
                              event.venue.title,
                              event.venue.city,
                              event.venue.address,
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {event.venue.title} - {event.venue.address},{' '}
                            {event.venue.city}
                          </a>
                        </div>
                      )}
                      {event.organizers && (
                        <div className="mb-2 mt-10 text-gray-600">
                          <i className="fas fa-briefcase mr-2 text-gray-400 text-lg"></i>
                          Organizzato da:{' '}
                          <a href={event.organizers?.nodes[0].link}>
                            {event.organizers?.nodes[0].title}
                          </a>
                        </div>
                      )} */}
                    </div>

                    <div className="mt-10 py-10 border-t border-gray-200">
                      <div className="flex flex-wrap justify-center">
                        <div className="px-4 w-full lg:w-9/12">
                          <EventBody content={event.content} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <SocialShareBar route={router.asPath} title={event.title} />
              </div>
              <div className="flex justify-center">
                <Link href="/eventi">
                  <a className="mt-10 p-4 text-center bg-white rounded shadow-lg hover:shadow-sm uppercase">
                    Eventi
                  </a>
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </Layout>
  )
}

export async function getStaticProps({params}) {
  const data = await getEvent(params.slug)

  return {
    props: {
      event: data.event,
    },
    revalidate: 60 * 60 * 24,
  }
}

export async function getStaticPaths() {
  const allEvents = await getAllEventsWithSlug()

  return {
    paths: allEvents.edges.map(({node}) => `/eventi/${node.slug}`) || [],
    fallback: true,
  }
}
