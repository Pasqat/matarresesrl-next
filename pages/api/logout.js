import {withSessionRoute} from '../../lib/session'

export default withSessionRoute(async (req, res) => {
  req.session.destroy()
  res.writeHead(307, {Location: '/'})
  res.end()
})

// Puoi usare l' hook di stato da "lib/useUser"
// mutateUser(await fetchJson('/api/logout', { method: 'POST' }),false)
// quando ti serve inviare un logout
