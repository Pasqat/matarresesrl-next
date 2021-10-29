import Link from 'next/link'
import Date from '../Date'

import CoverImage from '../News/CoverImage'
import {H3} from '../typography'
import {LinkButton} from '../button'

export default function CardPost({slug, title, coverImage, date, excerpt}) {
  return (
    <div className="h-full bg-white shadow-md overflow-hidden">
      <CoverImage
        title={title}
        coverImage={coverImage}
        slug={slug}
        href={`/news/${slug}`}
        placeholderText={title}
      />
      <div className="flex flex-col justify-between p-4">
        <div>
          <div className="mb-4">
            <Date
              className="title-font text-gray-400 text-xs font-medium tracking-widest"
              dateString={date}
            />
          </div>
          <Link href={`/news/${slug}`}>
            <a>
              <H3 className="mb-3" variant="secondary">
                {title}
              </H3>
            </a>
          </Link>
          <div
            className="mb-3 text-gray-500 leading-tight"
            dangerouslySetInnerHTML={{
              __html:
                excerpt?.length > 160
                  ? excerpt?.substr(0, 160) + '...'
                  : excerpt,
            }}
          ></div>
          <div className="flex flex-wrap items-center">
            <LinkButton href={`/news/${slug}`} withArrow>
              Continua a leggere
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  )
}
