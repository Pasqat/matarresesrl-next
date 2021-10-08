import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon, ChatIcon } from "@heroicons/react/outline";

import Link from "next/link";
import clsx from "clsx";

let navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Prodotti", href: "/prodotti", current: false },
  { name: "Servizi", href: "/servizi", current: false },
  { name: "Eventi", href: "/eventi", current: false },
  { name: "News", href: "/news", current: false },
];

export default function Navbar({ isTransparent }) {
  return (
    <Disclosure
      as="nav"
      className={clsx(
        isTransparent
          ? "absolute w-full top-0 z-50"
          : "sticky top-0 z-50 bg-gray-900 shadow-md"
      )}
    >
      {({ open }) => (
        <>
          <div
            className={clsx("mx-auto max-w-7xl sm:px-6", open && "bg-gray-900")}
          >
            <div className="relative flex items-center justify-center h-16 lg:justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Apri il menù principale</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch md:justify-between">
                <div className="inline-flex items-center justify-start flex-shrink-0">
                  <Link href="/">
                    <a>
                      <img
                        className="block w-8/12 h-auto m-auto lg:inline"
                        src="https://www.matarrese.it/wp-content/uploads/2015/09/logo-matarrese-bianco-350.png"
                        alt="Logo Matarrese srl"
                      />
                    </a>
                  </Link>
                </div>
                <div className="flex-wrap items-center justify-between hidden w-full lg:flex">
                  <div className="flex m-auto space-x-1 xl:space-x-4">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={clsx(
                            "px-3 py-2 rounded-md text-sm font-semibold text-gray-100",
                            item.current
                              ? "hover:first-letter:text-yellow-500"
                              : "hover:no-underline hover:first-letter:text-yellow-500"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                  <div className="flex-wrap items-center hidden space-x-3 lg:flex xl:space-x-4">
                    <a
                      href="https://www.facebook.com/matarresesrl"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="text-gray-100 fab fa-facebook"></i>
                    </a>

                    <a
                      href="https://www.linkedin.com/company/matarrese-srl/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="text-gray-100 fab fa-linkedin"></i>
                    </a>

                    <a
                      href="https://www.instagram.com/matarrese.srl/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="text-gray-100 fab fa-instagram"></i>
                    </a>
                    <Link href="/contatti">
                      <a
                        className="flex items-center px-3 py-2 text-xs font-semibold text-white uppercase bg-gradient-tl-yellow rounded-md lg:text-sm hover:bg-opacity-70 hover:shadow-md hover:text-white"
                        aria-current={undefined}
                      >
                        <ChatIcon className="inline-block w-5 h-5 mr-1" />
                        Contattaci
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))}
              <div className="divide-y divide-gray-700">
                <div></div>
                <Link href="/contatti">
                  <a
                    className="flex items-center py-5 text-sm font-semibold text-gray-200 uppercase hover:bg-opacity-70 hover:shadow-md"
                    aria-current={undefined}
                  >
                    <ChatIcon className="inline-block w-5 h-5 mr-1" />
                    Contattaci
                  </a>
                </Link>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
