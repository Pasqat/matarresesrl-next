// Galleria del progetto: griglia asimmetrica e visore a tutto schermo (Headless UI Dialog:
// focus intrappolato, Esc per chiudere, frecce per scorrere). Alt da WordPress.
import {useState} from 'react'
import Image from 'next/image'
import {Dialog} from '@headlessui/react'

function layout(i, n) {
  // Ritmo 7+5 colonne, poi una foto a tutta larghezza; l'ultima rimasta sola si allarga.
  if (i % 3 === 2 || (i === n - 1 && i % 3 === 0))
    return ['md:col-span-2 lg:col-span-12', 'aspect-[4/3] md:aspect-[21/9]']
  if (i % 3 === 0) return ['lg:col-span-7', 'aspect-[4/3]']
  return ['lg:col-span-5', 'aspect-[4/3] lg:aspect-[4/5]']
}

export default function GalleriaProgetto({images, title}) {
  const [open, setOpen] = useState(null)
  const n = images.length
  const current = open === null ? null : images[open]
  const go = step => setOpen(i => (i + step + n) % n)

  return (
    <>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-6">
        {images.map((img, i) => {
          const [span, aspect] = layout(i, n)
          return (
            <li key={img.id || img.sourceUrl} className={span}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className={`group relative block w-full overflow-hidden bg-inox ${aspect}`}
              >
                <Image
                  src={img.sourceUrl}
                  alt={img.altText || ''}
                  fill
                  sizes={
                    span.includes('col-span-12')
                      ? '100vw'
                      : '(min-width: 1024px) 55vw, (min-width: 640px) 50vw, 100vw'
                  }
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                />
                <span className="sr-only">
                  Ingrandisci la foto {i + 1} di {n}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <Dialog
        open={current !== null}
        onClose={() => setOpen(null)}
        className="fixed inset-0 z-[60]"
      >
        <div className="fixed inset-0 bg-ghisa/95" aria-hidden="true" />
        <Dialog.Panel
          className="fixed inset-0 flex flex-col text-white [&_:focus-visible]:outline-fiamma"
          onKeyDown={e => {
            if (n < 2) return
            if (e.key === 'ArrowRight') go(1)
            if (e.key === 'ArrowLeft') go(-1)
          }}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-8">
            <Dialog.Title
              className="text-sm text-inox"
              dangerouslySetInnerHTML={{
                __html: `${title} · ${(open ?? 0) + 1} di ${n}`,
              }}
            />
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="flex h-11 w-11 items-center justify-center text-2xl text-inox hover:text-white"
              aria-label="Chiudi"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="relative mx-4 mb-4 flex-1 md:mx-24 md:mb-10">
            {current && (
              <Image
                key={current.sourceUrl}
                src={current.sourceUrl}
                alt={current.altText || ''}
                fill
                sizes="100vw"
                className="object-contain"
              />
            )}
          </div>
          {n > 1 && (
            <div className="flex justify-center gap-3 pb-6 md:contents">
              {[
                [-1, 'Foto precedente', '‹', 'md:left-6'],
                [1, 'Foto successiva', '›', 'md:right-6'],
              ].map(([step, label, sign, side]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => go(step)}
                  aria-label={label}
                  className={`flex h-12 w-12 items-center justify-center border border-inox/30 text-3xl text-inox transition-colors hover:border-white hover:text-white md:absolute md:top-1/2 md:-translate-y-1/2 ${side}`}
                >
                  <span aria-hidden="true">{sign}</span>
                </button>
              ))}
            </div>
          )}
        </Dialog.Panel>
      </Dialog>
    </>
  )
}
