import Link from "next/link";
import { Transition } from "@headlessui/react";
import { SlopeDivSection } from "../../ui/SlopeDivSection";

/**
 * @param backgroundImgSrc - 'url(/img/homeBackground.jpg)'
 * @param overlay - 'bg-black opacity-80'
 * @param title - 'A title'
 * @param subtitle - 'A subtitle'
 * @param button - {text: 'Button', link: '#'}
 */
function HeaderBig({
  backgroundImgSrc = "url(/img/homeBackground.jpg",
  overlay = "bg-black opacity-80",
  title = "",
  subtitle = "",
  button = { text: "Button", link: "#" },
  noButton = false,
  children,
  slopeSectionColor = "text-gray-200"
}) {
  return (
    <div className="relative pt-16 pb-32 flex content-center items-center justify-center h-[500px]">
      <div
        className="absolute top-0 w-full h-full bg-center bg-cover"
        style={{
          backgroundImage: backgroundImgSrc,
        }}
      >
        <span
          id="blackOverlay"
          className={`absolute w-full h-full bg-black opacity-80 ${overlay}`}
        />
      </div>
      <div className="container relative mx-auto">
        <div className="flex flex-wrap items-center">
          <div className="w-full px-4 ml-auto mr-auto text-center lg:w-6/12">
            <Transition
              enter="transition-opacity duration-700"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              show={true}
              as="h1"
              className="text-5xl font-semibold text-white"
            >
              {title}
            </Transition>
            <p className="mt-4 text-lg font-bold text-gray-300">{subtitle}</p>

            {!noButton && (
              <Link href={button.link}>
                <a
                  className="px-8 py-3 mt-5 mb-1 mr-1 text-base font-bold text-white uppercase transition-all duration-150 ease-linear bg-yellow-600 rounded shadow-md outline-none active:bg-yellow-700 hover:shadow-lg focus:outline-none"
                  type="button"
                >
                  <i className="fas fa-message" /> {button.text}
                </a>
              </Link>
            )}
            {children}
          </div>
        </div>
      </div>
      <SlopeDivSection color={slopeSectionColor} position="bottom" />
    </div>
  );
}

export default HeaderBig;
