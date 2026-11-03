import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import TitoloDueTempi from '../../components/cinema/TitoloDueTempi'
import {Freccia} from '../../components/cinema/BottoneFreccia'
import StatoApertura from '../../components/cinema/StatoApertura'
import ContactModal from '../../components/Form/ContactModal'
import showroomImg from '../../public/img/azienda/showroom.webp'
import ContactForm from '../../components/Form/ContactForm'
import Map from '../../components/Maps/Map'
import {getGroups} from '../../lib/newsletter'
import {social} from '../../data/social'
export default function Contatti({groups}) {
  return (
    <>
      <Head>
        <title>Contatti e showroom ad Alberobello | Matarrese srl</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_DOMAIN}/contatti`}
        />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="Showroom in Contrada Popoleto ad Alberobello (BA). Telefono, email, orari e numero dedicato all’assistenza tecnica."
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta property="og:title" content="Contatti" />
        <meta property="og:description" content="Visita il nostro showroom!" />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/img/piazza_grande_61.jpg`}
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/contatti`}
        />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Matarrese srl" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Layout navbarTransparent footerInvito={false}>
        <PageHero title="Conosciamoci." accento="Cosa ti serve?" tall={false}>
          {/* Tre ingressi per bisogno: ogni richiesta parte già dal modulo giusto */}
          <div className="w-full">
            <ul className="grid gap-3 md:grid-cols-3">
              <li>
                <ContactModal
                  variant="progetto"
                  source="contatti-progetto"
                  className="cin-ingresso"
                >
                  <span className="cin-ingresso__titolo">Ho un progetto</span>
                  <span className="cin-ingresso__testo">
                    Tre domande, poi ti chiama un progettista.
                  </span>
                  <Freccia />
                </ContactModal>
              </li>
              <li>
                <Link href="/assistenza#richiesta" className="cin-ingresso">
                  <span className="cin-ingresso__titolo">Ho un guasto</span>
                  <span className="cin-ingresso__testo">
                    Modulo assistenza o linea dedicata +39 080 4323 651.
                  </span>
                  <Freccia />
                </Link>
              </li>
              <li>
                <ContactModal
                  variant="info"
                  source="contatti-showroom"
                  className="cin-ingresso"
                  title="Vieni a trovarci in showroom."
                  subtitle="Dicci quando preferisci passare ad Alberobello: ti facciamo trovare un consulente e le attrezzature che ti interessano."
                >
                  <span className="cin-ingresso__titolo">
                    Voglio vedere lo showroom
                  </span>
                  <span className="cin-ingresso__testo">
                    Fissiamo una visita ad Alberobello.
                  </span>
                  <Freccia />
                </ContactModal>
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href="tel:+390804323431"
                className="type-display whitespace-nowrap text-[clamp(22px,2.4vw,32px)] transition-colors hover:text-fiamma"
              >
                +39 080 4323 431
              </a>
              <a
                href="mailto:matarrese@matarrese.it"
                className="type-display whitespace-nowrap text-[clamp(18px,2.4vw,32px)] transition-colors hover:text-fiamma"
              >
                matarrese@matarrese.it
              </a>
              <StatoApertura />
            </div>
          </div>
        </PageHero>

        {/* Showroom: foto e mappa affiancate, indirizzo e orari in una card sopra la foto */}
        <section
          className="bg-[var(--carta)] py-16 text-ghisa lg:py-24"
          data-header="light"
          aria-labelledby="showroom-title"
        >
          <div className="site-shell grid gap-3 lg:grid-cols-2">
            <div className="relative min-h-[420px] overflow-hidden rounded-[28px] lg:min-h-[520px]">
              <Image
                src={showroomImg}
                alt="Lo showroom Matarrese ad Alberobello"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-[20px] bg-white p-6 md:inset-x-6 md:bottom-6">
                <h2
                  id="showroom-title"
                  className="type-display text-[clamp(24px,2.4vw,32px)] leading-tight"
                >
                  Vieni in showroom
                </h2>
                <div className="mt-4 grid gap-4 text-[17px] sm:grid-cols-2">
                  <p>
                    Contrada Popoleto, n.c.
                    <br />
                    70011 Alberobello (BA)
                  </p>
                  <p>
                    Lunedì – venerdì
                    <br />
                    09:00 – 13:00 / 15:00 – 18:30
                  </p>
                </div>
                <a
                  className="mt-4 inline-block border-b border-ghisa/40 py-1 transition-colors hover:border-ghisa hover:text-fiamma-testo"
                  href="https://www.google.com/maps/search/?api=1&query=Matarrese+srl+Alberobello"
                  target="_blank"
                  rel="noreferrer"
                >
                  Indicazioni stradali
                </a>
              </div>
            </div>
            {/* Map è `absolute inset-0`: l'altezza è nel contenitore. Senza NEXT_PUBLIC_MAPS_API mostra il fallback */}
            <div className="relative min-h-[360px] overflow-hidden rounded-[28px] bg-[var(--steel)] lg:min-h-[520px]">
              <Map />
            </div>
          </div>
          <div className="site-shell mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-acciaio">
            <span>Seguici</span>
            {social.map(([name, href]) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="border-b border-ghisa/30 py-1 text-ghisa transition-colors hover:border-ghisa hover:text-fiamma-testo"
              >
                {name}
              </a>
            ))}
          </div>
        </section>

        {/* Per tutto il resto: il modulo generico, in una card bianca su fondo scuro */}
        <section
          id="contatto"
          className="bg-[#121315] py-16 text-ghisa lg:py-24"
          data-header="dark"
          aria-labelledby="contatto-title"
        >
          <div className="site-shell">
            <div className="rounded-[28px] bg-white pb-12 pt-12 lg:pt-16">
              <div className="px-8 md:px-12 lg:px-16">
                <TitoloDueTempi
                  id="contatto-title"
                  tono="chiaro"
                  riga="Preferisci scriverci?"
                  accento="Ti risponde un consulente."
                  className="max-w-[24ch] text-[clamp(30px,3.6vw,52px)] !leading-none"
                />
                <p className="mt-6 max-w-[52ch] text-lg text-acciaio">
                  Completa questo modulo, un nostro consulente ti ricontatterà.
                </p>
              </div>
              <div className="mt-8">
                <ContactForm groups={groups} compact />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
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
