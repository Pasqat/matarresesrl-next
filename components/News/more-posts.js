import CardPost from "../../components/Card/CardPost"

export default function MorePosts({ posts }) {
  return (
    <section>
      <h2 className="mb-8 text-5xl font-bold leading-tight tracking-tighter md:text-6xl">
        Altre News
      </h2>
      <div className="grid grid-cols-1 mb-32 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 gap-y-10 md:gap-y-16">
        {/* TODO: create cardPosts and add to `news/index.js` to */}
        {posts.map(({ node }) => (
        <CardPost 
          title={node.title}
          slug={node.slug}
          excerpt={node.excerpt}
          date={node.date}
          coverImage={node.featuredImage?.node}
        />
        ))}
      </div>
    </section>
  );
}