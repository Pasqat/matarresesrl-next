import {Disclosure} from '@headlessui/react'
import {MenuIcon, XIcon, UserGroupIcon} from '@heroicons/react/outline'
import Logo from '../../public/img/logo-matarrese-bianco-350.png'
import useUser from '../../lib/useUser'

import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import {ButtonLink} from '../button'

let navigation = [
  // {name: 'Home', href: '/', current: false},
  {name: 'Prodotti', href: '/prodotti', current: false},
  {name: 'Servizi', href: '/servizi', current: false},
  {name: 'Azienda', href: '/azienda', current: false},
  {name: 'Eventi', href: '/eventi', current: false},
  {name: 'Realizzazioni', href: '/realizzazioni', current: false},
  {name: 'R&S', href: '/ricerca', current: false},
  {name: 'Chi siamo', href: '/azienda', current: false},
  {name: 'News', href: '/news', current: false},
]

export default function Navbar({isTransparent}) {
  const {user} = useUser()
  const isLoggedIn = user?.isLoggedIn
  const userName = user?.user?.name

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
            <nav className="mx-10vw flex h-16">
              <div className="mx-auto flex max-w-8xl flex-1 items-center justify-between md:justify-between">
                <div className="inline-flex items-center">
                  <Link href="/">
                    <Image
                      width={263}
                      height={19}
                      alt="logo Matarrese srl"
                      // src="https://www.matarrese.it/wp-content/uploads/2015/09/logo-matarrese-bianco-350.png"
                      src={Logo}
                      placeholder="blur"
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                      }}
                    />
                  </Link>
                </div>
                <div className="hidden w-full flex-wrap items-center justify-between lg:flex">
                  <div className="m-auto flex space-x-1 xl:space-x-4">
                    {navigation.map(item => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={clsx(
                          'rounded-md px-3 py-2 text-sm font-medium text-gray-100 md:text-base',
                          item.current
                            ? 'hover:first-letter:text-yellow-500'
                            : 'hover:no-underline hover:first-letter:text-yellow-500',
                          {hidden: item.name === 'Chi siamo'},
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  {isLoggedIn ? (
                    <Link href="/api/logout" className="text-white">
                      ciao {userName}
                    </Link>
                  ) : (
                    <div className="hidden flex-wrap items-center space-x-3 lg:flex xl:space-x-4">
                      <ButtonLink
                        size="small"
                        className="no-underline"
                        href="/contatti"
                      >
                        <UserGroupIcon className="mr-1 inline-block h-5 w-5" />
                        Contatti
                      </ButtonLink>
                    </div>
                  )}
                </div>
                {/* Mobile menu button*/}
                <Disclosure.Button className="items-end rounded-full p-2 text-gray-100 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500 lg:hidden">
                  <span className="sr-only">Apri il menù principale</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </nav>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 bg-gray-900 px-2 pb-3 pt-2">
              {navigation.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium',
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </a>
              ))}
              <div className="divide-y divide-gray-700">
                <div></div>
                <Link
                  href="/contatti"
                  className="flex items-center py-5 text-sm font-semibold uppercase text-gray-200 hover:bg-opacity-70 hover:shadow-md"
                  aria-current={undefined}
                >
                  <UserGroupIcon className="mr-1 inline-block h-5 w-5" />
                  Contattaci
                </Link>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
