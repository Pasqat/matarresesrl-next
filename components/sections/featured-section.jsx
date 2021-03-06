import * as React from 'react'
// import clsx from 'clsx'
// import Image from 'next/image'

import {Grid} from '../grid'
import {H2, H6} from '../typography'
import {ArrowLink} from '../arrow-button'
import {ClipboardCopyButton} from '../clipboard-copy-button'

import {BlurringImage} from '../blurringImage.jsx'

function FeaturedSection({
  slug,
  href,
  caption = 'In Evidenza',
  cta = 'Leggi tutto',
  imageAlt = '',
  // imageUrl,
  img,
  svg,
  title = 'Post senza titolo',
  subTitle,
  permalink,
}) {
  return (
    <div className="w-full px-8 lg:px-0">
      <div className="rounded-lg bg-gray-100 lg:bg-trasparent">
        <Grid className="group rounded-lg pb-6 pt-14 md:pb-12 lg:bg-gray-100">
          <div className="col-span-full lg:col-span-5 lg:col-start-2 lg:flex lg:flex-col lg:justify-between">
            <div>
              <H6 as="h2">{caption}</H6>
              <H2
                as="h3"
                className="mt-12"
                dangerouslySetInnerHTML={{__html: title}}
              />
              <div
                className="mt-6 text-xl font-medium text-gray-500"
                dangerouslySetInnerHTML={{__html: subTitle}}
              />

              <div className="mt-12 flex items-center justify-between">
                <ArrowLink to={slug ?? href ?? '/'}>
                  {cta}
                  <div className="focus-ring absolute inset-0 left-0 right-0 z-10 rounded-lg md:-left-12 md:-right-12 lg:left-0 lg:right-0" />
                </ArrowLink>
              </div>
            </div>
          </div>
          <div className="relative col-span-full mt-12 lg:col-span-4 lg:col-start-8">
            <div className="aspect-w-4 aspect-h-3 rounded-lg lg:aspect-h-5 lg:aspect-w-4">
              <BlurringImage
                img={img}
                svg={svg}
                className="rounded-lg"
                objectFit="cover"
                alt={imageAlt}
                // src={imageUrl}
                layout="fill"
              />
            </div>
            {permalink ? (
              <ClipboardCopyButton
                className="absolute left-6 top-6 z-20"
                value={permalink}
              />
            ) : null}
          </div>
        </Grid>
      </div>
    </div>
  )
}

export {FeaturedSection}
