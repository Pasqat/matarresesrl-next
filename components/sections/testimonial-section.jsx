import * as React from 'react'
import clsx from 'clsx'
import {H2} from '../typography'
import {Grid} from '../grid'
import {ArrowButton} from '../arrow-button'
import IconStar from '../icons/star-icon'

// function TestimonialSection({testimonials, className, nested}) {
function TestimonialSection({testimonials, className, nested}) {
  // FIXME: scrolling is bugged after some click
  const [page, setPage] = React.useState(0)

  return (
    <Grid className={className} nested={nested}>
      <div className="col-span-full mb-20 flex flex-col space-y-10 lg:flex-row lg:items-end lg:justify-between lg:space-y-0">
        <div className="space-y-2 lg:space-y-0">
          {/* <H2>{`Non prendete per vera solo la nostra parola`}</H2> */}
          {/* <H2 variant="secondary" as="p"> */}
          {/*   {`Cosa dicono i nostri clienti`} */}
          {/* </H2> */}
          <H2>{`Cosa dicono i nostri clienti`}</H2>
        </div>

        {testimonials.length > 3 ? (
          <div className="col-span-2 col-start-11 mb-16 items-end justify-end space-x-3">
            <ArrowButton direction="left" onClick={() => setPage(p => p - 1)} />
            <ArrowButton
              direction="right"
              onClick={() => setPage(p => p + 1)}
            />
          </div>
        ) : null}
      </div>

      {Array.from({
        length: testimonials.length > 3 ? 3 : testimonials.length,
      }).map((_, index) => {
        const testimonialIndex = (page * 3 + index) % testimonials.length
        const testimonial = testimonials[Math.abs(testimonialIndex)]
        console.log('index', index)
        console.log('testimonialIndex', testimonialIndex)
        console.log('testimonial', testimonial)

        if (!testimonial) return null
        return (
          <div
            key={testimonialIndex}
            className={clsx(
              'bg-secondary col-span-4 mb-8 flex flex-col justify-between rounded-lg p-16 lg:mb-0',
              {
                'hidden lg:flex': index >= 2,
              },
            )}
          >
            <p className="text-primary mb-14 text-lg">
              “{testimonial.content}”
            </p>
            <div className="flex items-center justify-between">
              <div className="mr-8 flex w-16">
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
