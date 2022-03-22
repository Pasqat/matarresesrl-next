import * as React from 'react'
import clsx from 'clsx'
import {motion, useReducedMotion} from 'framer-motion'

import {H2} from '../typography'
import {Grid} from '../grid'
import {ArrowLink} from '../arrow-button'

function HeroSection({
  action,
  title,
  subtitle,
  arrowUrl,
  arrowLabel,
  image,
  // imageProps,
  // imageBuilder,
  imageSize = 'medium',
  as = 'header',
}) {
  const hasImage = Boolean(image)
  const shouldReduceMotion = useReducedMotion()

  const childVariants = {
    initial: {opacity: 0, y: shouldReduceMotion ? 0 : 25},
    visible: {opacity: 1, y: 0, transition: {duration: 0.5}},
  }

  return (
    <Grid
      as={as}
      className={clsx('lg: mb-24 h-auto pt-24 lg:min-h-[40rem] lg:pb-12', {
        'lg:mb-64': arrowLabel,
        'lg:mb-0': !arrowLabel,
      })}
    >
      {hasImage ? (
        <div
          className={clsx('col-span-full mb-12 lg:mb-0', {
            'px-10 lg:col-span-5 lg:col-start-7': imageSize === 'medium',
            'flex items-start justify-end pl-10 lg:col-span-6 lg:col-start-6':
              imageSize === 'large',
            'flex items-center justify-center lg:col-span-7 lg:col-start-6 lg:-mt-24 lg:-mr-5vw lg:px-0':
              imageSize === 'giant',
          })}
        >
          <motion.img
            key={image}
            src={image}
            className={clsx('h-auto w-full object-contain', {
              'max-h-50vh': imageSize === 'medium',
              'max-h-75vh': imageSize === 'giant',
            })}
            initial={{scale: shouldReduceMotion ? 1 : 1.5, opacity: 0}}
            animate={{scale: 1, opacity: 1}}
            transition={{duration: 0.75}}
          />
        </div>
      ) : null}

      <div
        className={clsx(
          'col-span-full pt-6 lg:col-start-1 lg:row-start-1 lg:flex lg:h-full lg:flex-col',
          {
            'lg:col-span-5': hasImage,
            'lg:col-span-7': !hasImage,
          },
        )}
      >
        <motion.div
          className="flex flex-auto flex-col"
          initial="initial"
          animate="visible"
          variants={{
            initial: {opacity: 0},
            visible: {opacity: 1, transition: {staggerChildren: 0.2}},
          }}
        >
          {subtitle ? (
            <motion.div variants={childVariants}>
              <H2 as="p" variant="accent" className="mt-3">
                {subtitle}
              </H2>
            </motion.div>
          ) : null}

          <motion.div variants={childVariants}>
            {/* <H2 as="h2" variant="accent"> */}
            <H2 as="h2">{title}</H2>
          </motion.div>

          {action ? (
            <motion.div
              variants={childVariants}
              className="mt-14 flex flex-col space-y-4"
            >
              {action}
            </motion.div>
          ) : null}
        </motion.div>
        {arrowUrl ? (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 1}}
            className="hidden pt-12 lg:block"
          >
            <ArrowLink to={arrowUrl} direction="down" textSize="small">
              {arrowLabel}
            </ArrowLink>
          </motion.div>
        ) : null}
      </div>
    </Grid>
  )
}

export {HeroSection}
