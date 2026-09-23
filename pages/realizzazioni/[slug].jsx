import {useRouter} from 'next/router'
import Head from 'next/head'
import Layout from '../../components/Layout'
import AperturaEditoriale, {
  Copertina,
} from '../../components/editoriale/AperturaEditoriale'
import Prosa from '../../components/editoriale/Prosa'
import GalleriaProgetto from '../../components/editoriale/GalleriaProgetto'
import InvitoProgetto from '../../components/editoriale/InvitoProgetto'
import Correlati from '../../components/editoriale/Correlati'
import SocialShareBar from '../../components/SocialShareBar/SocialShareBar'
import {
  getProject,
  getAllProjectsWithSlug,
  getLastTwoProjects,
} from '../../lib/query/project'
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
    ['Settore', categorie.join(', ')],
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

      <AperturaEditoriale
        back={{href: '/realizzazioni', label: 'Tutte le realizzazioni'}}
        meta={categorie.join(' · ')}
        title={project.title}
      />
      <Copertina
        image={{src: cover, alt: project.featuredImage?.node?.altText}}
      />

      <section
        className="bg-white text-ghisa"
        data-header="light"
        aria-label="Il progetto"
      >
        <div className="site-shell grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
          {scheda.length > 0 && (
            <dl className="self-start lg:sticky lg:top-32 lg:col-span-3">
              {scheda.map(([voce, valore]) => (
                <div key={voce} className="border-t border-ghisa/15 py-4">
                  <dt className="text-sm text-acciaio">{voce}</dt>
                  <dd className="mt-1">{valore}</dd>
                </div>
              ))}
            </dl>
          )}
          <div className="min-w-0 lg:col-span-8 lg:col-start-5">
            <Prosa content={project.content} editoriale />
            <SocialShareBar route={router.asPath} title={project.title} />
            <InvitoProgetto title="Uno spazio da immaginare insieme." />
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
        cta="Guarda il progetto"
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
  const allProjects = await getAllProjectsWithSlug()

  return {
    paths:
      allProjects.edges.map(({node}) => `/realizzazioni/${node.slug}`) || [],
    fallback: true,
  }
}
