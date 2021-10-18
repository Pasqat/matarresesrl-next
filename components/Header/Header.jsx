import clsx from 'clsx'
import Link from 'next/link'

import {H2} from '../typography'

export default function Header({
  children,
  href,
  className,
  textVariant = 'secondary',
}) {
  return href ? (
    <H2 variant={textVariant} className={clsx('py-10', className)}>
      <Link href={href}>
        <a className="hover:underline">{children}</a>
      </Link>
      .
    </H2>
  ) : (
    <H2 variant={textVariant} className={clsx('py-10', className)}>
      {children}
    </H2>
  )
}
