import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'

import * as fbq from '../../lib/fpixel'

import Layout from '../../components/Layout'
import HeroCinema from '../../components/cinema/HeroCinema'
import GrigliaRivista from '../../components/cinema/GrigliaRivista'
import Scelta from '../../components/cinema/Scelta'
import {Freccia} from '../../components/cinema/BottoneFreccia'
import {CaricaAltri} from '../../components/editoriale/FiltriArchivio'

import {filterPosts} from '../../actions/utils/blog'
import {formatDate} from '../../actions/utils/formatDate'
import {getAllPosts} from '../../lib/query/post'

const PAGE_SIZE = 10 // due gruppi da cinque della griglia a rivista
const initialIndexToShow = PAGE_SIZE

// this really is not needed, or maybe only the part `(\s|$)?
const specialQueryRegex = /(?<not>!)?leader:(?<team>\w+)(\s|$)?/g

export default function News({data}) {
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
  // /news?q=… va sincronizzato qui. I redirect di next.config.js passano slug
  // (es. attrezzatura-professionale): i trattini diventano spazi.
  const {isReady} = router
  React.useEffect(() => {
    if (isReady && searchParams) setQuery(searchParams.replace(/-/g, ' '))
  }, [isReady, searchParams])

  const query = queryValue.trim()

  const {posts: allPosts} = data

  const regularQuery = query.replace(specialQueryRegex, '').trim()

  const [categoria, setCategoria] = React.useState('')
  const filtri = Boolean(query || categoria)
  const featured = data.posts?.[0]

  const matchingPosts = React.useMemo(
    () =>
      filterPosts(allPosts, regularQuery).filter(
        p =>
          (!categoria || p.categories?.includes(categoria)) &&
          // senza filtri il primo articolo è già in apertura
          (filtri || p.slug !== featured?.slug),
      ),
    [allPosts, regularQuery, categoria, filtri, featured?.slug],
  )

  const [indexToShow, setIndexToShow] = React.useState(initialIndexToShow)
  // when the filters change, we want to reset the index
  React.useEffect(() => {
    setIndexToShow(initialIndexToShow)
  }, [query, categoria])

  const posts = matchingPosts
  const shown = Math.min(indexToShow, posts.length)
  const hasMorePosts = indexToShow < posts.length
  const testo = html => (html || '').replace(/<[^>]+>/g, '').trim()

  return (
    <div>
      <Head>
        <title>
          News e approfondimenti su ristorazione, cucina e attrezzature horeca
        </title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/news`} />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="Guide e approfondimenti su attrezzature, progettazione di cucine professionali e gestione dei locali: come scegliere e come organizzare il lavoro."
        />
        <meta property="og:title" content="News Matarrese srl" />
        <meta
          property="og:description"
          content="Approfondimenti sul mondo della ristorazione, delle cucine professionali e delle soluzioni per il settore horeca."
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/img/news_og.webp`}
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/news`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Matarrese srl" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Layout navbarTransparent>
        <HeroCinema
          image={featured?.featuredImage?.node?.mediaItemUrl}
          alt={featured?.featuredImage?.node?.altText || ''}
          objectPosition="50% 50%"
          eyebrow={`In evidenza · ${[
            featured?.categories?.[0],
            formatDate(featured?.date),
          ]
            .filter(Boolean)
            .join(' · ')}`}
          // trattino morbido: a 375px "approfondimenti" non entra nella riga
          riga={'News e approfondi\u00ADmenti'}
          accento="sulla ristorazione professionale."
          sottotitolo={testo(featured?.title)}
        >
          {featured && (
            <Link href={`/news/${featured.slug}`} className="cin-btn">
              Leggi l’articolo
              <Freccia />
            </Link>
          )}
          <a href="#archivio" className="cin-link whitespace-nowrap">
            Tutti gli articoli
          </a>
        </HeroCinema>

        <section
          id="archivio"
          className="scroll-mt-20 bg-[var(--carta)] text-ghisa"
          data-header="light"
          aria-label="Archivio degli articoli"
        >
          <div className="site-shell pb-24 pt-12 lg:pb-32 lg:pt-16">
            <div role="search">
              <div className="cin-cerca">
                <label className="min-w-0 flex-1">
                  <span className="sr-only">Cerca tra gli articoli</span>
                  <input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Cerca un argomento…"
                    value={queryValue}
                    onChange={e =>
                      setQuery(e.currentTarget.value.toLowerCase())
                    }
                    onKeyUp={e => {
                      if (e.key !== 'Enter') return
                      resultsRef.current
                        ?.querySelector('a')
                        ?.focus({preventScroll: true})
                      resultsRef.current?.scrollIntoView({behavior: 'smooth'})
                      router.push(
                        {query: {q: e.currentTarget.value.toLocaleLowerCase()}},
                        '',
                        {
                          scroll: false,
                        },
                      )
                      fbq.event('Search', {
                        content_category: 'news',
                        search_string: query,
                      })
                    }}
                  />
                </label>
                <p className="cin-cerca__conta" aria-live="polite">
                  {posts.length} {posts.length === 1 ? 'articolo' : 'articoli'}
                </p>
              </div>
              <div className="relative mt-5 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className={`cin-pill ${filtri ? '' : 'is-on'}`}
                  aria-pressed={!filtri}
                  onClick={() => {
                    setQuery('')
                    setCategoria('')
                    router.push({query: {}}, '', {scroll: false})
                  }}
                >
                  Tutti
                </button>
                <Scelta
                  label="Argomento"
                  tutti="Tutti gli argomenti"
                  opzioni={data.categories}
                  valore={categoria}
                  onChange={setCategoria}
                />
              </div>
            </div>

            <div ref={resultsRef} className="mt-12 scroll-mt-28 lg:mt-16">
              {posts.length === 0 ? (
                <p className="type-display max-w-[24ch] py-16 text-[clamp(24px,2.6vw,36px)]">
                  Nessun articolo con questi criteri. Prova a togliere un
                  filtro.
                </p>
              ) : (
                <GrigliaRivista
                  visibili={indexToShow}
                  items={posts.map(a => ({
                    href: `/news/${a.slug}`,
                    title: a.title,
                    meta: [a.categories?.[0], formatDate(a.date)]
                      .filter(Boolean)
                      .join(' · '),
                    image: {
                      src: a.featuredImage?.node?.mediaItemUrl,
                      alt: a.featuredImage?.node?.altText,
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
                Mostra altri articoli
              </CaricaAltri>
            ) : null}
          </div>
        </section>
      </Layout>
    </div>
  )
}

export async function getStaticProps({preview = false}) {
  const data = await getAllPosts(preview)
  const categories = data.categories
    .filter(category => category.count > 0)
    .map(c => c.name)
  const tags = data.tags.filter(tags => tags.count > 0).map(t => t.name)

  return {
    props: {
      data: {
        categories,
        tags,
        posts: data.posts.map(item => ({
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
      },
      preview,
    },
    revalidate: 60 * 60 * 24,
  }
}
