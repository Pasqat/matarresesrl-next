import {useRouter} from 'next/router'
import Head from 'next/head'
import {getPlaiceholder} from 'plaiceholder'

import Date from '../../components/Date'
import Layout from '../../components/Layout'
import {BlogSection} from '../../components/sections/blog-section'
import PostBody from '../../components/News/post-body'
import Categories from '../../components/News/post-categories'
import SocialShareBar from '../../components/SocialShareBar/SocialShareBar'
import {BlurringImage} from '../../components/blurringImage'
import {Spacer} from '../../components/spacer'
import fetchJson from '../../lib/fetchJson'
import {withSessionSsr} from '../../lib/session'

import {H1} from '../../components/typography'

export default function Post({postData, posts, img, svg, preview}) {
  const router = useRouter()

  const tags = postData?.tags?.nodes.flatMap(t => t.name)

  // if (!router.isFallback && !postData.slug) {
  //   console.log('sdeng 💣️')
  //   return <p>hmm...sembra ci sia un errore</p>
  // }
  //
  return (
    <Layout preview={preview}>
      {router.isFallback ? (
        <>
          <Head>
            <title>Matarrese srl</title>
            <meta name="robots" content="noindex, nofollow" />
          </Head>
          <main className="mx-auto max-w-7xl py-16">
            <h2>Loading...</h2>
          </main>
        </>
      ) : (
        <>
          <Head>
            <title>Matarrese srl</title>
            <meta name="robots" content="noindex, nofollow" />
          </Head>
          <article className="bg-gray-100">
            <div className="mx-auto max-w-7xl py-4 md:py-16 md:px-5">
              <main className="md:mb-24">
                <div className="sm:mx-0 mb-8 md:mb-16">
                  {img || svg ? (
                    <div className="aspect-w-2 aspect-h-1 relative">
                      <BlurringImage
                        img={img}
                        svg={svg}
                        alt={`Immagine di copertina di ${postData.title}`}
                        objectFit="cover"
                        layout="fill"
                      />
                    </div>
                  ) : (
                    <Spacer size="base" />
                  )}
                </div>
                <div className="relative lg:flex lg:flex-row">
                  <div className="relative z-2 -mt-12 max-w-4xl bg-white p-10 shadow-lg lg:-mt-56 lg:ml-24">
                    <div className="mb-6 text-lg">
                      <Categories categories={postData.categories} />
                      <Date
                        dateString={postData.date}
                        className="ml-4 text-sm text-gray-400"
                      />
                    </div>
                    <H1
                      variant="secondary"
                      className="mb-12 text-center md:text-left"
                    >
                      {postData.title}
                    </H1>
                    <PostBody content={postData.content} />
                    <div className="mx-auto flex max-w-3xl flex-wrap gap-4 text-gray-400">
                      <div className="text-medium">tags:</div>
                      {tags.map(t => (
                        <div key={`tag-${t}`}>{t}</div>
                      ))}
                    </div>
                  </div>

                  <SocialShareBar
                    route={router.asPath}
                    title={postData.title}
                  />
                </div>
              </main>
            </div>
          </article>

          <Spacer size="base" />

          {posts ? (
            <BlogSection
              articles={posts.edges}
              title="Se questo articolo ti è stato utile"
              description="Potrebbe piacerti anche uno di questi"
              showArrowButton={false}
            />
          ) : null}

          <Spacer size="base" />
        </>
      )}
    </Layout>
  )
}

// export async function getServerSideProps({preview = false, previewData}) {
export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({preview = false, previewData, req}) {
    const user = req.session.user

    const query = `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType, asPreview: true) {
        databaseId
        id
        slug
        status
        date
        databaseId
        content
        featuredImage {
          node {
            altText
            sourceUrl(size: THUMBNAIL)
            mediaItemUrl
            mediaDetails {
              sizes {
                sourceUrl
              }
            }
          }
        }
        categories {
          edges{
            node {
              categoryId
              name
              slug
              id
            }
          }
        }
        tags {
          nodes {
            slug
            id
            name
          }
        }
      }
    }
    `
    const variables = {
      id: previewData.post.id,
      idType: 'DATABASE_ID',
    }

    const {data} = await fetchJson(process.env.NEXT_PUBLIC_WP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          user[process.env.ACCESS_TOKEN_INDEX_IN_SERVER_AUTH_JSON_RESPONSE]
        }`,
      },
      body: JSON.stringify({query, variables}),
    })

    if (!data?.post?.featuredImage?.node?.mediaItemUrl) {
      return {
        props: {
          preview,
          postData: data.post,
          // posts: moreData.posts ?? null,
        },
      }
    }

    const {img, svg} = await getPlaiceholder(
      data.post.featuredImage.node.mediaItemUrl,
      {size: 64},
    )

    return {
      props: {
        preview,
        postData: data.post,
        // posts: moreData.posts ?? null,
        img,
        svg,
      },
    }
  },
)
