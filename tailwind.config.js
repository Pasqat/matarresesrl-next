const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  purge: ['./**/*.html', './*.html', './**/*.js', './*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
