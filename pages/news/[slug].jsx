import {useRef} from 'react'
import {useRouter} from 'next/router'
import Image from 'next/image'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout'
import HeroCinema from '../../components/cinema/HeroCinema'
import TitoloDueTempi from '../../components/cinema/TitoloDueTempi'
import {Freccia} from '../../components/cinema/BottoneFreccia'
import ContactModal from '../../components/Form/ContactModal'
import Prosa from '../../components/editoriale/Prosa'
import {
  IndiceArticolo,
  Avanzamento,
} from '../../components/editoriale/IndiceArticolo'
import settori from '../../data/settori'
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
  const testoRef = useRef(null)
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
  // tempo di lettura: circa 200 parole al minuto
  const minuti = Math.max(
    1,
    Math.round(
      (postData.content || '').replace(/<[^>]+>/g, ' ').split(/\s+/).length /
        200,
    ),
  )
  // settore che cita l'articolo tra i suoi approfondimenti (data/settori.js)
  const settore = settori.find(
    s => s.pagina && s.seo?.articoli?.some(([a]) => a === postData.slug),
  )
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

      <HeroCinema
        titoloLungo
        image={cover}
        alt={postData.featuredImage?.node?.altText || ''}
        objectPosition="50% 50%"
        eyebrow={[...categorie, formatDate(postData.date)].join(' · ')}
        riga={<span dangerouslySetInnerHTML={{__html: postData.title}} />}
        sottotitolo={postData.seo?.metaDesc}
      >
        <a href="#articolo" className="cin-btn">
          Leggi
          <Freccia />
        </a>
        <Link href="/news" className="cin-link whitespace-nowrap">
          Tutti gli articoli
        </Link>
      </HeroCinema>

      <section
        id="articolo"
        className="scroll-mt-20 bg-[var(--carta)] text-ghisa"
        data-header="light"
        aria-label="Articolo"
      >
        {/* key: passando da un articolo all'altro la pagina non si rimonta, l'indice sì */}
        <article
          key={postData.slug}
          className="site-shell grid gap-10 py-20 lg:grid-cols-12 lg:py-28"
        >
          {/* Colonna sinistra fissa: condivisione, avanzamento e tempo di lettura */}
          <aside className="hidden lg:col-span-1 lg:block">
            <div className="sticky top-32 flex flex-col items-center gap-6">
              <SocialShareBar
                route={router.asPath}
                title={postData.title}
                verticale
              />
              <Avanzamento contenitore={testoRef} />
              <span className="text-sm text-acciaio">{minuti} min</span>
            </div>
          </aside>
          <div ref={testoRef} className="min-w-0 max-w-[68ch] lg:col-span-7">
            <IndiceArticolo contenitore={testoRef} mobile />
            <Prosa content={postData.content} />
            {faqsArray.length > 0 && (
              <section
                className="mt-16"
                data-header="light"
                aria-labelledby="faq-title"
              >
                <TitoloDueTempi
                  id="faq-title"
                  tono="chiaro"
                  riga="Domande"
                  accento="frequenti."
                  className="mb-8 text-[clamp(30px,3vw,44px)] !leading-none"
                />
                <div className="cin-faq" data-tono="chiaro">
                  {faqsArray.map((faq, i) => (
                    <details key={i} open={i === 0}>
                      <summary>
                        <h3>{faq.question}</h3>
                        <span className="cin-faq__segno" aria-hidden="true" />
                      </summary>
                      <div className="px-6 pb-6">
                        <Prosa content={faq.answer} />
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}
            {tags.length > 0 && (
              <ul className="mt-12 flex flex-wrap gap-2 text-sm text-acciaio">
                {tags.map(tag => (
                  <li
                    key={tag}
                    className="rounded-full border border-ghisa/15 px-4 py-1.5"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-12 lg:hidden">
              <SocialShareBar route={router.asPath} title={postData.title} />
            </div>
          </div>
          {/* Colonna destra fissa: indice, invito, settore collegato */}
          <aside className="hidden lg:col-span-3 lg:col-start-10 lg:block">
            <div className="sticky top-32 grid gap-3">
              <IndiceArticolo contenitore={testoRef} />
              <div className="rounded-[20px] bg-[#121315] p-6 text-white">
                <p className="type-display text-[20px] leading-tight">
                  Stai valutando un intervento simile?
                </p>
                <ContactModal variant="progetto" className="cin-btn mt-5">
                  Parliamone
                  <Freccia />
                </ContactModal>
              </div>
              {settore && (
                <Link
                  href={`/settori/${settore.slug}`}
                  className="group flex items-center gap-4 rounded-[20px] bg-white p-4"
                >
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[12px]">
                    <Image
                      src={settore.foto}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </span>
                  <span>
                    <span className="block text-sm text-acciaio">
                      Settore collegato
                    </span>
                    <span className="type-display block text-[18px] leading-tight transition-colors group-hover:text-fiamma-testo">
                      {settore.nome}
                    </span>
                  </span>
                </Link>
              )}
            </div>
          </aside>
        </article>
        {/* Chiusura dell'articolo: invito e condivisione nella card scura, come nei progetti */}
        <div className="site-shell pb-24 lg:pb-32">
          <div className="grid gap-10 rounded-[28px] bg-[#121315] p-8 text-white md:p-12 lg:grid-cols-12 lg:items-end lg:p-16">
            <div className="lg:col-span-7">
              <TitoloDueTempi
                riga="Stai valutando"
                accento="un intervento simile?"
                className="text-[clamp(30px,3.6vw,52px)] !leading-none"
              />
            </div>
            <div className="flex flex-col gap-8 lg:col-span-5 lg:items-end">
              <ContactModal variant="progetto" className="cin-btn">
                Parla con un progettista
                <Freccia />
              </ContactModal>
            </div>
          </div>
        </div>
      </section>

      {posts?.edges?.length > 0 && (
        <Correlati
          title="Continua"
          accento="a esplorare."
          link={{href: '/news', label: 'Tutti gli articoli'}}
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
