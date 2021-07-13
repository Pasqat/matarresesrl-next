import Link from "next/link";
import Date from "../Date";

import CoverImage from "../Post/CoverImage";

export default function CardPost({ slug, title, coverImage, date, excerpt }) {
  return (
    <div
      className="h-full overflow-hidden bg-white border-2 border-gray-200 rounded-lg border-opacity-60 hover:shadow-lg"
      key={slug}
    >
      <CoverImage title={title} coverImage={coverImage} slug={slug} />
      <div className="flex flex-col justify-between p-6">
        <div>
          <Date
            className="mb-1 text-xs font-medium tracking-widest text-gray-400 title-font"
            dateString={date}
          />
          <h3 className="mb-3 text-lg font-medium leading-snug text-gray-900 title-font">
            <Link href={`/news/${slug}`}>
              <a
                className="hover:underline"
                dangerouslySetInnerHTML={{ __html: title }}
              ></a>
            </Link>
          </h3>
          <div
            className="mb-3 leading-relaxed"
            dangerouslySetInnerHTML={{
              __html:
                excerpt.length > 160 ? excerpt.substr(0, 160) + "..." : excerpt,
            }}
          ></div>
          <div className="flex flex-wrap items-center">
            <Link href={`/news/${slug}`}>
              <a className="inline-flex items-center text-yellow-500 md:mb-2 lg:mb-0">
                Continua a leggere
                <svg
                  className="w-4 h-4 ml-2"
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
  );
}
