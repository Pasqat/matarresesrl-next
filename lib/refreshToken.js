import fetchJson from './fetchJson'

export default async function refreshAuthToken(refreshToken) {
  const query = `
  mutation refreshJwtAuthToken($input: RefreshJwtAuthTokenInput!) {
    refreshJwtAuthToken(input: $input) {
      authToken
    }
  }
  `
  const variables = {
    input: {
      jwtRefreshToken: refreshToken,
    },
  }
  const data = await fetchJson(process.env.NEXT_PUBLIC_WP_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({query, variables}),
  })

  return data?.data.refreshJwtAuthToken
}
