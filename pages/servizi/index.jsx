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
            <div className="container px-4 mx-auto">
              <div className="w-full px-4 my-32">
                <h2 className="text-4xl text-center font-semibold text-gray-800">
                  Progettazione tecnica e realizzazione arredi
                </h2>
              </div>

              <div className="flex flex-wrap items-center">
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

          <section className="relative py-20 bg-gray-200">
            <SlopeDivSection color="text-gray-200" />
            <div className="w-full px-4">
              <h2 className="text-4xl text-center font-semibold text-gray-800">
                Assistensa e manutenzione
              </h2>
            </div>
            <div className="container px-4 mx-auto lg:py-24">
              <div className="flex flex-wrap items-center">
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
              <div className="flex flex-wrap items-center mt-36">
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
          <section className="relative block pb-20 bg-gray-900">
            <SlopeDivSection color="text-gray-900" />

            <div className="container px-4 mx-auto lg:py-24">
              <div className="flex flex-wrap justify-center text-center">
                <div className="w-full px-4 lg:w-9/12">
                  <h2 className="text-4xl text-gray-100 font-semibold">
                    Formazione
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

          <section className="relative block pb-20">
            <SlopeDivSection color="text-white" />
            <div className="container px-4 mx-auto lg:py-24">
              <div className="flex flex-wrap justify-center">
                <h2 className="text-4xl text-center font-semibold text-gray-800">
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
                <div className="flex flex-row flex-wrap w-full justify-evenly mt-14 text-xl">
                  <div>Logo1</div>
                  <div>Logo2</div>
                  <div>Logo3</div>
                </div>
              </div>
            </div>
          </section>
          <section className="relative py-20" id="contatti">
            <SlopeDivSection color="text-white" />
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
