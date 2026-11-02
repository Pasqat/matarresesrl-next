// CTA grande fiamma con la freccia in un cerchio che ruota al passaggio (DESIGN.md).
// Con `href` è un link; senza, un <button>.
import Link from 'next/link'
import clsx from 'clsx'

export function Freccia() {
  return (
    <span className="cin-btn__freccia" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M1 7h12M8 2l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

export default function BottoneFreccia({href, children, className, ...props}) {
  const cls = clsx('cin-btn', className)
  const body = (
    <>
      {children}
      <Freccia />
    </>
  )
  if (!href) {
    return (
      <button type="button" {...props} className={cls}>
        {body}
      </button>
    )
  }
  // Ancore e telefono: niente router.
  if (href.startsWith('#') || href.startsWith('tel:')) {
    return (
      <a href={href} {...props} className={cls}>
        {body}
      </a>
    )
  }
  return (
    <Link href={href} {...props} className={cls}>
      {body}
    </Link>
  )
}
