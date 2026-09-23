// Pagina di settore: contenuti in data/settori.js (solo i settori con `pagina` hanno una pagina).
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
import Magnetic from '../../components/Magnetic'
import ContactForm from '../../components/Form/ContactForm'
import StructuredData from '../../components/StructuredData'
import {breadcrumbSchema} from '../../lib/seo/schema'
import {getGroups} from '../../lib/newsletter'
import settori from '../../data/settori'

export default function Settore({slug, groups}) {
  const settore = settori.find(s => s.slug === slug)
  const {pagina} = settore
  const altri = settori.filter(s => s.slug !== slug)
  const url = `${process.env.NEXT_PUBLIC_DOMAIN}/settori/${slug}`

  return (
    <>
      <Head>
        <title>{`${settore.nome} | Matarrese srl`}</title>
        <link rel="canonical" href={url} />
        <meta name="description" content={pagina.intro} />
        <meta property="og:title" content={`${settore.nome} | Matarrese srl`} />
        <meta property="og:description" content={pagina.intro} />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}${pagina.hero}`}
        />
        <meta property="og:url" content={url} />
        <meta property="og:locale" content="it_IT" />
      </Head>
      <StructuredData
        data={breadcrumbSchema([
          {name: settore.nome, path: `/settori/${slug}`},
        ])}
      />
      <Layout navbarTransparent>
        <PageHero
          title={pagina.titolo}
          intro={pagina.intro}
          image={{src: pagina.hero}}
        >
          <Magnetic>
            <a href="#contatto" className="cta-fiamma">
              Parla con un progettista
            </a>
          </Magnetic>
          <a
            href="#offerta"
            className="border-b border-inox/60 py-2 text-white transition-colors hover:border-white"
          >
            Cosa facciamo
          </a>
        </PageHero>

        {/* Capitolo chiaro: il contesto del settore */}
        <section
          className="bg-calce text-ghisa"
          data-header="light"
          aria-labelledby="capitolo-title"
        >
          <div className="site-shell grid gap-12 py-24 lg:grid-cols-12 lg:py-32">
            <div className="lg:col-span-5">
              <h2
                id="capitolo-title"
                className="type-display text-[clamp(30px,3.4vw,52px)]"
              >
                {pagina.capitolo.titolo}
              </h2>
              {pagina.capitolo.foto && (
                <div className="relative mt-10 aspect-[4/3] overflow-hidden bg-inox">
                  <Image
                    src={pagina.capitolo.foto}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
            <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
              {pagina.capitolo.voci && (
                <dl>
                  {pagina.capitolo.voci.map(([titolo, testo]) => (
                    <div
                      key={titolo}
                      className="border-t border-ghisa/15 py-6 last:border-b"
                    >
                      <dt className="type-display text-[22px]">{titolo}</dt>
                      <dd className="mt-2 max-w-[56ch] text-acciaio">
                        {testo}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
              {pagina.capitolo.elenco && (
                <ul>
                  {pagina.capitolo.elenco.map(voce => (
                    <li
                      key={voce}
                      className="type-display border-t border-ghisa/15 py-5 text-[clamp(22px,2.4vw,36px)] last:border-b"
                    >
                      {voce}
                    </li>
                  ))}
                </ul>
              )}
              {pagina.capitolo.nota && (
                <p className="mt-6 text-acciaio">{pagina.capitolo.nota}</p>
              )}
            </div>
          </div>
        </section>

        {/* Capitolo scuro: cosa facciamo */}
        <section
          id="offerta"
          className="bg-ghisa text-white"
          data-header="dark"
          aria-labelledby="offerta-title"
        >
          <div className="site-shell py-24 lg:py-32">
            <h2
              id="offerta-title"
              className="type-display max-w-[18ch] text-[clamp(30px,3.4vw,52px)]"
            >
              {pagina.offerta.titolo}
            </h2>
            <ul className="mt-14 grid gap-x-10 md:grid-cols-2">
              {pagina.offerta.voci.map(([titolo, testo]) => (
                <li
                  key={titolo}
                  className="group relative border-t border-inox/25 py-8"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -top-px left-0 h-px w-0 bg-fiamma transition-all duration-700 ease-out group-hover:w-full motion-reduce:transition-none"
                  />
                  <h3 className="type-display text-2xl">{titolo}</h3>
                  <p className="mt-3 max-w-[52ch] text-inox-muted">{testo}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Prova in sede o galleria di lavori */}
        {pagina.prova && (
          <section
            className="bg-calce text-ghisa"
            data-header="light"
            aria-labelledby="prova-title"
          >
            <div className="site-shell grid gap-12 py-24 lg:grid-cols-12 lg:items-center lg:py-32">
              <div className="relative aspect-[3/2] overflow-hidden bg-inox lg:col-span-7">
                <Image
                  src={pagina.prova.foto}
                  alt="Lo showroom Matarrese ad Alberobello"
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-5">
                <h2
                  id="prova-title"
                  className="type-display text-[clamp(28px,3vw,44px)]"
                >
                  {pagina.prova.titolo}
                </h2>
                <p className="mt-6 max-w-[46ch] text-acciaio">
                  {pagina.prova.testo}
                </p>
              </div>
            </div>
          </section>
        )}
        {pagina.galleria && (
          <section
            className="bg-calce text-ghisa"
            data-header="light"
            aria-label="Alcuni lavori realizzati"
          >
            <div className="site-shell grid gap-8 py-24 md:grid-cols-3 lg:py-32">
              {pagina.galleria.map((foto, i) => (
                <figure key={foto.src} className={i === 1 ? 'md:mt-20' : ''}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-inox">
                    <Image
                      src={foto.src}
                      alt={foto.didascalia}
                      fill
                      sizes="(min-width: 640px) 30vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-4 text-sm text-acciaio">
                    {foto.didascalia}
                  </figcaption>
                </figure>
              ))}
              {pagina.nota && (
                <p className="text-acciaio md:col-span-3">{pagina.nota}</p>
              )}
            </div>
          </section>
        )}

        {/* Altri settori */}
        <section
          className="bg-white text-ghisa"
          data-header="light"
          aria-labelledby="altri-title"
        >
          <div className="site-shell border-b border-ghisa/10 py-16">
            <h2 id="altri-title" className="type-display text-2xl">
              Lavoriamo anche per
            </h2>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-lg">
              {altri.map(s => (
                <li key={s.slug}>
                  {s.pagina ? (
                    <Link
                      href={`/settori/${s.slug}`}
                      className="border-b border-ghisa py-1 hover:text-fiamma-testo"
                    >
                      {s.nome}
                    </Link>
                  ) : (
                    <span className="text-acciaio">{s.nome}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Chiusura: contatto */}
        <section
          id="contatto"
          className="bg-white text-ghisa"
          data-header="light"
          aria-labelledby="contatto-title"
        >
          <div className="site-shell pb-10 pt-24">
            <h2
              id="contatto-title"
              className="type-display max-w-[20ch] text-[clamp(32px,4vw,64px)]"
            >
              Raccontaci il tuo progetto.
            </h2>
          </div>
          <div className="pb-24">
            <ContactForm groups={groups} compact />
          </div>
        </section>
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: settori.filter(s => s.pagina).map(s => ({params: {slug: s.slug}})),
    fallback: false,
  }
}

export async function getStaticProps({params}) {
  const groups = await getGroups()
  return {props: {slug: params.slug, groups}}
}
