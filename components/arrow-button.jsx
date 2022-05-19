import * as React from 'react'
import clsx from 'clsx'
import {motion, useReducedMotion} from 'framer-motion'
import {ArrowIcon} from './icons/arrow-icon'
import {useElementState} from './hooks/use-element-state'

const arrowVariants = {
  down: {
    initial: {y: 0},
    hover: {y: 4},
    focus: {
      y: [0, 4, 0],
      transition: {repeat: Infinity},
    },
    active: {y: 12},
  },
  up: {
    initial: {y: 0},
    hover: {y: -4},
    focus: {
      y: [0, -4, 0],
      transition: {repeat: Infinity},
    },
    active: {y: -12},
  },
  left: {
    initial: {x: 0},
    hover: {x: -4},
    focus: {
      x: [0, -4, 0],
      transition: {repeat: Infinity},
    },
    active: {x: -12},
  },
  right: {
    initial: {x: 0},
    hover: {x: 4},
    focus: {
      x: [0, 4, 0],
      transition: {repeat: Infinity},
    },
    active: {x: 12},
  },
  'top-right': {
    initial: {x: 0, y: 0},
    hover: {x: 4, y: -4},
    focus: {
      x: [0, 4, 0],
      y: [0, -4, 0],
      transition: {repeat: Infinity},
    },
    active: {x: 12, y: -12},
  },
}

// whileFocus takes precedence over whileTap, so while we can't move the arrow
// on focus (or on tap), we can still color and animate the circle.
// See: https://github.com/framer/motion/issues/1221
function getBaseProps({textSize, textColor, className}) {
  return {
    className: clsx(
      'inline-flex items-center font-medium text-left transition cursor-pointer disabled:cursor-not-allowed focus:outline-none ',
      {
        'text-xl': textSize === 'medium',
        'text-lg': textSize === 'small',
      },
      textColor === 'white' ? 'text-white' : 'text-primary',
      className,
    ),
  }
}

function ArrowButtonContent({children, direction = 'right', disabled}) {
  const circumference = 28 * 2 * Math.PI
  const strokeDasharray = `${circumference} ${circumference}`
  const shouldReduceMotion = useReducedMotion()

  return (
    <>
      {children &&
      (direction === 'right' ||
        direction === 'up' ||
        direction === 'top-right') ? (
        <span className="mr-8 text-xl font-medium">{children}</span>
      ) : null}

      <div className="relative inline-flex h-14 w-14 flex-none items-center justify-center p-1">
        <div className="absolute text-gray-200">
          <svg width="60" height="60">
            <circle
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              r="28"
              cx="30"
              cy="30"
            />

            <motion.circle
              className={clsx({'text-accent': !disabled})}
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              r="28"
              cx="30"
              cy="30"
              style={{strokeDasharray, rotate: -90}}
              variants={{
                initial: {strokeDashoffset: circumference},
                hover: {strokeDashoffset: 0},
                focus: {strokeDashoffset: 0},
                active: {strokeDashoffset: 0},
              }}
              transition={{
                damping: 0,
                ...(shouldReduceMotion ? {duration: 0} : null),
              }}
            />
          </svg>
        </div>

        <motion.span
          transition={shouldReduceMotion ? {duration: 0} : {}}
          variants={
            shouldReduceMotion ? {} : !disabled && arrowVariants[direction]
          }
        >
          <ArrowIcon direction={direction} disabled={disabled} />
        </motion.span>
      </div>

      {children && (direction === 'left' || direction === 'down') ? (
        <span className="ml-8 text-xl font-medium">{children}</span>
      ) : null}
    </>
  )
}

function ArrowButton({onClick, type, ...props}) {
  const [ref, state] = useElementState()
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.button
      onClick={onClick}
      type={type}
      {...getBaseProps(props)}
      ref={ref}
      animate={!props.disabled && state}
      transition={shouldReduceMotion ? {duration: 0} : {}}
      disabled={props.disabled}
    >
      <ArrowButtonContent {...props} />
    </motion.button>
  )
}

// const MotionLink = motion(Link)

function ArrowLink({to, ...props}) {
  const [ref, state] = useElementState()
  const shouldReduceMotion = useReducedMotion()

  if (to) {
    return (
      <motion.a
        href={to}
        {...getBaseProps(props)}
        ref={ref}
        animate={state}
        transition={shouldReduceMotion ? {duration: 0} : {}}
      >
        <ArrowButtonContent {...props} />
      </motion.a>
    )
  }
  throw new Error("Must provide either 'to' or 'href' to ArrowLink")
}

export {ArrowButton, ArrowLink}
