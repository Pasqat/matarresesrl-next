import Link from "next/link";
import CardPost from "../Card/CardPost";
import Date from "../Date";

import CoverImage from "../News/CoverImage"

// Function to update the query with the new results
const updateQuery = (previousResult, { fetchMoreResult }) => {
  return fetchMoreResult.posts.edges.length ? fetchMoreResult : previousResult;
};

export default function NewsList({
  data,
  error,
  loading,
  fetchMore,
  batchSize,
}) {
  if (error) {
    return (
      <div>
        <p>
          Ci dispiace, ma sembra che qualcosa sia andato storto. Prova a
          ricaricare la pagina.
        </p>
        <p>{JSON.stringify(error)}</p>
      </div>
    );
  }


  const newsPlaceholder = Array(9).fill(null);

  if (loading)
    return (
      <section>
        <div className="py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {newsPlaceholder.map((_, i) => (
              <div className="p-4 w-full md:w-1/3" key={i}>
                <div className="h-full overflow-hidden bg-white border-2 border-gray-200 rounded-lg hover:shadow-lg">
                  <div className="animate-pulse">
                    <div className="w-full h-64 md:h-36 lg:h-48 bg-gray-300" />
                    <div className="flex flex-col justify-between p-6 space-y-4">
                      <div className="space-y-2">
                        <div className="mb-2 bg-gray-300 h-4 rounded w-1/3" />
                        <div className="bg-gray-300 h-5 w-full rounded" />
                        <div className="bg-gray-300 h-5 w-5/6 rounded" />
                        <div className="hidden md:block bg-gray-300 h-5 w-full rounded" />
                      </div>
                      <div className="space-y-2">
                        <div className="bg-gray-300 h-4 w-full rounded" />
                        <div className="bg-gray-300 h-4 w-4/6 rounded" />
                        <div className="hidden md:block bg-gray-300 h-4 w-5/6 rounded" />
                        <div className="hidden md:block bg-gray-300 h-4 w-full rounded" />
                      </div>
                      <div className="bg-yellow-300 h-4 w-4/6 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );

  const { posts } = data;

  const heroPost = posts.edges[0]?.node
  const morePosts = posts.edges.slice(1)

  console.log(heroPost)

  return (
    <>
      {posts && posts.edges ? (
        <>
          <section className="text-gray-600 body-font">
            <div className="py-24 mx-auto">
              {heroPost && (
                <section>
                  <div className="flex flex-col lg:flex-row pt-4 pb-12 px-4">
                    <div className="mb-8">
                      <CoverImage title={heroPost.title} coverImage={heroPost.featuredImage?.node} slug={heroPost.slug} href={`/news/${heroPost.slug}`} />
                    </div>
                    <div className="flex flex-col md:flex-row lg:flex-col lg:ml-8">
                      <div className="flex flex-col md:flex-col-reverse lg:flex-col">
                        <div className="mb-4 md:mb-0 text-lg font-medium text-gray-400">
                          <Date dateString={heroPost.date} />
                        </div>
                        <h3 className="mb-4 text-4xl lg:text-6xl font-bold leading-none text-gray-600">
                          <Link href={`/news/${heroPost.slug}`}>
                            <a
                              className="hover:underline"
                              dangerouslySetInnerHTML={{ __html: heroPost.title }}
                            />
                          </Link>
                        </h3>
                      </div>
                      <div>
                        <div
                          className="text-lg leading-relaxed mb-4"
                          dangerouslySetInnerHTML={{ __html: heroPost.excerpt }}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              )}
              <div className="flex flex-wrap -m-4">
                {morePosts.map(({ node }) => {
                  return (
                    <div key={node.title} className="p-4 md:w-1/3">
                      <CardPost
                        slug={node.slug}
                        title={node.title}
                        coverImage={node.featuredImage?.node}
                        date={node.date}
                        excerpt={node.excerpt}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          <div className="flex justify-between w-5/12 pb-24 m-auto">
            <button
              className="disabled:opacity-25 disabled:pointer-events-none"
              disabled={!posts.pageInfo.hasPreviousPage}
              onClick={() => {
                fetchMore({
                  variables: {
                    first: null,
                    after: null,
                    last: batchSize,
                    before: posts.pageInfo.startCursor || null,
                  },
                  updateQuery,
                });
              }}
            >
              Precedenti
            </button>
            <button
              className="disabled:opacity-25 disabled:pointer-events-none"
              disabled={!posts.pageInfo.hasNextPage}
              onClick={() => {
                fetchMore({
                  variables: {
                    first: batchSize,
                    after: posts.pageInfo.endCursor || null,
                    last: null,
                    before: null,
                  },
                  updateQuery,
                });
              }}
            >
              Successivi
            </button>
          </div>
        </>
      ) : (
        <div>Nessuna news trovata...</div>
      )}
    </>
  );
}
