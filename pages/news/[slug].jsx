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

import {getAllPostsWithSlug, getPost, getMorePosts} from '../../lib/query/post'
import {SeoDataSection} from '../../components/sections/seodata-section'

export default function Post({postData, posts, img, css, preview}) {
  const router = useRouter()

  const tags = postData?.tags?.nodes.flatMap(t => t.name)

  // if (!router.isFallback && !postData.slug) {
  //   console.log('sdeng 💣️')
  //   return <p>hmm...sembra ci sia un errore</p>
  // }
  //

  // Schema.org NewsArticle JSON-LD
  const newsStructuredData = postData && {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: postData.title,
    datePublished: postData.date,
    dateModified: postData.modified,
    author: {
      '@type': 'Person',
      name: postData.seo?.opengraphAuthor || 'Matarrese srl',
    },
    image: postData.featuredImage?.node?.mediaItemUrl,
    description: postData.seo?.metaDesc || postData.title,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.NEXT_PUBLIC_DOMAIN}/news/${postData.slug}`,
    },
  }
  const StructuredData = require('../../components/StructuredData').default
  return (
    <Layout preview={preview}>
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
          <Head>
            {SeoDataSection({
              seoData: postData.seo,
              slug: `news/${postData.slug}`,
            })}
          </Head>
          <StructuredData data={newsStructuredData} />
          <article className="bg-gray-100">
            <div className="mx-auto max-w-7xl py-4 md:px-5 md:py-16">
              <main className="md:mb-24">
                <div className="sm:mx-0 mb-8 md:mb-16">
                  {img || css ? (
                    <div className="aspect-h-1 aspect-w-2 relative overflow-hidden">
                      <BlurringImage
                        img={img}
                        css={css}
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

export async function getStaticProps({params, preview = false, previewData}) {
  const data = await getPost(params.slug, preview, previewData)

  const moreData = await getMorePosts(
    params.slug,
    data.post.categories.edges[0].node.categoryId,
  )

  if (!data?.post?.featuredImage?.node?.mediaItemUrl) {
    return {
      props: {
        preview,
        postData: data.post,
        posts: moreData.posts ?? null,
      },
      revalidate: 60 * 60,
    }
  }

  const {img, css} = await getPlaiceholder(
    data.post.featuredImage.node.mediaItemUrl,
  )

  return {
    props: {
      preview,
      postData: data.post,
      posts: moreData.posts ?? null,
      img,
      css,
    },
    revalidate: 60 * 60,
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()

  return {
    paths: allPosts.edges.map(({node}) => `/news/${node.slug}`) || [],
    fallback: true,
  }
}
