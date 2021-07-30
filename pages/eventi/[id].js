import { useRouter } from "next/router";
import Head from "next/head";

import Layout from "../../components/Layout";
import Container from "../../components/Container";
import Date from "../../components/Date";
import Header from "../../components/Header/Header";

import { getAllEventsWithSlug, getEvent } from "../../lib/api";

export default function Events({ event }) {
  const router = useRouter();
  // const moreEvents = events?.edges

  console.log("event", event);

  // if (!router.isFallback && event.slug) {
  //   return <p>hmm...sembra ci sia un errore</p>;
  // }

  // const organizers = event?.organizers?.nodes[0];

  return (
    <Layout>
      <Container>
        <Header href="/eventi">Eventi</Header>
        {router.isFallback ? (
          <>
            <Head>
              <title>Matarrese srl | Eventi</title>
            </Head>
            <main>
              <h2>Caricamento di tutti gli eventi</h2>
            </main>
          </>
        ) : (
          <div className="">
            <div className="h-full text-gray-800 wrfull">
              <h2>{event.title}</h2>
              <Date dateString={event.startDate} />
              <Date dateString={event.endDate} />
              <div>{event.cost ? `${event.cost} €` : "gratis"}</div>
              <div dangerouslySetInnerHTML={{ __html: event.content }}></div>
              <div className="flex flex-wrap space-x-8">
                <div>
                  <h4 className="font-semibold uppercase">Dettagli</h4>
                  <ul>
                    <li>
                      <div>Inizio:</div>
                      <Date dateString={event.startDate} />
                    </li>
                    <li>
                      <div>Fine:</div>
                      <Date dateString={event.endDate} />
                    </li>
                    <li>
                      <div>Prezzo</div>
                      <div>{event.cost ? `${event.cost} €` : "gratis"}</div>
                    </li>
                  </ul>
                </div>
                <address className="not-italic">
                  <h4 className="font-semibold uppercase">Organizzatore</h4>
                  <ul>
                    <li>
                      <div>{event.organizers?.nodes[0].title}</div>
                    </li>
                    <li>
                      <div>Telefono</div>
                      <a href={`tel:${event.organizers?.nodes[0].phone}`}>
                        {event.organizers.nodes[0].phone}
                      </a>
                    </li>
                  </ul>
                </address>
              </div>
            </div>
          </div>
        )}
      </Container>
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

  console.log("allevents", allEvents);

  return {
    paths: allEvents.edges.map(({ node }) => `/eventi/${node.slug}`) || [],
    fallback: true,
  };
}
