import {useRouter} from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../../components/Layout'
import Cartiglio from '../../components/disegno/Cartiglio'
import Prosa from '../../components/editoriale/Prosa'
import GalleriaProgetto from '../../components/editoriale/GalleriaProgetto'
import InvitoProgetto from '../../components/editoriale/InvitoProgetto'
import Correlati from '../../components/editoriale/Correlati'
import SocialShareBar from '../../components/SocialShareBar/SocialShareBar'
import {getProject, getLastTwoProjects} from '../../lib/query/project'
import {SeoDataSection} from '../../components/sections/seodata-section'
import StructuredData from '../../components/StructuredData'
import {creativeWorkSchema, breadcrumbSchema} from '../../lib/seo/schema'

export default function Project({project, related}) {
  const router = useRouter()
  if (router.isFallback || !project)
    return (
      <Layout>
        <p className="site-shell py-24" role="status">
          Caricamento del progetto…
        </p>
      </Layout>
    )
  const images = (project.galleria || []).filter(image => image?.sourceUrl)
  const cover =
    project.featuredImage?.node?.sourceUrl ||
    project.featuredImage?.node?.mediaItemUrl
  const categorie =
    project.portfolioCategories?.edges?.map(({node}) => node.name) || []
  const anni = project.portfolioTags?.edges?.map(({node}) => node.name) || []
  const scheda = [
    ['Categoria', categorie.join(', ')],
    ['Anno', anni.join(', ')],
  ].filter(([, valore]) => valore)

  return (
    <Layout navbarTransparent>
      <Head>
        {SeoDataSection({
          seoData: project.seo,
          slug: `realizzazioni/${project.slug}`,
        })}
      </Head>
      <StructuredData
        data={creativeWorkSchema({
          title: project.title,
          description: project.seo?.metaDesc || project.title,
          slug: project.slug,
          image: cover,
          categories: categorie,
        })}
      />
      <StructuredData
        data={breadcrumbSchema([
          {name: 'Realizzazioni', path: '/realizzazioni'},
          {name: project.title, path: `/realizzazioni/${project.slug}`},
        ])}
      />

      <section
        aria-labelledby="page-title"
        data-header="light"
        className="relative bg-calce pb-10 lg:pb-0"
      >
        <div className="relative h-[72vh] min-h-[420px] bg-inox">
          {cover && (
            <Image
              src={cover}
              alt={project.featuredImage?.node?.altText || ''}
              fill
              preload
              fetchPriority="high"
              sizes="100vw"
              className="object-cover"
            />
          )}
          {/* In cima l'header è trasparente con testi bianchi: il velo lo tiene leggibile su foto chiare */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ghisa/70 to-transparent"
          />
        </div>
        <Cartiglio id="page-title" title={project.title} rows={scheda} />
      </section>

      <section
        className="bg-white text-ghisa"
        data-header="light"
        aria-label="Il progetto"
      >
        <div className="site-shell grid py-20 lg:grid-cols-12 lg:py-28">
          <div className="min-w-0 lg:col-span-8 lg:col-start-2">
            <Prosa content={project.content} editoriale />
            <SocialShareBar route={router.asPath} title={project.title} />
            <InvitoProgetto
              title="Uno spazio da immaginare insieme."
              image={
                cover
                  ? {
                      src: cover,
                      alt: project.featuredImage?.node?.altText || '',
                    }
                  : undefined
              }
              caption={`${project.title}. Il prossimo può essere il tuo.`}
            />
          </div>
        </div>
      </section>

      {images.length > 0 && (
        <section
          className="bg-calce text-ghisa"
          data-header="light"
          aria-labelledby="galleria-title"
        >
          <div className="site-shell py-24 lg:py-32">
            <h2
              id="galleria-title"
              className="type-display text-[clamp(30px,3.4vw,52px)]"
            >
              Il progetto in immagini
            </h2>
            <div className="mt-12 lg:mt-16">
              <GalleriaProgetto images={images} title={project.title} />
            </div>
          </div>
        </section>
      )}

      <Correlati
        title="Altre realizzazioni"
        link={{href: '/realizzazioni', label: 'Tutte le realizzazioni'}}
        items={related.map(p => ({
          href: `/realizzazioni/${p.slug}`,
          title: p.title,
          image: {
            src: p.featuredImage?.node?.mediaItemUrl,
            alt: p.featuredImage?.node?.altText,
          },
        }))}
      />
    </Layout>
  )
}
export async function getStaticProps({params}) {
  const data = await getProject(params.slug)
  if (!data?.slug) return {notFound: true, revalidate: 60}
  data.galleria = (data.galleria || []).filter(n => n?.sourceUrl)
  // Correlati: le ultime realizzazioni pubblicate, escluso il progetto aperto.
  const related = (await getLastTwoProjects())
    .filter(p => p.slug !== data.slug)
    .slice(0, 3)

  return {
    props: {
      project: data,
      related,
    },
    revalidate: 60 * 60 * 24,
  }
}

export async function getStaticPaths() {
  // Nessun dettaglio in build: l'hosting WordPress rifiuta le raffiche di richieste dai
  // server di build Vercel. Ogni pagina si genera alla prima visita e poi resta in cache (ISR);
  // la sitemap li elenca comunque tutti (next-sitemap.config.js).
  return {paths: [], fallback: 'blocking'}
}
