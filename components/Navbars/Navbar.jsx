import {Fragment, useEffect, useState} from 'react'
import {Dialog, Menu} from '@headlessui/react'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'

const primary = [
  ['Prodotti', '/prodotti'],
  ['Servizi', '/servizi'],
  ['Realizzazioni', '/realizzazioni'],
  ['Azienda', '/azienda'],
]
const secondary = [
  ['Eventi', '/eventi'],
  ['News', '/news'],
  ['Ricerca e sviluppo', '/ricerca'],
  ['Domande frequenti', '/faq'],
]

// Variante sopra l'hero scuro: focus in fiamma (il #995200 di default non regge su ghisa).
const focusDark = 'focus-visible:outline-fiamma'

export default function Navbar({isTransparent = false}) {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    if (!isTransparent) return
    const onScroll = () => setSolid(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, {passive: true})
    return () => window.removeEventListener('scroll', onScroll)
  }, [isTransparent])
  const dark = isTransparent ? focusDark : undefined
  const router = useRouter()
  const current = href =>
    router.pathname === href || router.pathname.startsWith(href + '/')
  return (
    <>
      <a className="skip-link" href="#contenuto">
        Vai al contenuto
      </a>
      <header
        className={clsx(
          'site-header',
          isTransparent && [
            '!fixed inset-x-0 text-white transition-colors duration-300 motion-reduce:transition-none',
            solid
              ? '!border-b-inox/15 !bg-ghisa'
              : '!border-b-transparent !bg-transparent',
          ],
        )}
      >
        <div className="site-header-inner">
          <Link
            href="/"
            className={clsx('brand', dark)}
            aria-label="Matarrese, pagina iniziale"
          >
            {isTransparent ? (
              <Image
                src="/img/logo-matarrese-bianco-350.png"
                width={350}
                height={26}
                alt="Matarrese"
                priority
              />
            ) : (
              <Image
                src="/img/logos/logo-matarrese-grigio-350.png"
                width={263}
                height={35}
                alt="Matarrese"
                priority
              />
            )}
          </Link>
          <nav className="desktop-nav" aria-label="Navigazione principale">
            {primary.map(([name, href]) => (
              <Link
                key={href}
                href={href}
                className={dark}
                aria-current={current(href) ? 'page' : undefined}
              >
                {name}
              </Link>
            ))}
            <Menu as="div" className="more-menu">
              <Menu.Button className={clsx('nav-more', dark)}>
                Esplora <span aria-hidden="true">+</span>
              </Menu.Button>
              <Menu.Items
                className={clsx(
                  'more-menu-items',
                  isTransparent && '!text-ghisa',
                )}
              >
                {secondary.map(([name, href]) => (
                  <Menu.Item key={href} as={Fragment}>
                    {({active}) => (
                      <Link href={href} className={active ? 'is-active' : ''}>
                        {name}
                      </Link>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          </nav>
          <div className="header-actions">
            <Link
              className={clsx(
                'support-link',
                isTransparent && '!text-inox',
                dark,
              )}
              href="/assistenza"
            >
              Assistenza
            </Link>
            <Link
              className={clsx(
                'site-button site-button-small',
                isTransparent && 'site-button-light',
                dark,
              )}
              href="/contatti"
            >
              Contattaci
            </Link>
            <button
              className={clsx(
                'mobile-toggle',
                isTransparent && ['[&>span]:!bg-white', focusDark],
              )}
              onClick={() => setOpen(true)}
              aria-label="Apri menu"
              aria-expanded={open}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <Dialog open={open} onClose={setOpen} className="mobile-dialog">
        <div className="mobile-backdrop" aria-hidden="true" />
        <Dialog.Panel className="mobile-panel">
          <div className="mobile-panel-top">
            <Dialog.Title>Esplora Matarrese</Dialog.Title>
            <button onClick={() => setOpen(false)} aria-label="Chiudi menu">
              Chiudi <span aria-hidden="true">×</span>
            </button>
          </div>
          <nav aria-label="Navigazione mobile" onClick={() => setOpen(false)}>
            {primary.map(([name, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={current(href) ? 'page' : undefined}
              >
                {name}
              </Link>
            ))}
            <Link href="/contatti">Contatti</Link>
            <Link href="/assistenza">Assistenza</Link>
            <div className="mobile-secondary">
              {secondary.map(([name, href]) => (
                <Link key={href} href={href}>
                  {name}
                </Link>
              ))}
            </div>
          </nav>
          <a className="mobile-phone" href="tel:+390804323431">
            +39 080 4323 431
          </a>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}
