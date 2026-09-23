import {useRouter} from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import Layout from '../../components/Layout'
import EventBody from '../../components/Events/event-body'
import SocialShareBar from '../../components/SocialShareBar/SocialShareBar'
import {getProject, getAllProjectsWithSlug} from '../../lib/query/project'
import {SeoDataSection} from '../../components/sections/seodata-section'
import StructuredData from '../../components/StructuredData'
import {creativeWorkSchema, breadcrumbSchema} from '../../lib/seo/schema'
export default function Project({project}) {
  const router = useRouter()
  if (router.isFallback || !project)
    return (
      <Layout>
        <p className="site-shell py-24" role="status">
          Caricamento del progetto…
        </p>
      </Layout>
    )
  const images = (project.galleria || [])
    .filter(image => image?.sourceUrl)
    .map(image => ({
      original: image.sourceUrl,
      thumbnail: image.sourceUrl,
      description: image.caption || '',
      originalAlt: image.altText || project.title,
      thumbnailAlt: image.altText || project.title,
    }))
  const cover =
    project.featuredImage?.node?.sourceUrl ||
    project.featuredImage?.node?.mediaItemUrl
  return (
    <Layout>
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
          categories: project.portfolioCategories?.edges?.map(
            ({node}) => node.name,
          ),
        })}
      />
      <StructuredData
        data={breadcrumbSchema([
          {name: 'Realizzazioni', path: '/realizzazioni'},
          {name: project.title, path: `/realizzazioni/${project.slug}`},
        ])}
      />
      <div className="site-shell detail-shell">
        <header className="detail-intro">
          <Link className="text-link" href="/realizzazioni">
            Tutte le realizzazioni
          </Link>
          <h1 dangerouslySetInnerHTML={{__html: project.title}} />
          <div className="detail-meta">
            {project.portfolioCategories?.edges?.map(({node}) => (
              <span key={node.id || node.name}>{node.name}</span>
            ))}
            {project.portfolioTags?.edges?.map(({node}) => (
              <span key={node.id || node.name}>{node.name}</span>
            ))}
          </div>
        </header>
        {cover && (
          <div className="detail-cover">
            <Image src={cover} alt={project.title} fill priority sizes="90vw" />
          </div>
        )}
        <div className="detail-body">
          <EventBody content={project.content} />
        </div>
        {images.length > 0 && (
          <ImageGallery
            items={images}
            showPlayButton={false}
            lazyLoad
            showThumbnails={images.length > 1}
            showNav={images.length > 1}
          />
        )}
        <SocialShareBar route={router.asPath} title={project.title} />
        <section className="detail-cta">
          <h2>Uno spazio da immaginare insieme.</h2>
          <Link className="site-button" href="/contatti">
            Parlaci del tuo progetto
          </Link>
        </section>
      </div>
    </Layout>
  )
}
export async function getStaticProps({params}) {
  const data = await getProject(params.slug)
  if (!data?.slug) return {notFound: true, revalidate: 60}
  data.galleria = (data.galleria || []).filter(n => n?.sourceUrl)

  return {
    props: {
      project: data,
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
