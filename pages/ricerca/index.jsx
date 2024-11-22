import Head from 'next/head'
import Image from 'next/image'
import dynamic from 'next/dynamic'

// import Lottie from 'react-lottie-player'
const Lottie = dynamic(() => import('react-lottie-player'), {ssr: false})

import Layout from '../../components/Layout'
import {Grid} from '../../components/grid'
import {LinkButton} from '../../components/button'
import {H3, Paragraph} from '../../components/typography'
import {H3, Paragraph} from '../../components/typography'
import {HeroSection} from '../../components/sections/hero-section'
import {Spacer} from '../../components/spacer'

import lottiejson from '../../public/img/illustration/ricerca.json'

import FBMlogo from '../../public/img/logos/FBM_LOGO-High-Res.png'
import UEfundedLogo from '../../public/img/logos/funded-eu-blue.png'
import PrimaLogo from '../../public/img/logos/prima-logo-hor.png'
import FBM_ReD_page from '../../public/img/FBM-ReS_page.webp'
import FBM_ReD_page from '../../public/img/FBM-ReS_page.webp'

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
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="Al servizio dei professionisti della ristorazione, progettiamo cucine professionali, interior design e consulenza per imprenditori"
        />
        <meta property="og:title" content="Chi Siamo" />
        <meta
          property="og:description"
          content="Al servizio dei professionisti della ristorazione"
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/img/piazza_grande_61.jpg`}
        />
        <meta property="og:url" content="https://www.matarrese.it/azienda" />
        <meta property="og:type" content="blog" />
      </Head>

      <Layout>
        <div className="mb-12 lg:mb-24">
          <HeroSection
            title="Esperienza e tecnologia al servizio del futuro"
            subtitle="Ricerca e Sviluppo"
            illustration={<Lottie loop animationData={lottiejson} play />}
            arrowUrl="#flat-bread-mine"
            action={
              <>
                <Paragraph>
                  Collaboriamo con università e centri specializzati per
                  sviluppare soluzioni innovative che rispondono alle sfide di
                  domani.
                </Paragraph>
                <Paragraph>
                  Crediamo fermamente che il progresso nasca dalla combinazione
                  di conoscenze accademiche ed esperienza pratica, pilastri
                  fondamentali per affrontare il futuro e creare tecnologie
                  all&apos;avanguardia.
                </Paragraph>
              </>
            }
          />
        </div>

        <section className="-mt-24 pt-24" id="flat-bread-mine">
          <Grid rowGap>
            <H3 className="col-span-full mb-2" variant="secondary">
              Flat Bread Mine
            </H3>
            <div className="col-span-full lg:col-span-6">
              <p className="mb-4 text-lg font-light leading-relaxed text-gray-600">
                Il progetto Flat Bread Mine nasce per valorizzare il pane
                piatto, simbolo delle tradizioni culinarie mediterranee,
                attraverso un approccio innovativo. Con la collaborazione di 18
                partner tra istituti di ricerca, università e aziende di 10
                Paesi, il progetto punta a sviluppare nuove ricette e tecnologie
                per realizzare pani piatti più digeribili, nutrizionalmente
                arricchiti e adatti a esigenze specifiche, come la produzione
                senza glutine.
              </p>
              <p className="mb-4 mt-0 text-lg font-light leading-relaxed text-gray-600">
                Dalla focaccia italiana alla pita greca, dal baladi egiziano
                alla ftira maltese, Flat Bread Mine celebra la diversità
                culturale, preservando le radici storiche di questi alimenti.
                Allo stesso tempo, promuove la ricerca scientifica per
                ottimizzare i processi produttivi e migliorare la qualità del
                prodotto, rendendolo accessibile e sostenibile per il mercato
                globale. Un impegno concreto per innovare nel rispetto della
                tradizione.
              </p>
              <p className="mb-4 mt-0 text-lg font-light leading-relaxed text-gray-600">
                {`Scopri di più sulla pagina ufficiale del progetto\n`}
                <LinkButton href="https://flatbreadmine.eu/it/" withArrow>
                  https://flatbreadmine.eu/it/
                </LinkButton>
              </p>
            </div>

            <div className="col-span-full text-center lg:col-span-6 lg:ml-8">
              <div className="grid-row-2 grid h-full justify-stretch">
                <Image
                  src={FBM_ReD_page}
                  layout="intrinsic"
                  objectFit="cover"
                  objectPosition="center"
                  alt="attrezzature ristorazione nello showroom"
                  className="rounded-lg shadow-sm"
                  placeholder="blur"
                />
                <div className="mt-8 grid grid-cols-2 place-content-between gap-x-4 gap-y-4 md:grid-cols-3">
                  <Image
                    key="Funded-UE"
                    width={360}
                    height={95}
                    objectFit="contain"
                    src={UEfundedLogo}
                    alt="Funded by the European Union"
                    placeholder="blur"
                    blurDataURL={UEfundedLogo}
                  />
                  <Image
                    key="Prima"
                    width={360}
                    height={95}
                    objectFit="contain"
                    src={PrimaLogo}
                    alt="Prima Partnership for researh and innovation in the mediterranean area"
                    placeholder="blur"
                    blurDataURL={PrimaLogo}
                  />
                  <Image
                    key={'FBMlogo'}
                    width={360}
                    height={95}
                    objectFit="contain"
                    src={FBMlogo}
                    alt={`Flat Bread Mine logo`}
                    placeholder="blur"
                    blurDataURL={FBMlogo}
                  />
                </div>
              </div>
            </div>
          </Grid>

          {/*
         <div className="container mx-auto my-12 max-w-7xl px-16">
            <div className="grid grid-cols-2 place-content-between gap-x-4 gap-y-4 md:grid-cols-3">
              <Image
                key="Funded-UE"
                width={360}
                height={95}
                objectFit="contain"
                src={UEfundedLogo}
                alt="Funded by the European Union"
                placeholder="blur"
                blurDataURL={UEfundedLogo}
              />
              <Image
                key="Prima"
                width={360}
                height={95}
                objectFit="contain"
                src={PrimaLogo}
                alt="Prima Partnership for researh and innovation in the mediterranean area"
                placeholder="blur"
                blurDataURL={PrimaLogo}
              />
              <Image
                key={'FBMlogo'}
                width={360}
                height={95}
                objectFit="contain"
                src={FBMlogo}
                alt={`Flat Bread Mine logo`}
                placeholder="blur"
                blurDataURL={FBMlogo}
              />
            </div>
          </div>
          */}
        </section>

        <Spacer size="base" />
      </Layout>
    </>
  )
}
