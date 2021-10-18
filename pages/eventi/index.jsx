import Head from 'next/head'

import {getEvents} from '../../lib/event_api'
import {getMonth} from '../../actions/utils/formatDate'

import Layout from '../../components/Layout'
import Container from '../../components/Container'
import Header from '../../components/Header/Header'
import CardEvent from '../../components/Card/CardEvent'

import {H3} from '../../components/typography'

function GroupByMonth({data}) {
  const scheduledMonth = []
  data.forEach(event => {
    const month = getMonth(event.startDate)

    scheduledMonth.find(e => e === month)
      ? scheduledMonth
      : scheduledMonth.push(month)
  })

  return scheduledMonth.map(m => (
    <div key={m} className="flex flex-col py-6 lg:flex-row">
      <div className="flex items-center justify-center mb-4 bg-yellow-500 md:mb-0 md:mr-10 md:w-14">
        <H3 className="text-yellow-100 md:-rotate-90">{m}</H3>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 md:mb-12">
        {data.map(event =>
          getMonth(event.startDate) === m ? (
            <div className="py-6 md:px-6" key={event.id}>
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
          ) : null,
        )}
      </div>
    </div>
  ))
}

export default function Events({data}) {
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
  )
}

export async function getStaticProps() {
  const data = await getEvents()

  return {
    props: {
      data,
    },
  }
}
