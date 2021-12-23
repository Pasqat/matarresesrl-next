import {Disclosure} from '@headlessui/react'
import {MenuIcon, XIcon, ChatIcon} from '@heroicons/react/outline'
import Image from 'next/image'

import Link from 'next/link'
import clsx from 'clsx'
import {ButtonLink} from '../button'
import {LinkedInIcon} from '../icons/linkedin-icon'
import {InstagramIcon} from '../icons/instagram-icon'
import {FacebookIcon} from '../icons/facebook-icon'

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
      as="div"
      className={clsx(
        isTransparent
          ? 'absolute top-0 z-50 w-full'
          : 'sticky top-0 z-50 bg-gray-900 shadow-md',
      )}
    >
      {({open}) => (
        <>
          <div className={clsx('sm:px-6', open && 'bg-gray-900')}>
            <nav className="flex mx-10vw h-16">
              <div className="flex flex-1 justify-between md:justify-between items-center mx-auto max-w-8xl">
                <div className="inline-flex items-center">
                  <Link href="/">
                    <a>
                      <Image
                        width={263}
                        height={19}
                        alt="logo Matarrese srl"
                        src="https://www.matarrese.it/wp-content/uploads/2015/09/logo-matarrese-bianco-350.png"
                      />
                    </a>
                  </Link>
                </div>
                <div className="hidden lg:flex flex-wrap justify-between items-center w-full">
                  <div className="flex m-auto space-x-1 xl:space-x-4">
                    {navigation.map(item => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={clsx(
                            'py-2 px-3 text-sm md:text-base font-medium text-gray-100 rounded-md',
                            item.current
                              ? 'hover:first-letter:text-yellow-500'
                              : 'hover:first-letter:text-yellow-500 hover:no-underline',
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                  <div className="hidden lg:flex flex-wrap items-center space-x-3 xl:space-x-4">
                    <a
                      href="https://www.facebook.com/matarresesrl"
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-100"
                    >
                      <FacebookIcon />
                    </a>

                    <a
                      href="https://www.linkedin.com/company/matarrese-srl/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-100"
                    >
                      <LinkedInIcon />
                    </a>

                    <a
                      href="https://www.instagram.com/matarrese.srl/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-100"
                    >
                      <InstagramIcon />
                    </a>
                    <Link href="/contatti" passHref>
                      <ButtonLink size="small">
                        <ChatIcon className="inline-block mr-1 w-5 h-5" />
                        Contattaci
                      </ButtonLink>
                    </Link>
                  </div>
                </div>
                {/* Mobile menu button*/}
                <Disclosure.Button className="lg:hidden items-end p-2 text-gray-100 hover:text-white hover:bg-gray-700 rounded-full focus:ring-2 focus:ring-inset focus:ring-yellow-500 focus:outline-none">
                  <span className="sr-only">Apri il menù principale</span>
                  {open ? (
                    <XIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </nav>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900">
              {navigation.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    item.current
                      ? 'text-white bg-gray-900'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700',
                    'block py-2 px-3 text-base font-medium rounded-md',
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
