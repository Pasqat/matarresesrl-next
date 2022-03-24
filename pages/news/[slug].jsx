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

import {H1} from '../../components/typography'

import {getAllPostsWithSlug, getPostAndMorePosts} from '../../lib/query/post'
import {SeoDataSection} from '../../components/sections/seodata-section'

export default function Post({postData, posts, img, svg}) {
  const router = useRouter()
  const morePosts = posts?.edges

  if (!router.isFallback && !postData.slug) {
    console.log('sdeng 💣️')
    return <p>hmm...sembra ci sia un errore</p>
  }

  return (
    <Layout>
      {router.isFallback ? (
        <>
          <Head>
            <title>Matarrese srl</title>
          </Head>
          <main className="mx-auto max-w-7xl py-16">
            <h2>Loading...</h2>
          </main>
        </>
      ) : (
        <>
          <article className="bg-gray-100">
            <Head>{SeoDataSection({seoData: postData.seo})}</Head>
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

          <BlogSection
            articles={morePosts}
            title="Se questo articolo ti è stato utile"
            description="Potrebbe piacerti anche uno di questi"
            shoArrowButton={false}
          />

          <Spacer size="base" />
        </>
      )}
    </Layout>
  )
}

export async function getStaticProps({params, preview = false}) {
  const data = await getPostAndMorePosts(params.slug, preview)

  if (!data?.post?.featuredImage?.node?.sourceUrl) {
    return {
      props: {
        preview,
        postData: data.post,
        posts: data.posts,
      },
      revalidate: 60 * 60 * 24,
    }
  }

  const {img, svg} = await getPlaiceholder(
    data.post.featuredImage.node.sourceUrl,
    {size: 64},
  )

  return {
    props: {
      preview,
      postData: data.post,
      posts: data.posts,
      img,
      svg,
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()

  return {
    paths: allPosts.edges.map(({node}) => `/news/${node.slug}`) || [],
    fallback: true,
  }
}
