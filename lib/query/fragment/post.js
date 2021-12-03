const PostFragment = `
  fragment PostFragment on Post {
    id
    title
    slug
    excerpt
    date
    featuredImage {
      node {
        ...ImageFragment
    }
  }
`

export default PostFragment
