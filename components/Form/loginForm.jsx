import * as React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({errorMessage, onSubmit}) => (
  <form className="flex flex-col" onSubmit={onSubmit}>
    <label>
      <span className="font-semibold">Username</span>
      <input
        className="form-input mb-5 mt-2 w-full"
        autoComplete="username"
        type="text"
        name="username"
        required
      />
    </label>
    <label>
      <span className="font-semibold">Password</span>
      <input
        className="form-input mb-5 mt-2 w-full"
        autoComplete="current-password"
        type="password"
        name="password"
        required
      />
    </label>
    <button className="site-button" type="submit">
      Login
    </button>

    {errorMessage && (
      <p role="alert" className="mx-0 mt-4 mb-0 text-red-600">
        {errorMessage}
      </p>
    )}
  </form>
)

export default LoginForm

LoginForm.propTypes = {
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func,
}
