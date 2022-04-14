import Head from 'next/head'
import Image from 'next/image'
import Lottie from 'react-lottie-player'

import Layout from '../../components/Layout'
import {Grid} from '../../components/grid'
import {H2, H6, Paragraph} from '../../components/typography'
import {HeroSection} from '../../components/sections/hero-section'
import {Spacer} from '../../components/spacer'

import {LogoSection} from '../../components/sections/logo-section'
import {AssogiSection} from '../../components/sections/assogi-section'

import lottiejson from '../../public/img/illustration/Inspiration.json'
import {FeatureCard} from '../../components/feature-card'

import VitoMatarreseProfileImage from '../../public/img/vito_matarrese.webp'
import DomenicoMatarreseProfileImage from '../../public/img/domenico_matarrese.webp'
import cotturaProdotti from '../../public/img/cottura-prodotti.png'
import {ProjectSection} from '../../components/sections/projects-section'

import projects from '../../data/projects'

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
        <div className="mb-12 lg:mb-24">
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

        <section className="-mt-24 pt-24" id="team">
          <Grid rowGap>
            <div className="col-span-full lg:col-span-6">
              <FeatureCard
                icon={
                  <Image
                    src={VitoMatarreseProfileImage}
                    alt="fotografia di Vito Matarrese, socio fondatore e direttore"
                    layout="intrinsic"
                    placeholder="blur"
                  />
                }
                title="Vito Matarrese"
                description={
                  <>
                    <p className="text-gray-400">Socio fondatore, Direzione</p>
                    <br />
                    <p>
                      Vito, da sempre incuriosito dalle tecnologie innovative,
                      studia i grandi impianti della ristorazione professionale
                      per scegliere le soluzioni migliori e tecnologicamente
                      all’avanguardia.`
                    </p>
                  </>
                }
                url="mailto:vito.matarrese@matarrese.it"
                urlText="contatta"
              />
            </div>
            <div className="col-span-full lg:col-span-6">
              <FeatureCard
                icon={
                  <Image
                    src={DomenicoMatarreseProfileImage}
                    alt="fotografia di Domenico Matarrese"
                    layout="intrinsic"
                    placeholder="blur"
                  />
                }
                title="Domenico Matarrese"
                description={
                  <>
                    <p className="text-gray-400">Socio fondatore</p>
                    <br />
                    <p>
                      Domenico opera con dimestichezza e passione nel campo
                      della refrigerazione industriale e della climatizzazione,
                      trovando soluzioni ottimali nel pieno rispetto
                      dell&apos;uomo e del suo ambiente.
                    </p>
                  </>
                }
              />
            </div>
          </Grid>
        </section>

        <Spacer size="base" />

        <section>
          <ProjectSection
            projects={projects.slice(2, 4)}
            title="Le nostre realizzazioni"
          />
        </section>

        <Spacer size="base" />

        <section>
          <Grid className="mb-12 lg:mb-24 xl:mb-48">
            <div className="col-span-full lg:col-span-6 lg:col-start-1">
              <div className="aspect-w-4 aspect-h-6 mb-12 lg:mb-0">
                <Image
                  alt="prodotti per la cucina professionale"
                  className="max-w-full rounded-lg shadow-lg"
                  src={cotturaProdotti}
                  // width="1000"
                  // height="1300"
                  objectFit="cover"
                  layout="fill"
                  placeholder="blur"
                />
              </div>
            </div>
            <div className="col-span-full lg:col-span-5 lg:col-start-8 lg:row-start-1">
              <H2 id="perche-comprare-da-noi" className="mb-10">
                {`I nostri punti di forza`}
              </H2>
              <H6 as="h3" className="mb-4">
                {`Qualità`}
              </H6>
              <Paragraph className="mb-12">{`Ci impegnamo nella selezione delle migliori attrezzature per la ristorazione prediligendo il Made in Italy. Offriamo ai nostri clienti gli stumenti più tecnologici e innovativi per creare esplosioni di colori e gusto in cucina`}</Paragraph>
              <H6 as="h3" className="mb-4">{`Consulenza`}</H6>
              <Paragraph className="mb-12">{`L'esperienza tecnica e l'ascolto delle diverse esigenze ci permette di trovare soluzioni su misura per realizzare progetti e idee che favoriscono l'efficienza e l'ottimizzazione del lavoro.`}</Paragraph>
              <H6 as="h3" className="mb-4">{`Affidabilità`}</H6>
              <Paragraph className="mb-12">{`Da quarant'anni operiamo al fianco dei professionisti della ristorazione, li seguiamo passo passo garantendo la sicurezza di potersi affidare ad un partner competente e qualificato.`}</Paragraph>
            </div>
          </Grid>
        </section>

        <section className="mb-12 lg:mb-24 xl:mb-48">
          <AssogiSection />
        </section>

        <section className="relative mb-12 lg:mb-24 xl:mb-48">
          <LogoSection />
        </section>
      </Layout>
    </>
  )
}
