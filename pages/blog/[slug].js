import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

import { getAllPostsWithSlug, getPost } from "../../lib/api";

import styles from "../../styles/Home.module.css";
import blogStyles from "../../styles/Blog.module.css";

export default function Post({ postData }) {
  const router = useRouter();

  if (!router.isFallback && !postData?.slug) {
    return <p>hmm...sembra ci sia un errore</p>;
  }

  const formatDate = (date) => {
    const newDate = new Date(date);

    return `${newDate.getDate()}/${
      newDate.getMonth() + 1
    }/${newDate.getFullYear()}`;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <main className={styles.main}>
        {router.isFallback ? (
          <h2>Loading...</h2>
        ) : (
          <>
            <img
              style={{ maxWidth: "80vw" }}
              src={postData.featuredImage?.node.sourceUrl}
              alt={postData.title}
            />
            <article className={blogStyles.article}>
              <div className={blogStyles.postmeta}>
                <h1 className={styles.title}>{postData.title}</h1>
                <p>pubblicato il {formatDate(postData.date)}</p>
              </div>
              <div
                className="post-content content"
                dangerouslySetInnerHTML={{ __html: postData.content }}
              />
            </article>
          </
        )}
        <p>
          <Link href="/blog">
            <a>torna agli articoli</a>
          </Link>
        </p>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();

  return {
    paths: allPosts.edges.map(({ node }) => `/blog/${node.slug}`) || [],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const data = await getPost(params.slug);

  return {
    props: {
      postData: data.post,
    },
  };
}
