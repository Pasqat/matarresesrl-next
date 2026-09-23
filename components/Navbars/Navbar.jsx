import {Fragment, useState} from 'react'
import {Dialog, Menu} from '@headlessui/react'
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

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const current = href =>
    router.pathname === href || router.pathname.startsWith(href + '/')
  return (
    <>
      <a className="skip-link" href="#contenuto">
        Vai al contenuto
      </a>
      <header className="site-header">
        <div className="site-header-inner">
          <Link
            href="/"
            className="brand"
            aria-label="Matarrese, pagina iniziale"
          >
            <Image
              src="/img/logos/logo-matarrese-grigio-350.png"
              width={263}
              height={35}
              alt="Matarrese"
              priority
            />
          </Link>
          <nav className="desktop-nav" aria-label="Navigazione principale">
            {primary.map(([name, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={current(href) ? 'page' : undefined}
              >
                {name}
              </Link>
            ))}
            <Menu as="div" className="more-menu">
              <Menu.Button className="nav-more">
                Esplora <span aria-hidden="true">+</span>
              </Menu.Button>
              <Menu.Items className="more-menu-items">
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
            <Link className="support-link" href="/assistenza">
              Assistenza
            </Link>
            <Link className="site-button site-button-small" href="/contatti">
              Contattaci
            </Link>
            <button
              className="mobile-toggle"
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
