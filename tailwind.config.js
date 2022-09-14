const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    screens: {
      md: '640px',
      lg: '1024px',
      xl: '1500px', // this is the "design resolution"
    },
    colors: {
      trasparent: 'transparent',
      current: 'currentColor',
      white: 'var(--color-white)',
      black: 'var(--color-black)',

      gray: {
        100: 'var(--color-gray-100)',
        200: 'var(--color-gray-200)',
        300: 'var(--color-gray-300)',
        400: 'var(--color-gray-400)',
        500: 'var(--color-gray-500)',
        600: 'var(--color-gray-600)',
        700: 'var(--color-gray-700)',
        800: 'var(--color-gray-800)',
        900: 'var(--color-gray-900)',
      },
      yellow: {
        400: 'var(--color-yellow-400)',
        500: 'var(--color-yellow-500)',
        600: 'var(--color-yellow-600)',
      },
      red: {
        400: 'var(--color-red-400)',
        500: 'var(--color-red-500)',
        600: 'var(--color-red-400)',
      },
      green: {
        100: 'var(--color-green-100)',
        500: 'var(--color-green-500)',
        600: 'var(--color-green-600)',
      },
    },
    gradientColorStops: theme => ({
      ...theme('colors'),
      primary: 'var(--color-yellow-500)',
      secondary: 'var(--color-red-500)',
    }),
    extend: {
      gridTemplateRows: {
        'max-content': 'max-content',
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
      height: {
        hero: 'min(60rem, calc(100vh - 10rem))', // screen - navbar height (lg:only)
      },
      spacing: {
        '5vw': '5vw', // pull featured sections and navbar in the margin
        '8vw': '8vw', // positions hero img inside the margin
        '10vw': '10vw', // page margin
      },
      maxHeight: {
        '50vh': '50vh', // max height for medium size hero images
        '75vh': '75vh', // max height for giant size hero images
      },
      rotate: {
        '-135': '-135deg',
        134: '135deg',
      },
      maxWidth: {
        '8xl': '96rem',
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

      typography: theme => {
        // some fontSize return [size, props], others just size
        const fontSize = size => {
          const result = theme(`fontSize.${size}`)
          return Array.isArray(result) ? result[0] : result
        }

        const breakout = {
          marginLeft: 0,
          marginRight: 0,
          gridColumn: '2 / span 10',
        }

        return {
          // DEFAULT only holds shared stuff and not the things that change
          // between light/dark
          DEFAULT: {
            css: [
              {
                '> *': {
                  gridColumn: '1 / -1',

                  [`@media (min-width: ${theme('screens.lg')})`]: {
                    gridColumn: '3 / span 8',
                  },
                },
                p: {
                  marginTop: 0,
                  marginBottom: theme('spacing.8'),
                  fontSize: fontSize('lg'),
                },
                '> div': {
                  marginTop: 0,
                  marginBottom: theme('spacing.8'),
                  fontSize: fontSize('lg'),
                },
                a: {
                  textDecoration: 'none',
                  color: theme('colors.yellow.500'),
                },
                'a:hover,a:focus': {
                  textDecoration: 'underline',
                  outline: 'none',
                },
                strong: {
                  fontWeight: theme('fontWeight.medium'),
                  fontSize: fontSize('lg'),
                  color: theme('colors.black'),
                },
                hr: {
                  marginTop: theme('spacing.8'),
                  marginBottom: theme('spacing.16'),
                  borderColor: theme('colors.gray.200'),
                },
                pre: {
                  color: 'var(--base05)',
                  backgroundColor: 'var(--base00)',
                  marginTop: 0,
                  marginBottom: theme('spacing.8'),
                  marginLeft: `-${theme('spacing.10vw')}`,
                  marginRight: `-${theme('spacing.10vw')}`,
                  padding: theme('spacing.8'),
                  borderRadius: 0,

                  [`@media (min-width: ${theme('screens.lg')})`]: {
                    borderRadius: theme('borderRadius.lg'),
                    ...breakout,
                  },
                },
                '.embed': {
                  position: 'relative',
                  marginLeft: '-10vw',
                  marginRight: '-10vw',
                  [`@media (min-width: ${theme('screens.lg')})`]: {
                    ...breakout,
                  },
                },
                '.embed > div': {
                  height: '0px',
                },
                '.embed > div > iframe': {
                  height: '100% !important',
                  width: '100% !important',
                  top: '0',
                  left: '0',
                  position: 'absolute',
                  border: 'none',
                  borderRadius: '0 !important',
                  [`@media (min-width: ${theme('screens.lg')})`]: {
                    borderRadius: '0.5rem !important',
                  },
                },
                ul: {
                  marginTop: 0,
                  marginBottom: theme('spacing.8'),
                },
                ol: {
                  marginTop: 0,
                  marginBottom: theme('spacing.8'),
                },
                'h1, h2, h3, h4, h5, h6': {
                  marginTop: 0,
                  marginBottom: 0,
                  fontWeight: theme('fontWeight.normal'),
                  color: theme('colors.black'),

                  [`@media (min-width: ${theme('screens.lg')})`]: {
                    fontWeight: theme('fontWeight.medium'),
                  },
                },
                // tailwind doesn't stick to this property order, so we can't make 'h3' overrule 'h2, h3, h4'
                'h1, h2': {
                  fontSize: fontSize('2xl'),
                  marginTop: theme('spacing.20'),
                  marginBottom: theme('spacing.10'),
                  [`@media (min-width: ${theme('screens.lg')})`]: {
                    fontSize: fontSize('3xl'),
                  },
                },
                h3: {
                  fontSize: fontSize('xl'),
                  marginTop: theme('spacing.16'),
                  marginBottom: theme('spacing.10'),
                  [`@media (min-width: ${theme('screens.lg')})`]: {
                    fontSize: fontSize('2xl'),
                  },
                },
                'h4, h5, h6': {
                  fontSize: fontSize('lg'),
                  [`@media (min-width: ${theme('screens.lg')})`]: {
                    fontSize: fontSize('xl'),
                  },
                },
                img: {
                  // images are wrapped in <p>, which already has margin
                  marginTop: 0,
                  marginBottom: 0,
                  borderRadius: theme('borderRadius.lg'),
                },
                blockquote: {
                  fontWeight: theme('fontWeight.normal'),
                  border: 'none',
                  borderRadius: theme('borderRadius.lg'),
                  padding: theme('spacing.8'),
                  marginTop: 0,
                  marginBottom: theme('spacing.10'),
                  color: theme('colors.gray.500'),
                  backgroundColor: 'colors.gray.100',
                },
                'blockquote > :last-child': {
                  marginBottom: 0,
                },
              },
            ],
          },
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('autoprefixer'),
  ],
}
