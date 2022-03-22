import Head from 'next/head'
import Image from 'next/image'
import Lottie from 'react-lottie-player'

import FormModal from '../../components/Form/FormModal'
import Layout from '../../components/Layout'
import {Grid} from '../../components/grid'
import {H2, H3, Paragraph} from '../../components/typography'
import {HeroSection} from '../../components/sections/hero-section'

import {LogoSection} from '../../components/sections/logo-section'
import logoAssogi from '../../public/img/logos/Assogi_logo-300x119.png'

import lottiejson from '../../public/img/illustration/Inspiration.json'

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>Supportiamo ristoranti e imprenditori</title>
        <link rel="canonical" href="https://www.matarrese.it/azienda" />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="Al servizio dei professionisti della ristorazione, progettiamo cucine professionali, interior design e consulenza per imprenditori"
        />
        <link rel="icon" href="/public/img/favicon/favicon.ico" />
      </Head>

      <Layout>
        <div className="mb-24 lg:mb-48">
          <HeroSection
            title="Un partner affidabile per la tua attività"
            subtitle="Chi siamo"
            illustration={<Lottie loop animationData={lottiejson} play />}
            arrowUrl="#team"
            action={
              <>
                <Paragraph>
                  Dal 1983 operiamo al fianco di ristoratori, imprenditori e
                  professionisti del settore ricettivo e alberghiero aiutandoli
                  a realizzare i loro progetti.
                </Paragraph>
                <Paragraph>
                  Grazie all’esperienza acquisita negli anni, oggi, noi di
                  Matarrese srl comprendiamo facilmente le esigenze degli
                  imprenditori e offriamo servizi e prodotti in grado di rendere
                  la loro idea di business più competitiva sia a livello di
                  processi che di qualità.
                </Paragraph>
              </>
            }
          />
        </div>

        <section className="mb-24 lg:mb-48" id="team">
          <Grid>
            <H2 as="p" className="col-span-6">
              Hai un progetto da realizzare?
            </H2>
            <FormModal
              title="Ho un progetto da realizzare"
              buttonText="Scrivici"
              className="col-span-6"
              size="large"
            />
          </Grid>
        </section>

        <section className="mb-24 lg:mb-48">
          <Grid featured>
            <div className="col-span-full my-auto mb-14 lg:col-span-3 lg:mr-8">
              <Image
                src={logoAssogi}
                alt="logo Assogi"
                layout="intrinsic"
                placeholder="blur"
              />
            </div>
            <H3
              variant="secondary"
              as="p"
              className="col-span-full lg:col-span-9"
            >
              Dal 2010 facciamo parte del Consorzio ASSOGI, una rete nazionale
              di professionisti dei grandi impianti per la ristorazione. La
              forza di una squadra di aziende ed esperti al servizio degli
              imprenditori e ristoratori italiani.
            </H3>
          </Grid>
        </section>

        <section className="relative mb-24 lg:mb-48">
          <LogoSection />
        </section>
      </Layout>
    </>
  )
}
