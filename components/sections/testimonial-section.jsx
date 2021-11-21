import * as React from 'react'
import clsx from 'clsx'
import {H2} from '../typography'
import {Grid} from '../grid'
import {ArrowButton} from '../arrow-button'
import IconStar from '../../ui/IconStar'

function TestimonialSection({testimonials, className, nested}) {
  // FIXME: scrolling is bugged after some click
  const [page, setPage] = React.useState(0)

  return (
    <Grid>
      <div className="flex flex-col col-span-full mb-20 space-y-10 lg:flex-row lg:items-end lg:justify-between lg:space-y-0">
        <div className="space-y-2 lg:space-y-0">
          <H2>{`Non prendete per vera solo la nostra parola`}</H2>
          <H2 variant="secondary" as="p">
            {`Cosa dicono i nostri clienti`}
          </H2>
        </div>

        {testimonials.length > 3 ? (
          <div className="col-span-2 col-start-11 items-end justify-end mb-16 space-x-3">
            <ArrowButton direction="left" onClick={() => setPage(page - 1)} />
            <ArrowButton direction="right" onClick={() => setPage(page + 1)} />
          </div>
        ) : null}
      </div>

      {Array.from({
        length: testimonials.length > 3 ? 3 : testimonials.length,
      }).map((_, index) => {
        const testimonialIndex = (page * 3 + index) % testimonials.length
        const testimonial = testimonials[testimonialIndex]
        if (!testimonial) return null
        return (
          <div
            key={testimonialIndex}
            className={clsx(
              'bg-secondary flex flex-col col-span-4 justify-between mb-8 p-16 rounded-lg lg:mb-0',
              {
                'hidden lg:flex': index >= 2,
              },
            )}
          >
            <p className="text-primary mb-14 text-base">
              “{testimonial.content}”
            </p>
            <div className="flex items-center justify-between">
              <div className="flex mr-8 w-16">
                <IconStar number={testimonial.stars} />
              </div>
              <div>
                <p className="text-primary mb-2 text-lg font-medium leading-none">
                  {testimonial.name}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </Grid>
  )
}

export {TestimonialSection}
