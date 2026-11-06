// Pagina di settore: contenuti in data/settori.js (solo i settori con `pagina` hanno una pagina).
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../../components/Layout'
import Magnetic from '../../components/Magnetic'
import ContactModal from '../../components/Form/ContactModal'
import HeroCinema from '../../components/cinema/HeroCinema'
import TitoloDueTempi from '../../components/cinema/TitoloDueTempi'
import {Freccia} from '../../components/cinema/BottoneFreccia'
import CardEditoriale from '../../components/editoriale/CardEditoriale'
import GrigliaEditoriale from '../../components/editoriale/GrigliaEditoriale'
import StructuredData from '../../components/StructuredData'
import {breadcrumbSchema, faqSchema, serviceSchema} from '../../lib/seo/schema'
import {getProjects} from '../../lib/query/project'
import {getAllPosts} from '../../lib/query/post'
import settori from '../../data/settori'
import chiusuraImg from '../../public/img/home/chiusura-progetto.webp'
import {ogni, PANNELLO_URL} from '../../lib/pannello'

export default function Settore({slug, progetti, articoli}) {
  const settore = settori.find(s => s.slug === slug)
  const {pagina} = settore
  const altri = settori.filter(s => s.slug !== slug)
  const url = `${process.env.NEXT_PUBLIC_DOMAIN}/settori/${slug}`
  const title = `${settore.seo.titolo ?? settore.nome} | Matarrese srl`
  const description = settore.seo.descrizione ?? pagina.intro
  const faq = (settore.seo.faq ?? []).map(([question, answer]) => ({
    question,
    answer,
  }))
  // Dopo l'offerta (scura) le sezioni presenti alternano chiaro/scuro, così due scure non si toccano
  // mai; "altri settori" resta chiara perché la chiusura su foto è scura.
  const centro =
    pagina.prova ||
    (pagina.galleria && progetti.length === 0) ||
    progetti.length > 0
  const sequenza = [
    centro && 'centro',
    faq.length > 0 && 'faq',
    articoli.length > 0 && 'approfondimenti',
  ].filter(Boolean)
  const scura = k => sequenza.indexOf(k) % 2 === 1

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="canonical" href={url} />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
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
      <StructuredData
        data={serviceSchema({
          name: settore.seo.titolo ?? settore.nome,
          description,
          url,
        })}
      />
      <StructuredData data={faqSchema(faq)} />
      <Layout
        navbarTransparent
        headerCta={{settore: settore.nome}}
        footerInvito={false}
      >
        <HeroCinema
          image={pagina.hero}
          alt=""
          objectPosition="50% 50%"
          eyebrow={
            <nav aria-label="Percorso" className="cin-percorso">
              <Link href="/">Home</Link>
              <span aria-hidden="true"> › </span>
              <Link href="/settori">Settori</Link>
              <span aria-hidden="true"> › </span>
              <span aria-current="page">{settore.nome}</span>
            </nav>
          }
          riga={pagina.titolo[0]}
          accento={pagina.titolo[1]}
          sottotitolo={pagina.intro}
          // le prime voci dell'offerta: indice della pagina, diverso per ogni settore
          voci={pagina.offerta.voci.slice(0, 4).map(([t]) => [t, '#offerta'])}
        >
          <Magnetic>
            <ContactModal
              variant="progetto"
              settore={settore.nome}
              className="cin-btn"
            >
              Parla con un progettista
              <Freccia />
            </ContactModal>
          </Magnetic>
          <a href="#offerta" className="cin-link whitespace-nowrap">
            Cosa facciamo
          </a>
        </HeroCinema>

        {/* Capitolo chiaro: il contesto del settore */}
        <section
          className="bg-[var(--carta)] text-ghisa"
          data-header="light"
          aria-labelledby="capitolo-title"
        >
          <div className="site-shell grid gap-12 py-24 lg:grid-cols-12 lg:py-32">
            <div className="lg:col-span-5">
              <h2
                id="capitolo-title"
                className="type-display text-[clamp(32px,3.8vw,56px)] !leading-none"
              >
                {pagina.capitolo.titolo}
              </h2>
              {pagina.capitolo.foto && (
                <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-[28px] bg-inox">
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
          className="scroll-mt-24 bg-[#121315] text-white"
          data-header="dark"
          aria-labelledby="offerta-title"
        >
          <div className="site-shell py-24 lg:py-32">
            <h2
              id="offerta-title"
              className="type-display max-w-[18ch] text-[clamp(32px,3.8vw,56px)] !leading-none"
            >
              {pagina.offerta.titolo}
            </h2>
            <ul className="mt-14 grid gap-x-10 md:grid-cols-2">
              {pagina.offerta.voci.map(([titolo, testo], i) => (
                <li
                  key={titolo}
                  className="group relative border-t border-inox/25 py-8"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -top-px left-0 h-px w-full origin-left scale-x-0 bg-fiamma transition-transform duration-700 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
                  />
                  <span className="cin-num text-lg" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="type-display mt-3 text-2xl">{titolo}</h3>
                  <p className="mt-3 max-w-[52ch] text-inox-muted">{testo}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Prova in sede o galleria di lavori */}
        {pagina.prova && (
          <section
            className="bg-[var(--carta)] text-ghisa"
            data-header="light"
            aria-labelledby="prova-title"
          >
            <div className="site-shell grid gap-12 py-24 lg:grid-cols-12 lg:items-center lg:py-32">
              <div className="relative aspect-[3/2] overflow-hidden rounded-[28px] bg-inox lg:col-span-7">
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
        {/* Galleria statica solo dove WordPress non ha lavori del settore */}
        {pagina.galleria && progetti.length === 0 && (
          <section
            className="bg-[var(--carta)] text-ghisa"
            data-header="light"
            aria-label="Alcuni lavori realizzati"
          >
            <div className="site-shell grid gap-8 py-24 md:grid-cols-3 lg:py-32">
              {pagina.galleria.map((foto, i) => (
                <figure key={foto.src} className={i === 1 ? 'md:mt-20' : ''}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-inox">
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

        {/* Realizzazioni del settore, dalle categorie portfolio di WordPress */}
        {progetti.length > 0 && (
          <section
            className="bg-[var(--carta)] text-ghisa"
            data-header="light"
            aria-labelledby="realizzazioni-title"
          >
            <div className="site-shell py-24 lg:py-32">
              <div className="flex flex-wrap items-baseline justify-between gap-6">
                <TitoloDueTempi
                  id="realizzazioni-title"
                  tono="chiaro"
                  riga="Lavori"
                  accento="realizzati."
                  className="text-[clamp(32px,3.6vw,52px)] !leading-none"
                />
                <Link
                  href="/realizzazioni"
                  className="border-b border-ghisa py-1 transition-colors hover:text-fiamma-testo"
                >
                  Tutte le realizzazioni
                </Link>
              </div>
              <GrigliaEditoriale
                className="mt-14"
                items={progetti}
                render={(progetto, aspect) => (
                  <CardEditoriale
                    as="h3"
                    href={`/realizzazioni/${progetto.slug}`}
                    image={progetto.image}
                    title={progetto.title}
                    meta={progetto.categories.join(' · ')}
                    aspect={aspect}
                  />
                )}
              />
            </div>
          </section>
        )}

        {/* Domande frequenti: righe che si aprono (<details>), la prima aperta. Le risposte restano
            nell'HTML della pagina e nello schema FAQPage: è il testo che i motori citano. */}
        {faq.length > 0 && (
          <section
            className={
              scura('faq')
                ? 'bg-[#121315] text-white [&_:focus-visible]:outline-fiamma'
                : 'bg-[var(--carta)] text-ghisa'
            }
            data-header={scura('faq') ? 'dark' : 'light'}
            aria-labelledby="faq-title"
          >
            <div className="site-shell grid gap-10 py-24 lg:grid-cols-12 lg:py-32">
              <div className="lg:col-span-4">
                <TitoloDueTempi
                  id="faq-title"
                  tono={scura('faq') ? 'scuro' : 'chiaro'}
                  riga="Domande"
                  accento="frequenti."
                  className="text-[clamp(32px,3.6vw,52px)] !leading-none"
                />
                <p
                  className={`mt-6 max-w-[34ch] ${
                    scura('faq') ? 'text-[rgb(243_238_230/.7)]' : 'text-acciaio'
                  }`}
                >
                  Le risposte a quello che ci chiedono più spesso. Per il resto,
                  parla con un progettista.
                </p>
              </div>
              <div
                className="cin-faq lg:col-span-7 lg:col-start-6"
                data-tono={scura('faq') ? 'scuro' : 'chiaro'}
              >
                {faq.map(({question, answer}, i) => (
                  <details key={question} open={i === 0}>
                    <summary>
                      <h3>{question}</h3>
                      <span className="cin-faq__segno" aria-hidden="true" />
                    </summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Approfondimenti: articoli del blog collegati al settore, con la loro foto */}
        {articoli.length > 0 && (
          <section
            className={
              scura('approfondimenti')
                ? 'bg-[#121315] text-white [&_:focus-visible]:outline-fiamma'
                : 'bg-[var(--carta)] text-ghisa'
            }
            data-header={scura('approfondimenti') ? 'dark' : 'light'}
            aria-labelledby="approfondimenti-title"
          >
            <div
              className={`site-shell ${
                scura('approfondimenti') ? 'py-24 lg:py-32' : 'pt-24 lg:pt-32'
              }`}
            >
              <TitoloDueTempi
                id="approfondimenti-title"
                tono={scura('approfondimenti') ? 'scuro' : 'chiaro'}
                riga="Approfondimenti"
                accento="dal nostro blog."
                className="text-[clamp(32px,3.6vw,52px)] !leading-none"
              />
              <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {articoli.map(a => (
                  <li key={a.slug}>
                    <CardEditoriale
                      as="h3"
                      href={`/news/${a.slug}`}
                      image={a.image}
                      title={a.title}
                      meta={a.categoria}
                      aspect="aspect-[3/2]"
                      tone={scura('approfondimenti') ? 'dark' : 'light'}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Altri settori: mazzo di card in fila (styles/cinema.css, .cin-mazzo) */}
        <section
          className="overflow-hidden bg-[var(--carta)] text-ghisa"
          data-header="light"
          aria-labelledby="altri-title"
        >
          <div className="site-shell py-24 lg:py-32">
            <TitoloDueTempi
              id="altri-title"
              tono="chiaro"
              riga="Lavoriamo"
              accento="anche per:"
              className="text-[clamp(32px,3.6vw,52px)] !leading-none"
            />
            <ul className="cin-mazzo mt-10">
              {altri
                .filter(s => s.pagina)
                .map(s => (
                  <li key={s.slug}>
                    <Link href={`/settori/${s.slug}`}>
                      <Image
                        src={s.foto}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 260px, 220px"
                      />
                      <span className="cin-mazzo__scrim" />
                      <span className="cin-mazzo__testo">
                        <span className="cin-mazzo__nome">{s.nome}</span>
                        {s.frase && (
                          <span className="cin-mazzo__frase">{s.frase}</span>
                        )}
                        <span className="cin-mazzo__freccia" aria-hidden="true">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              d="M1 7h12M8 2l5 5-5 5"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </section>

        {/* Chiusura su foto, come in home: il modulo progetto a passi con il settore già scelto */}
        <section
          id="contatto"
          className="relative overflow-hidden py-28 text-center text-white md:py-40"
          data-header="dark"
          aria-labelledby="contatto-title"
        >
          <Image
            src={chiusuraImg}
            alt=""
            fill
            sizes="100vw"
            placeholder="blur"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0d0e0f]/[.8]" />
          <div className="site-shell relative max-w-[860px]">
            <TitoloDueTempi
              id="contatto-title"
              riga="Raccontaci"
              accento="il tuo progetto."
              className="text-[clamp(40px,5.8vw,88px)] !leading-none"
            />
            <div className="mt-10 flex flex-wrap justify-center gap-3.5">
              <ContactModal
                variant="progetto"
                settore={settore.nome}
                source={`settore-${slug}`}
                className="cin-btn"
              >
                Parla con un progettista
                <Freccia />
              </ContactModal>
              <a href="tel:+390804323431" className="cin-btn cin-btn--ghost">
                Chiama +39 080 4323 431
              </a>
            </div>
          </div>
        </section>

        {/* Per chi arriva qui dalla home e non sa come tornare: gli altri settori e la home */}
        <nav
          aria-label="Altri settori"
          className="bg-[var(--carta)] text-ghisa"
          data-header="light"
        >
          <div className="site-shell flex flex-col gap-6 py-14 lg:flex-row lg:items-center lg:justify-between">
            <ul className="flex flex-wrap gap-2.5">
              {settori
                .filter(s => s.pagina && s.slug !== slug)
                .map(s => (
                  <li key={s.slug}>
                    <Link
                      href={`/settori/${s.slug}`}
                      className="inline-flex min-h-[44px] items-center rounded-full border border-ghisa/20 px-4 hover:border-ghisa"
                    >
                      {s.nome}
                    </Link>
                  </li>
                ))}
            </ul>
            <Link href="/" className="cin-link whitespace-nowrap">
              Torna alla home
            </Link>
          </div>
        </nav>
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

// Ultime sei realizzazioni nelle categorie WordPress del settore (già ordinate per data)
const MAX_PROGETTI = 6

export async function getStaticProps({params}) {
  const settore = settori.find(s => s.slug === params.slug)
  const categorie = settore.seo.categorie ?? []
  const slugArticoli = (settore.seo.articoli ?? []).map(([a]) => a)
  const [{projects}, {posts}] = await Promise.all([
    categorie.length ? getProjects() : {projects: []},
    slugArticoli.length || PANNELLO_URL ? getAllPosts() : {posts: []},
  ])
  // Con il pannello: gli articoli con questo settore tra i «Settori collegati»
  const daPannello = posts.some(p => p.settori)
  const elenco = daPannello
    ? posts.filter(p => p.settori?.includes(settore.slug)).map(p => [p.slug, p.title])
    : (settore.seo.articoli ?? [])
  // Senza pannello: nell'ordine scelto in data/settori.js; il titolo resta quello scritto lì
  const articoli = elenco.flatMap(([a, titolo, foto]) => {
    const post = posts.find(p => p.slug === a)
    if (!post) return []
    const img = post.featuredImage?.node
    return [
      {
        slug: a,
        title: titolo,
        categoria: post.categories[0] ?? null,
        // `foto` in data/settori.js sostituisce quella di WordPress
        image: foto
          ? {src: foto, alt: titolo}
          : {src: img?.mediaItemUrl ?? null, alt: img?.altText ?? ''},
      },
    ]
  })
  const progetti = projects
    .filter(p =>
      p.portfolioCategories.nodes.some(c => categorie.includes(c.slug)),
    )
    .slice(0, MAX_PROGETTI)
    .map(p => ({
      title: p.title,
      slug: p.slug,
      categories: p.categories,
      image: {
        src: p.featuredImage?.node?.mediaItemUrl ?? null,
        alt: p.featuredImage?.node?.altText ?? '',
      },
    }))
  return {
    props: {slug: params.slug, progetti, articoli},
    revalidate: ogni(60 * 60 * 24),
  }
}
