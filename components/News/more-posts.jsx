import CardPost from "../../components/Card/CardPost";

export default function MorePosts({ posts }) {
  return (
    <section>
      <h2 className="my-8 text-5xl font-bold leading-tight tracking-tighter md:text-6xl">
        Potrebbero interessarti anche
      </h2>
      <div className="grid grid-cols-1 mb-32 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 gap-y-10 md:gap-y-16">
        {posts.map(({ node }) => {
          return (
            <CardPost
              title={node.title}
              slug={node.slug}
              excerpt={node.excerpt}
              date={node.date}
              coverImage={node.featuredImage?.node}
              key={node.slug}
            />
          );
        })}
      </div>
    </section>
  );
}