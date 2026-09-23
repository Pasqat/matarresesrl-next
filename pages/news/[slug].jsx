import {useRouter} from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Date from '../../components/Date'
import Layout from '../../components/Layout'
import {BlogSection} from '../../components/sections/blog-section'
import PostBody from '../../components/News/post-body'
import Categories from '../../components/News/post-categories'
import SocialShareBar from '../../components/SocialShareBar/SocialShareBar'
import {getAllPostsWithSlug, getPost, getMorePosts} from '../../lib/query/post'
import {SeoDataSection} from '../../components/sections/seodata-section'
import StructuredData from '../../components/StructuredData'
import {
  articleSchema,
  faqSchema as buildFaqSchema,
  breadcrumbSchema,
} from '../../lib/seo/schema'
export default function Post({postData, posts, preview}) {
  const router = useRouter()
  if (router.isFallback || !postData)
    return (
      <Layout>
        <p className="site-shell py-24" role="status">
          Caricamento dell’articolo…
        </p>
      </Layout>
    )
  const tags = postData.tags?.nodes?.map(t => t.name) || []
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

  const cover = postData.featuredImage?.node?.mediaItemUrl
  return (
    <Layout preview={preview}>
      <Head>
        {SeoDataSection({seoData: postData.seo, slug: `news/${postData.slug}`})}
      </Head>
      <StructuredData data={newsStructuredData} />
      <StructuredData data={faqStructuredData} />
      <StructuredData data={breadcrumb} />
      <div>
        <article className="site-shell detail-shell">
          <header className="detail-intro">
            <Link className="text-link" href="/news">
              News e approfondimenti
            </Link>
            <h1 dangerouslySetInnerHTML={{__html: postData.title}} />
            <div className="detail-meta">
              <Categories categories={postData.categories} />
              <Date dateString={postData.date} />
            </div>
          </header>
          {cover && (
            <div className="detail-cover">
              <Image
                src={cover}
                fill
                priority
                alt={postData.featuredImage.node.altText || postData.title}
                sizes="90vw"
              />
            </div>
          )}
          <div className="detail-body">
            <PostBody content={postData.content} />
            {faqsArray.length > 0 && (
              <section className="article-faq">
                <h2>Domande frequenti</h2>
                {faqsArray.map((faq, i) => (
                  <details key={i}>
                    <summary>{faq.question}</summary>
                    <PostBody content={faq.answer} />
                  </details>
                ))}
              </section>
            )}
            <div className="detail-meta mt-12">
              {tags.map(tag => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <SocialShareBar route={router.asPath} title={postData.title} />
        </article>
        {posts?.edges?.length > 0 && (
          <BlogSection
            articles={posts.edges}
            title="Continua a esplorare"
            description="Altre idee per la tua attività"
            showArrowButton={false}
          />
        )}
      </div>
    </Layout>
  )
}
export async function getStaticProps({params, preview = false, previewData}) {
  const data = await getPost(params.slug, preview, previewData)
  if (!data?.post) return {notFound: true, revalidate: 60}
  const category = data.post.categories?.edges?.[0]?.node?.categoryId
  const moreData = category ? await getMorePosts(params.slug, category) : null
  return {
    props: {preview, postData: data.post, posts: moreData?.posts ?? null},
    revalidate: 3600,
  }
}
export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()
  return {
    paths: (allPosts?.edges || []).map(({node}) => `/news/${node.slug}`),
    fallback: true,
  }
}
