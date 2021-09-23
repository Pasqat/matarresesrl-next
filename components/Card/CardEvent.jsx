import Link from 'next/link';
import { getDayNumeric, getDayOfWeek, getHour } from '../../actions/utils/formatDate';
import CoverImage from "../News/CoverImage";

/**
  * @param coverImage eg. node.featuredImage?.node
  **/
export default function CardEvent({ title, slug, id, startDate, excerpt, coverImage, venue }) {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <div className="flex">
          <time className="uppercase text-yellow-500 border-b-4 border-yellow-500 mr-2 align-baseline ">
            {getDayOfWeek(startDate)}
          </time>
          <div className="leading-none text-yellow-500 text-6xl oldstyle-nums text-right">
            {getDayNumeric(startDate)}
          </div>
        </div>
        <p className="text-yellow-500">{getHour(startDate)}</p>
      </div>
      <div className="h-full overflow-hidden bg-white shadow-md">
        {coverImage ? (
          <CoverImage title={title} coverImage={coverImage} slug={slug} href={`/eventi/${id}`} placeholderText={getDayNumeric(startDate)} />
        ) : (
          <div className="relative flex items-center justify-center w-full pb-[50%] text-center bg-gradient-to-tl from-red-600 to-yellow-400 overflow-hidden">
            <div className="leading-tight bottom-[40%] select-none absolute z-0 text-7xl transform md:scale-[5] scale-[3.5] text-gray-100 opacity-30 font-extrabold font-serif">
              {getDayNumeric(startDate)}
            </div>
          </div>
        )}
        <div className="p-6">
          {venue && <div className="my-4 text-xs font-medium tracking-widest text-gray-400 ">
            <i className="text-sm text-gray-400 fas fa-map-marker-alt"></i>{" "}
            {venue?.title}
          </div>
          }
          <div className="flex flex-col justify-between ">
            <div>
              <h3 className="mb-3 text-2xl font-bold leading-snug text-gray-600 title-font">
                <Link href={`/eventi/${id}`}>
                  <a
                    className="hover:underline"
                    dangerouslySetInnerHTML={{ __html: title }}
                  ></a>
                </Link>
              </h3>
              <Link href={`/eventi/${id}`}>
                <a className="inline-flex items-center text-yellow-500 mb-3">
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
                className="mb-3 leading-tight text-gray-500"
                dangerouslySetInnerHTML={{
                  __html:
                    excerpt?.length > 160 ? excerpt?.substr(0, 160) + "..." : excerpt,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
