import Date from "../../components/Date";
import Link from "next/link";

export default function MorePosts({ posts }) {
  return (
    <section>
      <h2 classNames="mb-8 text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
        Altre News
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
        {/* TODO: create cardPosts and add to `blog/index.js` to */}
        {posts.map(({ node }) => (
          <div key={node.title} className="p-4 md:w-1/3">
            <div className="h-full overflow-hidden bg-white border-2 border-gray-200 rounded-lg border-opacity-60">
              <img
                src={node.featuredImage?.node?.sourceUrl}
                alt={node.title}
                className={
                  !node.featuredImage?.node?.sourceUrl
                    ? "hidden"
                    : "object-cover object-center w-full lg:h-48 md:h-36"
                }
              />
              <div className="flex flex-col justify-between p-6">
                <div>
                  <Date
                    className="mb-1 text-xs font-medium tracking-widest text-gray-400 title-font"
                    dateString={node.date}
                  />
                  <h2 className="mb-3 text-lg font-medium text-gray-900 title-font">
                    {node.title}
                  </h2>
                  <p
                    className="mb-3 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html:
                        node.excerpt.length > 160
                          ? node.excerpt.substr(0, 160) + "..."
                          : node.excerpt,
                    }}
                  ></p>
                  <div className="flex flex-wrap items-center">
                    <Link href={`/blog/${node.slug}`}>
                      <a className="inline-flex items-center text-yellow-500 md:mb-2 lg:mb-0">
                        Continua a leggere
                        <svg
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
