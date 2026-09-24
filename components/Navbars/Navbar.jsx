import {Fragment, useEffect, useRef, useState} from 'react'
import {Dialog, Menu} from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'

const primary = [
  ['Settori', '/settori'],
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

// "Text roll": il testo sale e da sotto arriva una copia identica, nascosta agli screen reader.
function Roll({children}) {
  return (
    <span className="nav-roll">
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  )
}

// Tema della sezione sotto il centro dell'header, letto da data-header="dark|light".
// In cima alla pagina (scrollY < 40) l'header resta trasparente sopra l'hero.
function useHeaderTheme(enabled, headerRef) {
  const [theme, setTheme] = useState('top')
  useEffect(() => {
    if (!enabled) return
    let frame = 0
    const update = () => {
      frame = 0
      if (window.scrollY < 40) return setTheme('top')
      const y = headerRef.current.offsetHeight / 2
      // elementsFromPoint attraversa anche l'header fixed e l'eventuale Dialog aperto.
      const section = document
        .elementsFromPoint(window.innerWidth / 2, y)
        .map(el => el.closest('[data-header]'))
        .find(Boolean)
      setTheme(section?.dataset.header === 'light' ? 'light' : 'dark')
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, {passive: true})
    window.addEventListener('resize', schedule, {passive: true})
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [enabled, headerRef])
  return theme
}

export default function Navbar({isTransparent = false}) {
  const [open, setOpen] = useState(false)
  const headerRef = useRef(null)
  const theme = useHeaderTheme(isTransparent, headerRef)
  // bg: fondo dell'header; tone: colore di testi, logo, CTA e focus.
  const bg = isTransparent ? theme : 'solid'
  const tone = bg === 'light' || bg === 'solid' ? 'light' : 'dark'
  const router = useRouter()
  const current = href =>
    router.pathname === href || router.pathname.startsWith(href + '/')
  return (
    <>
      <a className="skip-link" href="#contenuto">
        Vai al contenuto
      </a>
      <header
        ref={headerRef}
        className="site-header"
        data-variant={isTransparent ? 'overlay' : 'standard'}
        data-bg={bg}
        data-tone={tone}
      >
        <div className="site-header-inner">
          <Link
            href="/"
            className="brand"
            aria-label="Matarrese, pagina iniziale"
          >
            {isTransparent && (
              <Image
                src="/img/logo-matarrese-bianco-350.png"
                width={350}
                height={26}
                alt=""
                className="logo-dark"
                priority
              />
            )}
            <Image
              src="/img/logos/logo-matarrese-grigio-350.png"
              width={343}
              height={23}
              alt=""
              className="logo-light"
              priority={!isTransparent}
            />
          </Link>
          <nav className="desktop-nav" aria-label="Navigazione principale">
            {primary.map(([name, href]) => (
              <Link
                key={href}
                href={href}
                className="nav-item"
                aria-current={current(href) ? 'page' : undefined}
              >
                <Roll>{name}</Roll>
              </Link>
            ))}
            <Menu as="div" className="more-menu">
              <Menu.Button className="nav-more nav-item">
                <Roll>Esplora</Roll> <span aria-hidden="true">+</span>
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
            <Link className="support-link nav-item" href="/assistenza">
              <Roll>Assistenza</Roll>
            </Link>
            {/* Figlio diretto di .header-actions: la regola legacy a 760px lo nasconde su mobile. */}
            <Link
              className="site-button site-button-small nav-cta"
              href="/contatti"
            >
              <Roll>Contattaci</Roll>
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
      {/* Stili globali confinati a .site-header: in styles/revamp.css, sezione "Header". */}
    </>
  )
}
