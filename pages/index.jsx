import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import {HeartIcon, ShoppingCartIcon} from '@heroicons/react/outline'
import {Transition} from '@headlessui/react'

import HeaderBig from '../components/Header/HeaderBig'
import CardSquareImg from '../components/Card/CardSquareImg'
import CardBigImg from '../components/Card/CardBigImg'
import ContactForm from '../components/Form/ContactForm'
import FormModal from '../components/Form/FormModal'
import Layout from '../components/Layout'
import {SlopeDivSection} from '../ui/SlopeDivSection'
import {LinkButton} from '../components/button'
import {TestimonialSection} from '../components/sections/testimonial-section'
import {MepaSection} from '../components/sections/mepa-section'

import {logos} from '../data/partner-logo'
import {H2, H3, H5} from '../components/typography'

import testimonials from '../data/testimonials'

export default function Home() {
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
          <section className="-mt-24 pb-20 bg-gray-200">
            <div className="container mx-auto px-4">
              <Transition as="div" className="flex flex-wrap" show={true}>
                <Transition.Child
                  enter="transition ease-in-out duration-[800ms] transform"
                  enterFrom="translate-y-full opacity-0"
                  enterTo="-translate-y-0"
                  className="md:w-4/12"
                >
                  <CardSquareImg
                    imgSrc="/img/servizio-completo1-150x150.jpg"
                    title="Dall'idea al progetto reale"
                    className="md:mt-5"
                  >
                    <div>
                      Aprire un&apos;attività, rinnovare un locale, avere una
                      guida per migliorare il proprio lavoro: Matarrese srl è la
                      soluzione adatta alle esigenze professionali del mondo
                      della <strong>ristorazione.</strong>
                    </div>
                    <LinkButton className="mt-4" href="/servizi" withArrow>
                      Scopri i servizi
                    </LinkButton>
                  </CardSquareImg>
                </Transition.Child>
                <Transition.Child
                  enter="transition ease-in-out duration-[1000ms] transform"
                  enterFrom="translate-y-full opacity-0"
                  enterTo="-translate-y-0"
                  className="md:w-4/12"
                >
                  <CardSquareImg
                    imgSrc="/img/prodotti-qualita-150x150.jpg"
                    title="Marchi e attrezzature di qualità"
                    className="md:-mt-10"
                  >
                    <div>
                      Selezioniamo i migliori marchi del settore al fine di
                      fornire sempre un vasto assortimento di attrezzature e
                      prodotti di alta qualità, per soddisfare ogni esigenza dei
                      nostri clienti.
                    </div>
                    <LinkButton className="mt-4" href="/prodotti" withArrow>
                      Scopri i prodotti
                    </LinkButton>
                  </CardSquareImg>
                </Transition.Child>
                <Transition.Child
                  enter="transition ease-in-out duration-[1200ms] transform"
                  enterFrom="translate-y-full opacity-0"
                  enterTo="-translate-y-0"
                  className="md:w-4/12"
                >
                  <CardSquareImg
                    imgSrc="/img/info-e-supporto-150x150.jpg"
                    title="Supporto pre e post intervento"
                  >
                    <div>
                      Promuoviamo la cultura, la professionalità, la conoscenza
                      nel mondo dell&apos;enogastronomia, aiutiamo le idee a
                      diventare progetti reali, forniamo{' '}
                      <strong>assistenza tecnica</strong>,
                      <strong>riparazione</strong> e{' '}
                      <strong>manutenzione.</strong>
                    </div>
                    <LinkButton className="mt-4" href="/contatti" withArrow>
                      Richiedi assistenza
                    </LinkButton>
                  </CardSquareImg>
                </Transition.Child>
              </Transition>

              <div className="flex flex-wrap items-center mt-32">
                <div className="ml-auto mr-auto px-4 w-full md:w-5/12">
                  <div className="inline-flex items-center justify-center mb-6 p-3 w-16 h-16 text-center text-gray-500 bg-white rounded-full shadow-lg">
                    <HeartIcon className="text-yellow-500 text-xl" />
                  </div>
                  <H3 className="mb-2" variant="secondary">
                    Da oltre 30 anni partner degli operatori del settore
                  </H3>
                  <p className="mb-4 mt-4 text-gray-600 text-lg font-light leading-relaxed">
                    Offriamo prodotti di alta qualità e servizi professionali:
                    interior design, consulenza per trasformare l’idea in un
                    progetto reale, realizzazione arredo e complementi d’arredo
                    s s s su misura.
                  </p>
                  <p className="mb-4 mt-0 text-gray-600 text-lg font-light leading-relaxed">
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

          <section className="relative py-20">
            <SlopeDivSection color="text-white" />
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center">
                <div className="ml-auto mr-auto px-4 w-full md:w-5/12">
                  <img
                    alt="attrezzature ristorazione nello showroom"
                    className="max-w-full rounded-lg shadow-lg"
                    src="/img/attrezzature-esposizione.jpg"
                  />
                </div>
                <div className="ml-auto mr-auto px-4 w-full md:w-5/12">
                  <div className="md:pr-12">
                    <div className="inline-flex items-center justify-center mb-6 p-3 w-16 h-16 text-center text-gray-500 bg-gray-200 rounded-full shadow-lg">
                      <ShoppingCartIcon className="text-indigo-500 text-xl" />
                    </div>
                    <H3 variant="secondary">Tutto per il settore food</H3>
                    <p className="mt-4 text-gray-500 text-lg leading-relaxed">
                      In una struttura aziendale di <strong>5000 mq</strong>{' '}
                      uniamo il laboratorio di produzione di arredi su misura,
                      l’officina e magazzino ricambi, il laboratorio di
                      formazione e un ampio showroom in cui potrai trovare:
                    </p>
                    <ul className="mt-6 list-none">
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="inline-block mr-3 px-2 py-1 text-gray-500 text-xs font-semibold bg-gray-100 rounded-full uppercase">
                              <i className="fas fa-blender"></i>
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
                            <span className="inline-block mr-3 px-2 py-1 text-gray-500 text-xs font-semibold bg-gray-100 rounded-full uppercase">
                              <i className="fas fa-chair"></i>
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
                            <span className="inline-block mr-3 px-2 py-1 text-gray-500 text-xs font-semibold bg-gray-100 rounded-full uppercase">
                              <i className="fas fa-utensils"></i>
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
                            <span className="inline-block mr-3 px-2 py-1 text-gray-500 text-xs font-semibold bg-gray-100 rounded-full uppercase">
                              <i className="fas fa-concierge-bell"></i>
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
                            <span className="inline-block mr-3 px-2 py-1 text-gray-500 text-xs font-semibold bg-gray-100 rounded-full uppercase">
                              <i className="fab fa-html5"></i>
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

          <section className="mx-10vw mb-24 lg:mb-48">
            <MepaSection />
          </section>
          <section
            className="relative block py-24 bg-gray-800 lg:pt-0"
            id="#contatti"
          ></section>
          <section className="relative py-20">
            <SlopeDivSection color="text-white" />
            <div className="container mb-12 mx-auto px-4">
              <div className="flex flex-wrap justify-center -mt-48 lg:-mt-64">
                <div className="px-4 w-full md:w-3/4">
                  <div className="relative flex flex-col mb-6 w-full min-w-0 break-words bg-gray-200 rounded-lg shadow-lg">
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* LOGO SECTION */}
          <section className="relative py-20">
            <div className="container mb-12 mx-auto px-4">
              <H2 className="mb-8 text-center" variant="secondary">
                I Nostri partner
              </H2>
              <div className="grid grid-cols-2 2xl:grid-cols-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {logos.map(logo => {
                  return logo.href ? (
                    <Link key={logo.name} href={logo.href}>
                      <a className="text-center cursor-pointer hover:drop-shadow-md">
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
