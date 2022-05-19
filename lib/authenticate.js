import fetchJson from './fetchJson'

export default async function authentication(username, password) {
  const query = `
  mutation LoginUser($input: LoginInput!) {
    login(input: $input) {
      authToken,
      refreshToken,
      user {
        id
        name
        }
    }
  }
  `
  const variables = {
    input: {
      username,
      password,
    },
  }

  const data = await fetchJson(process.env.NEXT_PUBLIC_WP_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({query, variables}),
  })
  return data.data.login
}
