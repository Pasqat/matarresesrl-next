import Link from "next/link"

import CoverImage from "./CoverImage"
import Date from "../Date"


export default function HeroPost({ title, coverImage, slug, date, excerpt }) {
  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden bg-white lg:bg-transparent shadow-md lg:shadow-none">
      <CoverImage title={title} coverImage={coverImage} slug={slug} href={`/news/${slug}`} className="flex-1 bg-red-800" />
      <div className="flex flex-col p-4 lg:p-8 ">
        <div className="flex flex-col md:flex-col-reverse lg:flex-col">
          <div className="mb-4">
            <Date className="text-xs lg:text-lg font-medium tracking-widest text-gray-400 title-font " dateString={date} />
          </div>
          <h3 className="mb-3 lg:mb-4 text-xl lg:text-3xl font-bold leading-none text-gray-600">
            <Link href={`/news/${slug}`}>
              <a
                className="hover:underline"
                dangerouslySetInnerHTML={{ __html: title }}
              />
            </Link>
          </h3>
        </div>
        <div>
          <div
            className="mb-3 lg:text-lg leading-tight lg:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        </div>
        <div className="flex flex-wrap items-center lg:hidden">
          <Link href={`/news/${slug}`}>
            <a className="inline-flex items-center text-yellow-500 md:mb-2 lg:mb-0">
              Continua a leggere
              <svg
                className="w-4 h-4 ml-2 animate-bounceX"
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
