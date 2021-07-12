import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative pt-8 pb-6 bg-gray-200">
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
      <div className="container px-4 mx-auto">
        <div className="flex flex-wrap text-center lg:text-left">
          <div className="w-full px-4 lg:w-6/12">
            <h4 className="text-3xl font-semibold">Let's keep in touch!</h4>
            <h5 className="mt-0 mb-2 text-lg text-gray-600">
              Puoi trovarci anche sui nostri social, risponderemo in 1-2 giorni
              lavorativi
            </h5>
            <div className="mt-6 mb-6 lg:mb-0">
              <a
                href="https://www.linkedin.com/company/matarrese-srl/"
                target="_blank"
              >
                <button
                  className="items-center justify-center w-10 h-10 mr-2 font-normal text-blue-400 bg-white rounded-full shadow-lg outline-none align-center hover:shadow-md focus:outline-none"
                  type="button"
                >
                  <i className="fab fa-linkedin"></i>
                </button>
              </a>
              <a href="https://www.facebook.com/matarresesrl" target="_blank">
                <button
                  className="items-center justify-center w-10 h-10 mr-2 font-normal text-blue-600 bg-white rounded-full shadow-lg outline-none hover:shadow-md align-center focus:outline-none"
                  type="button"
                >
                  <i className="fab fa-facebook-square"></i>
                </button>
              </a>
              <a
                href="https://www.instagram.com/matarrese.srl/"
                target="_blank"
              >
                <button
                  className="items-center justify-center w-10 h-10 mr-2 font-normal text-pink-700 bg-white rounded-full shadow-lg outline-none align-center focus:outline-none hover:shadow-md"
                  type="button"
                >
                  <i className="fab fa-instagram"></i>
                </button>
              </a>
            </div>
          </div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="flex flex-wrap mb-6 items-top">
              <div className="w-full px-4 ml-auto lg:w-4/12">
                <span className="block mb-2 text-sm font-semibold text-gray-500 uppercase">
                  Link utili
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a
                      className="block pb-2 text-sm font-semibold text-gray-600 hover:text-gray-800"
                    >
                      Chi Siamo
                    </a>
                  </li>
                  <li>
                    <Link href="/news">
                      <a
                        className="block pb-2 text-sm font-semibold text-gray-600 hover:text-gray-800"
                      >
                        News
                      </a>
                    </Link>
                  </li>
                  <li>
                    <a
                      className="block pb-2 text-sm font-semibold text-gray-600 hover:text-gray-800"
                    >
                    TODO
                    </a>
                  </li>
                  <li>
                    <a
                      className="block pb-2 text-sm font-semibold text-gray-600 hover:text-gray-800"
                    >
                    TODO
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-full px-4 lg:w-4/12">
                <span className="block mb-2 text-sm font-semibold text-gray-500 uppercase">
                  Altre Risorse
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a
                      className="block pb-2 text-sm font-semibold text-gray-600 hover:text-gray-800"
                    >
                    TODO
                    </a>
                  </li>
                  <li>
                    <a
                      className="block pb-2 text-sm font-semibold text-gray-600 hover:text-gray-800"
                    >
                      Termini e Condizioni
                    </a>
                  </li>
                  <li>
                    <a
                      className="block pb-2 text-sm font-semibold text-gray-600 hover:text-gray-800"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <Link href="/contatti">
                      <a className="block pb-2 text-sm font-semibold text-gray-600 hover:text-gray-800">
                        Contattaci
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="py-1 text-sm font-semibold text-gray-500">
            Copyright © {new Date().getFullYear()} Matarrese srl{" "}
          </div>
          <div className="flex flex-wrap items-center text-sm text-gray-500">
            <p>
              Build By <span className="font-bold">Pasquale Matarrese</span>
            </p>
            <a
              href="https://www.github.com/pasqat"
              target="_blank"
              rel="noopener noreferrer"
              className="pl-3"
            >
              <button
                className="items-center justify-center w-5 h-5 font-normal text-gray-700 bg-white rounded-full shadow-md outline-none align-center focus:outline-none hover:shadow-sm"
                type="button"
              >
                <i className="fab fa-github" />
              </button>
            </a>
            <a
              href="https://www.linkedin.com/in/pasquale-matarrese/"
              target="_blank"
              rel="noopener noreferrer"
              className="pl-3"
            >
              <button
                className="items-center justify-center w-5 h-5 font-normal text-gray-700 bg-white rounded-full shadow-md outline-none align-center focus:outline-none hover:shadow-sm"
                type="button"
              >
                <i className="fab fa-linkedin" />
              </button>
            </a>
            <a
              href="https://www.linkedin.com/in/pasquale-matarrese/"
              target="_blank"
              rel="noopener noreferrer"
              className="pl-3"
            >
              <button
                className="items-center justify-center w-5 h-5 font-normal text-gray-700 bg-white rounded-full shadow-md outline-none align-center focus:outline-none hover:shadow-sm"
                type="button"
              >
                <i className="fas fa-house-user" />
              </button>
            </a>
          </div>
        </div>
      </div>
      {/* TODO: change with portfolio link          */}
    </footer>
  );
}
