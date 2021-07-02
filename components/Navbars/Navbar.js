import { Fragment } from 'react'

import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon, ChatIcon } from '@heroicons/react/outline'

import Link from 'next/link'

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Servizi', href: '#', current: false },
  { name: 'Eventi', href: '#', current: false },
  { name: 'Blog', href: '/blog', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar(props) {
  return (
    <Disclosure
      as="nav"
      className="bg-gray-900 top-0 z-50 sm:shadow-lg shadow-md sticky"
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between md:justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch md:justify-between">
                <div className="flex-shrink-0 flex items-center justify-center">
                  <Link href="/">
                    <a>
                      <img
                        className="h-auto w-6/12 md:w-8/12 m-auto"
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
                    <Link href="#">
                      <a
                        className="flex items-center text-white bg-yellow-600 hover:bg-opacity-70 hover:shadow-md hover:text-white px-3 py-2 rounded-md text-sm font-semibold uppercase"
                        aria-current={undefined}
                      >
                        <ChatIcon className="inline-block h-5 w-5 mr-1" />
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
                <Link href="#">
                  <a
                    className="flex items-center text-gray-200 hover:bg-opacity-70 hover:shadow-md py-5 text-sm font-semibold uppercase"
                    aria-current={undefined}
                  >
                    <ChatIcon className="inline-block h-5 w-5 mr-1" />
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
