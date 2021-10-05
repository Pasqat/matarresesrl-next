import Head from "next/head";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/outline";

import HeaderBig from "../../components/Header/HeaderBig";
import CardBigImg from "../../components/Card/CardBigImg";
import ContactForm from "../../components/Form/ContactForm";
import Layout from "../../components/Layout";
import { SlopeDivSection } from "../../ui/SlopeDivSection";

import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Matarrese srl | Prodotti</title>
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
            title="Prodotti"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In."
            button={{ text: "visita il nostro showroom", link: "/contatti" }}
          />
          <section className="pb-20 bg-gray-200">
            <div className="container px-4 mx-auto">
              <div className="-mt-24 flex">
                <div className="w-full p-8 h-64 bg-white text-lg font-semibold text-gray-700 items-center justify-center rounded-lg shadow-md grid grid-cols-2 z-3">
                  <div className="text-center">
                    <Link href="#lavorazione">
                      <a>Per la Lavorazione</a>
                    </Link>
                  </div>
                  <div className="text-center">
                    <Link href="#accoglienza">
                      <a>Tutto per l&apos;accoglienza</a>
                    </Link>
                  </div>
                  <div className="text-center">
                    <Link href="#igiene">
                      <a>Igiene</a>
                    </Link>
                  </div>
                  <div className="text-center">
                    <Link href="#trattamento-aria">
                      <a>Trattamento dell&apos;aria</a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 my-32">
                <h2 className="text-4xl text-center font-semibold text-gray-800">
                  Per la Lavorazione
                </h2>
              </div>

              <div className="flex flex-wrap items-center" id="lavorazione">
                <div className="w-full px-4 ml-auto mr-auto md:w-5/12">
                  <div className="md:pr-12 text-lg">
                    <div className="inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center text-blue-400 bg-white rounded-full shadow-lg">
                      <i className="far fa-snowflake" />
                    </div>
                    <h3 className="text-3xl font-semibold">Cottura</h3>
                    <p className="mt-4 leading-relaxed text-gray-500">
                      Aprire un&apos;attività, rinnovare un locale, avere una
                      guida per migliorare il proprio lavoro: Matarrese srl è la
                      soluzione adatta alle esigenze professionali del mondo
                      della ristorazione.
                    </p>
                    <p className="mt-4 leading-relaxed text-gray-500">
                      Altro testo a caso che possa avere un minimo di senso e di
                      keywords utili
                    </p>
                    <div className="mt-6">
                      <Link href="#">
                        <a className="text-yellow-600">Approfondisci</a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="inline-flex w-full ml-auto mr-auto md:w-4/12 overflow-hidden shadow-lg rounded-lg">
                  <Image
                    alt="prodotti per la cucina professionale"
                    className="max-w-full rounded-lg shadow-lg"
                    src="/img/cottura-prodotti.png"
                    width="1000"
                    height="1300"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-center my-24">
                <CardBigImg
                  title="Macchinari per l'agroalimentare"
                  content="Vieni a trovarci nel nostro showrooms, raccontaci le tue esigenze e insieme troveremo la soluzione più adeguata anche per impianti di trasformazione industriali"
                  imgSrc="/img/pastorizzatore-prodotti.jpg"
                  noSlope
                />
                <div className="w-full text-lg  px-4 ml-auto mr-auto md:w-5/12">
                  <div className="inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center text-gray-500 bg-white rounded-full shadow-lg">
                    <HeartIcon className="text-xl text-yellow-500" />
                  </div>
                  <h3 className="mb-2 text-3xl font-semibold leading-normal">
                    Attrezzature
                  </h3>
                  <p className="mt-4 leading-relaxed text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus vehicula quam ipsum, at aliquam tellus mollis
                    varius. Integer nisi urna, vulputate non risus ac, imperdiet
                    vestibulum dolor. Proin rutrum nunc id pellentesque semper.
                  </p>
                  <p className="mt-4 leading-relaxed text-gray-500">
                    Maecenas efficitur dictum est sed eleifend. Sed mauris diam,
                    dapibus eu gravida ut, lacinia nec odio. Sed ultricies
                    convallis lobortis. Nam a ex sed sem cursus tincidunt. Nam
                    nec nunc id velit imperdiet
                  </p>
                  <div className="mt-6">
                    <Link href="#">
                      <a className="text-yellow-600">Approfondisci</a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center">
                <div className="w-full px-4 ml-auto mr-auto md:w-5/12">
                  <div className="md:pr-12 text-lg">
                    <div className="inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center text-blue-400 bg-white rounded-full shadow-lg">
                      <i className="far fa-snowflake" />
                    </div>
                    <h3 className="text-3xl font-semibold">Refrigerazione</h3>
                    <p className="mt-4 leading-relaxed text-gray-500">
                      Aprire un&apos;attività, rinnovare un locale, avere una
                      guida per migliorare il proprio lavoro: Matarrese srl è la
                      soluzione adatta alle esigenze professionali del mondo
                      della ristorazione.
                    </p>
                    <p className="mt-4 leading-relaxed text-gray-500">
                      Altro testo a caso che possa avere un minimo di senso e di
                      keywords utili
                    </p>
                    <div className="mt-6">
                      <Link href="#">
                        <a className="text-yellow-600">Approfondisci</a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="inline-flex w-full ml-auto mr-auto md:w-4/12 overflow-hidden shadow-lg rounded-lg">
                  <Image
                    alt="refrigerazione alimentare"
                    src="/img/refrigerazione-prodotti.jpg"
                    width="1000"
                    height="1300"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="relative py-32" id="accoglienza">
            <SlopeDivSection color="text-white" />
            <div className="container px-4 mx-auto">
              <div className="flex flex-wrap items-center">
                <div className="inline-flex w-full ml-auto mr-auto md:w-5/12 overflow-hidden shadow-lg rounded-lg">
                  <Image
                    alt="arredi su misura"
                    src="/img/arredo-su-misura-prodotti.jpg"
                    width="1000"
                    height="1300"
                    objectFit="cover"
                  />
                </div>
                <div className="w-full px-4 ml-auto mr-auto md:w-5/12">
                  <div className="md:pr-12">
                    {/* <div className="inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center text-gray-500 bg-gray-200 rounded-full shadow-lg"> */}
                    {/*   <ShoppingCartIcon className="text-xl text-indigo-500" /> */}
                    {/* </div> */}
                    <h3 className="text-3xl font-semibold">
                      Tutto per l&apos;accoglienza
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-gray-500">
                      Qualsiasi stile hai scelto per la tua attività da noi puoi
                      trovare l’arredo e i complementi che fanno per te. E per
                      le esigenze più particolari possiamo realizzare il tuo
                      arredo su misura. Scopri di più su:
                    </p>
                    <ul className="mt-6 list-none text-lg">
                      <li className="py-2">
                        <div className="flex flex-wrap items-center">
                          <Link href="#">
                            <a className="inline-flex items-center text-yellow-500 md:mb-2 lg:mb-0">
                              Arredi e complementi
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
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex flex-wrap items-center">
                          <Link href="#">
                            <a className="inline-flex items-center text-yellow-500 md:mb-2 lg:mb-0">
                              Arredi su misura
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
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex flex-wrap items-center">
                          <Link href="#">
                            <a className="inline-flex items-center text-yellow-500 md:mb-2 lg:mb-0">
                              Forniture alberghiere
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
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative block pb-20 bg-gray-800" id="igiene">
            <SlopeDivSection color="text-gray-800" />

            <div className="container px-4 mx-auto lg:py-24">
              <div className="flex flex-wrap justify-center text-center">
                <div className="w-full px-4 lg:w-9/12">
                  <h2 className="text-4xl text-gray-100 font-semibold">
                    Igiene
                  </h2>
                  <div className="grid grid-cols-3 text-gray-200 text-lg justify-evenly w-full gap-24 my-10">
                    <div>
                      <Image
                        width="400"
                        height="400"
                        objectFit="cover"
                        className="rounded-lg shadow-m"
                        src="/img/sanificatore-prodotti.png"
                        alt="Sanificatore"
                      />
                      <p className="mt-6 mb-4 font-semibold text-2xl">
                        Sanificazione
                      </p>
                      <Link href="#">
                        <a className="text-yellow-500">Scopri di più</a>
                      </Link>
                    </div>
                    <div>
                      <Image
                        width="400"
                        height="400"
                        objectFit="cover"
                        className="rounded-lg shadow-md"
                        src="/img/lavaggio-prodotti.jpg"
                        alt="lavastovigle professionali"
                      />
                      <p className="mt-6 mb-4 font-semibold text-2xl">
                        Lavaggio
                      </p>
                      <Link href="#">
                        <a className="text-yellow-500">Scopri di più</a>
                      </Link>
                    </div>
                    <div>
                      <Image
                        width="400"
                        height="400"
                        objectFit="cover"
                        className="rounded-lg shadow-md"
                        src="/img/lavanderia-prodotti.jpg"
                        alt="lavatrici indutriali"
                      />
                      <p className="mt-6 mb-4 font-semibold text-2xl">
                        Lavanderia
                      </p>
                      <Link href="#">
                        <a className="text-yellow-500">Scopri di più</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="relative py-20" id="trattamento-aria">
            <SlopeDivSection color="text-white" />
            <div className="w-full px-4 my-32">
              <h2 className="text-4xl text-center font-semibold text-gray-800">
                Per il trattamento dell&apos;aria
              </h2>
            </div>
            <div className="container px-4 mx-auto lg:py-24">
              <div className="flex flex-wrap items-center" id="#aspirazione">
                <div className="w-full px-4 ml-auto mr-auto md:w-5/12">
                  <div className="md:pr-12 text-lg">
                    <div className="inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center text-blue-400 bg-white rounded-full shadow-lg">
                      <i className="far fa-snowflake" />
                    </div>
                    <h3 className="text-3xl font-semibold">Aspirazione</h3>
                    <p className="mt-4 leading-relaxed text-gray-500">
                      Aprire un&apos;attività, rinnovare un locale, avere una
                      guida per migliorare il proprio lavoro: Matarrese srl è la
                      soluzione adatta alle esigenze professionali del mondo
                      della ristorazione.
                    </p>
                    <p className="mt-4 leading-relaxed text-gray-500">
                      Altro testo a caso che possa avere un minimo di senso e di
                      keywords utili
                    </p>
                    <div className="mt-6">
                      <Link href="#">
                        <a className="text-yellow-600">Approfondisci</a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 ml-auto mr-auto md:w-4/12">
                  <Image
                    alt="sistemi di aspirazione e trattamento dell'aria"
                    className="max-w-full rounded-lg shadow-lg"
                    src="/img/aspirazione-prodotti.jpg"
                    width="1000"
                    height="1300"
                    objectFit="cover"
                  />
                </div>
              </div>
              <div
                className="flex flex-wrap items-center mt-36"
                id="#climatizzazione"
              >
                <div className="w-full px-4 ml-auto mr-auto md:w-4/12">
                  <Image
                    alt="climatizzazione indutstriale"
                    className="max-w-full rounded-lg shadow-lg"
                    src="/img/climatizzazione-prodotti.jpg"
                    width="1000"
                    height="1300"
                    objectFit="cover"
                  />
                </div>
                <div className="w-full px-4 ml-auto mr-auto md:w-5/12">
                  <div className="md:pr-12 text-lg">
                    <div className="inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center text-blue-400 bg-white rounded-full shadow-lg">
                      <i className="far fa-snowflake" />
                    </div>
                    <h3 className="text-3xl font-semibold">Climatizzazione</h3>
                    <p className="mt-4 leading-relaxed text-gray-500">
                      Aprire un&apos;attività, rinnovare un locale, avere una
                      guida per migliorare il proprio lavoro: Matarrese srl è la
                      soluzione adatta alle esigenze professionali del mondo
                      della ristorazione.
                    </p>
                    <p className="mt-4 leading-relaxed text-gray-500">
                      Altro testo a caso che possa avere un minimo di senso e di
                      keywords utili
                    </p>
                    <div className="mt-6">
                      <Link href="#">
                        <a className="text-yellow-600">Approfondisci</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="relative py-20" id="contatti">
            <div className="container px-4 mx-auto mb-12">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 md:w-3/4">
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
