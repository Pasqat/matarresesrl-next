import Link from "next/link";
import Date from "../Date";

import CoverImage from "../News/CoverImage";

export default function CardPost({ slug, title, coverImage, date, excerpt }) {
  return (
    <Link href={`/news/${slug}`}>
      <a className="inline-flex items-center text-yellow-500 md:mb-2 lg:mb-0">
        <div
          className="h-full overflow-hidden p-4"
        // className="h-full overflow-hidden bg-white border-2 border-gray-200 rounded-lg border-opacity-60 hover:shadow-lg"
        >
          <CoverImage title={title} coverImage={coverImage} slug={slug} href={`/news/${slug}`} placeholderText={title} />
          <div className="flex flex-col justify-between">
            <div>
              <div className="my-4">
                <Date
                  className="text-xs font-medium tracking-widest text-gray-400 title-font"
                  dateString={date}
                />
              </div>
              <h3 className="mb-3 text-xl font-bold leading-snug text-gray-600 title-font" dangerouslySetInnerHTML={{ __html: title }} />
              <div
                className="mb-3 leading-tight text-gray-500"
                dangerouslySetInnerHTML={{
                  __html:
                    excerpt?.length > 160 ? excerpt?.substr(0, 160) + "..." : excerpt,
                }}
              ></div>
              <div className="flex flex-wrap items-center">
                {/* <Link href={`/news/${slug}`}> */}
                {/*   <a className="inline-flex items-center text-yellow-500 md:mb-2 lg:mb-0"> */}
                {/*     Continua a leggere */}
                {/*     <svg */}
                {/*       className="w-4 h-4 ml-2 animate-bounceX" */}
                {/*       viewBox="0 0 24 24" */}
                {/*       stroke="currentColor" */}
                {/*       strokeWidth="2" */}
                {/*       fill="none" */}
                {/*       strokeLinecap="round" */}
                {/*       strokeLinejoin="round" */}
                {/*     > */}
                {/*       <path d="M5 12h14"></path> */}
                {/*       <path d="M12 5l7 7-7 7"></path> */}
                {/*     </svg> */}
                {/*   </a> */}
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
