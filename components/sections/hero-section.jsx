import * as React from 'react'
import clsx from 'clsx'
import {motion, useReducedMotion} from 'framer-motion'

import {H2} from '../typography'
import {Grid} from '../grid'
import {LinkButton} from '../button'

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
  const hasImage = Boolean(image ?? imageProps ?? imageBuilder)
  const shouldReduceMotion = useReducedMotion()

  const childVariants = {
    initial: {opacity: 0, y: shouldReduceMotion ? 0 : 25},
    visible: {opacity: 1, y: 0, transition: {duration: 0.5}},
  }

  return (
    <Grid
      as={as}
      className={clsx('lg:min-h-[40rem] lg: mb-24 pt-24 h-auto lg:pb-12', {
        'lg:mb-64': arrowLabel,
        'lg:mb-0': !arrowLabel,
      })}
    >
      {hasImage ? (
        <div
          className={clsx('col-span-full mb-12 lg:mb-0', {
            'lg:col-start-7 lg:col-span-5 px-10': imageSize === 'medium',
            'lg:col-start-6 lg:col-span-6 pl-10 flex items-start justify-end':
              imageSize === 'large',
            'lg:col-start-6 lg:col-span-7 lg:px-0 lg:-mt-24 lg:-mr-5vw flex items-center justify-center':
              imageSize === 'giant',
          })}
        >
          <motion.img
            key={image}
            src={image}
            className={clsx('w-full h-auto object-contain', {
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
          'col-span-full pt-6 lg:flex lg:flex-col lg:col-start-1 lg:row-start-1 lg:h-full',
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
          <motion.div variants={childVariants}>
            <H2 as="h2" variant="accent">
              {title}
            </H2>
          </motion.div>

          {subtitle ? (
            <motion.div variants={childVariants}>
              <H2 as="p" variant="secondary" className="mt-3">
                {subtitle}
              </H2>
            </motion.div>
          ) : null}
          {action ? (
            <motion.div
              variants={childVariants}
              className="flex flex-col mt-14 space-y-4"
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
            <LinkButton href={arrowUrl} withArrow>
              {arrowLabel}
            </LinkButton>
          </motion.div>
        ) : null}
      </div>
    </Grid>
  )
}

export {HeroSection}
