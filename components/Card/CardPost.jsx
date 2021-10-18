import Link from 'next/link'
import Date from '../Date'

import CoverImage from '../News/CoverImage'
import {H3} from '../typography'

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
            <Link href={`/news/${slug}`}>
              <a className="inline-flex items-center text-yellow-500 md:mb-2 lg:mb-0">
                Continua a leggere
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
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
