import * as React from 'react'
import Head from 'next/head'

import {getEvents} from '../../lib/query/event'
// import {getMonth} from '../../actions/utils/formatDate'

import Layout from '../../components/Layout'
import {HeroSection} from '../../components/sections/hero-section'
import {RegistrationPanel} from '../../components/event-registration-panel'
import {Spacer} from '../../components/spacer'
import CardEvent from '../../components/Card/CardEvent'

import {H3, H6, Paragraph} from '../../components/typography'
import {Grid} from '../../components/grid'
import {FeatureCard} from '../../components/feature-card'

export default function Events({data}) {
  // DELETE: this is just for testing
  // const fetchGroups = async (e) => {
  //   const res = await fetch('/api/subscribe', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })

  //   console.log(res.data)
  // }

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
            title="Incontriamoci in cucina"
            subtitle="Partecipa agli eventi nei nostri laboratori"
            imageSize="large"
            image="/img/plan.svg"
          />
          {data.length ? (
            <Grid>
              {data.map((event, index) =>
                event.featured ? (
                  <>
                    <H3 className="col-span-full">In primo piano</H3>
                    <div className="col-span-full mt-6">
                      <React.Fragment key={event.id}>
                        <RegistrationPanel event={event} />
                        {index === data.length - 1 ? null : (
                          <Spacer size="2xs" />
                        )}
                      </React.Fragment>
                    </div>
                  </>
                ) : null,
              )}
            </Grid>
          ) : (
            <Grid>
              <H3 as="p" className="col-span-full">
                Non ci sono eventi disponibili al momento.
              </H3>
            </Grid>
          )}

          <Spacer size="xs" />

          <Grid>
            <Paragraph className="col-span-full text-2xl font-medium">
              Iscriviti alla nostra newsletter per essere informato sui nostri
              prossimi eventi.
            </Paragraph>
          </Grid>

          <Spacer size="xs" />

          <Grid rowGap>
            <div className="col-span-full lg:col-span-6">
              <FeatureCard
                title="Sei un’azienda e vuoi presentare un tuo prodotto o un’attrezzatura nei nostri laboratori?
                    Disponiamo di ampi laboratori attrezzati per realizzare eventi formativi, informativi e commerciali per il settore food.
                  "
                urlText="Contattaci"
                url="/contatti"
              />
            </div>
            <div className="col-span-full lg:col-span-6">
              {/* TODO: use formModal for this */}
              <FeatureCard
                title="Vuoi venire a toccare con mano attrezzature innovative?
                       Scegli tu il giorno e l’ora, noi organizzeremo una demo personalizzata per mostrarti il funzionamento delle attrezzature ho.re.ca. che desideri conoscere.
                      "
                url="/contatti"
                urlText="Richiedi una demo personalizzata"
              />
            </div>
          </Grid>

          <Spacer size="base" />

          {data.length ? (
            <Grid className="mb-64">
              <H6 as="h2" className="col-span-full mb-6">
                Tutti gli eventi
              </H6>

              <div className="col-span-full">
                <Grid nested rowGap>
                  {data.map(event => (
                    <div
                      key={event.slug}
                      className="col-span-full md:col-span-4"
                    >
                      <CardEvent event={event} />
                    </div>
                  ))}
                </Grid>
              </div>
            </Grid>
          ) : null}
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
