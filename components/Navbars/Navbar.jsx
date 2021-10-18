import {Disclosure} from '@headlessui/react'
import {MenuIcon, XIcon, ChatIcon} from '@heroicons/react/outline'

import Link from 'next/link'
import clsx from 'clsx'

let navigation = [
  {name: 'Home', href: '/', current: false},
  {name: 'Prodotti', href: '/prodotti', current: false},
  {name: 'Servizi', href: '/servizi', current: false},
  {name: 'Eventi', href: '/eventi', current: false},
  {name: 'News', href: '/news', current: false},
]

export default function Navbar({isTransparent}) {
  return (
    <Disclosure
      as="nav"
      className={clsx(
        isTransparent
          ? 'absolute w-full top-0 z-50'
          : 'sticky top-0 z-50 bg-gray-900 shadow-md',
      )}
    >
      {({open}) => (
        <>
          <div
            className={clsx('mx-auto max-w-7xl sm:px-6', open && 'bg-gray-900')}
          >
            <div className="relative flex items-center justify-center h-16 lg:justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Apri il menù principale</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch md:justify-between">
                <div className="inline-flex flex-shrink-0 items-center justify-start">
                  <Link href="/">
                    <a>
                      <img
                        className="block m-auto w-8/12 h-auto lg:inline"
                        src="https://www.matarrese.it/wp-content/uploads/2015/09/logo-matarrese-bianco-350.png"
                        alt="Logo Matarrese srl"
                      />
                    </a>
                  </Link>
                </div>
                <div className="hidden flex-wrap items-center justify-between w-full lg:flex">
                  <div className="flex m-auto space-x-1 xl:space-x-4">
                    {navigation.map(item => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={clsx(
                            'px-3 py-2 text-gray-100 text-sm font-medium rounded-md md:text-base',
                            item.current
                              ? 'hover:first-letter:text-yellow-500'
                              : 'hover:no-underline hover:first-letter:text-yellow-500',
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                  <div className="hidden flex-wrap items-center space-x-3 lg:flex xl:space-x-4">
                    <a
                      href="https://www.facebook.com/matarresesrl"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-facebook text-gray-100"></i>
                    </a>

                    <a
                      href="https://www.linkedin.com/company/matarrese-srl/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-linkedin text-gray-100"></i>
                    </a>

                    <a
                      href="https://www.instagram.com/matarrese.srl/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-instagram text-gray-100"></i>
                    </a>
                    <Link href="/contatti">
                      <a
                        className="bg-gradient-tl-yellow flex items-center px-3 py-2 text-white hover:text-white text-xs font-semibold hover:bg-opacity-70 rounded-md hover:shadow-md uppercase lg:text-sm"
                        aria-current={undefined}
                      >
                        <ChatIcon className="inline-block mr-1 w-5 h-5" />
                        Contattaci
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="pb-3 pt-2 px-2 bg-gray-900 space-y-1">
              {navigation.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 text-base font-medium rounded-md',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </a>
              ))}
              <div className="divide-gray-700 divide-y">
                <div></div>
                <Link href="/contatti">
                  <a
                    className="flex items-center py-5 text-gray-200 text-sm font-semibold hover:bg-opacity-70 hover:shadow-md uppercase"
                    aria-current={undefined}
                  >
                    <ChatIcon className="inline-block mr-1 w-5 h-5" />
                    Contattaci
                  </a>
                </Link>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
