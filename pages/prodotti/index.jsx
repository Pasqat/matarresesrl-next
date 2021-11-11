import Head from 'next/head'
import Link from 'next/link'
import {HeartIcon} from '@heroicons/react/outline'

import HeaderBig from '../../components/Header/HeaderBig'
import CardBigImg from '../../components/Card/CardBigImg'
import ContactForm from '../../components/Form/ContactForm'
import Layout from '../../components/Layout'
import {SlopeDivSection} from '../../ui/SlopeDivSection'

import {H2, H3} from '../../components/typography'

import Image from 'next/image'
import {LinkButton} from '../../components/button'
import {HeroSection} from '../../components/sections/hero-section'

export default function Home() {
  return (
    <>
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
          {/* <HeaderBig
            title="Prodotti"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In."
            button={{text: 'visita il nostro showroom', link: '/contatti'}}
          /> */}
          <HeroSection
            title="Tutto per l'Accoglienza"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In."
            image="/img/pastorizzatore-prodotti.jpg"
            arrowUrl="#accoglienza"
            arrowLabel="Leggi leggi"
          />
          <section className="pb-20 bg-gray-200">
            <div className="container mx-auto px-4">
              <div className="flex -mt-24">
                <div className="z-3 grid grid-cols-2 items-center justify-center p-8 w-full h-64 text-gray-700 text-lg font-semibold bg-white rounded-lg shadow-md">
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
              <div className="my-32 px-4 w-full">
                <H2 className="text-center" variant="secondary">
                  Per la Lavorazione
                </H2>
              </div>

              <div className="flex flex-wrap items-center" id="lavorazione">
                <div className="ml-auto mr-auto px-4 w-full md:w-1/2">
                  <div className="text-lg md:pr-12">
                    <div className="inline-flex items-center justify-center mb-6 p-3 w-16 h-16 text-center text-blue-400 bg-white rounded-full shadow-lg">
                      <i className="far fa-snowflake" />
                    </div>
                    <H3 variant="secondary">Cottura</H3>
                    <p className="mt-4 text-gray-500 leading-relaxed">
                      Aprire un&apos;attività, rinnovare un locale, avere una
                      guida per migliorare il proprio lavoro: Matarrese srl è la
                      soluzione adatta alle esigenze professionali del mondo
                      della ristorazione.
                    </p>
                    <p className="mt-4 text-gray-500 leading-relaxed">
                      Altro testo a caso che possa avere un minimo di senso e di
                      keywords utili
                    </p>
                    <div className="mt-6">
                      <LinkButton href="#">Approfondisci</LinkButton>
                    </div>
                  </div>
                </div>
                <div className="inline-flex ml-auto mr-auto w-full rounded-lg shadow-lg overflow-hidden md:w-1/2">
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
                <div className="ml-auto mr-auto px-4 w-full text-lg md:w-5/12">
                  <div className="inline-flex items-center justify-center mb-6 p-3 w-16 h-16 text-center text-gray-500 bg-white rounded-full shadow-lg">
                    <HeartIcon className="text-yellow-500 text-xl" />
                  </div>
                  <H3 variant="secondary">Attrezzature</H3>
                  <p className="mt-4 text-gray-500 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus vehicula quam ipsum, at aliquam tellus mollis
                    varius. Integer nisi urna, vulputate non risus ac, imperdiet
                    vestibulum dolor. Proin rutrum nunc id pellentesque semper.
                  </p>
                  <p className="mt-4 text-gray-500 leading-relaxed">
                    Maecenas efficitur dictum est sed eleifend. Sed mauris diam,
                    dapibus eu gravida ut, lacinia nec odio. Sed ultricies
                    convallis lobortis. Nam a ex sed sem cursus tincidunt. Nam
                    nec nunc id velit imperdiet
                  </p>
                  <div className="mt-6">
                    <LinkButton href="#">Approfondisci</LinkButton>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center">
                <div className="ml-auto mr-auto px-4 w-full md:w-5/12">
                  <div className="text-lg md:pr-12">
                    <div className="inline-flex items-center justify-center mb-6 p-3 w-16 h-16 text-center text-blue-400 bg-white rounded-full shadow-lg">
                      <i className="far fa-snowflake" />
                    </div>
                    <H3 variant="secondary">Refrigerazione</H3>
                    <p className="mt-4 text-gray-500 leading-relaxed">
                      Aprire un&apos;attività, rinnovare un locale, avere una
                      guida per migliorare il proprio lavoro: Matarrese srl è la
                      soluzione adatta alle esigenze professionali del mondo
                      della ristorazione.
                    </p>
                    <p className="mt-4 text-gray-500 leading-relaxed">
                      Altro testo a caso che possa avere un minimo di senso e di
                      keywords utili
                    </p>
                    <div className="mt-6">
                      <LinkButton href="#">Approfondisci</LinkButton>
                    </div>
                  </div>
                </div>
                <div className="inline-flex ml-auto mr-auto w-full rounded-lg shadow-lg overflow-hidden md:w-4/12">
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
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap items-center">
                <div className="inline-flex ml-auto mr-auto w-full rounded-lg shadow-lg overflow-hidden md:w-5/12">
                  <Image
                    alt="arredi su misura"
                    src="/img/arredo-su-misura-prodotti.jpg"
                    width="1000"
                    height="1300"
                    objectFit="cover"
                  />
                </div>
                <div className="ml-auto mr-auto px-4 w-full md:w-5/12">
                  <div className="md:pr-12">
                    {/* <div className="inline-flex items-center justify-center w-16 h-16 p-3 mb-6 text-center text-gray-500 bg-gray-200 rounded-full shadow-lg"> */}
                    {/*   <ShoppingCartIcon className="text-xl text-indigo-500" /> */}
                    {/* </div> */}
                    <H2 variant="secondary">Tutto per l&apos;accoglienza</H2>
                    <p className="mt-4 text-gray-500 text-lg leading-relaxed">
                      Qualsiasi stile hai scelto per la tua attività da noi puoi
                      trovare l’arredo e i complementi che fanno per te. E per
                      le esigenze più particolari possiamo realizzare il tuo
                      arredo su misura. Scopri di più su:
                    </p>
                    <ul className="mt-6 text-lg list-none">
                      <li className="py-2">
                        <div className="flex flex-wrap items-center">
                          <LinkButton href="#" withArrow>
                            Arredi e complementi
                          </LinkButton>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex flex-wrap items-center">
                          <LinkButton href="#" withArrow>
                            Arredi su misura
                          </LinkButton>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="flex flex-wrap items-center">
                          <LinkButton href="#" withArrow>
                            Forniture alberghiere
                          </LinkButton>
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

            <div className="container mx-auto px-4 lg:py-24">
              <div className="flex flex-wrap justify-center text-center">
                <div className="px-4 w-full lg:w-9/12">
                  <H2>Igiene</H2>
                  <div className="grid gap-24 grid-cols-3 justify-evenly my-10 w-full text-gray-200 text-lg">
                    <div>
                      <Image
                        width="400"
                        height="400"
                        objectFit="cover"
                        className="shadow-m rounded-lg"
                        src="/img/sanificatore-prodotti.png"
                        alt="Sanificatore"
                      />
                      <H3 className="mb-4 mt-6 text-white">Sanificazione</H3>
                      <LinkButton href="#">Scopri di più</LinkButton>
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
                      <H3 className="mb-4 mt-6 text-white">Lavaggio</H3>
                      <LinkButton href="#">Scopri di più</LinkButton>
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
                      <H3 className="mb-4 mt-6 text-white">Lavanderia</H3>
                      <LinkButton href="#">Scopri di più</LinkButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="relative py-20" id="trattamento-aria">
            <SlopeDivSection color="text-white" />
            <div className="mb-8 mt-16 px-4 w-full">
              <H2 className="text-center" variant="secondary">
                Per il trattamento dell&apos;aria
              </H2>
            </div>
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-wrap items-center" id="#aspirazione">
                <div className="ml-auto mr-auto px-4 w-full md:w-5/12">
                  <div className="text-lg md:pr-12">
                    <div className="inline-flex items-center justify-center mb-6 p-3 w-16 h-16 text-center text-blue-400 bg-white rounded-full shadow-lg">
                      <i className="far fa-snowflake" />
                    </div>
                    <H3 variant="secondary">Aspirazione</H3>
                    <p className="mt-4 text-gray-500 leading-relaxed">
                      Aprire un&apos;attività, rinnovare un locale, avere una
                      guida per migliorare il proprio lavoro: Matarrese srl è la
                      soluzione adatta alle esigenze professionali del mondo
                      della ristorazione.
                    </p>
                    <p className="mt-4 text-gray-500 leading-relaxed">
                      Altro testo a caso che possa avere un minimo di senso e di
                      keywords utili
                    </p>
                    <div className="mt-6">
                      <LinkButton href="#">Approfondisci</LinkButton>
                    </div>
                  </div>
                </div>
                <div className="ml-auto mr-auto px-4 w-full md:w-4/12">
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
                <div className="ml-auto mr-auto px-4 w-full md:w-4/12">
                  <Image
                    alt="climatizzazione indutstriale"
                    className="max-w-full rounded-lg shadow-lg"
                    src="/img/climatizzazione-prodotti.jpg"
                    width="1000"
                    height="1300"
                    objectFit="cover"
                  />
                </div>
                <div className="ml-auto mr-auto px-4 w-full md:w-5/12">
                  <div className="text-lg md:pr-12">
                    <div className="inline-flex items-center justify-center mb-6 p-3 w-16 h-16 text-center text-blue-400 bg-white rounded-full shadow-lg">
                      <i className="far fa-snowflake" />
                    </div>
                    <H3 variant="secondary">Climatizzazione</H3>
                    <p className="mt-4 text-gray-500 leading-relaxed">
                      Aprire un&apos;attività, rinnovare un locale, avere una
                      guida per migliorare il proprio lavoro: Matarrese srl è la
                      soluzione adatta alle esigenze professionali del mondo
                      della ristorazione.
                    </p>
                    <p className="mt-4 text-gray-500 leading-relaxed">
                      Altro testo a caso che possa avere un minimo di senso e di
                      keywords utili
                    </p>
                    <div className="mt-6">
                      <LinkButton href="#">Approfondisci</LinkButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="relative py-20" id="contatti">
            <div className="container mb-12 mx-auto px-4">
              <div className="flex flex-wrap justify-center">
                <div className="px-4 w-full md:w-3/4">
                  <div className="relative flex flex-col mb-6 w-full min-w-0 break-words bg-gray-200 rounded-lg shadow-lg">
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </>
  )
}
