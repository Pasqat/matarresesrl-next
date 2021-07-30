import { useRouter } from "next/router";
import Head from "next/head";

import Layout from "../../components/Layout";
import Date from "../../components/Date";
import Header from "../../components/Header/Header";
import EventBody from "../../components/Events/event-body";

import { getAllEventsWithSlug, getEvent } from "../../lib/api";
import HeaderBig from "../../components/Header/HeaderBig";

export default function Events({ event }) {
  const router = useRouter();
  // const moreEvents = events?.edges

  if (!router.isFallback && !event.slug) {
    return <p>hmm...sembra ci sia un errore</p>;
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
          <HeaderBig noButton slopeSectionColor="text-gray-100" />
          <div className="w-full text-gray-800 bg-gray-100">
            <section className="relative pt-16 pb-24 bg-gray-100">
              <div className="container mx-auto px-4">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                  <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                        <div className="relative">
                          <img
                            alt="..."
                            src="/img/prodotti-qualita-150x150.jpg"
                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                        <div className="py-6 px-3 mt-32 sm:mt-0">
                          <button
                            className="bg-yellow-600 active:bg-yellow-500 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                            type="button"
                          >
                            Partecipa
                          </button>
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12 px-4 lg:order-1">
                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                          <div className="mr-4 p-3 text-center">
                            <span className="text-xl font-bold block uppercase tracking-wide text-gray-600">
                              22
                            </span>
                            <span className="text-sm text-gray-400">
                              Friends
                            </span>
                          </div>
                          <div className="mr-4 p-3 text-center">
                            <span className="text-xl font-bold block uppercase tracking-wide text-gray-600">
                              10
                            </span>
                            <span className="text-sm text-gray-400">
                              Photos
                            </span>
                          </div>
                          <div className="lg:mr-4 p-3 text-center">
                            <span className="text-xl font-bold block uppercase tracking-wide text-gray-600">
                              89
                            </span>
                            <span className="text-sm text-gray-400">
                              Comments
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-12">
                      <h3 className="text-4xl font-semibold leading-normal text-gray-700 mb-2">
                        {event.title}
                      </h3>
                      <div className="text-sm leading-normal mt-0 mb-2 text-gray-400 font-bold uppercase">
                        <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-400"></i>{" "}
                        {event.venue.title} - {event.venue.address},{" "}
                        {event.venue.city}
                      </div>
                      <div className="mb-2 text-gray-600 mt-10">
                        <i className="fas fa-briefcase mr-2 text-lg text-gray-400"></i>
                        Organizzato da:{" "}
                        <a href={event.organizers.nodes[0].link}>
                          {event.organizers.nodes[0].title}
                        </a>
                      </div>
                      <div className="mb-2 text-gray-600">
                        <i className="fas fa-clock mr-2 text-lg text-gray-400"></i>
                        {event.startDate} - {event.endDate}
                      </div>
                    </div>
                    <div className="mt-10 py-10 border-t border-gray-200 text-center">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-9/12 px-4">
                          <EventBody content={event.content} />
                          <a
                            href="#"
                            className="font-normal text-yellow-500"
                            onClick={(e) => e.preventDefault()}
                          >
                            Altri dettagli
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const data = await getEvent(params.id);

  return {
    props: {
      event: data.event,
    },
  };
}

export async function getStaticPaths() {
  const allEvents = await getAllEventsWithSlug();

  return {
    paths: allEvents.edges.map(({ node }) => `/eventi/${node.slug}`) || [],
    fallback: true,
  };
}
