// Apertura della home: le righe del titolo salgono, la pianta della cucina si traccia, poi sotto
// le linee compare la foto del locale finito e le linee schiariscono a bianco; scorrendo la pianta
// sale un po' più veloce della pagina. Unico momento orchestrato della pagina (DESIGN.md).
// Con prefers-reduced-motion la pianta è già disegnata sopra la foto e il titolo è fermo.
import {useRef} from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {SplitText} from 'gsap/SplitText'
import {DrawSVGPlugin} from 'gsap/DrawSVGPlugin'
import {useGSAP} from '@gsap/react'
import Magnetic from '../Magnetic'
import Pianta from '../disegno/Pianta'

if (typeof window !== 'undefined')
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin)

const MOTION = '(prefers-reduced-motion: no-preference)'

// Righe del titolo che salgono dalla maschera (styles/index.css: [data-split], .ln-mask).
function revealLines(el) {
  return SplitText.create(el, {
    type: 'lines',
    mask: 'lines',
    linesClass: 'ln',
    autoSplit: true,
    onSplit: self => {
      gsap.set(el, {visibility: 'visible'})
      return gsap.from(self.lines, {
        yPercent: 120,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.08,
      })
    },
  })
}

export default function HeroPianta({title, intro, primary, secondary, photo}) {
  const root = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()
      mm.add(MOTION, () => {
        revealLines(q('h1')[0])
        gsap
          .timeline()
          .fromTo(
            q('[data-draw]'),
            {drawSVG: '0%'},
            {
              drawSVG: '100%',
              duration: 2.2,
              stagger: {each: 0.05, from: 'start'},
              ease: 'power2.inOut',
            },
            0,
          )
          .fromTo(q('[data-fade]'), {opacity: 0}, {opacity: 1, duration: 0.8}, 0.6)
          .to(q('[data-photo]'), {opacity: 0.9, duration: 1}, 1.6)
          .to(q('.pianta'), {color: '#ffffff', duration: 1}, 1.6)
          .fromTo(
            q('.pianta text'),
            {opacity: 0},
            {opacity: 1, duration: 0.6, stagger: 0.05},
            2,
          )
        gsap.to(q('[data-plan]'), {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
      return () => mm.revert()
    },
    {scope: root},
  )

  return (
    <section
      ref={root}
      aria-labelledby="home-title"
      data-header="dark"
      className="overflow-hidden bg-ghisa text-white [&_:focus-visible]:outline-fiamma"
    >
      <div className="site-shell grid gap-12 pb-16 pt-28 lg:min-h-[100svh] lg:grid-cols-12 lg:items-center lg:gap-6 lg:py-28">
        <div className="lg:col-span-5">
          <h1
            id="home-title"
            data-split
            className="type-display text-[clamp(40px,4.8vw,84px)]"
          >
            {title}
          </h1>
          <p className="mt-7 max-w-[44ch] text-lg text-inox lg:text-xl">
            {intro}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Magnetic>
              <Link href={primary.href} className="cta-fiamma">
                {primary.label}
              </Link>
            </Magnetic>
            <Link
              href={secondary.href}
              className="border-b border-inox/60 py-2 text-white transition-colors hover:border-white"
            >
              {secondary.label}
            </Link>
          </div>
        </div>
        <Pianta
          className="lg:col-span-7"
          photo={photo}
          lines="text-inox motion-reduce:text-white"
          veil="bg-ghisa/45"
        />
      </div>
    </section>
  )
}
