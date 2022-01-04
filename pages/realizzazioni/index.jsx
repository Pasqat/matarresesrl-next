import Head from 'next/head'
import {useQuery, gql} from '@apollo/client'

import Layout from '../../components/Layout'
import Container from '../../components/Container'
import Header from '../../components/Header/Header'
import {useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {H3} from '../../components/typography'

import {ArrowButton} from '../../components/arrow-button'

const BATCH_SIZE = 9

const GET_PAGINATED_POSTS = gql`
  query GET_PAGINATED_POSTS(
    $first: Int
    $last: Int
    $after: String
    $before: String # NOTE: can't find a way to filter by category  $portfolioCategoryId: Int
  ) {
    projects(
      first: $first
      last: $last
      after: $after
      before: $before # where: {portfolioCategoryId: $portfolioCategoryId}
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
          slug
          projectId
          id
          featuredImage {
            node {
              sourceUrl(size: MEDIUM_LARGE)
            }
          }
          excerpt
          date
        }
      }
    }
    # portfolioCategories {
    #    nodes {
    #      slug
    #      name
    #      id
    #      databaseId
    #      portfolioCategoryId
    #    }
    #  }
  }
`

// Function to update the query with the new results
const updateQuery = (previousResult, {fetchMoreResult}) => {
  return fetchMoreResult.projects.edges.length
    ? fetchMoreResult
    : previousResult
}

export default function News() {
  // const [category, setCategory] = useState(null)

  const {data, loading, error, fetchMore} = useQuery(GET_PAGINATED_POSTS, {
    variables: {
      first: BATCH_SIZE,
      last: null,
      after: null,
      before: null,
      // portfolioCategoryId: category,
    },
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    fetchMore({
      variables: {
        first: BATCH_SIZE,
        after: null,
        last: null,
        before: null,
        // categoryId: null
      },
    })
  }, [fetchMore])

  //   function selectCategory(categoryId) {
  //     setCategory(categoryId)
  //   }

  //   const categeriesList = data?.categories.nodes.filter(category => category.count > 0)
  // TODO: make a proper error notification/page system
  if (error) {
    return (
      <div>
        <p className="text-lg">
          Ci dispiace, ma sembra che qualcosa sia andato storto. Prova a
          ricaricare la pagina.
        </p>
        <p>{JSON.stringify(error)}</p>
      </div>
    )
  }

  return (
    <div>
      <Head>
        <title>Realizzazioni | Matarrese srl</title>
        <link rel="canonical" href="https://www.matarrese.it/realizzazioni/" />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta name="description" content="Alcune delle nostre realizzazioni" />
        <meta property="og:title" content="News" />
        <meta
          property="og:description"
          content="Alcune delle nostre realizzazioni"
        />
        <meta
          property="og:url"
          content="https://www.matarrese.it/realizzazioni"
        />
        <meta property="og:type" content="blog" />
      </Head>

      <Layout>
        <div className="bg-gray-100">
          <Container>
            <Header>Alcune delle nostre realizzazioni</Header>
            {/* <CategoriesList categories={categeriesList} onClick={selectCategory} currentCategory={category} /> */}
            <hr />
            {loading ? (
              <div className="absolute top-1/2 left-1/2">
                <svg
                  width="141"
                  height="144"
                  viewBox="0 0 141 144"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="animate-ping"
                >
                  <path
                    d="M24.4614 2.53423C24.4614 2.53423 65 117.534 70 118.034C75 118.534 116.442 2.53423 116.442 2.53423C116.442 2.53423 129 0.533933 140.5 2.53423C140.5 5.03423 140.5 143.534 140.5 143.534H121.949V88.6256L123.688 29.3591C123.688 29.3591 88 129.5 77.5048 143.534H63.3019C53.5 131 17.215 29.6496 17.215 29.6496L19.0507 88.6256V143.534H0.5V2.53423C10.5 -0.966122 24.4614 2.53423 24.4614 2.53423Z"
                    fill="url(#paint0_linear)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear"
                      x1="-3"
                      y1="3"
                      x2="139"
                      y2="146.5"
                      gradientUnits="userSpaceOnUse"
                    ></linearGradient>
                  </defs>
                </svg>
              </div>
            ) : (
              <section>
                <div className="grid grid-cols-3 grid-rows-3">
                  {data?.projects?.edges.map(edge => {
                    const {featuredImage, id, slug, title} = edge.node

                    return (
                      <Link key={id} href={`/realizzazioni/${slug}`}>
                        <a className="group">
                          <div className="relative w-full h-full bg-blend-multiply">
                            <Image
                              objectFit="cover"
                              width="800"
                              height="800"
                              src={featuredImage?.node?.sourceUrl}
                              alt={title ? title : ''}
                              className="group-hover:opacity-20"
                            />
                            <H3
                              as="p"
                              className="hidden group-hover:block absolute top-1/2 left-1/2 text-center text-yellow-500 -translate-x-1/2 -translate-y-1/2"
                            >
                              {title}
                            </H3>
                          </div>
                        </a>
                      </Link>
                    )
                  })}
                </div>
                <div className="flex justify-between items-center pt-16 pb-24 m-auto md:w-5/12">
                  <ArrowButton
                    direction="left"
                    onClick={() => {
                      fetchMore({
                        variables: {
                          first: null,
                          after: null,
                          last: BATCH_SIZE,
                          before: data?.projects.pageInfo.startCursor || null,
                        },
                        updateQuery,
                      })
                    }}
                    disabled={!data?.projects.pageInfo.hasPreviousPage}
                  ></ArrowButton>
                  {/* <button */}
                  {/*   className="w-10 h-10 bg-white rounded shadow disabled:opacity-25 disabled:pointer-events-none" */}
                  {/*   disabled={!data?.projects.pageInfo.hasPreviousPage} */}
                  {/*   onClick={} */}
                  {/* > */}
                  {/*   <ChevronLeftIcon/> */}
                  {/* </button> */}
                  <ArrowButton
                    // direction="left"
                    onClick={() => {
                      fetchMore({
                        variables: {
                          first: BATCH_SIZE,
                          after: data?.projects.pageInfo.endCursor || null,
                          last: null,
                          before: null,
                        },
                        updateQuery,
                      })
                    }}
                    disabled={!data?.projects.pageInfo.hasNextPage}
                  ></ArrowButton>
                  {/* <button */}
                  {/*   className="w-10 h-10 bg-white rounded shadow disabled:opacity-25 disabled:pointer-events-none" */}
                  {/*   disabled={!data?.projects.pageInfo.hasNextPage} */}
                  {/*   onClick={() => { */}
                  {/*     fetchMore({ */}
                  {/*       variables: { */}
                  {/*         first: BATCH_SIZE, */}
                  {/*         after: data?.projects.pageInfo.endCursor || null, */}
                  {/*         last: null, */}
                  {/*         before: null, */}
                  {/*       }, */}
                  {/*       updateQuery, */}
                  {/*     }) */}
                  {/*   }} */}
                  {/* > */}
                  {/*   <i className="fas fa-arrow-right" /> */}
                  {/* </button> */}
                </div>
              </section>
            )}
          </Container>
        </div>
      </Layout>
    </div>
  )
}
