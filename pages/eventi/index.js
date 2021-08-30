import { getEvents } from "../../lib/api";
import Link from "next/link";

import Layout from "../../components/Layout";
import Container from "../../components/Container";
import Date from "../../components/Date";
import Header from "../../components/Header/Header";

import { formatDate } from "../../actions/utils/formatDate";

export default function Events({ data }) {
  return (
    <Layout>
      <Container>
        <Header>Eventi</Header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.nodes.map((event) => {
            console.log(event.startDate, event.endDate)
            return (
              <div className="h-full w-full" key={event.databaseId}>
                <Link href={`/eventi/${event.id}`}>
                  <a>
                    <h2 className="text-md font-semibold">{event.title}</h2>
                  </a>
                </Link>
                {formatDate(event.startDate) === formatDate(event.endDate) ? (
                  <Date
                    dateString={event.startDate}
                    className="text-gray-500"
                  />
                ) : (
                  <>
                    <Date
                      dateString={event.startDate}
                      className="text-gray-500"
                    />
                    {" - "}
                    <Date
                      dateString={event.endDate}
                      className="text-gray-500"
                    />
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
            );
          })}
        </div>
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
