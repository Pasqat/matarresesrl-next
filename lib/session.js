// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import {withIronSessionApiRoute, withIronSessionSsr} from 'iron-session/next'

const sessionOption = {
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: 'JWT-authentication-for-authenticated-session',
  cookieOptions: {
    // the next line allows to use the session in non-https environments like
    // Next.js dev mode (http://localhost:3000)
    secure: process.env.NODE_ENV === 'production' ? true : false,
  },
}

export function withSessionRoute(handler) {
  return withIronSessionApiRoute(handler, sessionOption)
}

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, sessionOption)
}
