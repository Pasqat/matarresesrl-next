import Link from 'next/link'
import {ButtonLink} from '../button'
import {motion, useReducedMotion} from 'framer-motion'
import {H1} from '../typography'

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
}) {
  const shouldReduceMotion = useReducedMotion()

  const childVariants = {
    initial: {opacity: 0, y: shouldReduceMotion ? 0 : 25},
    visible: {opacity: 1, y: 0, transition: {duration: 0.5}},
  }

  return (
    <div className="relative flex h-[500px] content-center items-center justify-center pb-32 pt-16">
      <div
        className="absolute top-0 h-full w-full bg-cover bg-center"
        style={{
          backgroundImage: backgroundImgSrc || 'url(/img/homeBackground.jpg)',
        }}
      >
        <span
          id="blackOverlay"
          className={`absolute h-full w-full ${overlay}`}
        />
      </div>
      {title && (
        <div className="z-20 mx-auto max-w-8xl">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-6/12">
              <motion.div
                initial="initial"
                animate="visible"
                variants={{
                  initial: {opacity: 0},
                  visible: {opacity: 1, transition: {staggerChildren: 0.2}},
                }}
                className="flex flex-auto flex-col"
              >
                <motion.div variants={childVariants}>
                  <H1 variant="accent">{title}</H1>
                </motion.div>
                {subtitle ? (
                  <motion.div variants={childVariants}>
                    <p className="mt-4 text-3xl leading-tight text-white md:text-4xl">
                      {subtitle}
                    </p>
                  </motion.div>
                ) : null}
              </motion.div>
              {!noButton && (
                <Link href={button.link} passHref>
                  <ButtonLink size="medium" className="mt-8">
                    <i className="fas fa-message" /> {button.text}
                  </ButtonLink>
                </Link>
              )}
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HeaderBig
