import Link from 'next/link'
import {Transition} from '@headlessui/react'
import {SlopeDivSection} from '../../ui/SlopeDivSection'

/**
 * @param backgroundImgSrc - 'url(/img/homeBackground.jpg)'
 * @param overlay - 'bg-black opacity-80'
 * @param title - 'A title'
 * @param subtitle - 'A subtitle'
 * @param button - {text: 'Button', link: '#'}
 */
function HeaderBig({
  backgroundImgSrc,
  overlay = 'bg-black opacity-80',
  title = '',
  subtitle = '',
  button = {text: 'Button', link: '#'},
  noButton = false,
  children,
  slopeSectionColor = 'text-gray-200',
}) {
  return (
    <div className="h-[500px] relative flex content-center items-center justify-center pb-32 pt-16">
      <div
        className="absolute top-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: backgroundImgSrc || 'url(/img/homeBackground.jpg)',
        }}
      >
        <span
          id="blackOverlay"
          className={`absolute w-full h-full ${overlay}`}
        />
      </div>
      <div className="container relative mx-auto">
        <div className="flex flex-wrap items-center">
          <div className="ml-auto mr-auto px-4 w-full text-center lg:w-6/12">
            <Transition
              enter="transition-opacity duration-700"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              show={true}
              as="h1"
              className="text-white text-4xl leading-tight md:text-5xl"
            >
              {title}
            </Transition>
            <p className="mt-4 text-gray-300 text-lg font-medium">{subtitle}</p>

            {!noButton && (
              <Link href={button.link}>
                <a
                  className="bg-gradient-tl-yellow mb-1 mr-1 mt-5 px-8 py-3 text-white text-base font-bold active:bg-yellow-700 rounded outline-none focus:outline-none hover:shadow-lg shadow-md uppercase transition-all duration-150 ease-linear"
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
      <SlopeDivSection color={slopeSectionColor} position="bottom" />
    </div>
  )
}

export default HeaderBig
