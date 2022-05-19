import jwt from 'jsonwebtoken'

export default function checkExpired(accessToken) {
  const expIndex = process.env.EXPIRES_AT_INDEX_IN_TOKEN
  const decodedToken = jwt.decode(accessToken)

  /*
   * EXpiry time is in seconds with our expamle data,
   * we need milliseconds (might be different in other
   * implementations) so we do *1000
   */
  const expiresAt = new Date(decodedToken[expIndex] * 1000)
  const now = new Date()

  if (now < expiresAt) {
    // Not checkExpired
    return false
  } else {
    // checkExpired
    return true
  }
}
