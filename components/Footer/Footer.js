import Link from "next/link";
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="text-gray-600 shadow-inner body-font">
      <div
        className="absolute top-0 left-0 right-0 bottom-auto w-full h-20 -mt-20 overflow-hidden pointer-events-none"
        style={{ transform: "translateZ(0)" }}
      >
        <svg
          className="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            className="text-gray-200 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
      <div className="container flex flex-col flex-wrap px-5 py-24 mx-auto md:items-center lg:items-start md:flex-row md:flex-nowrap">
        <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
          <a className="flex items-center justify-center font-medium text-gray-900 title-font md:justify-start">
    <Image
      width={340}
      height={20}
      alt={"Logo Matarrese srl"}
      src="/img/logo-matarrese-grigio-350.png"
      // TODO: for some reason classNames are not applied to next/image component
      // className={clsx(
      //   "shadow-small",
      //   slug ? "hover:shadow-medium transition-shadow duration-200" : ""
      // )}
    />
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-10 h-10 p-2 text-white bg-yellow-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">Tailblocks</span> */}
          </a>
          <p className="mt-2 text-sm text-gray-500">
            Puoi trovarci anche sui nostri social, risponderemo in 1-2 giorni
            lavorativi
          </p>
          <div className="mt-6 mb-6 lg:mb-0">
            <a href="https://www.facebook.com/matarresesrl" target="_blank">
              <button
                className="items-center justify-center w-10 h-10 mr-2 font-normal text-blue-600 bg-white rounded-full shadow-lg outline-none hover:shadow-md align-center focus:outline-none"
                type="button"
              >
                <i className="fab fa-facebook-square"></i>
              </button>
            </a>
            <a
              href="https://www.linkedin.com/company/matarrese-srl/"
              target="_blank"
            >
              <button
                className="items-center justify-center w-10 h-10 mr-2 font-normal text-blue-500 bg-white rounded-full shadow-lg outline-none align-center hover:shadow-md focus:outline-none"
                type="button"
              >
                <i className="fab fa-linkedin"></i>
              </button>
            </a>
            <a href="https://www.instagram.com/matarrese.srl/" target="_blank">
              <button
                className="items-center justify-center w-10 h-10 mr-2 font-normal text-pink-700 bg-white rounded-full shadow-lg outline-none align-center focus:outline-none hover:shadow-md"
                type="button"
              >
                <i className="fab fa-instagram"></i>
              </button>
            </a>
          </div>
        </div>
        <div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
          <div className="w-full px-4 xl:w-1/5 lg:w-1/2">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 title-font">
              CATEGORIES
            </h2>
            <nav className="mb-10 list-none">
              <li>
                <a className="text-gray-600 hover:text-gray-800">First Link</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Second Link</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Third Link</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Fourth Link</a>
              </li>
            </nav>
          </div>
          <div className="w-full px-4 xl:w-2/5 lg:w-1/2">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
              Contatti
            </h2>
            <nav className="mb-10 text-sm list-none">
              <li className="mb-2">
                <i className="text-gray-400 fas fa-map-marker-alt"></i>
                <span className="ml-2 text-gray-600 hover:text-gray-800">
                  contrada Popoleto n.c. 70011 Alberobello (BA)
                </span>
              </li>
              <li className="mb-2">
                <i className="text-gray-400 fas fa-phone-alt"></i>
                <a
                  className="ml-2 text-gray-600 hover:text-gray-800"
                  href="tel:00390804323431"
                >
                  +39 080 4323431
                </a>
              </li>
              <li className="mb-2">
                <i className="text-gray-400 fas fa-envelope"></i>
                <a
                  className="ml-2 text-gray-600 hover:text-gray-800"
                  href="mailto:matarrese@matarrese.it"
                >
                  matarrese@matarrese.it
                </a>
              </li>
              <li className="mb-2">
                <i className="text-gray-400 fas fa-file-invoice"></i>
                <span className="ml-2 text-gray-600 hover:text-gray-800">
                  IVA 04356890725
                </span>
              </li>
            </nav>
          </div>
          <div className="w-full px-4 xl:w-2/5 ">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
              Orari
            </h2>
            <div className="mb-10 text-sm text-gray-600">
              <p className="mb-2">Per contattare i nostri uffici:</p>
              <div className="flex flex-row justify-center md:justify-between">
                <div>Lunedì - Venerdì</div>
                <div className="ml-3 font-semibold text-gray-500">
                  <p>08:30 - 13:00</p>
                  <p> 15:00 - 19:00</p>
                </div>
              </div>
              <div className="flex flex-row justify-center md:justify-between">
                <div>Sabato - Domenica</div>
                <div className="ml-3 font-semibold text-gray-500">chiuso</div>
              </div>
            </div>
            <div className="mb-10 text-sm text-gray-600">
              <p>
                Servizio tecnico:{" "}
                <a
                  href="tel:00300804323651"
                  className="underline cursor-pointer"
                >
                  +39 080 4323651
                </a>
              </p>
              <p>
                Numero attivo dal lunedì al venerdì 8.30/13.00 – 15.00/19.00
              </p>
              <p className="italic">
                Per urgenze nei giorni festivi , il servizio di risposta verrà
                garantito entro 24 h dalla chiamata e l'eventuale intervento
                tecnico urgente verrà valutato con tariffa dedicata.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container flex flex-col flex-wrap px-5 py-4 mx-auto sm:flex-row">
          <p className="text-sm text-center text-gray-500 sm:text-left">
            Copyright © {new Date().getFullYear()} Matarrese srl{" "}
          </p>
          <div className="inline-flex justify-center mt-2 sm:ml-auto sm:mt-0 sm:justify-start">
            <p className="text-sm text-center text-gray-500">
              build by <span className="font-semibold">Pasquale Matarrese</span>
            </p>
            <a className="ml-3 text-gray-500 cursor-pointer hover:text-blue-800">
              <svg
                fill="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg
                fill="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg
                fill="currentColor"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
