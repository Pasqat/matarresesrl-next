// Recensioni dei clienti: una citazione grande alla volta, scelta con i comandi (nessun avanzamento automatico).
import {useState} from 'react'

export default function Testimonials({items}) {
  const [i, setI] = useState(0)
  const go = d => setI(n => (n + d + items.length) % items.length)
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-9">
        <div className="grid" aria-live="polite">
          {items.map((t, n) => (
            <figure
              key={t.name}
              className={`col-start-1 row-start-1 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none ${
                n === i
                  ? 'translate-y-0 opacity-100'
                  : 'pointer-events-none translate-y-3 opacity-0'
              }`}
              aria-hidden={n !== i}
            >
              <p
                className="text-fiamma-testo"
                aria-label={`${t.stars} stelle su 5`}
              >
                {'★'.repeat(t.stars)}
              </p>
              <blockquote className="type-editorial mt-6 text-[clamp(28px,3.2vw,52px)] leading-[1.15]">
                “{t.content}”
              </blockquote>
              <figcaption className="mt-8 text-acciaio">
                <span className="text-ghisa">{t.name}</span>, cliente Matarrese
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="flex items-end gap-3 lg:col-span-3 lg:justify-end">
        <span className="mr-auto text-sm tabular-nums text-acciaio lg:mr-4">
          {i + 1} / {items.length}
        </span>
        {[
          [-1, 'Recensione precedente', '←'],
          [1, 'Recensione successiva', '→'],
        ].map(([d, label, arrow]) => (
          <button
            key={d}
            type="button"
            onClick={() => go(d)}
            aria-label={label}
            className="grid h-12 w-12 place-items-center border border-ghisa/25 text-lg transition-colors hover:border-ghisa hover:bg-ghisa hover:text-white"
          >
            <span aria-hidden="true">{arrow}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
