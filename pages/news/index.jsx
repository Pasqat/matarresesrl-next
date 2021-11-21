import * as React from 'react'
import {useQuery, gql} from '@apollo/client'
import Head from 'next/head'
import {useRouter} from 'next/dist/client/router'
import clsx from 'clsx'

import NewsList from '../../components/News/NewsList'
import CategoriesList from '../../components/categories-list/CategoriesList'
import Layout from '../../components/Layout'
import Container from '../../components/Container'
import {HeroSection} from '../../components/sections/hero-section'
import {SearchIcon} from '../../components/icons/search-icon'
import {Grid} from '../../components/grid'

const BATCH_SIZE = 10

const GET_PAGINATED_POSTS = gql`
  query GET_PAGINATED_POSTS(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $categoryId: Int
  ) {
    posts(
      first: $first
      last: $last
      after: $after
      before: $before
      where: {categoryId: $categoryId}
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          title
          excerpt
          slug
          date
          id
          featuredImage {
            node {
              sourceUrl
              mediaItemUrl
              mediaDetails {
                sizes {
                  sourceUrl
                }
              }
            }
          }
        }
      }
    }
    categories {
      nodes {
        categoryId
        name
        slug
        id
        count
      }
    }
  }
`

export default function News() {
  // TODO: next routers for search Params
  const router = useRouter()

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
    return router.query.q ?? ''
  })
  const query = queryValue.trim()

  function toggleCotegory(categoryId) {
    setQuery(q => {
      // create a regexp so that we can replace multiple occurrences (`this that this`)
      const expression = new RegExp(categoryId, 'ig')

      const newQuery = expression.test(q)
        ? q.replace(expression, '')
        : `${q} ${categoryId}`

      // trim and remove subsequent spaces (`this   that` => `this that`)
      return newQuery.replace(/\s+/g, ' ').trim()
    })
  }

  const [category, setCategory] = React.useState(null)

  const {data, loading, error, fetchMore} = useQuery(GET_PAGINATED_POSTS, {
    variables: {
      first: BATCH_SIZE,
      last: null,
      after: null,
      before: null,
      categoryId: category,
    },
    notifyOnNetworkStatusChange: true,
  })

  React.useEffect(() => {
    fetchMore({
      variables: {
        first: BATCH_SIZE,
        after: null,
        last: null,
        before: null,
        categoryId: null,
      },
    })
  }, [])

  function selectCategory(categoryId) {
    setCategory(categoryId)
  }

  const categeriesList = data?.categories.nodes.filter(
    category => category.count > 0,
  )

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
        <Container>
          <HeroSection
            title="Tieniti aggiornato sul mondo della ristorazione."
            subtitle="Trova gli ultimi articoli qui."
            image="/img/news.svg"
            action={
              <div className="w-full">
                <form
                  action="/news" // what is this for?
                  method="GET" // what is this for?
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
                      onChange={event =>
                        setQuery(event.currentTarget.value.toLowerCase())
                      }
                      onKeyUp={e => {
                        if (!ignoreInputKeyUp.current && e.key === 'Enter') {
                          resultsRef.current
                            ?.querySelector('a')
                            ?.focus({preventScroll: true})
                          resultsRef.current?.scrollIntoView({
                            behavior: 'smooth',
                          })
                        }
                        ignoreInputKeyUp.current = false
                      }}
                      name="q"
                      placeholder="cerca"
                      className="text-primary bg-primary border-secondary focus:bg-secondary pl-14 pr-6 py-6 w-full text-lg font-medium border hover:border-yellow-500 focus:border-yellow-500 rounded-full focus:outline-none md:pr-24"
                    />
                  </div>
                </form>
              </div>
            }
          />

          <Grid>

          </Grid>

          {/* OLD */}
          <CategoriesList
            categories={categeriesList}
            onClick={selectCategory}
            currentCategory={category}
          />
          <hr />
          <NewsList
            error={error}
            loading={loading}
            posts={data?.posts}
            fetchMore={fetchMore}
            batchSize={BATCH_SIZE}
          />
        </Container>
      </Layout>
    </div>
  )
}
