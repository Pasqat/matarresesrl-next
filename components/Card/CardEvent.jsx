import Link from 'next/link';
import { formatDate, getDay } from '../../actions/utils/formatDate';
import Date from '../Date';
import CoverImage from "../News/CoverImage";

/**
  * @param coverImage eg. node.featuredImage?.node
  **/
export default function CardEvent({ title, slug, id, startDate, endDate, excerpt, coverImage }) {
  return (
    <div
      className="h-full overflow-hidden bg-gray-900 rounded-lg "
    >
      {coverImage ? (
        <CoverImage title={title} coverImage={coverImage} slug={slug} href={`/eventi/${id}`} />
      ) : (
        <div className="relative flex items-center justify-center min-h-[10rem] text-center bg-yellow-600 overflow-hidden">
          <div className="leading-tight select-none absolute z-0 text-7xl transform md:scale-[5] scale-[3.5] text-gray-100 opacity-30 font-extrabold font-serif">
            {getDay(startDate)}
          </div>
        </div>
      )}
      <div className="flex flex-col justify-between p-6">
        <div>
          {formatDate(startDate) === formatDate(endDate)
            ? (
              <Date
                className="mb-1 text-xs font-medium tracking-widest text-gray-400 title-font"
                dateString={startDate}
              />
            ) : (
              <>
                <Date
                  className="mb-1 text-xs font-medium tracking-widest text-gray-400 title-font"
                  dateString={startDate}
                />{" - "}
                <Date
                  className="mb-1 text-xs font-medium tracking-widest text-gray-400 title-font"
                  dateString={endDate}
                />
              </>
            )
          }
          <h3 className="mb-3 text-lg font-medium leading-snug text-gray-100 title-font">
            <Link href={`/eventi/${id}`}>
              <a
                className="hover:underline"
                dangerouslySetInnerHTML={{ __html: title }}
              ></a>
            </Link>
          </h3>
          <div
            className="mb-3 leading-relaxed text-gray-300"
            dangerouslySetInnerHTML={{
              __html:
                excerpt?.length > 160 ? excerpt?.substr(0, 160) + "..." : excerpt,
            }}
          ></div>
          <div className="flex flex-wrap items-center">
            <Link href={`/eventi/${id}`}>
              <a className="inline-flex items-center text-yellow-500 md:mb-2 lg:mb-0">
                Maggiori informazioni
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
    </div>
  )
}
