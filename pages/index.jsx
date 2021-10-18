import Head from "next/head";
import Link from "next/link";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { Transition } from "@headlessui/react";

import HeaderBig from "../components/Header/HeaderBig";
import CardSquareImg from "../components/Card/CardSquareImg";
import CardBigImg from "../components/Card/CardBigImg";
import ContactForm from "../components/Form/ContactForm";
import FormModal from "../components/Form/FormModal";
import Layout from "../components/Layout";
import { SlopeDivSection } from "../ui/SlopeDivSection";

import Testimonials from "../components/Testimonials/Testimonials";
import { logos } from "../data/partner-logo";
import Image from "next/image";
import { H2, H3, H4, H5, H6 } from "../components/typography";

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
          <section className="pb-20 -mt-24 bg-gray-200">
            <div className="container px-4 mx-auto">
              <Transition as="div" className="flex flex-wrap" show={true}>
                <Transition.Child
                  enter="transition ease-in-out duration-[800ms] transform"
                  enterFrom="translate-y-full opacity-0"
                  enterTo="-translate-y-0"
                  className="md:w-4/12 "
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
                    <Link href="/servizi">
                      <a className="inline-flex items-center mt-4 text-yellow-500 group md:mb-2 lg:mb-0 ">
                        Scopri i servizi
                        <svg
                          className="w-4 h-4 ml-2 animate-bounceX"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </Link>
                  </CardSquareImg>
                </Transition.Child>
                <Transition.Child
                  enter="transition ease-in-out duration-[1000ms] transform"
                  enterFrom="translate-y-full opacity-0"
                  enterTo="-translate-y-0"
                  className="md:w-4/12 "
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
                    <Link href="/prodotti">
                      <a className="inline-flex items-center mt-4 text-yellow-500 group md:mb-2 lg:mb-0 ">
                        Scopri i prodotti
                        <svg
                          // className="w-4 h-4 ml-2 group-hover:translate-x-2"
                          className="w-4 h-4 ml-2 animate-bounceX"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </Link>
                  </CardSquareImg>
                </Transition.Child>
                <Transition.Child
                  enter="transition ease-in-out duration-[1200ms] transform"
                  enterFrom="translate-y-full opacity-0"
                  enterTo="-translate-y-0"
                  className="md:w-4/12 "
                >
                  <CardSquareImg
                    imgSrc="/img/info-e-supporto-150x150.jpg"
                    title="Supporto pre e post intervento"
                  >
                    <div>
                      Promuoviamo la cultura, la professionalità, la conoscenza
                      nel mondo dell&apos;enogastronomia, aiutiamo le idee a
                      diventare progetti reali, forniamo{" "}
                      <strong>assistenza tecnica</strong>,
                      <strong>riparazione</strong> e{" "}
                      <strong>manutenzione.</strong>
                    </div>
                    <Link href="/contatti">
                      <a className="inline-flex items-center mt-4 text-yellow-500 group md:mb-2 lg:mb-0 ">
                        Richiedi assistenza
                        <svg
                          className="w-4 h-4 ml-2 animate-bounceX"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </Link>
                  </CardSquareImg>
                </Transition.Child>
              </Transition>

              <div className="flex flex-wrap items-center mt-32">
                <div className="w-full px-4 ml-auto mr-auto md:w-5/12">
                  <div className="inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center text-gray-500 bg-white rounded-full shadow-lg">
                    <HeartIcon className="text-xl text-yellow-500" />
                  </div>
                  <H3 className="mb-2" variant="secondary">
                    Da oltre 30 anni partner degli operatori del settore
                  </H3>
                  <p className="mt-4 mb-4 text-lg font-light leading-relaxed text-gray-600">
                    Offriamo prodotti di alta qualità e servizi professionali:
                    interior design, consulenza per trasformare l’idea in un
                    progetto reale, realizzazione arredo e complementi d’arredo s
                    s s su misura.
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

          <section className="relative py-20">
            <SlopeDivSection color="text-white" />
            <div className="container px-4 mx-auto">
              <div className="flex flex-wrap items-center">
                <div className="w-full px-4 ml-auto mr-auto md:w-5/12">
                  <img
                    alt="attrezzature ristorazione nello showroom"
                    className="max-w-full rounded-lg shadow-lg"
                    src="/img/attrezzature-esposizione.jpg"
                  />
                </div>
                <div className="w-full px-4 ml-auto mr-auto md:w-5/12">
                  <div className="md:pr-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center text-gray-500 bg-gray-200 rounded-full shadow-lg">
                      <ShoppingCartIcon className="text-xl text-indigo-500" />
                    </div>
                    <H3 variant="secondary">
                      Tutto per il settore food
                    </H3>
                    <p className="mt-4 text-lg leading-relaxed text-gray-500">
                      In una struttura aziendale di <strong>5000 mq</strong>{" "}
                      uniamo il laboratorio di produzione di arredi su misura,
                      l’officina e magazzino ricambi, il laboratorio di
                      formazione e un ampio showroom in cui potrai trovare:
                    </p>
                    <ul className="mt-6 list-none">
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="inline-block px-2 py-1 mr-3 text-xs font-semibold text-gray-500 uppercase bg-gray-100 rounded-full">
                              <i className="fas fa-blender"></i>
                            </span>
                          </div>
                          <div>
                            <H5 as="h4">
                              Attrezzature per ristorazione
                            </H5>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="inline-block px-2 py-1 mr-3 text-xs font-semibold text-gray-500 uppercase bg-gray-100 rounded-full">
                              <i className="fas fa-chair"></i>
                            </span>
                          </div>
                          <div>
                            <H5 as="h4">
                            Arredamenti
                            </H5>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="inline-block px-2 py-1 mr-3 text-xs font-semibold text-gray-500 uppercase bg-gray-100 rounded-full">
                              <i className="fas fa-utensils"></i>
                            </span>
                          </div>
                          <div>
                            <H5 as="h4">
                              Utensili da cucina
                            </H5>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="inline-block px-2 py-1 mr-3 text-xs font-semibold text-gray-500 uppercase bg-gray-100 rounded-full">
                              <i className="fas fa-concierge-bell"></i>
                            </span>
                          </div>
                          <div>
                            <H5 as="h4">
                              Hotellerie
                            </H5>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center">
                          <div>
                            <span className="inline-block px-2 py-1 mr-3 text-xs font-semibold text-gray-500 uppercase bg-gray-100 rounded-full">
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

          <section className="pt-20 pb-48">
            <div className="container px-8 md:mx-auto">
              <div className="flex flex-wrap justify-center text-center">
                <div className="w-full px-4 lg:w-6/12">
                  <H2 variant="secondary">
                    Cosa dicono di noi
                  </H2>
                </div>
              </div>
              <div className="mt-20">
                <Testimonials />
              </div>
            </div>
          </section>

          <section className="relative block pb-20 bg-gray-800">
            <SlopeDivSection color="text-gray-800" />

            <div className="container px-4 mx-auto lg:py-24">
              <div className="flex flex-wrap justify-center text-center">
                <div className="w-full px-4 lg:w-8/12">
                  <H2 className="text-white">MePA</H2>
                  <p className="m-4 text-2xl leading-relaxed text-gray-400">
                    Siamo presenti sul{" "}
                    <strong className="text-yellow-500">MEPA</strong>: il
                    Mercato Elettronico della Pubblica Amministrazione digitale
                    in cui le Amministrazioni abilitate possono acquistare i
                    beni e servizi offerti da fornitori abilitati a presentare i
                    propri cataloghi sul sistema.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section
            className="relative block py-24 bg-gray-800 lg:pt-0"
            id="#contatti"
          ></section>
          <section className="relative py-20">
            <SlopeDivSection color="text-white" />
            <div className="container px-4 mx-auto mb-12">
              <div className="flex flex-wrap justify-center -mt-48 lg:-mt-64">
                <div className="w-full px-4 md:w-3/4">
                  <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-gray-200 rounded-lg shadow-lg">
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* LOGO SECTION */}
          <section className="relative py-20">
            <div className="container px-4 mx-auto mb-12">
              <H2 className="mb-8 text-center" variant="secondary">I Nostri partner</H2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {logos.map((logo) => {
                  return logo.href ? (
                    <Link href={logo.href}>
                      <a
                        key={logo.name}
                        className="cursor-pointer text-center hover:drop-shadow-md"
                      >
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
                  );
                })}
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </div>
  );
}
