// Flat config (ESLint 9). eslint-config-next 16 ships native flat configs,
// so we spread them directly instead of using FlatCompat.
import next from 'eslint-config-next/core-web-vitals'
import prettier from 'eslint-config-prettier'

const config = [
  ...next,
  // Turn off ESLint formatting rules that conflict with Prettier.
  prettier,
  {
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      '@next/next/no-img-element': 'off',

      // New React Compiler rules bundled with eslint-plugin-react-hooks 7 and
      // enabled by eslint-config-next 16. This codebase predates them and they
      // flag working, intentional patterns (e.g. resetting state when a prop
      // changes). We keep the project's original lint scope (rules-of-hooks +
      // exhaustive-deps) and opt out of the compiler rules; revisit if/when the
      // React Compiler is adopted.
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/immutability': 'off',
    },
  },
]

export default config
