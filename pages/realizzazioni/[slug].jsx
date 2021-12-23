import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import Layout from "../../components/Layout";
import Header from "../../components/Header/Header";
import EventBody from "../../components/Events/event-body";
import HeaderBig from "../../components/Header/HeaderBig";
import SocialShareBar from "../../components/SocialShareBar/SocialShareBar";

import { getProject, getAllProjectsWithSlug } from "../../lib/project_api";
import { H2, H3 } from "../../components/typography";

export default function Project({ project }) {
  const router = useRouter();
  // const moreEvents = events?.edges

  if (!router.isFallback && !project.slug) {
    return <p>hmm...sembra ci sia un errore</p>;
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
            <H2>
            Caricamento dei progetti realizzati
            </H2>
          </main>
        </>
      ) : (
        <>
          <HeaderBig
            noButton
            overlay="bg-gradient-to-br from-primary to-secondary opacity-80"
            slopeSectionColor="text-gray-100"
            backgroundImgSrc={
              project.featuredImage &&
              `url(${project.featuredImage.node.sourceUrl})`
            }
          />
          <section className="relative pt-16 pb-24 w-full text-gray-800 bg-gray-100">
            <div className="container px-4 mx-auto">
              <div className="lg:flex relative lg:flex-row">
                <div className="flex relative flex-col -mt-64 mb-6 w-full min-w-0 break-words bg-white shadow-lg">
                  <div className="px-6">
                    {/* <div className="mt-8 flex flex-wrap justify-center"> */}
                    {/*   <div className="flex items-center justify-center"> */}
                    {/*     <div className="mb-2 text-left text-gray-800"> */}
                    {/*       <span className="block text-xl font-bold tracking-wide text-gray-600 uppercase"> */}
                    {/*         data */}
                    {/*       </span> */}
                    {/*       <span className="block text-lg font-bold text-yellow-500"> */}
                    {/*         ora */}
                    {/*       </span> */}
                    {/*     </div> */}
                    {/*   </div> */}
                    {/*   <div className="px-4 w-4/12 text-right self-center"> */}
                    {/*     <FormModal */}
                    {/*       buttonText="Partecipa" */}
                    {/*       buttonClassName="px-4 py-2 mb-1 text-xs font-bold text-white uppercase transition-all duration-150 ease-linear bg-gradient-to-tl from-red-600 to-yellow-400 rounded shadow outline-none active:bg-yellow-500 hover:shadow-md focus:outline-none sm:mr-2" */}
                    {/*       type="reservation" */}
                    {/*       title={project.title} */}
                    {/*     /> */}
                    {/*   </div> */}
                    {/* </div> */}
                    <div className="mt-12 text-center">
                      <H3 className="mb-2" variant="secondary">
                        {project.title}
                      </H3>
                      <div className="mt-0 mb-2 text-sm font-bold leading-normal text-gray-400 uppercase">
                        {project.portfolioCategories.edges.map(
                          ({ node } = category) => (
                            <div key={node.id}>{node.name}</div>
                          )
                        )}
                      </div>
                    </div>

                    <div className="py-10 mt-10 text-center border-t border-gray-200">
                      <div className="flex flex-wrap justify-center">
                        <div className="px-4 w-full lg:w-9/12">
                          <EventBody content={project.content} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <SocialShareBar route={router.asPath} title={project.title} />
              </div>
              <div className="flex justify-center ">
                <Link href="/realizzazioni">
                  <a className="p-4 mt-10 text-center uppercase bg-white rounded shadow-lg hover:shadow-sm">
                    Realizzazioni
                  </a>
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const data = await getProject(params.slug);

  return {
    props: {
      project: data.project,
    },
  };
}

export async function getStaticPaths() {
  const allProjects = await getAllProjectsWithSlug();

  return {
    paths:
      allProjects.edges.map(({ node }) => `/realizzazioni/${node.slug}`) || [],
    fallback: true,
  };
}
