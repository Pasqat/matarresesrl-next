import * as React from 'react'
import Link from 'next/link'
import Image from "next/legacy/image"
import {formatDate} from '../actions/utils/formatDate'
import {H4} from './typography'
import {ClipboardCopyButton} from './clipboard-copy-button'

function ArticleCard({
  isProject,
  article: {slug, title, date, featuredImage},
  domain,
  placeholder,
}) {
  const permalink = isProject
    ? `${domain}/realizzazioni/${slug}`
    : `${domain}/news/${slug}`

  return (
    <div className="relative w-full">
      <Link href={isProject ? `/realizzazioni/${slug}` : `/news/${slug}`}>
        <a className="group peer relative block w-full focus:outline-none">
          {featuredImage ? (
            <div className="focus-ring aspect-w-4 aspect-h-3 rounded-lg lg:aspect-h-5 lg:aspect-w-4">
              <Image
                className="rounded-lg"
                objectFit="cover"
                alt={featuredImage?.node.altText}
                src={featuredImage?.node.mediaItemUrl}
                layout="fill"
                placeholder={placeholder ?? 'empty'}
                blurDataURL={placeholder ? featuredImage.node.sourceUrl : null}
              />
            </div>
          ) : (
            <div className="focus-ring aspect-w-4 aspect-h-3 relative flex w-full items-center justify-center overflow-hidden rounded-lg bg-gradient-to-tl from-red-600 to-yellow-400 text-center lg:aspect-h-5 lg:aspect-w-4">
              <div className="absolute bottom-[30%] z-0 scale-150 select-none font-serif text-4xl font-extrabold leading-tight text-gray-100 opacity-30">
                {title}
              </div>
            </div>
          )}
          {!isProject ? (
            <>
              <div className="mt-8 text-xl font-medium text-gray-500">
                {formatDate(date)}
              </div>
              <H4
                as="div"
                className="mt-4"
                dangerouslySetInnerHTML={{__html: title}}
              />
            </>
          ) : null}
        </a>
      </Link>
      {domain ? (
        <ClipboardCopyButton
          value={permalink}
          className="absolute left-6 top-6 z-10"
        />
      ) : null}
    </div>
  )
}

export {ArticleCard}
