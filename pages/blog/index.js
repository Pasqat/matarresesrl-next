import Head from "next/head";
import Link from "next/link";

import { getAllPosts } from "../../lib/api";

import styles from "../../styles/Home.module.css";
import blogStyles from "../../styles/Blog.module.css";

export default function Blog({ allPosts: { edges } }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog articles page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Ultimi Aggiornamenti</h1>
        <hr />
        <section>
          {edges.map(({ node }) => {
            return (
              <div className={blogStyles.listitem} key={node.id}>
                <div className={blogStyles.listitem__thumbnail}>
                  <figure>
                    <img
                      src={
                        node.featuredImage?.node.mediaDetails.sizes[1].sourceUrl
                      }
                      alt={node.title}
                    />
                  </figure>
                </div>
                <div className={blogStyles.listitem__content}>
                  <h2>{node.title}</h2>
                  <Link href={`/blog/${node.slug}`}>
                    <a>Continua a leggere</a>
                  </Link>
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const allPosts = await getAllPosts();
  return {
    props: {
      allPosts,
    },
  };
}
