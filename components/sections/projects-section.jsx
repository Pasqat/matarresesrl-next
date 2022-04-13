import * as React from 'react'
// import clsx from 'clsx'
import Link from 'next/link'
import {Grid} from '../grid'
import {ArticleCard} from '../article-card'
import {Spacer} from '../spacer'
import {HeaderSection} from './header-section'
import {H2, H3} from '../typography'
import clsx from 'clsx'
import Image from 'next/image'

import projectCta from '../../public/img/Piazza-Grande_61.webp'
import FormModal from '../Form/FormModal'

function ProjectSection({
  projects,
  title,
  description,
  showArrobButton = false,
  cta = 'Vedi tutto',
}) {
  return (
    <>
      <HeaderSection
        title={title}
        subTitle={description}
        cta={showArrobButton ? cta : undefined}
        ctaUrl="/contatti"
      />
      <Spacer size="2xs" />
      <Grid className="gap-y-6">
        {projects.slice(0, 2).map((project, idx) => (
          <div
            key={project.slug}
            className={clsx('col-span-4', {'hidden lg:block': idx >= 1})}
          >
            <ArticleCard article={project} isProject placeholder="blur" />
          </div>
        ))}
        {/* NOTE: the cta */}
        <div key="cta" className="col-span-4">
          <div className="relative w-full">
            <div className="absolute z-2 h-full w-full rounded-lg bg-gradient-to-tl from-secondary via-primary to-gray-900 opacity-80" />
            <Link href="/realizzazioni">
              <a className="group peer relative block w-full focus:outline-none">
                <div className="absolute z-2 flex h-full w-full items-center justify-center rounded-lg">
                  <H2
                    variant="white"
                    as="div"
                    className="top-0 z-2 p-4 text-center font-medium text-opacity-100"
                  >
                    Guarda le altre realizzazioni
                  </H2>
                </div>
                <div className="focus-ring aspect-w-4 aspect-h-3 rounded-lg lg:aspect-h-5 lg:aspect-w-4">
                  <Image
                    className="rounded-lg"
                    objectFit="cover"
                    alt="esempio di un progetto realizzato da Matarrese srl"
                    src={projectCta}
                    layout="fill"
                    placeholder="blur"
                  />
                </div>
              </a>
            </Link>
          </div>
        </div>
      </Grid>
      <Spacer size="2xs" />
      <div className="mx-10vw">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-12 text-center md:gap-4">
          <H3 as="p" className="col-span-6">
            Hai un progetto da realizzare?
          </H3>
          <FormModal
            title="Ho un progetto da realizzare"
            buttonText="Scrivici"
            className="col-span-6"
            size="medium"
            withButton
          />
        </div>
      </div>
    </>
  )
}

export {ProjectSection}
