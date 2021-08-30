import { useRouter } from "next/router";
import Head from "next/head";

import Layout from "../../components/Layout";
import Header from "../../components/Header/Header";
import EventBody from "../../components/Events/event-body";

import { getAllEventsWithSlug, getEvent } from "../../lib/api";
import HeaderBig from "../../components/Header/HeaderBig";
import Link from "next/link";
import FormModal from "../../components/Form/FormModal";

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
              <div className="container px-4 mx-auto">
                <div className="relative flex flex-col w-full min-w-0 mb-6 -mt-64 break-words bg-white rounded-lg shadow-xl">
                  <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                      <div className="flex justify-center w-full px-4 lg:w-3/12 lg:order-2">
                        <div className="relative">
                          <img
                            alt="..."
                            src="/img/prodotti-qualita-150x150.jpg"
                            className="absolute h-auto -m-16 -ml-20 align-middle border-none rounded-full shadow-xl lg:-ml-16 max-w-150-px"
                          />
                        </div>
                      </div>
                      <div className="w-full px-4 lg:w-4/12 lg:order-3 lg:text-right lg:self-center">
                        <div className="px-3 py-6 mt-32 sm:mt-0">
                          <FormModal
                            buttonText="Partecipa"
                            buttonClassName="px-4 py-2 mb-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-yellow-600 rounded shadow outline-none active:bg-yellow-500 hover:shadow-md focus:outline-none sm:mr-2"
                            type="reservation"
                            title={event.title}
                          />
                        </div>
                      </div>
                      <div className="w-full px-4 lg:w-4/12 lg:order-1">
                        {/* <div className="flex justify-center py-4 pt-8 lg:pt-4">
                          <div className="p-3 mr-4 text-center">
                            <span className="block text-xl font-bold tracking-wide text-gray-600 uppercase">
                              22
                            </span>
                            <span className="text-sm text-gray-400">
                              Friends
                            </span>
                          </div>
                          <div className="p-3 mr-4 text-center">
                            <span className="block text-xl font-bold tracking-wide text-gray-600 uppercase">
                              10
                            </span>
                            <span className="text-sm text-gray-400">
                              Photos
                            </span>
                          </div>
                          <div className="p-3 text-center lg:mr-4">
                            <span className="block text-xl font-bold tracking-wide text-gray-600 uppercase">
                              89
                            </span>
                            <span className="text-sm text-gray-400">
                              Comments
                            </span>
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className="mt-12 text-center">
                      <h3 className="mb-2 text-4xl font-semibold leading-normal text-gray-700">
                        {event.title}
                      </h3>
                      <div className="mt-0 mb-2 text-sm font-bold leading-normal text-gray-400 uppercase">
                        <i className="mr-2 text-lg text-gray-400 fas fa-map-marker-alt"></i>{" "}
                        {event.venue.title} - {event.venue.address},{" "}
                        {event.venue.city}
                      </div>
                      <div className="mt-10 mb-2 text-gray-600">
                        <i className="mr-2 text-lg text-gray-400 fas fa-briefcase"></i>
                        Organizzato da:{" "}
                        <a href={event.organizers.nodes[0].link}>
                          {event.organizers.nodes[0].title}
                        </a>
                      </div>
                      <div className="mb-2 text-gray-600">
                        <i className="mr-2 text-lg text-gray-400 fas fa-clock"></i>
                        {event.startDate} - {event.endDate}
                      </div>
                    </div>
                    <div className="py-10 mt-10 text-center border-t border-gray-200">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full px-4 lg:w-9/12">
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
                <div className="flex justify-center ">
                  <Link href="/eventi">
                    <a className="p-4 mt-10 text-center bg-white rounded shadow-lg uppercase hover:shadow-sm">
                      Eventi
                    </a>
                  </Link>
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
