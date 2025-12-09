import * as React from 'react'
import Image from "next/legacy/image"
import Link from 'next/link'

import {H2} from '../typography'
import {logos} from '../../data/partner-logo'

function LogoSection() {
  return (
    <div className="container mx-auto mb-12 px-4">
      <H2 className="mb-8 text-center" variant="secondary">
        I nostri partner
      </H2>
      <div className="2xl:grid-cols-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {logos.map(logo => {
          return logo.href ? (
            <Link
              key={logo.name}
              href={logo.href}
              className="cursor-pointer text-center hover:drop-shadow-md">

              <Image
                width={180}
                height={95}
                objectFit="contain"
                src={logo.url}
                alt={`${logo.name} logo`}
              />

            </Link>
          ) : (
            <Image
              key={logo.name}
              width={180}
              height={95}
              objectFit="contain"
              src={logo.url}
              alt={`${logo.name} logo`}
              placeholder="blur"
              blurDataURL={logo.url}
            />
          );
        })}
      </div>
    </div>
  );
}

export {LogoSection}
