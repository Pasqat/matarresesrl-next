import * as React from 'react'
import Head from 'next/head'

import {getEvents} from '../../lib/query/event'
import {getGroups} from '../../lib/newsletter'

import Layout from '../../components/Layout'
import {HeroSection} from '../../components/sections/hero-section'
import {RegistrationPanel} from '../../components/event-registration-panel'
import {Spacer} from '../../components/spacer'
import CardEvent from '../../components/Card/CardEvent'

import {H3} from '../../components/typography'
import {Grid} from '../../components/grid'
import {FeatureCard} from '../../components/feature-card'
import NewsletterForm from '../../components/Form/NewsletterForm'
import FormModal from '../../components/Form/FormModal'

export default function Events({data, groups}) {
  return (
    <>
      <Head>
        <title>Eventi per l&apos;ho.re.ca | Matarrese srl</title>
        <link rel="canonical" href="https://www.matarrese.it/eventi/" />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta
          name="description"
          content="Laboratori di cucina attrezzati, formazione professionale in cucina, show cooking e dimostrazione attrezzature per la ristorazione"
        />
        <meta property="og:title" content="Eventi" />
        <meta
          property="og:description"
          content="I prossimi eventi che si terranno a cura di Matarrese srl. Approfondimenti, master class, demo ed altro"
        />
        <meta property="og:url" content="https://www.matarrese.it/eventi" />
      </Head>

      <Layout>
        <div className="mb-12 lg:mb-24 xl:mb-48">
          <HeroSection
            subtitle="Incontriamoci in cucina"
            title="Eventi formativi e dimostrativi per la ristorazione"
            imageSize="large"
            image="/img/header_eventi.jpg"
          />
          {data.futureEvent.length ? (
            <section className="mb-12 lg:mb-24 xl:mb-48">
              <Grid>
                <H3 className="col-span-full">In primo piano</H3>
                <div className="col-span-full mt-6">
                  {data.futureEvent.map((event, index) =>
                    event.isFeatured ? (
                      <React.Fragment key={`${event.id}-featured`}>
                        <RegistrationPanel event={event} />
                        {index === data.length - 1 ? null : (
                          <Spacer size="2xs" />
                        )}
                      </React.Fragment>
                    ) : null,
                  )}
                </div>
              </Grid>

              <Spacer size="xs" />

              <Grid>
                <H3 as="h2" className="col-span-full mb-6">
                  Tutti gli eventi
                </H3>

                <div className="col-span-full">
                  <Grid nested rowGap>
                    {data.futureEvent.map(event => (
                      <div
                        key={event.id}
                        className="col-span-full md:col-span-4"
                      >
                        <CardEvent event={event} />
                      </div>
                    ))}
                  </Grid>
                </div>
              </Grid>
            </section>
          ) : (
            <Grid className="mb-12 lg:mb-24 xl:mb-48">
              <H3 as="p" className="col-span-full">
                Non ci sono eventi disponibili al momento.
              </H3>
            </Grid>
          )}

          <section className="mb-12 lg:mb-24 xl:mb-48">
            <NewsletterForm
              groups={groups}
              title="Iscriviti alla nostra newsletter per essere informato sui nostri prossimi eventi."
            />
          </section>

          <section className="mb-12 lg:mb-24 xl:mb-48">
            <Grid rowGap>
              <div className="col-span-full lg:col-span-6">
                <FeatureCard
                  title="Sei un’azienda e vuoi presentare un tuo prodotto o un’attrezzatura nei nostri laboratori?"
                  description="Disponiamo di ampi laboratori attrezzati per realizzare eventi formativi, informativi e commerciali per il settore food."
                  urlText="Contattaci"
                  url="/contatti"
                />
              </div>
              <div className="col-span-full lg:col-span-6">
                {/* TODO: this is FeatureCard exact code, but to have the form
              modal I thought to paste it here and modify the relevant part*/}
                <div className="bg-secondary relative flex h-full w-full flex-col items-start rounded-lg px-8 py-12 lg:px-12">
                  <div className="text-primary mb-4 flex flex-none items-end text-xl font-medium">
                    Vuoi venire a toccare con mano attrezzature innovative?
                  </div>
                  <div className="text-secondary max-w-sm flex-auto text-xl">
                    Scegli tu il giorno e l&apos;ora, noi organizzeremo una demo
                    personalizzata per mostrarti il funzionamento delle
                    attrezzature ho.re.ca. che desideri conoscere.
                  </div>
                  <FormModal
                    title="Richiedi una demo personalizzata"
                    buttonText="Richiedi una demo"
                  />
                </div>
              </div>
            </Grid>
          </section>

          <section className="col-span-full">
            <Grid rowGap>
              <H3 className="col-span-full">Eventi conclusi</H3>
              {data.pastEvent.map(event => (
                <div key={event.id} className="col-span-full md:col-span-4">
                  <CardEvent event={event} />
                </div>
              ))}
            </Grid>
          </section>
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const data = await getEvents()
  const groups = await getGroups()

  return {
    props: {
      data,
      groups,
    },
  }
}
