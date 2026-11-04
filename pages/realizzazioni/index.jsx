import * as React from 'react'
import Head from 'next/head'
import {useRouter} from 'next/router'
import * as fbq from '../../lib/fpixel'

import Layout from '../../components/Layout'
import HeroCinema from '../../components/cinema/HeroCinema'
import heroImg from '../../public/img/settori/rist-auraterrae.webp'
import GrigliaRivista from '../../components/cinema/GrigliaRivista'
import {CaricaAltri} from '../../components/editoriale/FiltriArchivio'
import Scelta from '../../components/cinema/Scelta'

import {filterPosts} from '../../actions/utils/blog'
import {getProjects} from '../../lib/query/project'
import {ogni} from '../../lib/kirby'

const PAGE_SIZE = 10 // due gruppi da cinque della griglia a rivista
const initialIndexToShow = PAGE_SIZE

// this really is not needed, or maybe only the part `(\s|$)?
const specialQueryRegex = /(?<not>!)?leader:(?<team>\w+)(\s|$)?/g

export default function Realizzazioni({data}) {
  const router = useRouter()

  const searchParams = Array.isArray(router.query.q)
    ? router.query.q.join('+')
    : router.query.q
  const searchInputRef = React.useRef(null)

  const resultsRef = React.useRef(null)

  const [queryValue, setQuery] = React.useState(() => {
    return searchParams ?? ''
  })

  // Pagina statica: `router.query` si popola solo dopo l'idratazione, quindi chi arriva da
  // /realizzazioni?q=… va sincronizzato qui. I redirect di next.config.js passano slug
  // (es. sale-ricevimenti): i trattini diventano spazi.
  const {isReady} = router
  React.useEffect(() => {
    if (isReady && searchParams) setQuery(searchParams.replace(/-/g, ' '))
  }, [isReady, searchParams])

  const query = queryValue.trim()

  const {projects: allPosts} = data

  const regularQuery = query.replace(specialQueryRegex, '').trim()

  const [settore, setSettore] = React.useState('')
  const [anno, setAnno] = React.useState('')

  const matchingPosts = React.useMemo(
    () =>
      filterPosts(allPosts, regularQuery).filter(
        p =>
          (!settore || p.categories?.includes(settore)) &&
          (!anno || p.tags?.includes(anno)),
      ),
    [allPosts, regularQuery, settore, anno],
  )

  const [indexToShow, setIndexToShow] = React.useState(initialIndexToShow)
  // when the filters change, we want to reset the index
  React.useEffect(() => {
    setIndexToShow(initialIndexToShow)
  }, [query, settore, anno])

  // Tutte le realizzazioni restano nell'HTML; a schermo se ne vedono `indexToShow`
  const posts = matchingPosts
  const shown = Math.min(indexToShow, posts.length)
  const hasMorePosts = indexToShow < posts.length
  const filtri = query || settore || anno

  return (
    <div>
      <Head>
        <title>
          Realizzazioni | Cucine professionali, arredi e attrezzature horeca
        </title>
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_DOMAIN}/realizzazioni`}
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="Cucine professionali, laboratori e arredi realizzati in masserie, ristoranti, macellerie, pasticcerie e hotel in Puglia. Guarda i progetti."
        />
        <meta property="og:title" content="Realizzazioni Matarrese srl" />
        <meta
          property="og:description"
          content="Esempi di progetti per cucine professionali, arredi e attrezzature per la ristorazione."
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/img/og/home.jpg`}
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/realizzazioni`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Matarrese srl" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Layout navbarTransparent>
        <HeroCinema
          image={heroImg}
          alt="La cucina della Masseria Auraterrae"
          objectPosition="50% 50%"
          eyebrow="Dal 1983, in Puglia"
          riga="Realizzazioni per bar, ristoranti,"
          accento="hotel e attività professionali."
          sottotitolo="Da oltre quarant’anni progettiamo cucine professionali, arredi su misura, attrezzature per l’ho.re.ca. e soluzioni complete per locali commerciali, macellerie, pasticcerie, hotel e spazi dedicati alla ristorazione."
        >
          <a href="#archivio" className="cin-btn">
            Guarda i progetti
          </a>
        </HeroCinema>

        <section
          id="archivio"
          className="scroll-mt-20 bg-[var(--carta)] text-ghisa"
          data-header="light"
          aria-label="Archivio delle realizzazioni"
        >
          <div className="site-shell pb-24 pt-12 lg:pb-32 lg:pt-16">
            {/* Ricerca editoriale: riga grande, conteggio in corsivo, filtri a pillola sotto */}
            <div role="search">
              <div className="cin-cerca">
                <label className="min-w-0 flex-1">
                  <span className="sr-only">Cerca tra le realizzazioni</span>
                  <input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Cerca un locale…"
                    value={queryValue}
                    onChange={e =>
                      setQuery(e.currentTarget.value.toLocaleLowerCase())
                    }
                    onKeyUp={e => {
                      if (e.key !== 'Enter') return
                      resultsRef.current
                        ?.querySelector('a')
                        ?.focus({preventScroll: true})
                      resultsRef.current?.scrollIntoView({behavior: 'smooth'})
                      fbq.event('Search', {
                        content_category: 'realizzazioni',
                        search_string: query,
                      })
                      router.push(
                        {query: {q: e.currentTarget.value.toLocaleLowerCase()}},
                        '',
                        {scroll: false},
                      )
                    }}
                  />
                </label>
                {/* Focalizzabile: il suggerimento compare anche da tastiera e lo legge lo screen reader */}
                <p
                  className="cin-cerca__conta cin-suggerimento"
                  tabIndex={0}
                  aria-describedby="conta-nota"
                >
                  <span aria-live="polite">
                    {posts.length}{' '}
                    {posts.length === 1 ? 'progetto' : 'progetti'}
                  </span>
                  <span id="conta-nota" role="tooltip">
                    Solo una parte dei nostri lavori: dal 1983 ne abbiamo
                    realizzati molti di più.
                  </span>
                </p>
              </div>
              <div className="relative mt-5 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className={`cin-pill ${filtri ? '' : 'is-on'}`}
                  aria-pressed={!filtri}
                  onClick={() => {
                    setQuery('')
                    setSettore('')
                    setAnno('')
                    router.push({query: {}}, '', {scroll: false})
                  }}
                >
                  Tutti
                </button>
                <Scelta
                  label="Settore"
                  tutti="Tutti i settori"
                  opzioni={data.categories}
                  valore={settore}
                  onChange={setSettore}
                />
                <Scelta
                  label="Anno"
                  tutti="Ogni anno"
                  opzioni={data.tags}
                  valore={anno}
                  onChange={setAnno}
                />
              </div>
              {/* L'archivio è una selezione: senza questa nota un anno con un progetto sembra un anno con un lavoro */}
              <p className="mt-6 max-w-[62ch] text-acciaio">
                Qui raccontiamo solo una selezione: dal 1983 abbiamo realizzato
                molti più locali di quelli in archivio, e ogni anno se ne
                aggiungono di nuovi.
              </p>
            </div>

            <div ref={resultsRef} className="mt-12 scroll-mt-28 lg:mt-16">
              {posts.length === 0 ? (
                <p className="type-display max-w-[24ch] py-16 text-[clamp(24px,2.6vw,36px)]">
                  Nessun progetto con questi criteri. Prova a togliere un
                  filtro.
                </p>
              ) : (
                <GrigliaRivista
                  visibili={indexToShow}
                  items={posts.map(p => ({
                    href: `/realizzazioni/${p.slug}`,
                    title: p.title,
                    meta: [p.categories?.[0], p.tags?.[0]]
                      .filter(Boolean)
                      .join(' · '),
                    image: {
                      src: p.featuredImage?.node?.mediaItemUrl,
                      alt: p.featuredImage?.node?.altText,
                    },
                  }))}
                />
              )}
            </div>

            {hasMorePosts ? (
              <CaricaAltri
                shown={shown}
                total={posts.length}
                onClick={() => setIndexToShow(i => i + PAGE_SIZE)}
              >
                Mostra altre realizzazioni
              </CaricaAltri>
            ) : null}
          </div>
        </section>
      </Layout>
    </div>
  )
}

export async function getStaticProps() {
  const data = await getProjects()
  const categories = data.categories
    .filter(category => category.count > 0)
    .map(c => c.name)
  const tags = data.tags
    .filter(tags => tags.count > 0)
    .map(t => t.name)
    .sort((a, b) => b.localeCompare(a))

  // const domain = process.env.NEXT_PUBLIC_DOMAIN

  return {
    props: {
      data: {
        tags,
        categories,
        projects: data.projects.map(item => ({
          ...item,
          featuredImage: item.featuredImage?.node
            ? {
                node: {
                  mediaItemUrl: item.featuredImage.node.mediaItemUrl,
                  altText: item.featuredImage.node.altText,
                },
              }
            : null,
        })),
        // domain,
      },
    },
    revalidate: ogni(60 * 60 * 24),
  }
}
