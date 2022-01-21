import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import {HeartIcon, ShoppingCartIcon} from '@heroicons/react/outline'

import HeaderBig from '../components/Header/HeaderBig'
import CardSquareImg from '../components/Card/CardSquareImg'
import CardBigImg from '../components/Card/CardBigImg'
import ContactForm from '../components/Form/ContactForm'
import FormModal from '../components/Form/FormModal'
import Layout from '../components/Layout'
import {LinkButton} from '../components/button'
import {TestimonialSection} from '../components/sections/testimonial-section'
import {MepaSection} from '../components/sections/mepa-section'

import {logos} from '../data/partner-logo'
import {H2, H3, H5} from '../components/typography'

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
            title="Specialisti della Ristorazione"
            subtitle="Dal design dell'arredo alla formazione del personale per realizzare i tuoi progetti"
            noButton
          />

          <section className="pb-20 -mt-24">
            <div className="container px-4 mx-auto">
              <div as="div" className="flex flex-wrap" show={true}>
                <div className="md:w-4/12">
                  <CardSquareImg
                    imgSrc="/img/servizio-completo1-150x150.jpg"
                    title="Dall'idea al progetto reale"
                    className="md:mt-5"
                    description={`Aprire un&apos;attività, rinnovare un locale, avere una
                      guida per migliorare il proprio lavoro: Matarrese srl è la
                      soluzione adatta alle esigenze professionali del mondo
                      della <strong>ristorazione.</strong>`}
                    urlText="Scopri i servizi"
                    url="/servizi"
                  >
                    <LinkButton className="mt-4" href="/servizi" withArrow>
                      Scopri i servizi
                    </LinkButton>
                  </CardSquareImg>
                </div>
                <div className="md:w-4/12">
                  <CardSquareImg
                    imgSrc="/img/prodotti-qualita-150x150.jpg"
                    title="Marchi e attrezzature di qualità"
                    className="md:-mt-10"
                    description={`
                      Selezioniamo i migliori marchi del settore al fine di
                      fornire sempre un vasto assortimento di attrezzature e
                      prodotti di alta qualità, per soddisfare ogni esigenza dei
                      nostri clienti.
                    `}
                    urlText="Scopri i prodotti"
                    url="/prodotti"
                  ></CardSquareImg>
                </div>
                <div className="md:w-4/12">
                  <CardSquareImg
                    imgSrc="/img/info-e-supporto-150x150.jpg"
                    title="Supporto pre e post intervento"
                    description={`
                      Promuoviamo la cultura, la professionalità, la conoscenza
                      nel mondo dell&apos;enogastronomia, aiutiamo le idee a
                      diventare progetti reali, forniamo
                      <strong>assistenza tecnica</strong>,
                      <strong>riparazione</strong> e
                      <strong>manutenzione.</strong>
                    `}
                    url="/contatti"
                    urlText="Richiedi assistenza"
                  ></CardSquareImg>
                </div>
              </div>

              <div className="flex flex-wrap items-center mt-32">
                <div className="px-4 mr-auto ml-auto w-full md:w-5/12">
                  <div className="inline-flex justify-center items-center p-3 mb-6 w-16 h-16 text-center text-gray-500 bg-white rounded-full shadow-lg">
                    <HeartIcon className="text-xl text-yellow-500" />
                  </div>
                  <H3 className="mb-2" variant="secondary">
                    Da oltre 30 anni partner degli operatori del settore
                  </H3>
                  <p className="mb-4 text-lg font-light leading-relaxed text-gray-600">
                    Offriamo prodotti di alta qualità e servizi professionali:
                    interior design, consulenza per trasformare l’idea in un
                    progetto reale, realizzazione arredo e complementi d’arredo
                    s s s su misura.
                  </p>
                  <p className="mt-0 mb-4 text-lg font-light leading-relaxed text-gray-600">
                    Forniture di attrezzature, tra cui attrezzature per
                    ristorazione e cucine professionali, impianti, assistenza
                    tecnica post vendita, manutenzione e riparazione, consulenza
                    professionale continua.
                  </p>
                  <FormModal
                    buttonText="Realizza il tuo sogno"
                    buttonClassName="hover:shadow-none bg-gradient-tl-yellow shadow-md text-white rounded text-lg py-2 px-4 "
                  />
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
            <div className="container px-4 mx-auto">
              <div className="flex flex-wrap items-center">
                <div className="px-4 mr-auto ml-auto w-full md:w-5/12">
                  <img
                    alt="attrezzature ristorazione nello showroom"
                    className="max-w-full rounded-lg shadow-lg"
                    src="/img/attrezzature-esposizione.jpg"
                  />
                </div>
                <div className="px-4 mr-auto ml-auto w-full md:w-5/12">
                  <div className="md:pr-12">
                    <div className="inline-flex justify-center items-center p-3 mb-6 w-16 h-16 text-center text-gray-500 bg-gray-200 rounded-full shadow-lg">
                      <ShoppingCartIcon className="text-xl" />
                    </div>
                    <H3 variant="secondary">Tutto per il settore food</H3>
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
                            <span className="inline-block py-1 px-2 mr-3 text-xs font-semibold text-gray-500 uppercase bg-gray-100 rounded-full">
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
                            <span className="inline-block py-1 px-2 mr-3 text-xs font-semibold text-gray-500 uppercase bg-gray-100 rounded-full">
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
                            <span className="inline-block py-1 px-2 mr-3 text-xs font-semibold text-gray-500 uppercase bg-gray-100 rounded-full">
                              {/* <i className="fas fa-utensils"></i> */}
                            </span>
                          </div>
                          <div>
                            <H5 as="h4">Utensili da cucina</H5>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="inline-block py-1 px-2 mr-3 text-xs font-semibold text-gray-500 uppercase bg-gray-100 rounded-full">
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
                            <span className="inline-block py-1 px-2 mr-3 text-xs font-semibold text-gray-500 uppercase bg-gray-100 rounded-full">
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
            <MepaSection />
          </section>

          <section className="mb-24 lg:mb-48">
            <TestimonialSection testimonials={testimonials} />
          </section>

          <section className="mb-24 lg:mb-48" id="#contatti">
            <ContactForm featured groups={groups} />
          </section>
          {/* LOGO SECTION */}
          <section className="relative mb-24 lg:mb-48">
            <div className="container px-4 mx-auto mb-12">
              <H2 className="mb-8 text-center" variant="secondary">
                I Nostri partner
              </H2>
              <div className="grid grid-cols-2 2xl:grid-cols-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {logos.map(logo => {
                  return logo.href ? (
                    <Link key={logo.name} href={logo.href}>
                      <a className="text-center hover:drop-shadow-md cursor-pointer">
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
