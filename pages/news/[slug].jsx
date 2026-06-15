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
import StructuredData from '../../components/StructuredData'
import {articleSchema, faqSchema as buildFaqSchema, breadcrumbSchema} from '../../lib/seo/schema'

export default function Post({postData, posts, img, css, preview}) {
  const router = useRouter()

  const tags = postData?.tags?.nodes.flatMap(t => t.name)

  // Schema.org BlogPosting JSON-LD
  const newsStructuredData =
    postData &&
    articleSchema({
      title: postData.title,
      description: postData.seo?.metaDesc || postData.title,
      slug: postData.slug,
      image: postData.featuredImage?.node?.mediaItemUrl,
      datePublished: postData.date,
      dateModified: postData.modified,
      author: postData.seo?.opengraphAuthor,
    })

  const faqsArray = Array.isArray(postData?.faqs) ? postData.faqs : []
  // FAQ JSON-LD (rimuove HTML dal testo per uno schema pulito)
  const faqStructuredData = buildFaqSchema(
    faqsArray.map(faq => ({
      question: faq.question,
      answer: (faq.answer || '').replace(/<[^>]+>/g, '').trim(),
    })),
  )

  const breadcrumb =
    postData &&
    breadcrumbSchema([
      {name: 'News', path: '/news'},
      {name: postData.title, path: `/news/${postData.slug}`},
    ])

  return (
    <Layout preview={preview}>
      {router.isFallback ? (
        <>
          <Head>
            <title>Caricamento articolo | Matarrese srl</title>
          </Head>
          <main
            className="mx-auto max-w-7xl py-16 text-center"
            role="status"
            aria-live="polite"
          >
            <p className="text-lg text-gray-500">Caricamento dell&apos;articolo…</p>
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
          <StructuredData data={faqStructuredData} />
          <StructuredData data={breadcrumb} />
          <article className="bg-gray-100">
            <div className="mx-auto max-w-7xl py-4 md:px-5 md:py-16">
              <main className="md:mb-24">
                <div className="sm:mx-0 mb-8 md:mb-16">
                  {img || css ? (
                    <div className="overflow-hidden">
                      <div className="relative aspect-[2/1]">
                        <BlurringImage
                          img={img}
                          css={css}
                          alt={`Immagine di copertina di ${postData.title}`}
                          objectFit="cover"
                          priority
                        />
                      </div>
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

                    {/* Render visivo delle FAQ (se presenti) */}
                    {faqsArray.length ? (
                      <div className="mt-8 bg-gray-50 p-6 rounded">
                        <h3 className="mb-4 text-lg font-semibold">FAQ</h3>
                        {faqsArray.map((faq, i) => (
                          <div key={`faq-${i}`} className="mb-4">
                            <h4 className="font-medium">{faq.question}</h4>
                            <div
                              className="prose text-gray-700"
                              dangerouslySetInnerHTML={{__html: faq.answer}}
                            />
                          </div>
                        ))}
                      </div>
                    ) : null}

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
