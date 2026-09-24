import {useRouter} from 'next/router'
import Head from 'next/head'
import Layout from '../../components/Layout'
import AperturaEditoriale, {
  Copertina,
} from '../../components/editoriale/AperturaEditoriale'
import Prosa from '../../components/editoriale/Prosa'
import InvitoProgetto from '../../components/editoriale/InvitoProgetto'
import Correlati from '../../components/editoriale/Correlati'
import SocialShareBar from '../../components/SocialShareBar/SocialShareBar'
import {formatDate} from '../../actions/utils/formatDate'
import {getPost, getMorePosts} from '../../lib/query/post'
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
  const categorie =
    postData.categories?.edges?.map(({node}) => node.name).filter(Boolean) || []
  return (
    <Layout preview={preview} navbarTransparent={!preview}>
      <Head>
        {SeoDataSection({seoData: postData.seo, slug: `news/${postData.slug}`})}
      </Head>
      <StructuredData data={newsStructuredData} />
      <StructuredData data={faqStructuredData} />
      <StructuredData data={breadcrumb} />

      <AperturaEditoriale
        back={{href: '/news', label: 'News e approfondimenti'}}
        meta={
          <>
            {categorie.length > 0 && <span>{categorie.join(' · ')} · </span>}
            <time dateTime={postData.date}>{formatDate(postData.date)}</time>
          </>
        }
        title={postData.title}
      />
      <Copertina
        image={{src: cover, alt: postData.featuredImage?.node?.altText}}
      />

      <section
        className="bg-white text-ghisa"
        data-header="light"
        aria-label="Articolo"
      >
        <article className="site-shell py-20 lg:py-28">
          <div className="mx-auto max-w-[68ch] lg:ml-[calc(100%/12*3)]">
            <Prosa content={postData.content} />
            {faqsArray.length > 0 && (
              <section
                className="mt-16"
                data-header="light"
                aria-labelledby="faq-title"
              >
                <h2
                  id="faq-title"
                  className="type-display mb-6 text-[clamp(25px,2.3vw,32px)]"
                >
                  Domande frequenti
                </h2>
                {faqsArray.map((faq, i) => (
                  <details
                    key={i}
                    className="group border-t border-ghisa/15 last:border-b"
                  >
                    <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-medium [&::-webkit-details-marker]:hidden">
                      {faq.question}
                      <span
                        aria-hidden="true"
                        className="text-2xl text-acciaio transition-transform group-open:rotate-45 motion-reduce:transition-none"
                      >
                        +
                      </span>
                    </summary>
                    <div className="pb-6">
                      <Prosa content={faq.answer} />
                    </div>
                  </details>
                ))}
              </section>
            )}
            {tags.length > 0 && (
              <ul className="mt-12 flex flex-wrap gap-2 text-sm text-acciaio">
                {tags.map(tag => (
                  <li key={tag} className="border border-ghisa/15 px-3 py-1">
                    {tag}
                  </li>
                ))}
              </ul>
            )}
            <SocialShareBar route={router.asPath} title={postData.title} />
            {/* copy da approvare */}
            <InvitoProgetto
              title="Stai valutando un intervento simile?"
              cta="Parla con un progettista"
            />
          </div>
        </article>
      </section>

      {posts?.edges?.length > 0 && (
        <Correlati
          title="Continua a esplorare"
          link={{href: '/news', label: 'Tutti gli articoli'}}
          cta="Leggi l’articolo"
          items={posts.edges.map(({node}) => ({
            href: `/news/${node.slug}`,
            title: node.title,
            meta: formatDate(node.date),
            image: {
              src: node.featuredImage?.node?.mediaItemUrl,
              alt: node.featuredImage?.node?.altText,
            },
          }))}
        />
      )}
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
  // Nessun dettaglio in build: l'hosting WordPress rifiuta le raffiche di richieste dai
  // server di build Vercel. Ogni pagina si genera alla prima visita e poi resta in cache (ISR);
  // la sitemap li elenca comunque tutti (next-sitemap.config.js).
  return {paths: [], fallback: 'blocking'}
}
