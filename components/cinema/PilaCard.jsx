// Pila di card calce su ghisa (DESIGN.md): ogni card resta ferma in alto e, mentre arrivano le
// successive, si riduce un poco. Da md e senza movimento ridotto; sotto, card una dopo l'altra.
import {useRef} from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import {useGSAP} from '@gsap/react'

if (typeof window !== 'undefined') gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function PilaCard({card}) {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(
        '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        () => {
          const cards = gsap.utils.toArray('.cin-card', root.current)
          const n = cards.length
          cards.forEach((el, i) => {
            if (i === n - 1) return
            gsap.to(el, {
              scale: 1 - (n - 1 - i) * 0.03,
              ease: 'none',
              scrollTrigger: {
                trigger: el.parentElement,
                start: 'top top',
                endTrigger: root.current,
                end: 'bottom bottom',
                scrub: true,
              },
            })
          })
        },
      )
      return () => mm.revert()
    },
    {scope: root},
  )

  return (
    <div ref={root} className="cin-pila">
      {card.map((c, i) => (
        <div key={c.titolo} className="cin-pila__slot">
          <article className="cin-card" style={{'--i': i}}>
            <div className="cin-card__testo">
              <span className="cin-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="type-display">{c.titolo}</h3>
              <p>{c.testo}</p>
              {c.voci && (
                <ul>
                  {c.voci.map(v => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              )}
            </div>
            <figure>
              <Image
                src={c.immagine}
                alt={c.alt}
                fill
                sizes="(min-width: 768px) 55vw, 100vw"
                placeholder="blur"
                style={{objectPosition: c.posizione || '50% 50%'}}
              />
              {c.didascalia && (
                <figcaption className="cin-didascalia">
                  {c.didascalia}
                </figcaption>
              )}
            </figure>
          </article>
        </div>
      ))}
    </div>
  )
}
