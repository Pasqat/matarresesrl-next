import {withSessionRoute} from '../../lib/session'
import authenticate from '../../lib/authenticate'

export default withSessionRoute(async (req, res) => {
  try {
    // we check that the user exists on server and store tokens and login data in session
    const {username} = await req.body
    const {password} = await req.body
    const data = await authenticate(username, password)
    const user = {isLoggedIn: true, ...data}
    // get user from database then:
    req.session.user = {
      ...user,
    }
    await req.session.save()
    res.json(user)
  } catch (error) {
    const {response: fetchResponse} = error
    res.status(fetchResponse?.status || 500).json(error.data)
  }
})
