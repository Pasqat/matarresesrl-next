import Head from "next/head";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/outline";

import Navbar from "../components/Navbars/Navbar";

import HeaderBig from "../components/Header/HeaderBig";
import CardSquareImg from "../components/Card/CardSquareImg";
import CardBigImg from "../components/Card/CardBigImg";
import ContactForm from "../components/Form/ContactForm";
import ContactFormModal from "../components/Form/ContactFormModal";
import Layout from "../components/Layout";
import Container from "../components/Container"

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
                <div className="flex flex-wrap">
                  <CardSquareImg
                    imgSrc="/img/servizio-completo1-150x150.jpg"
                    title="Dall'idea al progetto reale"
                    className="md:mt-5"
                  >
                    Aprire un'attività, rinnovare un locale, avere una guida per
                    migliorare il proprio lavoro: Matarrese srl è la soluzione
                    adatta alle esigenze professionali del mondo della{" "}
                    <strong>ristorazione.</strong>
                  </CardSquareImg>

                  <CardSquareImg
                    imgSrc="/img/prodotti-qualita-150x150.jpg"
                    title="Marchi e attrezzature di qualità"
                    className="md:-mt-10"
                  >
                    Selezioniamo i migliori marchi del settore al fine di
                    fornire sempre un vasto assortimento di attrezzature e
                    prodotti di alta qualità, per soddisfare ogni esigenza dei
                    nostri clienti.
                  </CardSquareImg>

                  <CardSquareImg
                    imgSrc="/img/info-e-supporto-150x150.jpg"
                    title="Supporto pre e post intervento"
                  >
                    Promuoviamo la cultura, la professionalità, la conoscenza
                    nel mondo dell'enogastronomia, aiutiamo le idee a diventare
                    progetti reali, forniamo <strong>assistenza tecnica</strong>
                    ,<strong>riparazione</strong> e{" "}
                    <strong>manutenzione.</strong>
                  </CardSquareImg>
                </div>

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
                      reale progetto, realizzazione arredo e complementi
                      d’arredo su misura.
                    </p>
                    <p className="mt-0 mb-4 text-lg font-light leading-relaxed text-gray-600">
                      Forniture di attrezzature, tra cui attrezzature per
                      ristorazione e cucine professionali, impianti, assistenza
                      tecnica post vendita, manutenzione e riparazione,
                      consulenza professionale continua.
                    </p>
                    <ContactFormModal
                      buttonText="Realizza il tuo sogno"
                      buttonClassName="hover:bg-opacity-70 bg-yellow-500 bg-opacity-50 text-gray-800 text-lg py-2 px-4 "
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
              <div
                className="absolute top-0 left-0 right-0 bottom-auto w-full h-20 -mt-20 overflow-hidden pointer-events-none"
                style={{ transform: "translateZ(0)" }}
              >
                <svg
                  className="absolute bottom-0 overflow-hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="text-white fill-current"
                    points="2560 0 2560 100 0 100"
                  ></polygon>
                </svg>
              </div>

              <div className="container px-4 mx-auto">
                <div className="flex flex-wrap items-center">
                  <div className="w-full px-4 ml-auto mr-auto md:w-4/12">
                    <img
                      alt="..."
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
                              <span className="inline-block w-2 h-2 mr-3 text-xs font-semibold text-gray-500 uppercase bg-gray-100 rounded-full"></span>
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
                              <span className="inline-block w-2 h-2 mr-3 text-xs font-semibold text-gray-500 uppercase bg-gray-100 rounded-full"></span>
                            </div>
                            <div>
                              <h4 className="text-gray-500">Arredamenti</h4>
                            </div>
                          </div>
                        </li>
                        <li className="py-2">
                          <div className="flex items-center">
                            <div>
                              <span className="inline-block w-2 h-2 mr-3 text-xs font-semibold text-gray-500 uppercase bg-gray-100 rounded-full"></span>
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
                              <span className="inline-block w-2 h-2 mr-3 text-xs font-semibold text-gray-500 uppercase bg-gray-100 rounded-full"></span>
                            </div>
                            <div>
                              <h4 className="text-gray-500">
                                Forniture alberghiere
                              </h4>
                            </div>
                          </div>
                        </li>
                        <li className="py-2">
                          <div className="flex items-center">
                            <div>
                              <span className="inline-block w-2 h-2 mr-3 text-xs font-semibold text-gray-500 uppercase bg-gray-100 rounded-full"></span>
                            </div>
                            <div>
                              <h4 className="text-gray-500">Hotellerie</h4>
                            </div>
                          </div>
                        </li>
                        <li className="py-2">
                          <div className="flex items-center">
                            <div>
                              <span className="inline-block w-2 h-2 mr-3 text-xs font-semibold text-gray-500 uppercase bg-gray-100 rounded-full"></span>
                            </div>
                            <div>
                              <h4 className="text-gray-500">
                                ...e tanto altro
                              </h4>
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
              <div className="container px-4 mx-auto">
                <div className="flex flex-wrap justify-center mb-24 text-center">
                  <div className="w-full px-4 lg:w-6/12">
                    <h2 className="text-4xl font-semibold">
                      Here are our heroes
                    </h2>
                    <p className="m-4 text-lg leading-relaxed text-gray-500">
                      According to the National Oceanic and Atmospheric
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

            <section className="relative block pb-20 bg-gray-800">
              <div
                className="absolute top-0 left-0 right-0 bottom-auto w-full h-20 -mt-20 overflow-hidden pointer-events-none"
                style={{ transform: "translateZ(0)" }}
              >
                <svg
                  className="absolute bottom-0 overflow-hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x="0"
                  y="0"
                >
                  <polygon
                    className="text-gray-800 fill-current"
                    points="2560 0 2560 100 0 100"
                  ></polygon>
                </svg>
              </div>

              <div className="container px-4 mx-auto lg:pt-24 lg:pb-64">
                <div className="flex flex-wrap justify-center text-center">
                  <div className="w-full px-4 lg:w-6/12">
                    <h2 className="text-4xl font-semibold text-white">
                      Build something
                    </h2>
                    <p className="mt-4 mb-4 text-lg leading-relaxed text-gray-400">
                      Put the potentially record low maximum sea ice extent tihs
                      year down to low ice. According to the National Oceanic
                      and Atmospheric Administration, Ted, Scambos.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center mt-12">
                  <div className="w-full px-4 text-center lg:w-3/12">
                    <div className="inline-flex items-center justify-center w-12 h-12 p-3 text-gray-800 bg-white rounded-full shadow-lg">
                      <i className="text-xl fas fa-medal"></i>
                    </div>
                    <h6 className="mt-5 text-xl font-semibold text-white">
                      Excelent Services
                    </h6>
                    <p className="mt-2 mb-4 text-gray-400">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                  <div className="w-full px-4 text-center lg:w-3/12">
                    <div className="inline-flex items-center justify-center w-12 h-12 p-3 text-gray-800 bg-white rounded-full shadow-lg">
                      <i className="text-xl fas fa-poll"></i>
                    </div>
                    <h5 className="mt-5 text-xl font-semibold text-white">
                      Grow your market
                    </h5>
                    <p className="mt-2 mb-4 text-gray-400">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                  <div className="w-full px-4 text-center lg:w-3/12">
                    <div className="inline-flex items-center justify-center w-12 h-12 p-3 text-gray-800 bg-white rounded-full shadow-lg">
                      <i className="text-xl fas fa-lightbulb"></i>
                    </div>
                    <h5 className="mt-5 text-xl font-semibold text-white">
                      Launch time
                    </h5>
                    <p className="mt-2 mb-4 text-gray-400">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <section
              className="relative block py-24 bg-gray-800 lg:pt-0"
              id="#contatti"
            >
              <div className="container px-4 mx-auto">
                <div className="flex flex-wrap justify-center -mt-48 lg:-mt-64">
                  <div className="w-full px-4 lg:w-6/12">
                    <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-gray-200 rounded-lg shadow-lg">
                      <ContactForm />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
      </Layout>
    </div>
  );
}
