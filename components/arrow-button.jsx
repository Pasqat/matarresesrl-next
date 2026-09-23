import * as React from 'react'
import clsx from 'clsx'
import {ArrowIcon} from './icons/arrow-icon'

// Spostamento della freccia su hover/focus, per direzione (solo CSS).
const nudge = {
  down: 'group-hover:translate-y-1 group-focus-visible:translate-y-1',
  up: 'group-hover:-translate-y-1 group-focus-visible:-translate-y-1',
  left: 'group-hover:-translate-x-1 group-focus-visible:-translate-x-1',
  right: 'group-hover:translate-x-1 group-focus-visible:translate-x-1',
  'top-right':
    'group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1',
}

function getBaseProps({textSize, textColor, className}) {
  return {
    className: clsx(
      'group inline-flex items-center font-medium text-left transition cursor-pointer disabled:cursor-not-allowed focus:outline-none',
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
          <svg width="60" height="60" className="-rotate-90">
            <circle stroke="currentColor" strokeWidth="2" fill="transparent" r="28" cx="30" cy="30" />
            <circle
              className={clsx(
                'transition-[stroke-dashoffset] duration-500 ease-out motion-reduce:transition-none',
                !disabled &&
                  'text-accent group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0]',
              )}
              stroke="currentColor"
              strokeWidth="2"
              fill="transparent"
              r="28"
              cx="30"
              cy="30"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={circumference}
            />
          </svg>
        </div>

        <span
          className={clsx(
            'transition-transform duration-200 motion-reduce:transition-none',
            !disabled && nudge[direction],
          )}
        >
          <ArrowIcon direction={direction} disabled={disabled} />
        </span>
      </div>

      {children && (direction === 'left' || direction === 'down') ? (
        <span className="ml-8 text-xl font-medium">{children}</span>
      ) : null}
    </>
  )
}

function ArrowButton({onClick, type, ...props}) {
  return (
    <button onClick={onClick} type={type} {...getBaseProps(props)} disabled={props.disabled}>
      <ArrowButtonContent {...props} />
    </button>
  )
}

function ArrowLink({to, ...props}) {
  if (!to) throw new Error("Must provide either 'to' or 'href' to ArrowLink")
  return (
    <a href={to} {...getBaseProps(props)}>
      <ArrowButtonContent {...props} />
    </a>
  )
}

export {ArrowButton, ArrowLink}
