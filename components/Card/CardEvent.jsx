import Link from 'next/link';
import { formatDate, getDayNumeric, getDayOfWeek, getHour } from '../../actions/utils/formatDate';
import Date from '../Date';
import CoverImage from "../News/CoverImage";

/**
  * @param coverImage eg. node.featuredImage?.node
  **/
export default function CardEvent({ title, slug, id, startDate, endDate, excerpt, coverImage, venue }) {
  console.log(startDate)
  return (
    <div
      className="h-full overflow-hidden"
    >
      <div className="mb-4">
        <div className="flex">
          <time className="uppercase text-red-400 border-b-4 border-red-400 mr-2 align-baseline ">{getDayOfWeek(startDate)}</time>
          <div className="leading-none text-red-400 text-6xl oldstyle-nums text-right">{getDayNumeric(startDate)}</div>
        </div>
        <p className="text-red-400">{getHour(startDate)}</p>
      </div>
      {coverImage ? (
        <CoverImage title={title} coverImage={coverImage} slug={slug} href={`/eventi/${id}`} />
      ) : (
        <div className="relative flex items-center justify-center min-h-[10rem] text-center bg-red-500 overflow-hidden">
          <div className="leading-tight select-none absolute z-0 text-7xl transform md:scale-[5] scale-[3.5] text-gray-100 opacity-30 font-extrabold font-serif">
            {getDayNumeric(startDate)}
          </div>
        </div>
      )}
      {venue && <div className="mt-2 text-sm font-medium leading-normal text-gray-400 ">
        <i className="text-md text-gray-400 fas fa-map-marker-alt"></i>{" "}
        {venue?.title}
      </div>
      }
      <div className="flex flex-col justify-between ">
        <div>
          <h3 className="mt-4 text-2xl font-medium leading-snug text-gray-600 title-font">
            <Link href={`/eventi/${id}`}>
              <a
                className="hover:underline"
                dangerouslySetInnerHTML={{ __html: title }}
              ></a>
            </Link>
          </h3>
          <Link href={`/eventi/${id}`}>
            <a className="inline-flex items-center text-red-400 mb-3">
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
          <div
            className="mb-3 leading-tight text-gray-400"
            dangerouslySetInnerHTML={{
              __html:
                excerpt?.length > 160 ? excerpt?.substr(0, 160) + "..." : excerpt,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}
