import {useRouter} from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import Layout from '../../components/Layout'
import Header from '../../components/Header/Header'
import EventBody from '../../components/Events/event-body'
import HeaderBig from '../../components/Header/HeaderBig'
import SocialShareBar from '../../components/SocialShareBar/SocialShareBar'
import {ButtonLink} from '../../components/button'

import {getProject, getAllProjectsWithSlug} from '../../lib/query/project'
import {H2, H1} from '../../components/typography'
import {Spacer} from '../../components/spacer'
import {Grid} from '../../components/grid'
import {SeoDataSection} from '../../components/sections/seodata-section'

export default function Project({project}) {
  const router = useRouter()
  // const moreEvents = events?.edges

  if (!router.isFallback && !project.slug) {
    return <p>hmm...sembra ci sia un errore</p>
  }

  return (
    <Layout navbarTransparent>
      {router.isFallback ? (
        <>
          <Header href="/realizzazioni">Realizzazioni</Header>
          <Head>
            <title>Matarrese srl | Realizzazioni</title>
          </Head>
          <main>
            <H2>Caricamento dei progetti realizzati</H2>
          </main>
        </>
      ) : (
        <>
          <Head>
            {SeoDataSection({
              seoData: project.seo,
              slug: `realizzazioni/${project.slug}`,
            })}
          </Head>
          <HeaderBig
            noButton
            overlay="bg-gradient-to-tl from-secondary via-primary to-black opacity-80"
            slopeSectionColor="text-gray-100"
            backgroundImgSrc={
              project.featuredImage && project.featuredImage.node.mediaItemUrl
            }
          />
          <section className="relative w-full bg-gray-100 pt-16 pb-24 text-gray-800">
            <div className="container mx-auto px-4">
              <div className="relative lg:flex lg:flex-row">
                <div className="relative -mt-96 mb-6 flex w-full min-w-0 flex-col break-words bg-white shadow-lg">
                  <div className="px-6">
                    <div className="mt-12 text-center">
                      <H1 className="mb-2" variant="secondary">
                        {project.title}
                      </H1>
                      <div className="mt-0 mb-2 text-sm font-bold uppercase leading-normal text-gray-400">
                        {project.portfolioCategories.edges.map(({node}) => (
                          <div key={node.id}>{node.name}</div>
                        ))}
                      </div>
                      <div>
                        {project.portfolioTags.edges.map(({node}) => (
                          <div key={node.id}>{node.name}</div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-10 border-t border-gray-200 py-10">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full px-4 lg:w-9/12">
                          {project.galleria.every(n => n !== null) ? (
                            <Grid
                              nested
                              className="mb-8 gap-2 lg:mb-24 lg:gap-4"
                            >
                              {project.galleria.map(image => (
                                <div
                                  key={image.id}
                                  className="relative col-span-4 h-32 lg:h-64"
                                >
                                  <Image
                                    src={image.sourceUrl}
                                    layout="fill"
                                    objectFit="cover"
                                    objectPosition="center"
                                  />
                                </div>
                              ))}
                            </Grid>
                          ) : null}
                          <div className="mb-14 lg:mb-24">
                            <EventBody content={project.content} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <SocialShareBar route={router.asPath} title={project.title} />
              </div>

              <Spacer size="xs" />

              <div className="flex justify-center ">
                <Link href="/realizzazioni" passHref>
                  <ButtonLink size="medium">
                    Guarda le altre realizzazioni
                  </ButtonLink>
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </Layout>
  )
}

export async function getStaticProps({params}) {
  const data = await getProject(params.slug)

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
