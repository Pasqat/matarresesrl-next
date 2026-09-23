import Image from 'next/image'
import Link from 'next/link'
function FeaturedSection({
  slug,
  href,
  caption = 'In evidenza',
  cta = 'Leggi tutto',
  imageAlt,
  impageAlt,
  imageUrl,
  img,
  title = '',
  titleAs: Title = 'h2',
  subTitle,
  excerpt,
  priority = false,
}) {
  const source = imageUrl || img?.src || img?.mediaItemUrl
  const link = slug ? (slug.startsWith('/') ? slug : '/' + slug) : href || '/'
  return (
    <section className="site-shell editorial-feature">
      <div className="editorial-feature-copy">
        <p className="page-intro">{caption}</p>
        <Title dangerouslySetInnerHTML={{__html: title}} />
        {subTitle && <p dangerouslySetInnerHTML={{__html: subTitle}} />}
        {excerpt && (
          <div
            className="feature-excerpt"
            dangerouslySetInnerHTML={{__html: excerpt}}
          />
        )}
        <Link className="text-link" href={link}>
          {cta}
        </Link>
      </div>
      <Link className="editorial-feature-image" href={link} aria-label={title}>
        {source ? (
          <Image
            src={source}
            alt={imageAlt || impageAlt || title}
            fill
            priority={priority}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        ) : (
          <span className="image-fallback">Matarrese</span>
        )}
      </Link>
    </section>
  )
}
export {FeaturedSection}
