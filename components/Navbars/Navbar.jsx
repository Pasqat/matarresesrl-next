import {Fragment, useEffect, useRef, useState} from 'react'
import {Dialog, Menu} from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import ContactModal from '../Form/ContactModal'
import {useRouter} from 'next/router'
import clsx from 'clsx'

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
// In cima alla pagina (scrollY < 40) sopra un'apertura scura l'header resta trasparente;
// sopra una chiara (es. /news) prende subito il tema chiaro.
function useHeaderTheme(enabled, headerRef) {
  const [theme, setTheme] = useState('top')
  useEffect(() => {
    if (!enabled) return
    let frame = 0
    const update = () => {
      frame = 0
      // Header a pillola staccato dall'alto: si campiona al centro della pillola.
      // Durante il cambio di pagina l'header può non esserci ancora: si ricampiona allo scroll.
      const el = headerRef.current?.firstElementChild
      if (!el) return
      const pill = el.getBoundingClientRect()
      const y = pill.top + pill.height / 2
      // elementsFromPoint attraversa anche l'header fixed e l'eventuale Dialog aperto.
      const section = document
        .elementsFromPoint(window.innerWidth / 2, y)
        .map(el => el.closest('[data-header]'))
        .find(Boolean)
      const chiaro = section?.dataset.header === 'light'
      setTheme(chiaro ? 'light' : window.scrollY < 40 ? 'top' : 'dark')
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

// CTA dell'header scelta dalla pagina (DESIGN.md, "Header a pillola"): «Contattaci» di
// default; `{href}` o `{settore}` per «Richiedi un sopralluogo», che con `href` porta al
// modulo della pagina e senza apre il modulo progetto a passi.
function HeaderCta({cta, className}) {
  if (!cta) {
    return (
      <Link href="/contatti" className={className}>
        <Roll>Contattaci</Roll>
      </Link>
    )
  }
  const label = (
    <>
      <span className="nav-cta-long">
        <Roll>Richiedi un sopralluogo</Roll>
      </span>
      <span className="nav-cta-short">
        <Roll>Sopralluogo</Roll>
      </span>
    </>
  )
  if (cta.href) {
    return (
      <a href={cta.href} className={className}>
        {label}
      </a>
    )
  }
  return (
    <ContactModal
      variant="progetto"
      title="Richiedi un sopralluogo."
      subtitle="Tre domande, meno di un minuto. Poi ti ricontattiamo per fissare il sopralluogo nel locale."
      settore={cta.settore}
      source="header-sopralluogo"
      className={className}
    >
      {label}
    </ContactModal>
  )
}

export default function Navbar({isTransparent = false, cta}) {
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
                src="/img/logo-matarrese-bianco.svg"
                width={381}
                height={26}
                alt=""
                className="logo-dark"
                priority
              />
            )}
            <Image
              src="/img/logos/logo-matarrese-grigio.svg"
              width={381}
              height={26}
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
            <Link
              className="support-link nav-item"
              href="/assistenza"
            >
              <Roll>Assistenza</Roll>
            </Link>
            {/* Figlio diretto di .header-actions: la regola legacy a 760px lo nasconde su mobile. */}
            <HeaderCta
              cta={cta}
              className={clsx(
                'site-button site-button-small nav-cta',
                cta && 'nav-cta--sopralluogo',
              )}
            />
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
      <Dialog
        open={open}
        onClose={setOpen}
        className="mobile-dialog"
        data-lenis-prevent
      >
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
