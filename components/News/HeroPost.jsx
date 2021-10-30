import Link from 'next/link'

import CoverImage from './CoverImage'
import Date from '../Date'
import {H3} from '../typography'

export default function HeroPost({title, coverImage, slug, date, excerpt}) {
  return (
    <div className="flex flex-col items-center my-12 h-full overflow-hidden lg:flex-row">
      <CoverImage
        title={title}
        coverImage={coverImage}
        slug={slug}
        href={`/news/${slug}`}
        className="flex-1 bg-gradient-tl-yellow bg-opacity-70"
      />
      <div className="flex flex-col p-4 lg:p-8">
        <div className="flex flex-col md:flex-col-reverse lg:flex-col">
          <div className="mb-4">
            <Date
              className="title-font text-gray-400 text-xs font-medium tracking-widest lg:text-lg"
              dateString={date}
            />
          </div>
          <H3 className="mb-3" variant="secondary">
            <Link href={`/news/${slug}`}>
              <a
                className="hover:underline"
                dangerouslySetInnerHTML={{__html: title}}
              />
            </Link>
          </H3>
        </div>
        <div>
          <div
            className="mb-3 leading-tight lg:text-lg lg:leading-relaxed"
            dangerouslySetInnerHTML={{__html: excerpt}}
          />
        </div>
        <div className="flex flex-wrap items-center lg:hidden">
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
  )
}
