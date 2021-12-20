import Link from 'next/link'
// import CoverImage from '../News/CoverImage'

import {H3, H6, Paragraph} from '../typography'
import {Spacer} from '../spacer'
import {formatDate} from '../../actions/utils/formatDate'

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
      <a className="focus-ring flex flex-col p-12 pr-16 w-full h-full bg-gray-100 rounded-lg">
        {/* {event.featuredImage ? ( */}
        {/*   <CoverImage */}
        {/*     title={event.title} */}
        {/*     coverImage={event?.featuredImage?.node?.sourceUrl} */}
        {/*     placeholderText={getDayNumeric(startDate)} */}
        {/*   /> */}
        {/* ) : ( */}
        {/*   <div className="pb-[50%] relative flex items-center justify-center w-full text-center bg-gradient-to-tl from-red-600 to-yellow-400 overflow-hidden"> */}
        {/*     <div className="bottom-[40%] scale-[3.5] md:scale-[5] absolute z-0 text-gray-100 font-serif text-7xl font-extrabold leading-tight opacity-30 select-none "> */}
        {/*       {getDayNumeric(startDate)} */}
        {/*     </div> */}
        {/*   </div> */}
        {/* )} */}
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
            dangerouslySetInnerHTML={{__html: truncate(event.content, 120)}}
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
