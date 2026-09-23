import clsx from 'clsx'
import Link from 'next/link'
import {forwardRef} from 'react'

function buttonClass(variant, size, className) {
  return clsx(
    'site-button',
    variant === 'secondary' && 'site-button-outline',
    variant === 'danger' && 'site-button-danger',
    size === 'small' && 'site-button-small',
    size === 'large' && 'site-button-large',
    className,
  )
}
function Button({
  children,
  variant = 'primary',
  size = 'medium',
  className,
  ...props
}) {
  return (
    <button className={buttonClass(variant, size, className)} {...props}>
      {children}
    </button>
  )
}
const ButtonLink = forwardRef(function ButtonLink(
  {children, variant = 'primary', size = 'medium', className, href, ...props},
  ref,
) {
  return (
    <Link
      ref={ref}
      href={href}
      className={buttonClass(variant, size, className)}
      {...props}
    >
      {children}
    </Link>
  )
})
function LinkButton({
  children,
  className,
  href = '#',
  withArrow,
  variant,
  ...props
}) {
  return (
    <Link href={href} className={clsx('text-link', className)} {...props}>
      {children}
    </Link>
  )
}
export {Button, ButtonLink, LinkButton}
