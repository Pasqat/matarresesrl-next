import Head from 'next/head'
import Link from 'next/link'
import {HeartIcon} from '@heroicons/react/outline'

import HeaderBig from '../../components/Header/HeaderBig'
import CardBigImg from '../../components/Card/CardBigImg'
import ContactForm from '../../components/Form/ContactForm'
import Layout from '../../components/Layout'
import {SlopeDivSection} from '../../ui/SlopeDivSection'

import Image from 'next/image'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Matarrese srl | Servizi</title>
        <link rel="canonical" href="https://www.matarrese.it/" />
        <meta
          name="description"
          content="I servizi offerti dalla Matarrese srl. Progettazione tecnica, assistenza, manutenzione, formazione"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout navbarTransparent>
        <main>
          <HeaderBig
            title="Servizi"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In."
            noButton
            slopeSectionColor="text-white"
          />
          <section className="pb-20">
            <div className="container mx-auto px-4">
              <div className="my-32 px-4 w-full">
                <h2 className="text-center text-gray-800 text-4xl font-semibold">
                  Progettazione tecnica e realizzazione arredi
                </h2>
              </div>

              <div className="flex flex-wrap items-center">
                <div className="ml-auto mr-auto px-4 w-full md:w-5/12">
                  <div className="text-lg md:pr-12">
                    <div className="inline-flex items-center justify-center mb-6 p-3 w-16 h-16 text-center text-blue-400 bg-white rounded-full shadow-lg">
                      <i className="far fa-snowflake" />
                    </div>
                    <h3 className="text-3xl font-semibold">Cottura</h3>
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
                      <Link href="#">
                        <a className="text-yellow-600">Approfondisci</a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="inline-flex ml-auto mr-auto w-full rounded-lg shadow-lg overflow-hidden md:w-4/12">
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
                  <h3 className="mb-2 text-3xl font-semibold leading-normal">
                    Attrezzature
                  </h3>
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
                    <Link href="#">
                      <a className="text-yellow-600">Approfondisci</a>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center">
                <div className="ml-auto mr-auto px-4 w-full md:w-5/12">
                  <div className="text-lg md:pr-12">
                    <div className="inline-flex items-center justify-center mb-6 p-3 w-16 h-16 text-center text-blue-400 bg-white rounded-full shadow-lg">
                      <i className="far fa-snowflake" />
                    </div>
                    <h3 className="text-3xl font-semibold">Refrigerazione</h3>
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
                      <Link href="#">
                        <a className="text-yellow-600">Approfondisci</a>
                      </Link>
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

          <section className="relative py-20 bg-gray-200">
            <SlopeDivSection color="text-gray-200" />
            <div className="px-4 w-full">
              <h2 className="text-center text-gray-800 text-4xl font-semibold">
                Assistensa e manutenzione
              </h2>
            </div>
            <div className="container mx-auto px-4 lg:py-24">
              <div className="flex flex-wrap items-center">
                <div className="ml-auto mr-auto px-4 w-full md:w-5/12">
                  <div className="text-lg md:pr-12">
                    <div className="inline-flex items-center justify-center mb-6 p-3 w-16 h-16 text-center text-blue-400 bg-white rounded-full shadow-lg">
                      <i className="far fa-snowflake" />
                    </div>
                    <h3 className="text-3xl font-semibold">Aspirazione</h3>
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
                      <Link href="#">
                        <a className="text-yellow-600">Approfondisci</a>
                      </Link>
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
              <div className="flex flex-wrap items-center mt-36">
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
                    <h3 className="text-3xl font-semibold">Climatizzazione</h3>
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
                      <Link href="#">
                        <a className="text-yellow-600">Approfondisci</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="relative block pb-20 bg-gray-900">
            <SlopeDivSection color="text-gray-900" />

            <div className="container mx-auto px-4 lg:py-24">
              <div className="flex flex-wrap justify-center text-center">
                <div className="px-4 w-full lg:w-9/12">
                  <h2 className="text-gray-100 text-4xl font-semibold">
                    Formazione
                  </h2>
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
                      <p className="mb-4 mt-6 text-2xl font-semibold">
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
                      <p className="mb-4 mt-6 text-2xl font-semibold">
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
                      <p className="mb-4 mt-6 text-2xl font-semibold">
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

          <section className="relative block pb-20">
            <SlopeDivSection color="text-white" />
            <div className="container mx-auto px-4 lg:py-24">
              <div className="flex flex-wrap justify-center">
                <h2 className="text-center text-gray-800 text-4xl font-semibold">
                  MePA
                </h2>
                <div>
                  Siamo presenti anche sul Mepa: Mercato Elettronico della
                  Pubblica Amministrazione (MePA) è un mercato digitale in cui
                  le Amministrazioni abilitate possono acquistare, per valori
                  inferiori alla soglia comunitaria, i beni e servizi offerti da
                  fornitori abilitati a presentare i propri cataloghi sul
                  sistema. Consip definisce con appositi bandi le tipologie di
                  beni e servizi e le condizioni generali di fornitura, gestisce
                  l’abilitazione dei fornitori e la pubblicazione e
                  l’aggiornamento dei cataloghi. Accedendo alla Vetrina del
                  Mercato Elettronico o navigando sul catalogo prodotti, le
                  Amministrazioni possono verificare l’offerta di beni e/o
                  servizi e, una volta abilitate, effettuare acquisti on line,
                  confrontando le proposte dei diversi fornitori e scegliendo
                  più rispondente alle proprie esigenze.
                </div>
                <div className="flex flex-row flex-wrap justify-evenly mt-14 w-full text-xl">
                  <div>Logo1</div>
                  <div>Logo2</div>
                  <div>Logo3</div>
                </div>
              </div>
            </div>
          </section>
          <section className="relative py-20" id="contatti">
            <SlopeDivSection color="text-white" />
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
    </div>
  )
}
