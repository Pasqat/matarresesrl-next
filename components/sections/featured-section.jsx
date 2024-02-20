import * as React from "react";
import clsx from "clsx";
// import Image from 'next/image'

import { Grid } from "../grid";
import { H2, H6, Paragraph } from "../typography";
import { ArrowLink } from "../arrow-button";
import { ClipboardCopyButton } from "../clipboard-copy-button";

import { BlurringImage } from "../blurringImage.jsx";
import Truncate from "../../actions/utils/truncate";

/**
 * @param {boolean} withBackground - if you want the light gray background
 * @param {boolean} withBorder - if you want the orange ring always visible
 * @param {string} css - the css of the blurred image by getPlaicehoder
 * @param {string} img - the img loaded given by getPlaiceholder
 */
function FeaturedSection({
  slug,
  href,
  caption = "In Evidenza",
  cta = "Leggi tutto",
  imageAlt = "",
  // imageUrl,
  img,
  css,
  title = "Post senza titolo",
  subTitle,
  permalink,
  excerpt,
  withBackground,
  withBorder,
}) {
  return (
    <div className="w-full px-8 lg:px-0">
      <div
        className={clsx(
          "rounded-lg lg:bg-trasparent",
          withBackground && "bg-gray-100",
          withBorder && "ring-2 ring-yellow-500 ring-offset-8 lg:ring-0",
        )}
      >
        <Grid
          className={clsx(
            "group rounded-lg pb-6 pt-14 md:pb-12 ",
            withBackground && "lg:bg-gray-100",
            withBorder && "lg:ring-2 lg:ring-yellow-500 lg:ring-offset-8",
          )}
        >
          <div className="col-span-full lg:col-span-5 lg:col-start-2 lg:flex lg:flex-col lg:justify-between">
            <div>
              <H6 as="h2">{caption}</H6>
              <H2
                as="h3"
                className="mt-12"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              <div className="mt-6 flex-auto">
                {
                  /*
                    We do use css line-clamp, this is for the 10% of the browsers that
                    don't support that. Don't focus too much at perfection. It's important
                    that the truncated string remains longer than the line-clamp, so that
                    line-clamp precedes for the 90% supporting that.
                */
                }
                <Paragraph
                  className="line-clamp-3 lg:pr-32"
                  dangerouslySetInnerHTML={{
                    __html: Truncate(excerpt, 120),
                  }}
                />
              </div>
              <div
                className="mt-6 text-xl font-medium text-gray-500"
                dangerouslySetInnerHTML={{ __html: subTitle }}
              />

              <div className="mt-12 flex items-center justify-between">
                <ArrowLink to={slug ?? href ?? "/"}>
                  {cta}
                  <div
                    className={clsx(
                      "absolute inset-0 left-0 right-0 z-10 rounded-lg md:-left-12 md:-right-12 lg:left-0 lg:right-0",
                      !withBorder && "focus-ring",
                    )}
                  />
                </ArrowLink>
              </div>
            </div>
          </div>
          <div className="relative col-span-full mt-12 lg:col-span-4 lg:col-start-8">
            <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg lg:aspect-h-5 lg:aspect-w-4">
              <BlurringImage
                img={img}
                css={css}
                className="rounded-lg"
                objectFit="cover"
                alt={imageAlt}
                // src={imageUrl}
                layout="fill"
              />
            </div>
            {permalink
              ? (
                <ClipboardCopyButton
                  className="absolute left-6 top-6 z-20"
                  value={permalink}
                />
              )
              : null}
          </div>
        </Grid>
      </div>
    </div>
  );
}

export { FeaturedSection };
