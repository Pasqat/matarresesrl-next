import * as React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({errorMessage, onSubmit}) => (
  <form className="flex flex-col" onSubmit={onSubmit}>
    <label>
      <span className="font-semibold">Username</span>
      <input
        className="mx-2 mt-1 mb-4 rounded border-2 p-2"
        type="text"
        name="username"
        required
      />
    </label>
    <label>
      <span className="font-semibold">Password</span>
      <input
        className="mx-2 mt-0 mb-4 rounded border-2 p-2"
        type="password"
        name="password"
        required
      />
    </label>
    <button className="font-bold text-yellow-500" type="submit">
      Login
    </button>

    {errorMessage && (
      <p className="mx-0 mt-4 mb-0 text-red-600">{errorMessage}</p>
    )}
  </form>
)

export default LoginForm

LoginForm.propTypes = {
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func,
}
