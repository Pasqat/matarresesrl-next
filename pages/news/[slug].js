import { useRouter } from "next/router";

import Head from "next/head";
import Container from "../../components/Container";
import Date from "../../components/Date";
import Header from "../../components/Header/Header";
import Layout from "../../components/Layout";
import CoverImage from "../../components/News/CoverImage";
import MorePosts from "../../components/News/more-posts";
import PostBody from "../../components/News/post-body";
import Categories from "../../components/News/post-categories";

import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/api";

export default function Post({ postData, posts }) {
  const router = useRouter();
  const morePosts = posts?.edges;

  if (!router.isFallback && !postData.slug) {
    console.log("sdeng 💣️");
    return <p>hmm...sembra ci sia un errore</p>;
  }

  return (
    <Layout>
      <Container>
        <Header href="/news">News</Header>
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
            <article>
              <Head>
                <title>{postData.title} | Matarrese srl</title>
                <meta
                  property="og:image"
                  content={postData.featuredImage?.node?.sourceUrl}
                />
              </Head>
              <main className="mb-24">
                <div className="max-w-3xl mx-auto">
                  <div className="mb-6 text-lg">
                    <Date dateString={postData.date} className="text-sm font-semibold text-gray-500" />
                    <Categories categories={postData.categories} />
                  </div>
                  <h1
                    className="mb-12 text-4xl font-bold leading-tight tracking-tighter text-center md:text-5xl lg:text-5xl md:text-left"
                    dangerouslySetInnerHTML={{ __html: postData.title }}
                  ></h1>
                  <div className="mb-8 md:mb-16 sm:mx-0">
                    <CoverImage
                      title={postData.title}
                      coverImage={postData.featuredImage?.node}
                    // slug={postData.slug}
                    />
                  </div>
                </div>
                <PostBody content={postData.content} />
                {/* 
                  <div className="max-w-2xl">
                    <Link href="/news">
                      <a>torna agli articoli</a>
                    </Link>
                  </div>
                  */}
              </main>
            </article>
            <hr />
            {morePosts.length > 0 && <MorePosts posts={morePosts} />}
          </>
        )}
      </Container>
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
