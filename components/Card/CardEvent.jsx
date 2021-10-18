import Link from 'next/link'
import {
  getDayNumeric,
  getDayOfWeek,
  getHour,
} from '../../actions/utils/formatDate'
import CoverImage from '../News/CoverImage'

import {H3} from '../typography'

/**
 * @param coverImage eg. node.featuredImage?.node
 **/
export default function CardEvent({
  title,
  slug,
  id,
  startDate,
  excerpt,
  coverImage,
  venue,
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <div className="flex">
          <time className="align-baseline mr-2 text-yellow-500 border-b-4 border-yellow-500 uppercase">
            {getDayOfWeek(startDate)}
          </time>
          <div className="text-right text-yellow-500 text-6xl oldstyle-nums leading-none">
            {getDayNumeric(startDate)}
          </div>
        </div>
        <p className="text-yellow-500">{getHour(startDate)}</p>
      </div>
      <div className="h-full bg-white shadow-md overflow-hidden">
        {coverImage ? (
          <CoverImage
            title={title}
            coverImage={coverImage}
            slug={slug}
            href={`/eventi/${slug}`}
            placeholderText={getDayNumeric(startDate)}
          />
        ) : (
          <div className="pb-[50%] relative flex items-center justify-center w-full text-center bg-gradient-to-tl from-red-600 to-yellow-400 overflow-hidden">
            <div className="bottom-[40%] scale-[3.5] md:scale-[5] absolute z-0 text-gray-100 font-serif text-7xl font-extrabold leading-tight opacity-30 select-none transform">
              {getDayNumeric(startDate)}
            </div>
          </div>
        )}
        <div className="p-6">
          {venue && (
            <div className="my-4 text-gray-400 text-xs font-medium tracking-widest">
              <i className="fas fa-map-marker-alt text-gray-400 text-sm"></i>{' '}
              {venue?.title}
            </div>
          )}
          <div className="flex flex-col justify-between">
            <div>
              <H3 className="mb-3" variant="secondary">
                <Link href={`/eventi/${slug}`}>
                  <a
                    className="hover:underline"
                    dangerouslySetInnerHTML={{__html: title}}
                  ></a>
                </Link>
              </H3>
              <Link href={`/eventi/${slug}`}>
                <a className="inline-flex items-center mb-3 text-yellow-500">
                  Maggiori informazioni
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
              <div
                className="mb-3 text-gray-500 leading-tight"
                dangerouslySetInnerHTML={{
                  __html:
                    excerpt?.length > 160
                      ? excerpt?.substr(0, 160) + '...'
                      : excerpt,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
