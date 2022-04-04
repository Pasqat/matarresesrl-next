import * as React from 'react'
// import clsx from 'clsx'
import Link from 'next/link'
import {Grid} from '../grid'
import {ArticleCard} from '../article-card'
import {Spacer} from '../spacer'
import {HeaderSection} from './header-section'
import {H4, H3} from '../typography'
import clsx from 'clsx'
import Image from 'next/image'

import projectCta from '../../public/img/progetto_cta.webp'
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
            <Link href="/realizzazioni">
              <a className="group peer relative block w-full focus:outline-none">
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
                <H4
                  as="div"
                  className="mt-4"
                  // dangerouslySetInnerHTML={{__html: title}}
                >
                  Guarda le altre realizzazioni
                </H4>
              </a>
            </Link>
          </div>
        </div>
      </Grid>
      <Spacer size="2xs" />
      <div className="mx-10vw">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-12 text-center md:gap-4 lg:justify-end lg:text-right">
          <H3 as="p" className="col-span-6">
            Hai un progetto da realizzare?
          </H3>
          <FormModal
            title="Ho un progetto da realizzare"
            buttonText="Scrivici"
            className="col-span-6"
            size="medium"
          />
        </div>
      </div>
    </>
  )
}

export {ProjectSection}
