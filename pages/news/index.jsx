import * as React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {useRouter} from 'next/router'

import * as fbq from '../../lib/fpixel'

import Layout from '../../components/Layout'
import Image from 'next/image'
import TitoloDueTempi from '../../components/cinema/TitoloDueTempi'
import {CaricaAltri} from '../../components/editoriale/FiltriArchivio'

import {filterPosts} from '../../actions/utils/blog'
import {formatDate} from '../../actions/utils/formatDate'
import {getAllPosts} from '../../lib/query/post'
import {ogni} from '../../lib/pannello'

const PAGE_SIZE = 12 // quattro righe da tre colonne
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
  // in cima l'articolo scelto «In evidenza» nel pannello, altrimenti il più recente
  const featured = data.posts?.find(p => p.inEvidenza) ?? data.posts?.[0]
  const ultimi = data.posts?.filter(p => p !== featured).slice(0, 4) ?? []
  const inPrimaPagina = React.useMemo(
    () => new Set(data.posts?.slice(0, 5).map(p => p.slug)),
    [data.posts],
  )

  const matchingPosts = React.useMemo(
    () =>
      filterPosts(allPosts, regularQuery).filter(
        p =>
          (!categoria || p.categories?.includes(categoria)) &&
          // senza filtri i primi cinque sono già in prima pagina
          (filtri || !inPrimaPagina.has(p.slug)),
      ),
    [allPosts, regularQuery, categoria, filtri, inPrimaPagina],
  )

  const [indexToShow, setIndexToShow] = React.useState(initialIndexToShow)
  // when the filters change, we want to reset the index
  React.useEffect(() => {
    setIndexToShow(initialIndexToShow)
  }, [query, categoria])

  const posts = matchingPosts
  const shown = Math.min(indexToShow, posts.length)
  const hasMorePosts = indexToShow < posts.length
  const archivioRef = React.useRef(null)
  // argomenti per numero di articoli, con il titolo più recente (i post arrivano già per data)
  const argomenti = React.useMemo(
    () =>
      data.categories
        .map(nome => {
          const suoi = allPosts.filter(p => p.categories?.includes(nome))
          return {nome, conta: suoi.length, ultimo: suoi[0]?.title}
        })
        .filter(a => a.conta > 0)
        .sort((a, b) => b.conta - a.conta),
    [data.categories, allPosts],
  )
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
        <section
          className="bg-[var(--carta)] text-ghisa"
          data-header="light"
          aria-labelledby="news-title"
        >
          <div className="site-shell pb-24 pt-32 lg:pb-32 lg:pt-36">
            <TitoloDueTempi
              as="h1"
              id="news-title"
              tono="chiaro"
              // trattino morbido: a 375px "approfondimenti" non entra nella riga
              riga={'News e approfondi\u00ADmenti'}
              accento="sulla ristorazione professionale."
              className="text-[clamp(40px,5.4vw,80px)] !leading-none"
            />

            {/* Prima pagina: l'ultimo articolo grande, accanto i quattro titoli precedenti */}
            {!filtri && featured && (
              <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
                <Link
                  href={`/news/${featured.slug}`}
                  className="group lg:col-span-8"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-inox lg:aspect-auto lg:h-[min(50svh,560px)]">
                    {featured.featuredImage?.node?.mediaItemUrl && (
                      <Image
                        src={featured.featuredImage.node.mediaItemUrl}
                        alt={featured.featuredImage.node.altText || ''}
                        fill
                        preload
                        fetchPriority="high"
                        sizes="(min-width: 1024px) 62vw, 100vw"
                        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                      />
                    )}
                  </div>
                  <p className="mt-6 text-sm text-acciaio">
                    {[featured.categories?.[0], formatDate(featured.date)]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                  <h2
                    className="type-display mt-2 max-w-[24ch] text-[clamp(28px,3vw,44px)] !leading-[1.05] transition-colors group-hover:text-fiamma-testo"
                    dangerouslySetInnerHTML={{__html: featured.title}}
                  />
                  {featured.excerpt && (
                    <p
                      className="mt-4 line-clamp-3 max-w-[60ch] text-lg text-acciaio"
                      // il sommario arriva da WordPress con le entità HTML (&#8217;): le decodifica il browser
                      dangerouslySetInnerHTML={{
                        __html: testo(featured.excerpt),
                      }}
                    />
                  )}
                </Link>
                <aside className="lg:col-span-4" aria-labelledby="ultimi-title">
                  <h2
                    id="ultimi-title"
                    className="font-[family-name:var(--font-accent)] text-[28px] italic text-acciaio"
                  >
                    Ultimi articoli
                  </h2>
                  <ul className="mt-4">
                    {ultimi.map(a => (
                      <li key={a.slug} className="border-t border-ghisa/15">
                        <Link
                          href={`/news/${a.slug}`}
                          className="group block py-5"
                        >
                          <span className="block text-sm text-acciaio">
                            {[a.categories?.[0], formatDate(a.date)]
                              .filter(Boolean)
                              .join(' · ')}
                          </span>
                          <span
                            className="type-display mt-1 block text-[20px] leading-tight transition-colors group-hover:text-fiamma-testo"
                            dangerouslySetInnerHTML={{__html: a.title}}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
            )}
          </div>
        </section>

        {/* Fascia scura: un ingresso per argomento, con il numero di articoli e l'ultimo uscito */}
        <section
          className="bg-[#121315] text-white [&_:focus-visible]:outline-fiamma"
          data-header="dark"
          aria-labelledby="argomenti-title"
        >
          <div className="site-shell py-24 lg:py-32">
            <TitoloDueTempi
              id="argomenti-title"
              riga="Esplora"
              accento="per argomento."
              className="text-[clamp(36px,4.4vw,64px)] !leading-none"
            />
            <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {argomenti.slice(0, 4).map(arg => (
                <li key={arg.nome}>
                  <button
                    type="button"
                    className="group flex h-full w-full flex-col rounded-[24px] border border-inox/15 bg-white/[.04] p-6 text-left transition-colors hover:border-fiamma hover:bg-white/[.07]"
                    onClick={() => {
                      setQuery('')
                      setCategoria(arg.nome)
                      archivioRef.current?.scrollIntoView({behavior: 'smooth'})
                    }}
                  >
                    <span className="font-[family-name:var(--font-accent)] text-[40px] italic leading-none text-fiamma">
                      {arg.conta}
                    </span>
                    <span className="type-display mt-4 text-[24px] leading-tight">
                      {arg.nome}
                    </span>
                    <span className="mt-auto pt-6 text-sm text-[rgb(243_238_230/.6)]">
                      Ultimo:{' '}
                      <span dangerouslySetInnerHTML={{__html: arg.ultimo}} />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          ref={archivioRef}
          className="scroll-mt-20 bg-[var(--carta)] text-ghisa"
          data-header="light"
          aria-label="Archivio degli articoli"
        >
          <div className="site-shell pb-24 pt-24 lg:pb-32 lg:pt-32">
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
                {argomenti.map(arg => (
                  <button
                    key={arg.nome}
                    type="button"
                    className={`cin-pill ${
                      categoria === arg.nome ? 'is-on' : ''
                    }`}
                    aria-pressed={categoria === arg.nome}
                    onClick={() =>
                      setCategoria(c => (c === arg.nome ? '' : arg.nome))
                    }
                  >
                    {arg.nome}
                  </button>
                ))}
              </div>
            </div>

            <div ref={resultsRef} className="mt-12 scroll-mt-28 lg:mt-16">
              {posts.length === 0 ? (
                <p className="type-display max-w-[24ch] py-16 text-[clamp(24px,2.6vw,36px)]">
                  Nessun articolo con questi criteri. Prova a togliere un
                  filtro.
                </p>
              ) : (
                <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                  {posts.map((a, i) => (
                    <li key={a.slug} hidden={i >= indexToShow}>
                      <Link href={`/news/${a.slug}`} className="group block">
                        <div className="relative aspect-[3/2] overflow-hidden rounded-[24px] bg-inox">
                          {a.featuredImage?.node?.mediaItemUrl && (
                            <Image
                              src={a.featuredImage.node.mediaItemUrl}
                              alt={a.featuredImage.node.altText || ''}
                              fill
                              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05] motion-reduce:transition-none"
                            />
                          )}
                        </div>
                        <p className="mt-5 text-sm text-acciaio">
                          {[a.categories?.[0], formatDate(a.date)]
                            .filter(Boolean)
                            .join(' · ')}
                        </p>
                        <h3
                          className="type-display mt-2 text-[22px] leading-tight transition-colors group-hover:text-fiamma-testo"
                          dangerouslySetInnerHTML={{__html: a.title}}
                        />
                        {a.excerpt && (
                          <p
                            className="mt-3 line-clamp-3 text-acciaio"
                            // il sommario arriva da WordPress con le entità HTML (&#8217;): le decodifica il browser
                            dangerouslySetInnerHTML={{__html: testo(a.excerpt)}}
                          />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {hasMorePosts ? (
              <CaricaAltri
                shown={shown}
                total={posts.length}
                nomi={['articolo', 'articoli']}
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
    revalidate: ogni(60 * 60 * 24),
  }
}
