import Link from "next/link";
import Image from "next/image";
import logoEccelsa from "../../public/img/logos/Eccelsa-RGB_400x400.png"
import logoQucino from "../../public/img/logos/MARCHIO-QUCINO150.png"
import logoAliGroup from "../../public/img/logos/Ali_Group_logo.png"

export default function Footer() {
  return (
    <footer className="relative text-gray-600 body-font">
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
            className="text-white fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
      <div className="container flex flex-col flex-wrap px-5 py-24 mx-auto md:items-center lg:items-start md:flex-row md:flex-nowrap">
        <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left">
          <Link href="/">
            <a className="flex items-center justify-center pb-2 font-medium text-gray-900 title-font md:justify-start">
              <Image
                width={340}
                height={20}
                alt={"Logo Matarrese srl"}
                src="/img/logos/logo-matarrese-grigio-350.png"
              />
            </a>
          </Link>
          <p className="mt-2 text-sm text-gray-500">
            Puoi trovarci anche sui nostri social, risponderemo in 1-2 giorni
            lavorativi
          </p>
          <div className="mt-6 mb-6 text-center">
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
          <div className="flex flex-wrap items-end justify-between h-full mt-16">
            {/* TODO: link to Qucino */}
            <Link href="https://www.istitutoeccelsa.it">
              <a target="_blank">
                <div className="relative w-16 h-20">
                  <Image
                    placeholder="blur"
                    layout="fill"
                    objectFit="contain"
                    alt="Logo Istituto Eccelsa"
                    src={logoEccelsa}
                  />
                </div>
              </a>
            </Link>
            <Link href="/#">
              <a>
                <div className="relative w-24 h-20">
                  <Image
                    layout="fill"
                    objectFit="contain"
                    alt="Logo Qucino"
                    src={logoQucino}
                    placeholder="blur"
                  />
                </div>
              </a>
            </Link>
            <Link href="/#">
              <a>
                <div className="relative w-16 h-16">
                  <Image
                    layout="fill"
                    objectFit="contain"
                    alt="Logo Aligroup"
                    src={logoAliGroup}
                    placeholder="blur"
                  />
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
          <div className="w-full px-4 xl:w-1/5 lg:w-1/2">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
              Links
            </h2>
            <nav className="mb-10 list-none">
              <li>
                <Link href="/azienda">
                  <a className="text-gray-600 hover:text-gray-800">Chi siamo</a>
                </Link>
              </li>
              <li>
                <Link href="/contatti">
                  <a className="text-gray-600 hover:text-gray-800">Contatti</a>
                </Link>
              </li>
              <li>
                <Link href="/news">
                  <a className="text-gray-600 hover:text-gray-800">News</a>
                </Link>
              </li>
              <li>
                <Link href="/assogi">
                  <a className="text-gray-600 hover:text-gray-800">Assogi</a>
                </Link>
              </li>
              <li>
                {/* TODO: add terms and conditions */}
                <a className="text-gray-600 hover:text-gray-800">
                  Termini e Condizioni
                </a>
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
            <div className="text-sm text-gray-600">
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
              by <span className="font-semibold">Pasquale Matarrese</span>
            </p>
            <Link href="https://www.facebook.com/pasqat">
              <a className="ml-3 text-gray-500 cursor-pointer hover:text-blue-800">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
            </Link>
            <Link href="https://twitter.com/pasqat">
              <a className="ml-3 text-gray-500 hover:text-blue-500">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
            </Link>
            <Link href="https://github.com/pasqat/">
              <a className="ml-3 text-gray-500 hover:text-black">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="0"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 
                      1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 
                      1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 
                      5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </a>
            </Link>
            <Link href="https://linkedin.com/in/pasquale.matarrese">
              <a className="ml-3 text-gray-500 hover:text-blue-800">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="0"
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
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
