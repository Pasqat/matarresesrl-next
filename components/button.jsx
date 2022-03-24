import clsx from 'clsx'
import Link from 'next/link'
import * as React from 'react'

function getClassName({className}) {
  return clsx(
    'group relative inline-flex no-underline hover:no-underline text-lg font-medium focus:outline-none opacity-100 disabled:opacity-50 cursor-pointer disabled:pointer-events-none transition',
    className,
  )
}

function ButtonInner({children, variant = 'primary', size}) {
  return (
    <>
      <div
        className={clsx(
          'focus-ring absolute inset-0 rounded-full opacity-100 ring-yellow-600 transition disabled:opacity-50',
          {
            'group-hover:border-transparent group-focus:border-transparent border-2':
              variant === 'secondary' || variant === 'danger',
            danger: variant === 'danger',
            'bg-yellow-500': variant === 'primary',
          },
        )}
      />
      <div
        className={clsx(
          'relative flex h-full w-full items-center justify-center whitespace-nowrap',
          {
            'text-primary': variant === 'secondary',
            'rounded-full text-lg text-white shadow-md': variant === 'primary',
            'text-red-500': variant === 'danger',
            'space-x-5 px-20 py-6 text-3xl': size === 'large',
            'space-x-3 px-4 py-2 text-lg': size === 'medium',
            'space-x-1 px-2 py-1': size === 'small',
          },
        )}
      >
        {children}
      </div>
    </>
  )
}

function Button({
  children,
  variant = 'primary',
  size = 'medium',
  className,
  ...buttonProps
}) {
  return (
    <button {...buttonProps} className={getClassName({className})}>
      <ButtonInner variant={variant} size={size}>
        {children}
      </ButtonInner>
    </button>
  )
}

function LinkButton({
  className,
  children,
  withArrow,
  href = '#',
  ...buttonProps
}) {
  return (
    <Link href={href}>
      <a
        {...buttonProps}
        className={clsx(
          className,
          withArrow
            ? 'no-underline'
            : 'underlined whitespace-nowrap focus:outline-none',
          'text-accent group inline-flex items-center md:mb-2 lg:mb-0',
        )}
      >
        {children}
        {withArrow && (
          <svg
            className="ml-2 h-4 w-4 animate-bounceX"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        )}
      </a>
    </Link>
  )
}

const ButtonLink = React.forwardRef(function ButtonLink(
  {children, variant = 'primary', className, size, ...rest},
  ref,
) {
  return (
    <a ref={ref} className={getClassName({className})} {...rest}>
      <ButtonInner variant={variant} size={size}>
        {children}
      </ButtonInner>
    </a>
  )
})

export {Button, LinkButton, ButtonLink}
