import { getEvents } from "../../lib/api";

import Layout from "../../components/Layout";
import Container from "../../components/Container";
import Header from "../../components/Header/Header";
import CardEvent from "../../components/Card/CardEvent";

import { getMonth } from "../../actions/utils/formatDate";
import Head from "next/head";

function GroupByMonth({ data }) {
  const scheduledMonth = [];
  data.forEach((event) => {
    const month = getMonth(event.startDate);

    scheduledMonth.find((e) => e === month)
      ? scheduledMonth
      : scheduledMonth.push(month);
  });

  return scheduledMonth.map((m) => (
    <div key={m} className="flex flex-col md:flex-row py-6">
      <div className="flex justify-center items-center bg-yellow-500 mb-4 md:mb-0 md:mr-10 md:w-14">
        <h3 className="md:-rotate-90 text-3xl font-bold text-yellow-100 leading-none">{m}</h3>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:mb-12">
        {data.map((event) =>
          getMonth(event.startDate) === m ? (
            < div className="py-6 md:px-6 " key={event.id} >
              {/* CARD */}
              <CardEvent
                title={event.title}
                slug={event.slug}
                id={event.id}
                startDate={event.startDate}
                endDate={event.endDate}
                excerpt={event.excerpt}
                venue={event.venue}
                coverImage={event.featuredImage?.node}
              />
            </div>
          ) : null
        )
        }
      </div >
    </div >
  ));
}

export default function Events({ data }) {
  return (
    <>
      <Head>
        <title>I Prossimi Eventi | Matarrese srl</title>
        <link rel="canonical" href="https://www.matarrese.it/eventi/" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta
          name="description"
          content="I prossimi eventi che si terranno a cura di Matarrese srl. Approfondimenti, master class, demo ed altro"
        />
        <meta property="og:title" content="Eventi" />
        <meta
          property="og:description"
          content="I prossimi eventi che si terranno a cura di Matarrese srl. Approfondimenti, master class, demo ed altro"
        />
        <meta property="og:url" content="https://www.matarrese.it/eventi" />

      </Head>
      <Layout className="bg-gray-100">
        <div className="mb-24">
          <Container>
            <Header>Eventi</Header>
            <hr />
            <GroupByMonth data={data} />
          </Container>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps({ params }) {
  const data = await getEvents();

  return {
    props: {
      data,
    },
  };
}
