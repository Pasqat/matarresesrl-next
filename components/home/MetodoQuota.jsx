// Il metodo come linea di quota: una campata per passo, tab con frecce, Home e End da tastiera.
// `passi`: [[titolo, testo]]. Va su fondo ghisa (home, capitolo "come lavoriamo").
import {useRef, useState} from 'react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'

if (typeof window !== 'undefined') gsap.registerPlugin(useGSAP)

export default function MetodoQuota({passi}) {
  const [step, setStep] = useState(0)
  const panel = useRef(null)
  const tabs = useRef([])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () =>
        gsap.fromTo(
          panel.current,
          {opacity: 0, y: 12},
          {opacity: 1, y: 0, duration: 0.35, ease: 'power2.out'},
        ),
      )
      return () => mm.revert()
    },
    {dependencies: [step], revertOnUpdate: true},
  )

  const go = n => {
    const next = (n + passi.length) % passi.length
    setStep(next)
    tabs.current[next].focus()
  }
  const onKeyDown = e => {
    const moves = {
      ArrowRight: step + 1,
      ArrowLeft: step - 1,
      Home: 0,
      End: passi.length - 1,
    }
    if (!(e.key in moves)) return
    e.preventDefault()
    go(moves[e.key])
  }

  return (
    <>
      <div
        role="tablist"
        aria-label="Il metodo in quattro passi"
        onKeyDown={onKeyDown}
        className="mt-16 grid grid-cols-4 lg:mt-20"
      >
        {passi.map(([titolo], i) => {
          const on = i === step
          return (
            <button
              key={titolo}
              ref={el => (tabs.current[i] = el)}
              type="button"
              role="tab"
              id={`metodo-tab-${i}`}
              aria-selected={on}
              aria-controls="metodo-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setStep(i)}
              className="group relative pb-2 text-center"
            >
              <span
                className={`type-display block text-[44px] leading-none tabular-nums transition-colors ${
                  on ? 'text-fiamma' : 'text-inox-muted group-hover:text-white'
                }`}
              >
                {i + 1}
              </span>
              <span
                aria-hidden="true"
                className={`mt-4 block transition-[height] ${
                  on ? 'h-[4px] bg-fiamma' : 'h-[1.5px] bg-inox/40'
                }`}
              />
              <span
                aria-hidden="true"
                className="absolute left-0 top-[52px] h-5 w-[1.5px] bg-inox/40"
              />
              {i === passi.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute right-0 top-[52px] h-5 w-[1.5px] bg-inox/40"
                />
              )}
              <span className="mt-5 hidden px-3 text-[15px] md:block">
                {titolo}
              </span>
            </button>
          )
        })}
      </div>
      <div
        ref={panel}
        id="metodo-panel"
        role="tabpanel"
        aria-labelledby={`metodo-tab-${step}`}
        className="mt-14 grid gap-6 lg:grid-cols-12"
      >
        <h3 className="type-display text-[clamp(26px,2.6vw,36px)] lg:col-span-5">
          {passi[step][0]}
        </h3>
        <p className="max-w-[44ch] text-[18px] leading-[1.55] text-inox-muted lg:col-span-6 lg:col-start-7 lg:text-[20px]">
          {passi[step][1]}
        </p>
      </div>
    </>
  )
}
