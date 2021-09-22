import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import Layout from "../../components/Layout";
import Header from "../../components/Header/Header";
import EventBody from "../../components/Events/event-body";
import Date from "../../components/Date"
import HeaderBig from "../../components/Header/HeaderBig";
import FormModal from "../../components/Form/FormModal";
import SocialShareBar from "../../components/SocialShareBar/SocialShareBar";

import { getAllEventsWithSlug, getEvent } from "../../lib/api";
import { formatDate, getHour } from "../../actions/utils/formatDate"

export default function Events({ event }) {
  const router = useRouter();
  // const moreEvents = events?.edges

  if (!router.isFallback && !event.slug) {
    return <p>hmm...sembra ci sia un errore</p>;
  }

  // take n String arguments and join them
  // in split case (this-is-spilt-case)
  function addressToMapsLink(...props) {
    const parsedAddress = [];

    for (let element of props) {
      parsedAddress.push(element.split(/\W/).join("+"))
    }

    return parsedAddress.join("+")
  }


  return (
    <Layout navbarTransparent>
      {router.isFallback ? (
        <>
          <Header href="/eventi">Eventi</Header>
          <Head>
            <title>Matarrese srl | Eventi</title>
          </Head>
          <main>
            <h2>Caricamento di tutti gli eventi</h2>
          </main>
        </>
      ) : (
        <>
          <HeaderBig noButton overlay="bg-gradient-to-br from-purple-600 via-red-700 to-yellow-500 opacity-80" slopeSectionColor="text-gray-100" backgroundImgSrc={event.featuredImage && `url(${event.featuredImage.node.sourceUrl})`} />
          <section className="w-full relative pt-16 pb-24 bg-gray-100 text-gray-800">
            <div className="container px-4 mx-auto">
              <div className="relative lg:flex lg:flex-row">
                <div className="relative flex flex-col w-full min-w-0 mb-6 -mt-64 break-words bg-white shadow-lg">
                  <div className="px-6">
                    <div className="mt-8 flex flex-wrap justify-center">
                      <div className="flex items-center justify-center">
                        <div className="mb-2 text-left text-gray-800">
                          {formatDate(event.startDate) === formatDate(event.endDate) ? (
                            <>
                              <span className="block text-xl font-bold tracking-wide text-gray-600 uppercase">
                                <Date dateString={event.startDate} />
                              </span>
                              <span className="block text-lg font-bold text-yellow-500">
                                h {getHour(event.startDate)} - {getHour(event.endDate)}
                              </span>
                            </>
                          ) : (
                            <>
                              dal <span className="text-xl font-bold tracking-wide text-gray-600 uppercase"><Date dateString={event.startDate} /></span><br />
                              al <span className="text-xl font-bold tracking-wide text-gray-600 uppercase"><Date dateString={event.startDate} /></span>
                              <span className="block text-lg font-bold text-yellow-500 ">
                                h {getHour(event.startDate)} - {getHour(event.endDate)}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="px-4 w-4/12 text-right self-center">
                        <FormModal
                          buttonText="Partecipa"
                          buttonClassName="px-4 py-2 mb-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-gradient-to-tl from-red-600 to-yellow-400 rounded shadow outline-none active:bg-yellow-500 hover:shadow-md focus:outline-none sm:mr-2"
                          type="reservation"
                          title={event.title}
                        />
                      </div>
                    </div>
                    <div className="mt-12 text-center">
                      <h3 className="mb-2 text-4xl font-semibold leading-normal text-gray-700">
                        {event.title}
                      </h3>
                      <div className="mt-0 mb-2 text-sm font-bold leading-normal text-gray-400 uppercase">
                        <i className="mr-2 text-lg text-gray-400 fas fa-map-marker-alt"></i>{" "}
                        <a href={`https://maps.google.com/?q=${addressToMapsLink(event.venue?.title, event.venue?.city, event.venue?.address)}`} target="_blank">
                          {event.venue?.title} - {event.venue?.address},{" "}{event.venue?.city}
                        </a>
                      </div>
                      <div className="mt-10 mb-2 text-gray-600">
                        <i className="mr-2 text-lg text-gray-400 fas fa-briefcase"></i>
                        Organizzato da:{" "}
                        <a href={event.organizers?.nodes[0].link}>
                          {event.organizers?.nodes[0].title}
                        </a>
                      </div>
                    </div>

                    <div className="py-10 mt-10 text-center border-t border-gray-200">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full px-4 lg:w-9/12">
                          <EventBody content={event.content} />
                          {/* <a */}
                          {/*   href="#" */}
                          {/*   className="font-normal text-yellow-500" */}
                          {/*   onClick={(e) => e.preventDefault()} */}
                          {/* > */}
                          {/*   Altri dettagli */}
                          {/* </a> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <SocialShareBar
                  route={router.asPath}
                  title={event.title}
                />
              </div>
              <div className="flex justify-center ">
                <Link href="/eventi">
                  <a className="p-4 mt-10 text-center bg-white rounded shadow-lg uppercase hover:shadow-sm">
                    Eventi
                  </a>
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const data = await getEvent(params.slug);

  // console.log('params: ', params)
  // console.log('data: ', data)

  return {
    props: {
      event: data.event,
    },
  };
}

export async function getStaticPaths() {
  const allEvents = await getAllEventsWithSlug();

  console.log('All events: ', allEvents)
  console.log("-".repeat(6))
  console.log(allEvents.edges.map(({ node }) => `/eventi/${node.slug}`))

  return {
    paths: allEvents.edges.map(({ node }) => `/eventi/${node.sulg}`) || [],
    fallback: true,
  };
}
