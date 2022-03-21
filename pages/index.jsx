import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import HeaderBig from '../components/Header/HeaderBig'
import CardSquareImg from '../components/Card/CardSquareImg'
import CardBigImg from '../components/Card/CardBigImg'
import ContactForm from '../components/Form/ContactForm'
import FormModal from '../components/Form/FormModal'
import Layout from '../components/Layout'
import {LinkButton} from '../components/button'
import {TestimonialSection} from '../components/sections/testimonial-section'

import {logos} from '../data/partner-logo'
import {H2, H3, H5} from '../components/typography'
import {Grid} from '../components/grid'

import testimonials from '../data/testimonials'
import {getGroups} from '../lib/newsletter'

export default function Home({groups}) {
  return (
    <div>
      <Head>
        <title>Matarrese srl | Home</title>
        <link rel="canonical" href="https://www.matarrese.it/" />
        <meta
          name="description"
          content="Traduttori di Idee, creatori di Spazi"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout navbarTransparent>
        <main>
          <HeaderBig
            // title="Specialisti della Ristorazione"
            title="Dal design dell'arredo alla formazione del personale per realizzare i tuoi progetti"
            noButton
          />

          <section className="relative -mt-14">
            <Grid rowGap className="mb-24 lg:mb-48">
              <div className="col-span-full lg:col-span-4">
                <CardSquareImg
                  imgSrc="/img/home-box-arredo.jpg"
                  title="Dall'idea al progetto reale"
                  description={`Aprire un'attività, rennovare un locale,
                      avere una guida per migliorare il proprio lavoro: te seguiamo ad ogni passo per realizzare la tua idea.`}
                  urlText="Scopri i servizi"
                  url="/servizi"
                >
                  <LinkButton className="mt-4" href="/servizi" withArrow>
                    Scopri i servizi
                  </LinkButton>
                </CardSquareImg>
              </div>
              <div className="col-span-full lg:col-span-4">
                <CardSquareImg
                  imgSrc="/img/home-box-marchi.jpg"
                  title="Marchi e attrezzature di qualità"
                  description={`
                      Selezioniamo i migliori marchi ho.re.ca, studiamo le ultime tecnologie portando innovazione in cucina ed equilibrio negli arredi.
                    `}
                  urlText="Guarda i prodotti"
                  url="/prodotti"
                ></CardSquareImg>
              </div>
              <div className="col-span-full lg:col-span-4">
                <CardSquareImg
                  imgSrc="/img/home-box-supporto.jpg"
                  title="Supporto pre e post intervento"
                  description={`
                      Promuoviamo la cultura enogastronomica, la professionalità, e l'ottimizzazione del lavoro.
                      Aiutiamo le idee a diventare progetti reali, assicurando il corretto ciclo di vita delle attrezzature
                      attraverso il supporto post vendita.
                    `}
                  url="/contatti"
                  urlText="Vieni a conoscerci"
                ></CardSquareImg>
              </div>
            </Grid>
          </section>

          <section className="pb-20">
            <div className="container mx-auto px-4">
              <div className="mt-32 flex flex-wrap items-center">
                <div className="mr-auto ml-auto w-full px-4 md:w-5/12">
                  {/* <div className="inline-flex justify-center items-center p-3 mb-6 w-16 h-16 text-center text-gray-500 bg-white rounded-full shadow-lg"> */}
                  {/*   <HeartIcon className="text-xl text-yellow-500" /> */}
                  {/* </div> */}
                  <H3 className="mb-2" variant="secondary">
                    Da 40 anni partner degli operatori ho.re.ca
                  </H3>
                  <p className="mb-4 text-lg font-light leading-relaxed text-gray-600">
                    Creiamo spazi su misura dei professionisti. Dalla dimensione
                    delle attrezzature professionali agli arredi su misura, ci
                    impegniamo a cercare la soluzione ottimale per i tuoi spazi
                    e più efficiente per il tuo lavoro.
                  </p>
                  <p className="mt-0 mb-4 text-lg font-light leading-relaxed text-gray-600">
                    L’innovazione e la tecnologia sono componenti essenziali
                    nella scelta di attrezzature per la ristorazione, di cucine
                    professionali e di impianti di aerazione e climatizzazione.
                    La professionalità e la qualità ci caratterizzano nella
                    consulenza professionale e nell’assistenza tecnica post
                    vendita.
                  </p>
                  <FormModal buttonText="Realizza i tuoi progetti" />
                </div>

                <CardBigImg
                  title="Vicini al Cliente"
                  content="Dalla progettazione alla realizzazione,
                  i nostri esperti seguono il cliente per trasformare le idee in realtà"
                  imgSrc="/img/vicini-al-cliente.jpg"
                  noSlope
                />
              </div>
            </div>
          </section>

          <section className="mb-24 lg:mb-48">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center">
                <div className="mr-auto ml-auto w-full px-4 md:w-5/12">
                  <img
                    alt="attrezzature ristorazione nello showroom"
                    className="max-w-full rounded-lg shadow-lg"
                    src="/img/attrezzature-esposizione.jpg"
                  />
                </div>
                <div className="mr-auto ml-auto w-full px-4 md:w-5/12">
                  <div className="md:pr-12">
                    {/* <div className="inline-flex justify-center items-center p-3 mb-6 w-16 h-16 text-center text-gray-500 bg-gray-200 rounded-full shadow-lg"> */}
                    {/*   <ShoppingCartIcon className="text-xl" /> */}
                    {/* </div> */}
                    <H3 variant="secondary">
                      Tutto per creare i tuoi spazi professionali
                    </H3>
                    <p className="mt-4 text-lg leading-relaxed text-gray-500">
                      In una struttura aziendale di <strong>5000 mq</strong>{' '}
                      uniamo il laboratorio di produzione di arredi su misura,
                      l’officina e magazzino ricambi, il laboratorio di
                      formazione e un ampio showroom in cui potrai trovare:
                    </p>
                    <ul className="mt-6 list-none">
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="mr-3 inline-block rounded-full bg-gray-100 py-1 px-2 text-xs font-semibold uppercase text-gray-500">
                              {/* <i className="fas fa-blender"></i> */}
                            </span>
                          </div>
                          <div>
                            <H5 as="h4">Attrezzature per ristorazione</H5>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="mr-3 inline-block rounded-full bg-gray-100 py-1 px-2 text-xs font-semibold uppercase text-gray-500">
                              {/* <i className="fas fa-chair"></i> */}
                            </span>
                          </div>
                          <div>
                            <H5 as="h4">Arredamenti</H5>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="mr-3 inline-block rounded-full bg-gray-100 py-1 px-2 text-xs font-semibold uppercase text-gray-500">
                              {/* <i className="fas fa-utensils"></i> */}
                            </span>
                          </div>
                          <div>
                            <H5 as="h4">Utensili per cucine professionali</H5>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="mr-3 inline-block rounded-full bg-gray-100 py-1 px-2 text-xs font-semibold uppercase text-gray-500">
                              {/* <i className="fas fa-concierge-bell"></i> */}
                            </span>
                          </div>
                          <div>
                            <H5 as="h4">Hotellerie</H5>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="mr-3 inline-block rounded-full bg-gray-100 py-1 px-2 text-xs font-semibold uppercase text-gray-500">
                              {/* <i className="fab fa-html5"></i> */}
                            </span>
                          </div>
                          <div>
                            <H5 as="h4">...e tanto altro</H5>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-24 lg:mb-48">
            <TestimonialSection testimonials={testimonials} />
          </section>

          <section className="mb-24 lg:mb-48" id="#contatti">
            <ContactForm groups={groups} />
          </section>
          {/* LOGO SECTION */}
          <section className="relative mb-24 lg:mb-48">
            <div className="container mx-auto mb-12 px-4">
              <H2 className="mb-8 text-center" variant="secondary">
                I nostri partner
              </H2>
              <div className="2xl:grid-cols-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {logos.map(logo => {
                  return logo.href ? (
                    <Link key={logo.name} href={logo.href}>
                      <a className="cursor-pointer text-center hover:drop-shadow-md">
                        <Image
                          width={180}
                          height={95}
                          objectFit="contain"
                          src={logo.url}
                          alt={`${logo.name} logo`}
                        />
                      </a>
                    </Link>
                  ) : (
                    <Image
                      key={logo.name}
                      width={180}
                      height={95}
                      objectFit="contain"
                      src={logo.url}
                      alt={`${logo.name} logo`}
                    />
                  )
                })}
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </div>
  )
}

export async function getStaticProps() {
  const groups = await getGroups()
  return {
    props: {
      groups,
    },
  }
}
