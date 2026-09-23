import Link from 'next/link'
import Image from 'next/image'
import {formatDate} from '../actions/utils/formatDate'
import {ClipboardCopyButton} from './clipboard-copy-button'
function ArticleCard({
  isProject,
  article: {slug, title, date, featuredImage},
  domain,
}) {
  const href = `/${isProject ? 'realizzazioni' : 'news'}/${slug}`
  const image =
    featuredImage?.node?.mediaItemUrl || featuredImage?.node?.sourceUrl
  return (
    <article className={`editorial-card ${isProject ? 'project-card' : ''}`}>
      <Link href={href}>
        <div className="editorial-card-image">
          {image ? (
            <Image
              src={image}
              alt={featuredImage.node.altText || title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <span className="image-fallback">Matarrese</span>
          )}
        </div>
        {!isProject && date && (
          <p className="editorial-card-date">{formatDate(date)}</p>
        )}
        <h3 dangerouslySetInnerHTML={{__html: title}} />
      </Link>
      {domain && (
        <ClipboardCopyButton
          value={`${domain}${href}`}
          className="editorial-copy"
        />
      )}
    </article>
  )
}
export {ArticleCard}
