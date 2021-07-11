import { Fragment } from 'react'

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, ChatIcon } from '@heroicons/react/outline'

import Link from 'next/link'

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Prodotti', href: '#', current: false },
  { name: 'Servizi', href: '#', current: false },
  { name: 'Eventi', href: '#', current: false },
  { name: 'News', href: '/news', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar(props) {
  return (
    <Disclosure as="nav" className="sticky top-0 z-50 bg-gray-900 shadow-md">
      {({ open }) => (
        <>
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16 md:justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-center flex-1 sm:items-stretch md:justify-between">
                <div className="flex items-center justify-center flex-shrink-0">
                  <Link href="/">
                    <a>
                      <img
                        className="w-6/12 h-auto m-auto md:w-8/12"
                        src="https://www.matarrese.it/wp-content/uploads/2015/09/logo-matarrese-bianco-350.png"
                        alt="Workflow"
                      />
                    </a>
                  </Link>
                </div>
                <div className="hidden md:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                    <Link href="/contatti">
                      <a
                        className="flex items-center px-3 py-2 text-sm font-semibold text-white uppercase bg-yellow-600 rounded-md hover:bg-opacity-70 hover:shadow-md hover:text-white"
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

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
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
  )
}
