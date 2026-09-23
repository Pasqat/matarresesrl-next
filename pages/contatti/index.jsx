import Link from 'next/link'
import Head from 'next/head'
import Layout from '../../components/Layout'
import ContactForm from '../../components/Form/ContactForm'
import Map from '../../components/Maps/Map'
import {getGroups} from '../../lib/newsletter'
export default function Contatti({groups}) {
  return (
    <>
      <Head>
        <title>Contatti | Matarrese srl</title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_DOMAIN}/contatti/`}
        />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="Fatti ispirare dalle nostre soluzioni. Visita il nostro showroom!"
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
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/contatti/`}
        />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Matarrese srl" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Layout>
        <div>
          <section className="site-shell contact-intro">
            <p className="page-intro">Contatti</p>
            <h1>
              Conosciamoci.
              <br />
              Il tuo progetto parte da qui.
            </h1>
            <div className="contact-grid">
              <div>
                <h2>Vieni in showroom</h2>
                <p>
                  Contrada Popoleto, n.c.
                  <br />
                  70011 Alberobello (BA)
                </p>
                <a
                  className="text-link"
                  href="https://www.google.com/maps/search/?api=1&query=Matarrese+srl+Alberobello"
                  target="_blank"
                  rel="noreferrer"
                >
                  Indicazioni stradali
                </a>
              </div>
              <div>
                <h2>Parliamone</h2>
                <a href="tel:+390804323431">+39 080 4323 431</a>
                <a href="mailto:matarrese@matarrese.it">
                  matarrese@matarrese.it
                </a>
                <Link className="text-link" href="/assistenza">
                  Hai bisogno di assistenza?
                </Link>
              </div>
              <div>
                <h2>Quando trovarci</h2>
                <p>
                  Lunedì – venerdì
                  <br />
                  09:00 – 13:00 / 15:00 – 18:30
                  <br />
                  Sabato e domenica chiuso
                </p>
              </div>
            </div>
          </section>
          <div className="site-shell contact-map">
            <Map />
          </div>
          <section className="pb-24">
            <ContactForm groups={groups} />
          </section>
        </div>
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
