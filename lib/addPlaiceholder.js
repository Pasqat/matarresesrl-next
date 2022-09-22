import {getPlaiceholder} from 'plaiceholder'

export default async function (data) {
  // Generate blurred plaiceholder.
  let posts = []

  if (data) {
    for (let p of data) {
      const plaiceholder = p.featuredImage
        ? await getPlaiceholder(p.featuredImage.node.sourceUrl, {size: 16})
        : null

      let newPost = {...p, featuredImage: {...p.featuredImage, plaiceholder}}
      // Use a for loop instead of a map for async op.
      posts.push(newPost)
    }
  }

  return posts
}
