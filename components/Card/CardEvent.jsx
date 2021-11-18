import Link from 'next/link'
import CoverImage from '../News/CoverImage'

import {H3, H6, Paragraph} from '../typography'
import {Spacer} from '../spacer'
import {formatDate, getDayNumeric} from '../../actions/utils/formatDate'

function truncate(text, length) {
  if (!text || text.length <= length) {
    return text
  }

  return `${text.substr(0, length).trim()}...`
}

export default function CardEvent({event}) {
  const startDate = formatDate(event.startDate)
  const endDate = formatDate(event.endDate)

  return (
    <Link href={`/eventi/${event.slug}`}>
      <a className="focus-ring flex flex-col p-12 pr-16 w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg">
        {event.featuredImage.node.sourceUrl ? (
          <CoverImage
            title={event.title}
            coverImage={event?.featuredImage?.node?.sourceUrl}
            placeholderText={getDayNumeric(startDate)}
          />
        ) : (
          <div className="pb-[50%] relative flex items-center justify-center w-full text-center bg-gradient-to-tl from-red-600 to-yellow-400 overflow-hidden">
            <div className="bottom-[40%] scale-[3.5] md:scale-[5] absolute z-0 text-gray-100 font-serif text-7xl font-extrabold leading-tight opacity-30 select-none transform">
              {getDayNumeric(startDate)}
            </div>
          </div>
        )}
        <Spacer size="3xs" />

        <H3 as="div" className="flex-none">
          {event.title}
        </H3>
        <Spacer size="2xs" />

        <div className="flex-auto">
          {/*
            We do use css line-clamp, this is for the 10% of the browsers that
            don't support that. Don't focus too much at perfection. It's important
            that the truncated string remains longer than the line-clamp, so that
            line-clamp precedes for the 90% supporting that.
          */}
          <Paragraph
            className="line-clamp-3"
            dangerouslySetInnerHTML={{__html: truncate(event.excerpt, 120)}}
          />
        </div>

        <Spacer size="2xs" />

        <H6 as="div" className="flex flex-wrap gap-2 items-center">
          {startDate === endDate ? (
            <p>{startDate}</p>
          ) : (
            <p>
              {startDate} - {endDate}
            </p>
          )}
        </H6>
      </a>
    </Link>
  )
}

// return (
//   <div className="flex flex-col h-full">
//     <div className="mb-4">
//       <div className="flex">
//         <time className="align-baseline mr-2 text-yellow-500 border-b-4 border-yellow-500 uppercase">
//           {getDayOfWeek(startDate)}
//         </time>
//         <div className="text-right text-yellow-500 text-6xl oldstyle-nums leading-none">
//           {getDayNumeric(startDate)}
//         </div>
//       </div>
//       <p className="text-yellow-500">{getHour(startDate)}</p>
//     </div>
//     <div className="h-full bg-white shadow-md overflow-hidden">
//       {coverImage ? (
//         <CoverImage
//           title={title}
//           coverImage={coverImage}
//           slug={slug}
//           href={`/eventi/${slug}`}
//           placeholderText={getDayNumeric(startDate)}
//         />
//       ) : (
//         <div className="pb-[50%] relative flex items-center justify-center w-full text-center bg-gradient-to-tl from-red-600 to-yellow-400 overflow-hidden">
//           <div className="bottom-[40%] scale-[3.5] md:scale-[5] absolute z-0 text-gray-100 font-serif text-7xl font-extrabold leading-tight opacity-30 select-none transform">
//             {getDayNumeric(startDate)}
//           </div>
//         </div>
//       )}
//       <div className="p-6">
//         {venue && (
//           <div className="my-4 text-gray-400 text-xs font-medium tracking-widest">
//             <i className="fas fa-map-marker-alt text-gray-400 text-sm"></i>{' '}
//             {venue?.title}
//           </div>
//         )}
//         <div className="flex flex-col justify-between">
//           <div>
//             <H3 className="mb-3" variant="secondary">
//               <Link href={`/eventi/${slug}`}>
//                 <a
//                   className="hover:underline"
//                   dangerouslySetInnerHTML={{__html: title}}
//                 ></a>
//               </Link>
//             </H3>
//             <LinkButton withArrow href={`/eventi/${slug}`}>
//               Maggiori Informazioni
//             </LinkButton>
//             <div
//               className="mb-3 text-gray-500 leading-tight"
//               dangerouslySetInnerHTML={{
//                 __html:
//                   excerpt?.length > 160
//                     ? excerpt?.substr(0, 160) + '...'
//                     : excerpt,
//               }}
//             ></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// )
