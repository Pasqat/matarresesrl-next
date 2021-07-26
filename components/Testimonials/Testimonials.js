import React, { useState, useEffect, useCallback } from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import { useRecursiveTimeout } from "./useRecursiveTimeout";
// import { mediaByIndex } from "../media";
import slides from "../../data/testimonials";
import IconStar from "../../ui/IconStar";

const AUTOPLAY_INTERVAL = 4000;

export const PrevButton = ({ enabled, onClick }) => (
  <button
    className="absolute items-center justify-center w-8 h-8 p-2 bg-gray-400 rounded shadow-md -translate-y-1/2 bg-transparent border-0 outline-none cursor-pointer embla__button embla__button--prev z-2 top-1/2 -left-4 md:-left-20"
    onClick={onClick}
    disabled={!enabled}
  >
    <svg
      className="w-full h-full text-gray-100 fill-current embla__button__svg"
      viewBox="137.718 -1.001 366.563 644"
    >
      <path d="M428.36 12.5c16.67-16.67 43.76-16.67 60.42 0 16.67 16.67 16.67 43.76 0 60.42L241.7 320c148.25 148.24 230.61 230.6 247.08 247.08 16.67 16.66 16.67 43.75 0 60.42-16.67 16.66-43.76 16.67-60.42 0-27.72-27.71-249.45-249.37-277.16-277.08a42.308 42.308 0 0 1-12.48-30.34c0-11.1 4.1-22.05 12.48-30.42C206.63 234.23 400.64 40.21 428.36 12.5z" />
    </svg>
  </button>
);

export const NextButton = ({ enabled, onClick }) => (
  <button
    className="absolute items-center justify-center w-8 h-8 p-2 -translate-y-1/2 bg-transparent bg-gray-400 border-0 shadow-md rounded outline-none cursor-pointer embla__button embla__button--next z-2 top-1/2 -right-4 md:-right-20"
    onClick={onClick}
    disabled={!enabled}
  >
    <svg
      className="w-full h-full text-gray-100 fill-current embla__button__svg"
      viewBox="0 0 238.003 238.003"
    >
      <path d="M181.776 107.719L78.705 4.648c-6.198-6.198-16.273-6.198-22.47 0s-6.198 16.273 0 22.47l91.883 91.883-91.883 91.883c-6.198 6.198-6.198 16.273 0 22.47s16.273 6.198 22.47 0l103.071-103.039a15.741 15.741 0 0 0 4.64-11.283c0-4.13-1.526-8.199-4.64-11.313z" />
    </svg>
  </button>
);

const EmblaCarousel = () => {
  const [viewportRef, embla] = useEmblaCarousel({
    // slidesToScroll: 3,
    loop: true,
    skipSnaps: false,
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const autopaly = useCallback(() => {
    if (!embla) return;
    if (embla.canScrollNext()) {
      embla.scrollNext();
    } else {
      embla.scrollTo(0);
    }
  }, [embla]);

  const { play, stop } = useRecursiveTimeout(autopaly, AUTOPLAY_INTERVAL);

  const scrollPrev = useCallback(() => {
    if (!embla) return;
    embla.scrollPrev();
    stop();
  }, [embla]);

  const scrollNext = useCallback(() => {
    if (!embla) return;
    embla.scrollNext();
    stop();
  }, [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
    embla.on("pointerDown", stop);
  }, [embla, onSelect, stop]);

  useEffect(() => {
    play();
  }, [play]);

  return (
    <div className="relative w-full p-12 ml-auto mr-auto md:w-5/6 md:p-16 shadow-medium embla rounded-xl">
      <div className="w-full overflow-hidden embla__viewport" ref={viewportRef}>
        <div className="flex -ml-3 select-none embla__container">
          {slides.map((slide, index) => (
            <div className="relative min-w-full pl-3 embla__slide" key={index}>
              {/* <div className="relative h-48 embla__slide__inner"> */}
              <blockquote className="text-xl italic tracking-wider text-right text-gray-700 lg:px-10 md:text-3xl lg:text-4xl">
                "{slide.content}"
              </blockquote>
              <div className="flex flex-col-reverse items-end justify-center pt-5 lg:pr-12 md:flex-row md:items-center md:justify-end ">
                <h6 className="pt-3 font-semibold text-gray-600 align-top md:pr-3 md:pt-0 text-md">
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
  );
};

export default EmblaCarousel;
