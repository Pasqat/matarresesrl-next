import * as React from 'react'
import Head from 'next/head'

import {getEvents} from '../../lib/query/event'
// import {getMonth} from '../../actions/utils/formatDate'

import Layout from '../../components/Layout'
import {HeroSection} from '../../components/sections/hero-section'
import {RegistrationPanel} from '../../components/event-registration-panel'
import {Spacer} from '../../components/spacer'
import CardEvent from '../../components/Card/CardEvent'

import {H3, H6} from '../../components/typography'
import {Grid} from '../../components/grid'

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

      <Layout>
        <div className="mb-24">
          <HeroSection
            title="Dai un'occhiata ai prossimi eventi"
            subtitle="Se qulcuno ti interessa, iscriviti subito!"
            imageSize="large"
            image="/img/plan.svg"
          />
          {data.length ? (
            <Grid>
              <H3 className="col-span-full">In primo piano</H3>
              <div className="col-span-full mt-6">
                {data.map((event, index) =>
                  event.featured ? (
                    <React.Fragment key={event.id}>
                      <RegistrationPanel event={event} />
                      {index === data.length - 1 ? null : <Spacer size="2xs" />}
                    </React.Fragment>
                  ) : null,
                )}
              </div>
            </Grid>
          ) : null}

          <Spacer size="base" />

          <Grid className="mb-64">
            <H6 as="h2" className="col-span-full mb-6">
              Tutti gli eventi
            </H6>

            <div className="col-span-full">
              <Grid nested rowGap>
                {data.map(event => (
                  <div key={event.slug} className="col-span-full md:col-span-4">
                    <CardEvent event={event} />
                  </div>
                ))}
              </Grid>
            </div>
          </Grid>
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
