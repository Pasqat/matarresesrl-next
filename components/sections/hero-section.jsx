import Image from 'next/image'
import Link from 'next/link'

function HeroSection({
  action,
  title,
  subtitle,
  arrowUrl,
  arrowLabel,
  image,
  imageAlt,
  illustration,
  as: Tag = 'header',
  titleAs: Title = 'h1',
}) {
  return (
    <Tag
      className={`site-shell page-hero ${
        image || illustration ? '' : 'page-hero-text'
      }`}
    >
      <div className="page-hero-copy">
        {subtitle && <p className="page-intro">{subtitle}</p>}
        <Title>{title}</Title>
        {action && <div className="page-hero-action">{action}</div>}
        {arrowUrl && (
          <Link className="text-link" href={arrowUrl}>
            {arrowLabel || 'Scopri di più'}
          </Link>
        )}
      </div>
      {image ? (
        <div className="page-hero-image">
          <Image
            src={image}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
            alt={imageAlt || title || ''}
          />
        </div>
      ) : illustration ? (
        <div className="page-hero-image">{illustration}</div>
      ) : null}
    </Tag>
  )
}
export {HeroSection}
