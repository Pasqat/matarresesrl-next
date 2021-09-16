import { useRouter } from "next/router";

import Head from "next/head";
import Date from "../../components/Date";
import Layout from "../../components/Layout";
import CoverImage from "../../components/News/CoverImage";
import MorePosts from "../../components/News/more-posts";
import PostBody from "../../components/News/post-body";
import Categories from "../../components/News/post-categories";

import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/api";

// TODO: is it usefull have local and production domain?
// const domainUrl = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_WP_API_URL : process.env.NEXT_PUBLIC_WP_API_URL_LOCAL
const domainUrl = process.env.NEXT_PUBLIC_WP_API_URL

export default function Post({ postData, posts }) {
  const router = useRouter();
  const morePosts = posts?.edges;

  if (!router.isFallback && !postData.slug) {
    console.log("sdeng 💣️");
    return <p>hmm...sembra ci sia un errore</p>;
  }

  return (
    <Layout>
      {router.isFallback ? (
        <>
          <Head>
            <title>Matarrese srl</title>
          </Head>
          <main>
            <h2>Loading...</h2>
          </main>
        </>
      ) : (
        <>
          <article className="bg-gray-100">
            <Head>
              <title>{postData.title} | Matarrese srl</title>
              <meta
                property="og:image"
                content={postData.featuredImage?.node?.sourceUrl}
              />
            </Head>
            <div className="px-5 container mx-auto max-w-7xl py-16">
              <main className="mb-24">
                <div className="mb-8 md:mb-16 sm:mx-0">
                  <CoverImage
                    title={postData.title}
                    coverImage={postData.featuredImage?.node}
                  // slug={postData.slug}
                  />
                </div>

                <div className="relative lg:flex lg:flex-row">

                  <div className="relative max-w-3xl bg-white lg:-mt-56 z-2 shadow-lg p-10 lg:ml-24">
                    <div className="mb-6 text-lg">
                      <Categories categories={postData.categories} />
                      <Date dateString={postData.date} className="ml-4 text-sm text-gray-400" />
                    </div>
                    <h1
                      className="mb-12 text-4xl font-bold leading-tight tracking-tighter text-center md:text-5xl lg:text-5xl md:text-left"
                      dangerouslySetInnerHTML={{ __html: postData.title }}
                    ></h1>
                    <PostBody content={postData.content} />
                  </div>

                  <div className="sticky top-20 lg:ml-4 h-full">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${domainUrl}${router.asPath}`}
                      target="_blank"
                    >
                      <i className="text-4xl text-gray-600 hover:text-yellow-600 fab fa-facebook"></i>
                    </a>
                  </div>


                </div>
                {/* 
                  <div className="max-w-2xl">
                    <Link href="/news">
                      <a>torna agli articoli</a>
                    </Link>
                  </div>
                  */}
              </main>
            </div>
          </article>
          <div className="px-5 container mx-auto max-w-7xl py-8">
            {morePosts.length > 0 && <MorePosts posts={morePosts} />}
          </div>
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview);

  return {
    props: {
      preview,
      postData: data.post,
      posts: data.posts,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts.edges.map(({ node }) => `/news/${node.slug}`) || [],
    fallback: true,
  };
}
