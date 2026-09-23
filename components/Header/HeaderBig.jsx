import Image from 'next/image'
import {ButtonLink} from '../button'
import background from '../../public/img/homeBackground.webp'

export default function HeaderBig({
  backgroundImgSrc,
  title = '',
  subtitle = '',
  button,
  noButton = false,
  children,
}) {
  return (
    <header
      className={`photo-header ${
        title ? 'photo-header-titled' : 'photo-header-backdrop'
      }`}
    >
      <Image
        src={backgroundImgSrc || background}
        alt="Spazi e attrezzature Matarrese"
        fill
        priority
        sizes="100vw"
      />
      {title && (
        <div className="site-shell photo-header-copy">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
          {!noButton && button && (
            <ButtonLink href={button.link}>{button.text}</ButtonLink>
          )}
          {children}
        </div>
      )}
    </header>
  )
}
