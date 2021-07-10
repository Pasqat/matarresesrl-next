import { useRouter } from "next/router";
import Head from "next/head";
import Container from "../../components/Container";
import Layout from "../../components/Layout";
import Categories from "../../components/Post/post-categories";
import CoverImage from "../../components/Post/CoverImage";
import PostBody from "../../components/Post/post-body";
import MorePosts from "../../components/Post/more-posts";
import Date from "../../components/Date";

import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/api";

import Header from "../../components/Header/Header";

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
        <Header href="/blog">News</Header>
        <article>
          <Head>
            {router.isFallback ? (
              // NOTE: check isFallback is extremly important!!!
              // https://michaelfulton.co/posts/export-encountered-errors
              <title>Matarrese srl</title>
            ) : (
              <>
                <title>{postData.title} | Matarrese srl</title>
                <meta
                  property="og:image"
                  content={postData.featuredImage?.node?.sourceUrl}
                />
              </>
            )}
          </Head>
          <main>
            {router.isFallback ? (
              <h2>Loading...</h2>
            ) : (
              <>
                <h1
                  className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left"
                  dangerouslySetInnerHTML={{ __html: postData.title }}
                ></h1>
                <div className="mb-6 text-lg">
                  pubblicato il <Date dateString={postData.date} />
                  <Categories categories={postData.categories} />
                </div>
                <div className="mb-8 md:mb-16 sm:mx-0">
                  <CoverImage
                    title={postData.title}
                    coverImage={postData.featuredImage?.node}
                    // slug={postData.slug}
                  />
                </div>
                <PostBody content={postData.content} />
                {/* 
                <div className="max-w-2xl">
                  <Link href="/blog">
                    <a>torna agli articoli</a>
                  </Link>
                </div>
                */}
              </>
            )}
          </main>
        </article>
        <hr />
        {morePosts.length > 0 && <MorePosts posts={morePosts} />}
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
    paths: allPosts.edges.map(({ node }) => `/blog/${node.slug}`) || [],
    fallback: true,
  };
}
