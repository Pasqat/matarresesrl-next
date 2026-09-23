import * as React from 'react'
import useUser from '../../lib/useUser'
import Layout from '../../components/Layout'
import LoginForm from '../../components/Form/loginForm'
import fetchJson from '../../lib/fetchJson'

const Login = () => {
  const {mutateUser} = useUser({
    // redirectTo: '/profile-sg',
    redirectIfFound: true,
  })

  const [errorMsg, setErrorMsg] = React.useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    }

    try {
      mutateUser(
        await fetchJson('/api/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(body),
        }),
      )
    } catch (error) {
      console.log("C'è stato un errore:", error)
      setErrorMsg(error.data?.message || 'Accesso non riuscito. Riprova.')
    }
  }

  return (
    <Layout>
      <div className="site-shell login-shell">
        <div className="login-panel">
          <p className="page-intro">Area riservata</p>
          <h1>Accedi</h1>
          <LoginForm isLogin errorMessage={errorMsg} onSubmit={handleSubmit} />
        </div>
      </div>
    </Layout>
  )
}

export default Login
