import Head from "next/head";
import Link from "next/link";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { Transition } from "@headlessui/react";

import HeaderBig from "../components/Header/HeaderBig";
import CardSquareImg from "../components/Card/CardSquareImg";
import CardBigImg from "../components/Card/CardBigImg";
import ContactForm from "../components/Form/ContactForm";
import ContactFormModal from "../components/Form/ContactFormModal";
import Layout from "../components/Layout";
import { SlopeDivSection } from "../ui/SlopeDivSection";

import Testimonials from "../components/Testimonials/Testimonials";

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

      <Layout>
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
                  // leave="transition ease-in-out duration-300 transform"
                  // leaveFrom="translate-y-0"
                  // leaveTo="-translate-y-full"
                  className="md:w-4/12 "
                >
                  <CardSquareImg
                    imgSrc="/img/servizio-completo1-150x150.jpg"
                    title="Dall'idea al progetto reale"
                    className="md:mt-5"
                  >
                    <div>
                      Aprire un'attività, rinnovare un locale, avere una guida
                      per migliorare il proprio lavoro: Matarrese srl è la
                      soluzione adatta alle esigenze professionali del mondo
                      della <strong>ristorazione.</strong>
                    </div>
                    <Link href="/servizi">
                      <a className="inline-flex items-center mt-4 text-yellow-500 group md:mb-2 lg:mb-0 ">
                        Scopri i servizi
                        <svg
                          className="w-4 h-4 ml-2 group-hover:translate-x-2"
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
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-y-0"
                  leaveTo="-translate-y-full"
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
                          className="w-4 h-4 ml-2 group-hover:translate-x-2"
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
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-y-0"
                  leaveTo="-translate-y-full"
                  className="md:w-4/12 "
                >
                  <CardSquareImg
                    imgSrc="/img/info-e-supporto-150x150.jpg"
                    title="Supporto pre e post intervento"
                  >
                    <div>
                      Promuoviamo la cultura, la professionalità, la conoscenza
                      nel mondo dell'enogastronomia, aiutiamo le idee a
                      diventare progetti reali, forniamo{" "}
                      <strong>assistenza tecnica</strong>,
                      <strong>riparazione</strong> e{" "}
                      <strong>manutenzione.</strong>
                    </div>
                    <Link href="/contatti">
                      <a className="inline-flex items-center mt-4 text-yellow-500 group md:mb-2 lg:mb-0 ">
                        Richiedi assistenza
                        <svg
                          className="w-4 h-4 ml-2 group-hover:translate-x-2"
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
                  <h3 className="mb-2 text-3xl font-semibold leading-normal">
                    Da oltre 30 anni partner degli operatori del settore
                  </h3>
                  <p className="mt-4 mb-4 text-lg font-light leading-relaxed text-gray-600">
                    Offriamo prodotti di alta qualità e servizi professionali:
                    interior design, consulenza per trasformare l’idea in un
                    reale progetto, realizzazione arredo e complementi d’arredo
                    su misura.
                  </p>
                  <p className="mt-0 mb-4 text-lg font-light leading-relaxed text-gray-600">
                    Forniture di attrezzature, tra cui attrezzature per
                    ristorazione e cucine professionali, impianti, assistenza
                    tecnica post vendita, manutenzione e riparazione, consulenza
                    professionale continua.
                  </p>
                  <ContactFormModal
                    buttonText="Realizza il tuo sogno"
                    buttonClassName="hover:shadow-none bg-yellow-600 shadow-md text-yellow-100 text-lg py-2 px-4 "
                  />
                </div>

                <CardBigImg
                  title="Vicini al Cliente"
                  content="Dalla progettazione alla realizzazione,
                  i nostri esperti seguono il cliente per trasformare le idee in realtà"
                  imgSrc="/img/vicini-al-cliente.jpg"
                ></CardBigImg>
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
                      <ShoppingCartIcon className="text-xl text-yellow-600" />
                    </div>
                    <h3 className="text-3xl font-semibold">
                      Tutto per il settore food
                    </h3>
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
                            <h4 className="text-gray-500">
                              Attrezzature per ristorazione
                            </h4>
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
                            <h4 className="text-gray-500">Arredamenti</h4>
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
                            <h4 className="text-gray-500">
                              Utensili da cucina
                            </h4>
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
                            <h4 className="text-gray-500">Hotellerie</h4>
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
                            <h4 className="text-gray-500">...e tanto altro</h4>
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
                  <h2 className="text-4xl font-semibold text-gray-800">
                    Cosa dicono di noi
                  </h2>
                </div>
              </div>
              <div className="mt-20">
                <Testimonials />
              </div>
            </div>
          </section>

          <section className="relative block pb-20 bg-gray-800">
            <SlopeDivSection color="text-gray-800" />

            <div className="container px-4 mx-auto lg:pt-24 lg:pb-64">
              <div className="flex flex-wrap justify-center mb-24 text-center">
                <div className="w-full px-4 lg:w-6/12">
                  <h2 className="text-4xl font-semibold">
                    Alcuni dei nostri lavori
                  </h2>
                  <p className="m-4 text-lg leading-relaxed text-gray-500">
                    According to th National Oceanic and Atmospheric
                    Administration, Ted, Scambos, NSIDClead scentist, puts the
                    potentially record maximum.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap">
                <div className="w-full px-4 mb-12 md:w-6/12 lg:w-3/12 lg:mb-0">
                  <div className="px-6">
                    <img
                      alt="..."
                      src="/img/team-1-800x800.jpg"
                      className="mx-auto rounded-full shadow-lg max-w-120-px"
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">Ryan Tompson</h5>
                      <p className="mt-1 text-sm font-semibold text-gray-400 uppercase">
                        Web Developer
                      </p>
                      <div className="mt-6">
                        <button
                          className="w-8 h-8 mb-1 mr-1 text-white rounded-full outline-none bg-lightBlue-400 focus:outline-none"
                          type="button"
                        >
                          <i className="fab fa-twitter"></i>
                        </button>
                        <button
                          className="w-8 h-8 mb-1 mr-1 text-white rounded-full outline-none bg-lightBlue-600 focus:outline-none"
                          type="button"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </button>
                        <button
                          className="w-8 h-8 mb-1 mr-1 text-white bg-pink-500 rounded-full outline-none focus:outline-none"
                          type="button"
                        >
                          <i className="fab fa-dribbble"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 mb-12 md:w-6/12 lg:w-3/12 lg:mb-0">
                  <div className="px-6">
                    <img
                      alt="..."
                      src="/img/team-2-800x800.jpg"
                      className="mx-auto rounded-full shadow-lg max-w-120-px"
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">Romina Hadid</h5>
                      <p className="mt-1 text-sm font-semibold text-gray-400 uppercase">
                        Marketing Specialist
                      </p>
                      <div className="mt-6">
                        <button
                          className="w-8 h-8 mb-1 mr-1 text-white bg-red-600 rounded-full outline-none focus:outline-none"
                          type="button"
                        >
                          <i className="fab fa-google"></i>
                        </button>
                        <button
                          className="w-8 h-8 mb-1 mr-1 text-white rounded-full outline-none bg-lightBlue-600 focus:outline-none"
                          type="button"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 mb-12 md:w-6/12 lg:w-3/12 lg:mb-0">
                  <div className="px-6">
                    <img
                      alt="..."
                      src="/img/team-3-800x800.jpg"
                      className="mx-auto rounded-full shadow-lg max-w-120-px"
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">Alexa Smith</h5>
                      <p className="mt-1 text-sm font-semibold text-gray-400 uppercase">
                        UI/UX Designer
                      </p>
                      <div className="mt-6">
                        <button
                          className="w-8 h-8 mb-1 mr-1 text-white bg-red-600 rounded-full outline-none focus:outline-none"
                          type="button"
                        >
                          <i className="fab fa-google"></i>
                        </button>
                        <button
                          className="w-8 h-8 mb-1 mr-1 text-white rounded-full outline-none bg-lightBlue-400 focus:outline-none"
                          type="button"
                        >
                          <i className="fab fa-twitter"></i>
                        </button>
                        <button
                          className="w-8 h-8 mb-1 mr-1 text-white bg-gray-700 rounded-full outline-none focus:outline-none"
                          type="button"
                        >
                          <i className="fab fa-instagram"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 mb-12 md:w-6/12 lg:w-3/12 lg:mb-0">
                  <div className="px-6">
                    <img
                      alt="..."
                      src="/img/team-4-470x470.png"
                      className="mx-auto rounded-full shadow-lg max-w-120-px"
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">Jenna Kardi</h5>
                      <p className="mt-1 text-sm font-semibold text-gray-400 uppercase">
                        Founder and CEO
                      </p>
                      <div className="mt-6">
                        <button
                          className="w-8 h-8 mb-1 mr-1 text-white bg-pink-500 rounded-full outline-none focus:outline-none"
                          type="button"
                        >
                          <i className="fab fa-dribbble"></i>
                        </button>
                        <button
                          className="w-8 h-8 mb-1 mr-1 text-white bg-red-600 rounded-full outline-none focus:outline-none"
                          type="button"
                        >
                          <i className="fab fa-google"></i>
                        </button>
                        <button
                          className="w-8 h-8 mb-1 mr-1 text-white rounded-full outline-none bg-lightBlue-400 focus:outline-none"
                          type="button"
                        >
                          <i className="fab fa-twitter"></i>
                        </button>
                        <button
                          className="w-8 h-8 mb-1 mr-1 text-white bg-gray-700 rounded-full outline-none focus:outline-none"
                          type="button"
                        >
                          <i className="fab fa-instagram"></i>
                        </button>
                      </div>
                    </div>
                  </div>
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
          <section className="relative py-20"></section>
        </main>
      </Layout>
    </div>
  );
}
