import clsx from 'clsx'
import Link from 'next/link'
import * as React from 'react'

function getClassName({className}) {
  return clsx(
    'group relative cursor-pointer hover:no-underline inline-flex text-lg font-medium focus:outline-none opacity-100 disabled:opacity-50 transition disabled:pointer-events-none',
    className,
  )
}
// hover:shadow-none bg-gradient-tl-yellow shadow-md text-white rounded text-lg py-2 px-4
function ButtonInner({children, variant, size}) {
  return (
    <>
      <div
        className={clsx(
          'focus-ring absolute inset-0 rounded opacity-100 disabled:opacity-50 transform transition',
          {
            'border-2 group-hover:border-transparent group-focus:border-transparent':
              variant === 'secondary' || variant === 'danger',
            danger: variant === 'danger',
            'bg-inverse': variant === 'primary',
          },
        )}
      />
      <div
        className={clsx(
          'relative flex items-center justify-center w-full h-full whitespace-nowrap',
          {
            'text-primary': variant === 'secondary',
            'bg-gradient-tl-yellow shadow-md text-white rounded text-lg':
              variant === 'primary',
            'text-red-500': variant === 'danger',
            'px-11 py-6 space-x-5': size === 'large',
            'px-4 py-2 space-x-3': size === 'medium',
            'px-2 py-1 space-x-1': size === 'small',
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
  size = 'large',
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
            : 'underline whitespace-nowrap focus:outline-none',
          'text-secondary inline-flex group items-center md:mb-2 lg:mb-0',
        )}
      >
        {children}
        {withArrow && (
          <svg
            className="ml-2 w-4 h-4 animate-bounceX"
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
  {children, variant = 'primary', href, className, size, ...rest},
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
