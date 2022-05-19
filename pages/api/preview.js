import {getPreviewPost} from '../../lib/query/post'
import {withSessionRoute} from '../../lib/session'

export default withSessionRoute(async (req, res) => {
  const user = req.session.user

  const {id, slug} = req.query

  if (!user || !user.isLoggedIn) res.writeHead(307, {Location: '/auth/login'})

  // This secret should only be known by this API route
  if (!id && !slug) {
    return res.status(401).json({message: 'id assente'})
  }

  // Fetch WordPress to check if the provided `id` or `slug` exists
  const post = await getPreviewPost(
    id || slug,
    id ? 'DATABASE_ID' : 'SLUG',
    user,
  )

  // If the post doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).json({message: 'Post non trovato'})
  }

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({
    post: {
      id: post.databaseId,
      slug: post.slug,
      status: post.status,
    },
  })

  // Redirect to the path from the fetched post
  // We don't redirect to `req.query.slug` as that might lead to open redirect vulnerabilities
  res.writeHead(307, {Location: `/preview/`})
  res.end()
})
