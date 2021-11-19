import {useRouter} from 'next/router'
import Head from 'next/head'

import Date from '../../components/Date'
import Layout from '../../components/Layout'
import CoverImage from '../../components/News/CoverImage'
import MorePosts from '../../components/News/more-posts'
import PostBody from '../../components/News/post-body'
import Categories from '../../components/News/post-categories'
import SocialShareBar from '../../components/SocialShareBar/SocialShareBar'

import {H1} from '../../components/typography'

import {getAllPostsWithSlug, getPostAndMorePosts} from '../../lib/post_api'

export default function Post({postData, posts}) {
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
          <main>
            <h2>Loading...</h2>
          </main>
        </>
      ) : (
        <>
          <article className="bg-gray-100">
            <Head>
              <title>{postData.title} | Matarrese srl</title>
              <meta
                property="og:image"
                content={postData.featuredImage?.node?.sourceUrl}
              />
            </Head>
            <div className="container mx-auto px-5 py-16 max-w-7xl">
              <main className="mb-24">
                <div className="mb-8 sm:mx-0 md:mb-16">
                  <CoverImage
                    title={postData.title}
                    coverImage={postData.featuredImage?.node.sourceUrl}
                    // slug={postData.slug}
                  />
                </div>

                <div className="relative lg:flex lg:flex-row">
                  <div className="relative z-2 p-10 max-w-4xl bg-white shadow-lg lg:-mt-56 lg:ml-24">
                    <div className="mb-6 text-lg">
                      <Categories categories={postData.categories} />
                      <Date
                        dateString={postData.date}
                        className="ml-4 text-gray-400 text-sm"
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
                {/* 
                  <div className="max-w-2xl">
                    <Link href="/news">
                      <a>torna agli articoli</a>
                    </Link>
                  </div>
                  */}
              </main>
            </div>
          </article>
          <div className="container mx-auto px-5 py-8 max-w-7xl">
            {morePosts.length > 0 && <MorePosts posts={morePosts} />}
          </div>
        </>
      )}
    </Layout>
  )
}

export async function getStaticProps({params, preview = false}) {
  const data = await getPostAndMorePosts(params.slug, preview)

  return {
    props: {
      preview,
      postData: data.post,
      posts: data.posts,
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
