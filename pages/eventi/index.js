import { getEvents } from "../../lib/api";
import Link from "next/link";

import Layout from "../../components/Layout";
import Container from "../../components/Container";
import Date from "../../components/Date";
import Header from "../../components/Header/Header";

import { formatDate, getMonth } from "../../actions/utils/formatDate";

function sortByMonth(data) {
  const scheduledMonth = [];
  data.forEach((event) => {
    const month = getMonth(event.startDate);

    scheduledMonth.find((e) => e === month)
      ? scheduledMonth
      : scheduledMonth.push(month);
  });

  return scheduledMonth.map((m) => (
    <div>
      <h3 className="text-3xl uppercase font-bold border-b mb-6 mt-8">{m}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((event) =>
          getMonth(event.startDate) === m ? (
            <div className="h-full w-full" key={event.databaseId}>
              <Link href={`/eventi/${event.id}`}>
                <a>
                  <h2 className="text-md font-semibold">{event.title}</h2>
                </a>
              </Link>
              {formatDate(event.startDate) === formatDate(event.endDate) ? (
                <Date dateString={event.startDate} className="text-gray-500" />
              ) : (
                <>
                  <Date
                    dateString={event.startDate}
                    className="text-gray-500"
                  />
                  {" - "}
                  <Date dateString={event.endDate} className="text-gray-500" />
                </>
              )}
              <div>{event.organizers?.nodes.title}</div>
              <div>{event.cost ? `${event.cost} €` : "gratis"}</div>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    event.excerpt.length > 160
                      ? event.excerpt.substr(0, 160) + "..."
                      : event.excerpt,
                }}
              ></div>
            </div>
          ) : null
        )}
      </div>
    </div>
  ));
}

export default function Events({ data }) {
  return (
    <Layout>
      <Container>
        <Header>Eventi</Header>
        {sortByMonth(data.nodes)}
      </Container>
    </Layout>
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
