import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import {formatDate} from '../actions/utils/formatDate'
import {H4} from './typography'
import {ClipboardCopyButton} from './clipboard-copy-button'

function ArticleCard({
  article: {slug, title, date = formatDate(date), featuredImage},
}) {
  const permalink = `news/${slug}` // FIXME: this is wrong the permalink shold include the full path

  return (
    <div className="relative w-full">
      <Link href={`/news/${slug}`}>
        <a className="group peer relative block w-full focus:outline-none">
          {featuredImage?.node?.sourceUrl ? (
            <Image
              className="aspect-w-4 aspect-h-3 focus-ring lg:aspect-h-5 lg:aspect-w-4 rounded-lg object-cover object-center"
              // objectFit="cover"
              alt={`Immagine di copertino di ${title}`}
              src={featuredImage?.node.sourceUrl}
              width={410}
              height={510}
              layout="responsive"
            />
          ) : (
            <div className="aspect-w-4 aspect-h-3 lg:aspect-h-5 lg:aspect-w-4 relative flex items-center justify-center w-full text-center bg-gradient-to-tl rounded-lg from-red-600 to-yellow-400 overflow-hidden">
              <div className="bottom-[30%] absolute z-0 text-gray-100 font-serif text-4xl font-extrabold leading-tight opacity-30 select-none transform scale-150">
                {title}
              </div>
            </div>
          )}
          <div className="mt-8 text-gray-500 text-xl font-medium">
            {formatDate(date)}
          </div>
          <H4
            as="div"
            className="mt-4"
            dangerouslySetInnerHTML={{__html: title}}
          />
        </a>
      </Link>
      <ClipboardCopyButton
        value={permalink}
        className="absolute z-10 left-6 top-6"
      />
    </div>
  )
}

export {ArticleCard}
