import * as React from 'react'
import {useState} from 'react'
import {motion, AnimatePresence, useReducedMotion} from 'framer-motion'
import {wrap} from 'popmotion'
import {images, imagesMobile} from '../data/home-imgs.js'
import {H1} from './typography'
import {ArrowLink} from './arrow-button'

const variants = {
  enter: {opacity: 0},
  center: {opacity: 1, zIndex: 1},
  exit: {opacity: 0, zIndex: 0},
}

export const ImgSlider = () => {
  const [[page, direction], setPage] = useState([0, 0])
  const withTitle = false
  const [width, setWidth] = useState(null)

  React.useEffect(() => {
    setWidth(window.innerWidth)

    function handleResize() {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
  const imageIndex = wrap(0, images.length, page)

  const paginate = React.useCallback(
    newDirection => {
      setPage([page + newDirection, newDirection])
    },
    [page],
  )

  React.useEffect(() => {
    const timer = setTimeout(() => {
      paginate(1)
    }, 4000)
    return () => clearTimeout(timer)
  }, [paginate])

  const shouldReduceMotion = useReducedMotion()

  const childVariants = {
    initial: {opacity: 0, y: shouldReduceMotion ? 0 : 25},
    visible: {opacity: 1, y: 0, transition: {duration: 0.5}},
  }

  return (
    <>
      <div className="relative flex h-screen max-w-full content-center items-center justify-center overflow-hidden ">
        <div className="absolute top-0 z-10 h-20 w-screen bg-gradient-to-b from-black to-trasparent" />
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            className="absolute top-0 h-screen max-w-none object-cover"
            key={page}
            src={
              !width
                ? images[imageIndex].src
                : width > 600
                ? images[imageIndex].src
                : imagesMobile[imageIndex].src
            }
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: {type: 'spring', stiffness: 300, damping: 30},
              opacity: {duration: 0.5},
            }}
          />
          {withTitle ? (
            <div className="relative z-20 p-2 md:p-8">
              <div className="flex flex-wrap items-center lg:mx-10vw lg:max-w-7xl">
                <div className="z-2 ml-auto mr-auto w-full px-4 text-center">
                  <motion.div
                    initial="inital"
                    animate="visible"
                    variants={{
                      initial: {opacity: 0},
                      visible: {opacity: 1, transition: {staggerChildren: 0.2}},
                    }}
                    exit="initial"
                    className="bottom-2 flex flex-auto flex-col"
                  >
                    <motion.div
                      initial="initial"
                      animate="visible"
                      variants={childVariants}
                      className="border-2 border-white p-2 lg:p-8"
                    >
                      <H1 variant="white">{images[imageIndex].copy}</H1>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          ) : null}
        </AnimatePresence>
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 1}}
          className="absolute bottom-16 z-10 mx-auto block pt-12 text-white md:bottom-8"
        >
          <ArrowLink
            to="#title"
            direction="down"
            className="rounded-full"
            textColor="white"
          ></ArrowLink>
        </motion.div>
      </div>
      <div
        id="title"
        className="relative flex h-64 max-w-full content-center items-center justify-center overflow-hidden lg:h-80"
      >
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 1}}
          className="relative"
        >
          <H1 className="mx-auto max-w-6xl p-4 text-center">
            {images[imageIndex].copy}
          </H1>
        </motion.div>
      </div>
    </>
  )
}
