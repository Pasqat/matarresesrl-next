import Link from 'next/link'
import clsx from 'clsx'
export default function Header({children, href, className}) {
  return (
    <header className={clsx('section-heading', className)}>
      <h1>{href ? <Link href={href}>{children}</Link> : children}</h1>
    </header>
  )
}
