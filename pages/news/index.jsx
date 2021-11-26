import * as React from 'react'
import {useQuery, gql} from '@apollo/client'
import Head from 'next/head'
import {useRouter} from 'next/dist/client/router'
import clsx from 'clsx'

import Layout from '../../components/Layout'
import {HeroSection} from '../../components/sections/hero-section'
import {SearchIcon} from '../../components/icons/search-icon'
import {Grid} from '../../components/grid'
import {H6, H3} from '../../components/typography'
import {Category} from '../../components/category'
import {FeaturedSection} from '../../components/sections/featured-section'
import {ArticleCard} from '../../components/article-card'
import {PlusIcon} from '../../components/icons/plus-icon'
import {Button} from '../../components/button'

import {filterPosts} from '../../actions/utils/blog'
import {formatDate} from '../../actions/utils/formatDate'
import {getAllPosts} from '../../lib/post_api'

const PAGE_SIZE = 12
const initialIndexToShow = PAGE_SIZE

// this really is not needed, or maybe only the part `(\s|$)?
const specialQueryRegex = /(?<not>!)?leader:(?<team>\w+)(\s|$)?/g

export default function News({data}) {
  const router = useRouter()
  const searchParams =
    typeof router.query.q === 'Array'
      ? router.query.q.join('+')
      : router.query.q
  const searchInputRef = React.useRef(null)

  const resultsRef = React.useRef(null)

  /**
   * This is here to make sure that a user doesn't hit "enter" on the search
   * button, which focuses the input and then keyup the enter on the input
   * which will trigger the scroll down. We should *only* scroll when the
   * "enter" keypress and keyup happen on the input.
   */
  const ignoreInputKeyUp = React.useRef(false)

  const [queryValue, setQuery] = React.useState(() => {
    return searchParams ?? ''
  })

  const query = queryValue.trim()

  const {posts: allPosts} = data

  const regularQuery = query.replace(specialQueryRegex, '').trim()

  const matchingPosts = React.useMemo(() => {
    // const r = new RegExp(specialQueryRegex)
    // let match = r.exec(query)

    return filterPosts(allPosts, regularQuery)
  }, [allPosts, regularQuery])

  const [indexToShow, setIndexToShow] = React.useState(initialIndexToShow)
  // when the query changes, we want to reset the index
  React.useEffect(() => {
    setIndexToShow(initialIndexToShow)
  }, [query])

  function toggleCategory(category) {
    setQuery(q => {
      // create a regexp so that we can replace multiple occurrences (`this that this`)
      const expression = new RegExp(category, 'ig')

      const newQuery = expression.test(q)
        ? q.replace(expression, '')
        : `${q} ${category}`

      router.push(
        {query: {q: newQuery.toLowerCase().replace(/\s+/g, ' ').trim()}},
        '',
        {
          scroll: false,
        },
      )
      // trim and remove subsequent spaces (`this   that` => `this that`)
      return newQuery.replace(/\s+/g, ' ').trim()
    })
  }

  const isSearching = query.length > 0

  const posts = isSearching
    ? matchingPosts.slice(0, indexToShow)
    : matchingPosts
        .filter(p => p.slug !== data?.posts[0].slug)
        .slice(0, indexToShow)

  const hasMorePosts = isSearching
    ? indexToShow < matchingPosts.length
    : indexToShow < matchingPosts.length - 1

  const visibleCategories = isSearching
    ? new Set(
        matchingPosts
          .flatMap(post => {
            return post.categories
          })
          .filter(Boolean),
      )
    : new Set(data.categories)

  return (
    <div>
      <Head>
        <title>News | Matarrese srl</title>
        <link rel="canonical" href="https://www.matarrese.it/news/" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta
          name="description"
          content="Approfondimenti sul mondo della ristorazione, horeca, pasticcerie, gelaterie, pizzerie e tanto altro"
        />
        <meta property="og:title" content="News" />
        <meta
          property="og:description"
          content="Approfondimenti sul mondo della ristorazione, horeca, pasticcerie, gelaterie, pizzerie e tanto altro"
        />
        <meta property="og:url" content="https://www.matarrese.it/news" />
        <meta property="og:type" content="blog" />
      </Head>

      <Layout>
        <HeroSection
          title="Tieniti aggiornato sul mondo della ristorazione."
          subtitle="Trova gli ultimi articoli qui."
          image="/img/news.svg"
          action={
            <div className="w-full">
              <form
                // this two are for Remix
                // action="/news" // what is this for?
                // method="GET" // what is this for?
                onSubmit={e => e.preventDefault()} //here I can call something like fetchMore?
              >
                <div className="relative">
                  <button
                    title={query === '' ? 'Cerca' : 'Pulisci ricerca'}
                    type="button"
                    onClick={() => {
                      setQuery('')
                      ignoreInputKeyUp.current = true
                      searchInputRef.current?.focus()
                    }}
                    onKeyDown={() => {
                      ignoreInputKeyUp.current = true
                    }}
                    onKeyUp={() => {
                      ignoreInputKeyUp.current = false
                    }}
                    className={clsx(
                      'absolute left-6 top-0 flex items-center justify-center p-0 h-full text-gray-500 bg-trasparent border-none',
                      {
                        'cursor-pointer': query !== '',
                        'cursor-default': query === '',
                      },
                    )}
                  >
                    <SearchIcon />
                  </button>
                  <input
                    ref={searchInputRef}
                    type="search"
                    value={queryValue}
                    onChange={event => {
                      return setQuery(event.currentTarget.value.toLowerCase())
                    }}
                    onKeyUp={e => {
                      if (!ignoreInputKeyUp.current && e.key === 'Enter') {
                        resultsRef.current
                          ?.querySelector('a')
                          ?.focus({preventScroll: true})
                        resultsRef.current?.scrollIntoView({
                          behavior: 'smooth',
                        })
                        router.push(
                          {
                            query: {q: e.target.value.toLocaleLowerCase()},
                          },
                          '',
                          {scroll: false},
                        )
                      }
                      ignoreInputKeyUp.current = false
                    }}
                    name="q"
                    placeholder="cerca"
                    className="text-primary bg-primary border-secondary focus:bg-secondary pl-14 pr-6 py-6 w-full text-lg font-medium border hover:border-yellow-500 focus:border-yellow-500 rounded-full focus:outline-none md:pr-24"
                  />
                  <div className="absolute right-6 top-0 hidden items-center justify-between w-14 h-full text-gray-500 text-lg font-medium md:flex">
                    {isSearching ? matchingPosts.length : null}
                  </div>
                </div>
              </form>
            </div>
          }
        />

        <Grid className="mb-14">
          {data.categories && data.categories.length > 0 ? (
            <>
              <H6 as="div" className="col-span-full mb-6">
                Filtra per categoria
              </H6>
              <div className="flex flex-wrap col-span-full -mb-4 -mr-4 lg:col-span-10">
                {data.categories.map(category => {
                  const selected = regularQuery.includes(category)

                  return (
                    <Category
                      key={category}
                      category={category}
                      selected={selected}
                      onClick={() => toggleCategory(category)}
                      disabled={!visibleCategories.has(category) && !selected}
                    />
                  )
                })}
              </div>
            </>
          ) : null}
        </Grid>

        {!isSearching ? (
          <div className="mb-10">
            <FeaturedSection
              subTitle={formatDate(data.posts[0].date)}
              title={data.posts[0].title}
              imageUrl={data.posts[0].featuredImage.node.sourceUrl}
              impageAlt={data.posts[0].featuredImage.node.altText}
              caption="In evidenza"
              cta="Leggi tutto"
              slug={`news/${data.posts[0].slug}`}
              permalink={`news/${data.posts[0].slug}`}
            />
          </div>
        ) : null}

        <Grid className="mb-64" ref={resultsRef}>
          {posts.length === 0 ? (
            <div className="items-centert flex flex-col col-span-full">
              {/* // TODO: add a beautiful placeholder img */}
              <H3 as="p" variant="secondary" className="mt-24 max-w-lg">
                {`Purtroppo non è stato trovato nulla con i tuoi criteri di ricerca`}
              </H3>
            </div>
          ) : (
            posts.map(article => (
              <div key={article.slug} className="col-span-4 mb-10">
                <ArticleCard article={article} />
              </div>
            ))
          )}
        </Grid>

        {hasMorePosts ? (
          <div className="flex justify-center mb-64 w-full">
            <Button
              variant="secondary"
              onClick={() => setIndexToShow(i => i + PAGE_SIZE)}
            >
              <span>Mostra altri articoli</span> <PlusIcon />
            </Button>
          </div>
        ) : null}
      </Layout>
    </div>
  )
}

export async function getStaticProps() {
  const data = await getAllPosts()
  const categories = data.categories
    .filter(category => category.count > 0)
    .map(c => c.name)

  return {
    props: {
      data: {
        categories,
        posts: data.posts,
      },
    },
  }
}
