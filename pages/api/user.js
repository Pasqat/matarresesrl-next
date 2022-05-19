import {withSessionRoute} from '../../lib/session'
import checkExpired from '../../lib/checkExpired'
import refreshAuthToken from '../../lib/refreshToken'

export default withSessionRoute(async (req, res) => {
  const user = req.session.user
  const atIndex = process.env.ACCESS_TOKEN_INDEX_IN_SERVER_AUTH_JSON_RESPONSE
  const rtIndex = process.env.REFRESH_TOKEN_INDEX_IN_SERVER_AUTH_JSON_RESPONSE

  if (user) {
    // in a real world application you might read the user id from the session and then do a database requent
    // to get more information on the user if needed
    if (checkExpired(user[atIndex])) {
      // Get new access/auth token
      const newAccessToken = (await refreshAuthToken(user[rtIndex]))[atIndex]
      // Remove old access/auth token and store in cookie
      let oldUser = user
      delete oldUser[atIndex]
      const newUser = {...oldUser, [atIndex]: newAccessToken}
      req.session.user = {
        ...newUser,
      }
      await req.session.save()
      // Send back the update user database
      const savedUser = await req.session.user
      res.json({
        isLoggedIn: true,
        ...savedUser,
      })
    } else {
      res.json({
        isLoggedIn: true,
        ...user,
      })
    }
  } else {
    res.json({
      isLoggedIn: false,
    })
  }
})
