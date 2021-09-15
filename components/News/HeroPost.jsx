import Link from "next/link"

import CoverImage from "./CoverImage"
import Date from "../Date"


export default function HeroPost({ title, coverImage, slug, date, excerpt }) {
  return (
    <div className="flex flex-col lg:flex-row pt-4 pb-12 px-4">
      <div className="mb-8">
        <CoverImage title={title} coverImage={coverImage} slug={slug} href={`/news/${slug}`} />
      </div>
      <div className="flex flex-col md:flex-row lg:flex-col lg:ml-8">
        <div className="flex flex-col md:flex-col-reverse lg:flex-col">
          <div className="mb-4 md:mb-0 text-lg font-medium text-gray-400">
            <Date dateString={date} />
          </div>
          <h3 className="mb-4 text-4xl lg:text-6xl font-bold leading-none text-gray-600">
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
            className="text-lg leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          />
        </div>
      </div>
    </div>
  )
}
