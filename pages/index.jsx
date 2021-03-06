import Head from 'next/head'
import Image from 'next/image'

import CardSquareImg from '../components/Card/CardSquareImg'
import ContactForm from '../components/Form/ContactForm'
import Layout from '../components/Layout'
import {LinkButton} from '../components/button'
import {TestimonialSection} from '../components/sections/testimonial-section'
import {ProjectSection} from '../components/sections/projects-section'
import {LogoSection} from '../components/sections/logo-section'
import {ImgSlider} from '../components/imgSlider'

import {H3, H5} from '../components/typography'
import {Grid} from '../components/grid'

import testimonials from '../data/testimonials'
import {getGroups} from '../lib/newsletter'
import {getLastTwoProjects} from '../lib/query/project'

import imgHomeAttrezzature from '../public/img/home-attrezzature.jpg'
import imgHomePartnerOperatori from '../public/img/home-partner-operatori.jpg'
import logoAssogi from '../public/img/logos/Assogi_logo-300x119.png'
import {Spacer} from '../components/spacer'

export default function Home({groups, lastTwoProjects}) {
  return (
    <div>
      <Head>
        <title>Matarrese srl, Traduttori di idee, Creatori di spazi</title>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_DOMAIN} />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="Allestimento ristoranti, locali commerciali, pizzerie, bar, macellerie, pescherie. Accessori cucine professionali, attrezzatura gastronomia."
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/img/piazza_grande_61.jpg`}
        />
        <meta
          property="og:title"
          content="Matarrese srl, Traduttori di idee, Creatori di spazi"
        />
        <meta
          property="og:description"
          content="Allestimento ristoranti, locali commerciali, pizzerie, bar, macellerie, pescherie. Accessori cucine professionali, attrezzatura gastronomia."
        />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_DOMAIN} />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Matarrese srl" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Layout navbarTransparent>
        <main>
          <ImgSlider />
          <section className="relative">
            {/*
          <section className="relative pt-20" id="cta">
            <H1 className="mx-auto mb-8 max-w-6xl text-center lg:mb-12 xl:mb-24">
              Dal design dell&apos;arredo alla formazione del personale per
              realizzare i tuoi progetti
            </H1>
        */}
            <Grid rowGap className="mb-12 lg:mb-24 xl:mb-48">
              <div className="col-span-full  lg:col-span-4">
                <CardSquareImg
                  imgSrc="/img/home-box-arredo.jpg"
                  title="Dall'idea al progetto reale"
                  description={`Aprire un'attivit??, rinnovare un locale,
                      avere una guida per migliorare il proprio lavoro: ti seguiamo ad ogni passo per realizzare la tue idee.`}
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
                  title="Marchi e attrezzature di qualit??"
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
                      Aiutiamo le idee a diventare progetti reali, assicurando il corretto ciclo di vita delle attrezzature
                      attraverso il supporto post vendita.
                    `}
                  url="/contatti"
                  urlText="Vieni a conoscerci"
                ></CardSquareImg>
              </div>
            </Grid>
          </section>

          <section className="mb-12 lg:mb-24 xl:mb-48">
            <Grid rowGap>
              <div className="col-span-full lg:col-span-6">
                <H3 className="mb-2" variant="secondary">
                  Da 40 anni partner degli operatori ho.re.ca
                </H3>
                <p className="mb-4 text-lg font-light leading-relaxed text-gray-600">
                  Creiamo spazi su misura dei professionisti. Dalla dimensione
                  delle attrezzature professionali agli arredi su misura, ci
                  impegniamo a cercare la soluzione ottimale per i tuoi spazi e
                  pi?? efficiente per il tuo lavoro.
                </p>
                <p className="mt-0 mb-4 text-lg font-light leading-relaxed text-gray-600">
                  L???innovazione e la tecnologia sono componenti essenziali nella
                  scelta di attrezzature per la ristorazione, di cucine
                  professionali e di impianti di aerazione e climatizzazione. La
                  professionalit?? e la qualit?? ci caratterizzano nella
                  consulenza professionale e nell???assistenza tecnica post
                  vendita.
                </p>
              </div>

              <div className="col-span-full text-center lg:col-span-6 lg:ml-8">
                <Image
                  src={imgHomePartnerOperatori}
                  layout="intrinsic"
                  objectFit="cover"
                  objectPosition="center"
                  alt="attrezzature ristorazione nello showroom"
                  className="rounded-lg shadow-sm"
                  placeholder="blur"
                />
              </div>
              {/* <CardBigImg
                  title="Vicini al Cliente"
                  content="Dalla progettazione alla realizzazione,
                  i nostri esperti seguono il cliente per trasformare le idee in realt??"
                  imgSrc="/img/vicini-al-cliente.jpg"
                  noSlope
                /> */}
            </Grid>
          </section>

          <section>
            <ProjectSection
              projects={lastTwoProjects.slice(0, 2)}
              title="Le nostre realizzazioni"
            />
          </section>

          <Spacer size="base" />

          <section className="mb-12 lg:mb-24 xl:mb-48">
            <Grid rowGap>
              <div className="col-span-full mr-8 text-center lg:col-span-6">
                <Image
                  src={imgHomeAttrezzature}
                  layout="intrinsic"
                  objectFit="cover"
                  objectPosition="center"
                  alt="attrezzature ristorazione nello showroom"
                  className="rounded-lg shadow-sm"
                  placeholder="blur"
                />
              </div>
              <div className="col-span-full lg:col-span-6">
                <div>
                  <H3 variant="secondary">
                    Tutto per creare i tuoi spazi professionali
                  </H3>
                  <p className="mt-4 text-lg leading-relaxed text-gray-500">
                    In una struttura aziendale di <strong>5000 mq</strong>{' '}
                    uniamo il laboratorio di produzione di arredi su misura,
                    l???officina e magazzino ricambi, il laboratorio di formazione
                    e un ampio showroom in cui potrai trovare:
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
            </Grid>
          </section>

          <section className="mb-12 lg:mb-24 xl:mb-48">
            <TestimonialSection testimonials={testimonials} />
          </section>

          <section className="mb-12 lg:mb-24 xl:mb-48" id="assogi">
            <Grid featured>
              <a
                href="https://www.assogi.it"
                target="_blank"
                className="col-span-full my-auto mb-14 lg:col-span-3 lg:mr-8"
                rel="noreferrer"
              >
                <Image
                  src={logoAssogi}
                  alt="logo Assogi"
                  layout="intrinsic"
                  placeholder="blur"
                />
              </a>
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

          <section className="mb-12 lg:mb-24 xl:mb-48" id="contatti">
            <ContactForm groups={groups} />
          </section>
          <section className="relative mb-12 lg:mb-24 xl:mb-48">
            <LogoSection />
          </section>
        </main>
      </Layout>
    </div>
  )
}

export async function getStaticProps() {
  const groups = await getGroups()
  const lastTwoProjects = await getLastTwoProjects()

  return {
    props: {
      groups,
      lastTwoProjects: lastTwoProjects,
    },
  }
}
