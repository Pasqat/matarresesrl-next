import Head from "next/head";
import Link from "next/link";
import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/outline";

import HeaderBig from "../../components/Header/HeaderBig";
import CardBigImg from "../../components/Card/CardBigImg";
import ContactForm from "../../components/Form/ContactForm";
import FormModal from "../../components/Form/FormModal";
import Layout from "../../components/Layout";
import { SlopeDivSection } from "../../ui/SlopeDivSection";

import Testimonials from "../../components/Testimonials/Testimonials";
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
                    Per la Lavorazione
                  </div>
                  <div className="text-center">
                    Tutto per l'accoglienza
                  </div>
                  <div className="text-center">
                    Igiene
                  </div>
                  <div className="text-center">
                    Trattamento dell'aria
                  </div>
                </div>
              </div>
              <div className="w-full px-4 my-32">
                <h2 className="text-4xl text-center font-semibold text-gray-800">
                  Per la Lavorazione
                </h2>
              </div>

              <div className="flex flex-wrap items-center">
                <div className="w-full px-4 ml-auto mr-auto md:w-5/12">
                  <div className="md:pr-12 text-lg">
                    <div className="inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center text-blue-400 bg-white rounded-full shadow-lg">
                      <i className="far fa-snowflake" />
                    </div>
                    <h3 className="text-3xl font-semibold">
                      Cottura
                    </h3>
                    <p className="mt-4 leading-relaxed text-gray-500">
                      Aprire un'attività, rinnovare un locale, avere una guida
                      per migliorare il proprio lavoro: Matarrese srl è la
                      soluzione adatta alle esigenze professionali del mondo
                      della ristorazione.
                    </p>
                    <p className="mt-4 leading-relaxed text-gray-500">
                      Altro testo a caso che possa avere un minimo di senso e di keywords utili
                    </p>
                    <div className="mt-6">
                      <Link href="#">
                        <a className="text-yellow-600">
                          Approfondisci
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 ml-auto mr-auto md:w-4/12">
                  <Image
                    alt="attrezzature ristorazione nello showroom"
                    className="max-w-full rounded-lg shadow-lg"
                    src="/img/attrezzature-esposizione.jpg"
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
                  imgSrc="/img/vicini-al-cliente.jpg"
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
                    Maecenas efficitur dictum
                    est sed eleifend. Sed mauris diam, dapibus eu gravida ut,
                    lacinia nec odio. Sed ultricies convallis lobortis. Nam a ex
                    sed sem cursus tincidunt. Nam nec nunc id velit imperdiet

                  </p>
                  <div className="mt-6">
                    <Link href="#">
                      <a className="text-yellow-600">
                        Approfondisci
                      </a>
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
                    <h3 className="text-3xl font-semibold">
                      Refrigerazione
                    </h3>
                    <p className="mt-4 leading-relaxed text-gray-500">
                      Aprire un'attività, rinnovare un locale, avere una guida
                      per migliorare il proprio lavoro: Matarrese srl è la
                      soluzione adatta alle esigenze professionali del mondo
                      della ristorazione.
                    </p>
                    <p className="mt-4 leading-relaxed text-gray-500">
                      Altro testo a caso che possa avere un minimo di senso e di keywords utili
                    </p>
                    <div className="mt-6">
                      <Link href="#">
                        <a className="text-yellow-600">
                          Approfondisci
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="w-full px-4 ml-auto mr-auto md:w-4/12">
                  <Image
                    alt="attrezzature ristorazione nello showroom"
                    className="max-w-full rounded-lg shadow-lg"
                    src="/img/attrezzature-esposizione.jpg"
                    width="1000"
                    height="1300"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="relative py-32">
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
                    {/* <div className="inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center text-gray-500 bg-gray-200 rounded-full shadow-lg"> */}
                    {/*   <ShoppingCartIcon className="text-xl text-indigo-500" /> */}
                    {/* </div> */}
                    <h3 className="text-3xl font-semibold">
                      Tutto per l'accoglienza
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-gray-500">
                      Qualsiasi stile hai scelto per la tua attività da noi
                      puoi trovare l’arredo e i complementi che fanno per te. E
                      per le esigenze più particolari possiamo realizzare il tuo
                      arredo su misura.
                      Scopri di più su:
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


          <section className="relative block pb-20 bg-gray-800">
            <SlopeDivSection color="text-gray-800" />

            <div className="container px-4 mx-auto lg:py-24">
              <div className="flex flex-wrap justify-center text-center">
                <div className="w-full px-4 lg:w-8/12">
                  <h2 className="text-4xl text-gray-100 font-semibold">Igiene</h2>
                  <div class="grid-cols-3 text-gray-200 text-lg">
                    <div>
                      <Image
                        width="400"
                        height="400"
                        objectFit="cover"
                        className="rounded-lg shadow-md"
                        src="/img/servizio-completo1-150x150.jpg" />
                      <p className="font-semibold text-2xl">Sanificazione</p>
                      <Link href="#">
                        <a className="text-yellow-500">
                          Scopri di più
                        </a>
                      </Link>
                    </div>
                    <div>
                      <Image
                        width="400"
                        height="400"
                        objectFit="cover"
                        className="rounded-lg shadow-md"
                        src="/img/servizio-completo1-150x150.jpg" />
                      <p className="font-semibold text-2xl">Lavaggio</p>
                      <Link href="#">
                        <a className="text-yellow-500">
                          Scopri di più
                        </a>
                      </Link>
                    </div>
                    <div>
                      <Image
                        width="400"
                        height="400"
                        objectFit="cover"
                        className="rounded-lg shadow-md"
                        src="/img/servizio-completo1-150x150.jpg" />
                      <p className="font-semibold text-2xl">Lavanderia</p>
                      <Link href="#">
                        <a className="text-yellow-500">
                          Scopri di più
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/*             <div className="flex flex-wrap">
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
              */}
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
        </main>
      </Layout>
    </div>
  );
}
