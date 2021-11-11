const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  // the NODE_ENV thing is for https://github.com/Acidic9/prettier-plugin-tailwind/issues/29
  mode: process.env.NODE_ENV ? 'jit' : undefined,
  // purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  purge: {
    mode: 'layers',
    enobled: process.env.NODE_ENV === 'production',
    content: [
      './pages/**/*.+(js|jsx|ts|tsx)',
      './components/**/*.+(js|jsx|ts|tsx)',
      './ui/**/*.+(js,jsx,ts,tsx)',
    ],
  },
  // ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontSize: {
        xl: '1.375rem', // 22px
        '2xl': '1.5625rem', // 25px
        '3xl': '1.875rem', // 30px
        '4xl': '2.5rem', // 40px
        '5xl': '3.125rem', // 50px
        '6xl': '3.75rem', // 60px
        '7xl': '4.375rem', // 70px
      },
      fontFamily: {
        sans: ['Matter', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        small: '0 5px 10px rgba(0,0,0, 0.12)',
        medium: '0 8px 30px rgba(0,0,0, 0.12)',
      },
      minHeight: {
        'screen-75': '75vh',
      },
      opacity: {
        80: '.8',
      },
      zIndex: {
        2: 2,
        3: 3,
        '-10': '-10',
      },
      inset: {
        '-100': '-100%',
        '-225-px': '-225px',
        '-160-px': '-160px',
        '-150-px': '-150px',
        '-94-px': '-94px',
        '-50-px': '-50px',
        '-29-px': '-29px',
        '-20-px': '-20px',
        '25-px': '25px',
        '40-px': '40px',
        '95-px': '95px',
        '145-px': '145px',
        '195-px': '195px',
        '210-px': '210px',
        '260-px': '260px',
      },
      height: {
        '95-px': '95px',
        '70-px': '70px',
        '350-px': '350px',
        '500-px': '500px',
        '600-px': '600px',
        '50vh': '50vh', // max height for medium size hero images
        '75vh': '75vh', // max height for giant size hero images
      },
      maxHeight: {
        '860-px': '860px',
      },
      maxWidth: {
        '100-px': '100px',
        '120-px': '120px',
        '150-px': '150px',
        '180-px': '180px',
        '200-px': '200px',
        '210-px': '210px',
        '580-px': '580px',
      },
      minWidth: {
        '140-px': '140px',
        48: '12rem',
      },
      backgroundSize: {
        full: '100%',
      },
      listStyleType: {
        alpha: 'lower-alpha',
      },
      animation: {
        bounceX: 'bounceX 1s infinite',
      },
      keyframes: {
        bounceX: {
          '0%, 100%': {
            transform: 'translateX(+25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateX(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('autoprefixer'),
    require('@tailwindcss/forms'),
    plugin(function ({addComponents, theme}) {
      const screens = theme('screens', {})
      addComponents([
        {
          '.columns': {columns: '1'},
        },
        {
          [`@media (min-width: ${screens.lg})`]: {
            '.columns': {
              columns: '2',
              columnGap: '4em',
            },
          },
        },
        {
          '.container': {width: '100%'},
        },
        {
          [`@media (min-width: ${screens.sm})`]: {
            '.container': {
              'max-width': '640px',
            },
          },
        },
        {
          [`@media (min-width: ${screens.md})`]: {
            '.container': {
              'max-width': '768px',
            },
          },
        },
        {
          [`@media (min-width: ${screens.lg})`]: {
            '.container': {
              'max-width': '1024px',
            },
          },
        },
        {
          [`@media (min-width: ${screens.xl})`]: {
            '.container': {
              'max-width': '1280px',
            },
          },
        },
        {
          [`@media (min-width: ${screens['2xl']})`]: {
            '.container': {
              'max-width': '1280px',
            },
          },
        },
      ])
    }),
  ],
}
