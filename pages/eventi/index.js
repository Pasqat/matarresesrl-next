import { getEvents } from "../../lib/api";
import Link from "next/link";

import Layout from "../../components/Layout";
import Container from "../../components/Container";
import Date from "../../components/Date";
import Header from "../../components/Header/Header";
import CardPost from "../../components/Card/CardPost";

import { formatDate, getMonth, getDay } from "../../actions/utils/formatDate";

function GroupByMonth({ data }) {
  const scheduledMonth = [];
  data.forEach((event) => {
    const month = getMonth(event.startDate);

    scheduledMonth.find((e) => e === month)
      ? scheduledMonth
      : scheduledMonth.push(month);
  });

  return scheduledMonth.map((m) => (
    <div key={m}>
      <h3 className="mt-8 mb-6 text-3xl font-bold uppercase border-b">{m}</h3>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-12">
        {data.map((event) => {
          console.log('event', event)
          return getMonth(event.startDate) === m ? (
            <div className="w-full h-full" key={event.id}>
              {/* CARD */}
              <div className="overflow-hidden bg-white border-2 border-gray-200 rounded-lg border-opacity-60 shadow-lg">
                <div className="relative flex items-center justify-center min-h-[10rem] text-center bg-yellow-600">
                  <h3 className="relative z-10 px-2 text-white overflow-hidden font-serif text-4xl font-extrabold leading-tight lg:px-10">
                    <Link href={`/eventi/${event.id}`}>
                      <a
                        className="hover:underline"
                        dangerouslySetInnerHTML={{ __html: event.title }}
                      ></a>
                    </Link>
                  </h3>
                  <div className="leading-tight select-none absolute z-0 text-7xl transform md:scale-[5] scale-[3.5] text-gray-100 opacity-30 font-extrabold font-serif">
                    {getDay(event.startDate)}
                  </div>
                </div>
                <div className="flex flex-col justify-between p-6">
                  <div>
                    {formatDate(event.startDate) ===
                      formatDate(event.endDate) ? (
                      <Date
                        dateString={event.startDate}
                        className="mb-1 text-xs font-medium tracking-widest text-gray-400 title-font" />
                    ) : (
                      <>
                        <Date
                          dateString={event.startDate}
                          className="mb-1 text-xs font-medium tracking-widest text-gray-400 title-font" />
                        {" - "}
                        <Date
                          dateString={event.endDate}
                          className="mb-1 text-xs font-medium tracking-widest text-gray-400 title-font" />
                      </>
                    )}
                    <div
                      className="mb-3 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: event.excerpt?.length > 160
                          ? event.excerpt?.substr(0, 160) + "..."
                          : event.excerpt,
                      }}
                    ></div>
                    <div className="text-right font-bold">{event.cost ? `${event.cost} €` : "gratis"}</div>
                    <div className="flex flex-wrap items-center ">
                      <Link href={`/eventi/${event.id}`}>
                        <a className="z-2 inline-flex items-center text-yellow-500 md:mb-2 lg:mb-0">
                          maggiori dettagli
                          <svg
                            className="w-4 h-4 ml-2 animate-bounceX"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14"></path>
                            <path d="M12 5l7 7-7 7"></path>
                          </svg>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div>{event.organizers?.nodes.title}</div> */}
            </div>
          ) : null;
        }
        )}
      </div>
    </div>
  ));
}

export default function Events({ data }) {
  console.log('data', data)
  return (
    <Layout>
      <Container>
        <Header>Eventi</Header>
        <GroupByMonth data={data} />
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
