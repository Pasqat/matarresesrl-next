import CardPost from '../../components/Card/CardPost'

import {H2} from '../typography'

export default function MorePosts({posts}) {
  return (
    <section>
      <H2 className="my-8" variant="secondary">
        Potrebbero interessarti anche
      </H2>
      <div className="grid gap-y-10 grid-cols-1 mb-32 md:gap-x-8 md:gap-y-16 md:grid-cols-3 lg:gap-x-16">
        {posts.map(({node}) => {
          return (
            <CardPost
              title={node.title}
              slug={node.slug}
              excerpt={node.excerpt}
              date={node.date}
              coverImage={node.featuredImage?.node}
              key={node.slug}
            />
          )
        })}
      </div>
    </section>
  )
}
