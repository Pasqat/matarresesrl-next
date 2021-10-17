import React, {useState, useEffect, useCallback} from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {useRecursiveTimeout} from './useRecursiveTimeout'
// import { mediaByIndex } from "../media";
import slides from '../../data/testimonials'
import IconStar from '../../ui/IconStar'

const AUTOPLAY_INTERVAL = 4000

export const PrevButton = ({enabled, onClick}) => (
  <button
    className="embla__button embla__button--prev absolute z-2 -left-4 top-1/2 items-center justify-center p-2 w-8 h-8 bg-transparent bg-gradient-to-tl border-0 rounded outline-none shadow-md hover:shadow-sm from-red-400 to-yellow-500 cursor-pointer -translate-y-1/2 md:-left-20"
    onClick={onClick}
    disabled={!enabled}
  >
    <svg
      className="embla__button__svg w-full h-full text-gray-100 fill-current"
      viewBox="137.718 -1.001 366.563 644"
    >
      <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
    </svg>
  </button>
)

export const NextButton = ({enabled, onClick}) => (
  <button
    className="embla__button embla__button--next absolute z-2 -right-4 top-1/2 items-center justify-center p-2 w-8 h-8 bg-gradient-to-br border-0 rounded outline-none shadow-md hover:shadow-sm from-red-400 to-yellow-500 cursor-pointer -translate-y-1/2 md:-right-20"
    onClick={onClick}
    disabled={!enabled}
  >
    <svg
      className="embla__button__svg w-full h-full text-gray-100 fill-current"
      viewBox="0 0 238.003 238.003"
    >
      <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
    </svg>
  </button>
)

const EmblaCarousel = () => {
  const [viewportRef, embla] = useEmblaCarousel({
    // slidesToScroll: 3,
    loop: true,
    skipSnaps: false,
  })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const autopaly = useCallback(() => {
    if (!embla) return
    if (embla.canScrollNext()) {
      embla.scrollNext()
    } else {
      embla.scrollTo(0)
    }
  }, [embla])

  const {play, stop} = useRecursiveTimeout(autopaly, AUTOPLAY_INTERVAL)

  const scrollPrev = useCallback(() => {
    if (!embla) return
    embla.scrollPrev()
    stop()
  }, [embla, stop])

  const scrollNext = useCallback(() => {
    if (!embla) return
    embla.scrollNext()
    stop()
  }, [embla, stop])

  const onSelect = useCallback(() => {
    if (!embla) return
    setPrevBtnEnabled(embla.canScrollPrev())
    setNextBtnEnabled(embla.canScrollNext())
  }, [embla])

  useEffect(() => {
    if (!embla) return
    onSelect()
    embla.on('select', onSelect)
    embla.on('pointerDown', stop)
  }, [embla, onSelect, stop])

  useEffect(() => {
    play()
  }, [play])

  return (
    <div className="embla relative ml-auto mr-auto p-12 w-full rounded-xl shadow-medium md:p-16 md:w-5/6">
      <div className="embla__viewport w-full overflow-hidden" ref={viewportRef}>
        <div className="embla__container flex -ml-3 select-none">
          {slides.map((slide, index) => (
            <div className="embla__slide relative pl-3 min-w-full" key={index}>
              {/* <div className="relative h-48 embla__slide__inner"> */}
              <blockquote className="text-right text-gray-700 text-xl italic tracking-wider md:text-3xl lg:px-10 lg:text-4xl">
                &ldquo;{slide.content}&rdquo;
              </blockquote>
              <div className="flex flex-col-reverse items-end justify-center pt-5 md:flex-row md:items-center md:justify-end lg:pr-12">
                <h6 className="text-md align-top pt-3 text-gray-600 font-semibold md:pr-3 md:pt-0">
                  {slide.name}
                </h6>
                <div className="flex">
                  <IconStar number={slide.stars} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </div>
  )
}

export default EmblaCarousel
