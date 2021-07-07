import Link from 'next/link'

import PropTypes from 'prop-types'

/**
 * @param backgroundImgSrc - 'url(/img/homeBackground.jpg)'
 * @param overlay - 'bg-black opacity-80'
 * @param title - 'A title'
 * @param subtitle - 'A subtitle'
 * @param button - {text: 'Button', link: '#'}
 */
function HeaderBig({
  backgroundImgSrc = 'url(/img/homeBackground.jpg',
  overlay = 'bg-black opacity-80',
  title = 'Title',
  subtitle = '',
  button = { text: 'Button', link: '#' },
  noButton = false,
  children,
}) {
  return (
    <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-[75vh]">
      <div
        className="absolute top-0 w-full h-full bg-center bg-cover"
        style={{
          backgroundImage: backgroundImgSrc,
        }}
      >
        <span
          id="blackOverlay"
          className={`absolute w-full h-full bg-black opacity-80 ${overlay}`}
        />
      </div>
      <div className="container relative mx-auto">
        <div className="flex flex-wrap items-center">
          <div className="w-full px-4 ml-auto mr-auto text-center lg:w-6/12">
            <div className="pr-12">
              <h1 className="text-5xl font-semibold text-white">{title}</h1>
              <p className="mt-4 text-lg font-bold text-gray-300">{subtitle}</p>
              {!noButton && (
                <Link href={button.link}>
                  <a
                    className="px-8 py-3 mt-5 mb-1 mr-1 text-base font-bold text-white uppercase transition-all duration-150 ease-linear bg-yellow-600 rounded shadow-md outline-none active:bg-yellow-700 hover:shadow-lg focus:outline-none"
                    type="button"
                  >
                    <i className="fas fa-message" /> {button.text}
                  </a>
                </Link>
              )}
              {children}
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 top-auto w-full h-16 overflow-hidden pointer-events-none"
        style={{ transform: 'translateZ(0)' }}
      >
        <svg
          className="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            className="text-gray-200 fill-current "
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>
  )
}

HeaderBig.PropTypes = {
  backgroundImgSrc: PropTypes.string,
  overlay: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  button: PropTypes.shape({
    text: PropTypes.string.isRequired,
    link: PropTypes.string,
  }),
  noButton: PropTypes.bool,
}

export default HeaderBig
