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
      {/* Globale ma confinato a .site-header: Link, Image e Menu sono componenti e lo
          scope di styled-jsx non li raggiunge. Selettori a 0,2,0 per battere revamp.css. */}
      <style jsx global>{`
        .site-header[data-tone='dark'] {
          --nav-fg: #fff;
          --nav-muted: var(--inox);
          --nav-line: var(--fiamma);
          --nav-focus: var(--fiamma);
          --cta-bg: var(--fiamma);
          --cta-fg: var(--ghisa);
          --cta-fill: #fff;
        }
        .site-header[data-tone='light'] {
          --nav-fg: var(--ghisa);
          --nav-muted: var(--acciaio-testo);
          --nav-line: var(--fiamma-testo);
          --nav-focus: var(--fiamma-testo);
          --cta-bg: var(--ghisa);
          --cta-fg: #fff;
          --cta-fill: #42474c;
        }
        .site-header[data-variant] {
          color: var(--nav-fg);
          transition: background-color 0.3s, border-color 0.3s, color 0.3s;
        }
        .site-header[data-variant='overlay'] {
          position: fixed;
          left: 0;
          right: 0;
        }
        .site-header[data-bg='top'] {
          background: transparent;
          border-bottom-color: transparent;
        }
        .site-header[data-bg='dark'],
        .site-header[data-bg='light'] {
          -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
        }
        .site-header[data-bg='dark'] {
          background: color-mix(in srgb, var(--ghisa) 95%, transparent);
          border-bottom-color: color-mix(in srgb, var(--inox) 15%, transparent);
        }
        .site-header[data-bg='light'] {
          background: color-mix(in srgb, #fff 90%, transparent);
          border-bottom-color: color-mix(
            in srgb,
            var(--ghisa) 10%,
            transparent
          );
        }

        /* Compatto: 72px desktop, 60px mobile (batte le min-height legacy 104/84/78). */
        .site-header .site-header-inner {
          min-height: 72px;
          padding-block: 0;
        }
        .site-header .brand {
          display: grid;
          width: 180px;
        }
        .site-header .brand img {
          grid-area: 1 / 1;
          align-self: center;
          transition: opacity 0.3s;
        }
        .site-header[data-tone='dark'] .logo-light,
        .site-header[data-tone='light'] .logo-dark {
          opacity: 0;
        }
        @media (max-width: 639px) {
          .site-header .site-header-inner {
            min-height: 60px;
          }
          .site-header .brand {
            width: 150px;
          }
        }

        .site-header .support-link {
          color: var(--nav-muted);
          transition: color 0.3s;
        }
        .site-header .more-menu-items {
          color: var(--ghisa);
        }
        .site-header .mobile-toggle span {
          background: currentColor;
        }
        .site-header[data-variant] :is(a, button):focus-visible {
          outline-color: var(--nav-focus);
        }

        /* Voci di menu: text roll + linea che si allarga da sinistra. */
        .site-header .nav-item {
          position: relative;
          text-decoration: none;
        }
        .site-header .nav-item::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 4px;
          height: 2px;
          background: var(--nav-line);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .site-header .desktop-nav a[aria-current='page'] {
          box-shadow: none;
        }
        .site-header
          .nav-item:is(:hover, :focus-visible, [aria-current='page'])::after {
          transform: scaleX(1);
        }
        .site-header .nav-roll {
          position: relative;
          display: inline-block;
          overflow: hidden;
          vertical-align: top;
        }
        .site-header .nav-roll > span {
          display: block;
          transition: transform 0.35s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .site-header .nav-roll > span + span {
          position: absolute;
          top: 100%;
          left: 0;
        }
        .site-header
          :is(.nav-item, .nav-cta):is(:hover, :focus-visible)
          .nav-roll
          > span {
          transform: translateY(-100%);
        }

        /* Contattaci: fill che scorre da sinistra, testo sempre nello stesso colore. */
        .site-header .nav-cta,
        .site-header .nav-cta:hover {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          min-height: 40px;
          padding-block: 8px;
          border-color: var(--cta-bg);
          background: var(--cta-bg);
          color: var(--cta-fg);
          transition: background-color 0.3s, border-color 0.3s, color 0.3s;
        }
        .site-header .nav-cta::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          background: var(--cta-fill);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .site-header .nav-cta:is(:hover, :focus-visible)::before {
          transform: scaleX(1);
        }

        @media (prefers-reduced-motion: reduce) {
          .site-header[data-variant],
          .site-header .brand img,
          .site-header .support-link,
          .site-header .nav-item::after,
          .site-header .nav-roll > span,
          .site-header .nav-cta,
          .site-header .nav-cta::before {
            transition: none;
          }
          .site-header
            :is(.nav-item, .nav-cta):is(:hover, :focus-visible)
            .nav-roll
            > span {
            transform: none;
          }
          .site-header .nav-item:is(:hover, :focus-visible) {
            color: var(--nav-line);
          }
        }
      `}</style>
    </>
  )
}
