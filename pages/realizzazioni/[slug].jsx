import {useRouter} from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../../components/Layout'
import HeroCinema from '../../components/cinema/HeroCinema'
import TitoloDueTempi from '../../components/cinema/TitoloDueTempi'
import {Freccia} from '../../components/cinema/BottoneFreccia'
import ContactModal from '../../components/Form/ContactModal'
import Prosa from '../../components/editoriale/Prosa'
import GalleriaProgetto from '../../components/editoriale/GalleriaProgetto'
import Correlati from '../../components/editoriale/Correlati'
import SocialShareBar from '../../components/SocialShareBar/SocialShareBar'
import {getProject, getLastTwoProjects} from '../../lib/query/project'
import {SeoDataSection} from '../../components/sections/seodata-section'
import StructuredData from '../../components/StructuredData'
import {creativeWorkSchema, breadcrumbSchema} from '../../lib/seo/schema'
import {decodifica} from '../../lib/entita'
import {ogni} from '../../lib/kirby'

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

      <HeroCinema
        titoloLungo
        image={cover}
        alt={project.featuredImage?.node?.altText || ''}
        objectPosition="50% 50%"
        eyebrow={scheda.map(([, v]) => v).join(' · ') || 'Realizzazione'}
        riga={<span dangerouslySetInnerHTML={{__html: project.title}} />}
        accento={anni[0] ? `${anni[0]}.` : null}
        sottotitolo={project.seo?.metaDesc}
      >
        <ContactModal
          variant="realizzazione"
          image={
            cover
              ? {src: cover, alt: project.featuredImage?.node?.altText || ''}
              : undefined
          }
          caption={`${decodifica(project.title)}. Il prossimo può essere il tuo.`}
          className="cin-btn"
        >
          Un progetto come questo
          <Freccia />
        </ContactModal>
        {images.length > 0 && (
          <a href="#galleria" className="cin-link whitespace-nowrap">
            Guarda le foto
          </a>
        )}
      </HeroCinema>

      <section
        className="bg-[var(--carta)] text-ghisa"
        data-header="light"
        aria-label="Il progetto"
      >
        <div className="site-shell grid py-20 lg:grid-cols-12 lg:py-28">
          <div className="min-w-0 lg:col-span-8 lg:col-start-2">
            <Prosa content={project.content} editoriale />
          </div>
        </div>
      </section>

      {images.length > 0 && (
        <section
          id="galleria"
          className="scroll-mt-20 bg-[#121315] text-white [&_:focus-visible]:outline-fiamma"
          data-header="dark"
          aria-labelledby="galleria-title"
        >
          <div className="site-shell py-24 lg:py-32">
            <TitoloDueTempi
              id="galleria-title"
              riga="Il progetto"
              accento="in immagini."
              className="text-[clamp(36px,4.4vw,64px)] !leading-none"
            />
            <div className="mt-12 lg:mt-16">
              <GalleriaProgetto images={images} title={project.title} />
            </div>
          </div>
        </section>
      )}

      {/* Chiusura dopo la galleria: se stesse sotto il testo la pagina sembrerebbe finita lì */}
      <section
        className="bg-[var(--carta)] text-ghisa"
        data-header="light"
        aria-labelledby="invito-title"
      >
        <div className="site-shell py-24 lg:py-32">
          <div className="grid gap-10 rounded-[28px] bg-[#121315] p-8 text-white md:p-12 lg:grid-cols-12 lg:items-end lg:p-16">
            <div className="lg:col-span-7">
              <TitoloDueTempi
                id="invito-title"
                riga="Uno spazio"
                accento="da immaginare insieme."
                className="text-[clamp(32px,4vw,56px)] !leading-none"
              />
              <p className="mt-6 max-w-[44ch] text-[rgb(243_238_230/.75)]">
                <span dangerouslySetInnerHTML={{__html: project.title}} />. Il
                prossimo può essere il tuo.
              </p>
            </div>
            <div className="flex flex-col gap-8 lg:col-span-5 lg:items-end">
              <ContactModal
                variant="realizzazione"
                image={
                  cover
                    ? {
                        src: cover,
                        alt: project.featuredImage?.node?.altText || '',
                      }
                    : undefined
                }
                caption={`${decodifica(project.title)}. Il prossimo può essere il tuo.`}
                className="cin-btn"
              >
                Parlaci del tuo progetto
                <Freccia />
              </ContactModal>
              <SocialShareBar route={router.asPath} title={project.title} />
            </div>
          </div>
        </div>
      </section>

      <Correlati
        title="Altre"
        accento="realizzazioni."
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
    revalidate: ogni(60 * 60 * 24),
  }
}

export async function getStaticPaths() {
  // Nessun dettaglio in build: l'hosting WordPress rifiuta le raffiche di richieste dai
  // server di build Vercel. Ogni pagina si genera alla prima visita e poi resta in cache (ISR);
  // la sitemap li elenca comunque tutti (next-sitemap.config.js).
  return {paths: [], fallback: 'blocking'}
}
