// Capitolo "per chi lavoriamo": a sinistra un pannello con titolo sopra la foto del settore
// indicato (mouse o tastiera), a destra l'elenco sempre leggibile su fondo chiaro.
import {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function SectorList({settori, href, title, intro}) {
  const [active, setActive] = useState(settori[0].slug)
  const current = settori.find(s => s.slug === active)

  return (
    <section
      className="bg-calce text-ghisa"
      data-header="light"
      aria-labelledby="settori-title"
    >
      <div className="site-shell grid gap-10 py-24 lg:grid-cols-12 lg:gap-14 lg:py-32">
        <div className="relative isolate flex min-h-[420px] flex-col justify-end overflow-hidden bg-ghisa p-7 text-white md:p-10 lg:col-span-5">
          <div className="absolute inset-0 -z-10" aria-hidden="true">
            {settori.map((s, i) => (
              <Image
                key={s.slug}
                src={s.foto}
                alt=""
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                loading={i === 0 ? 'eager' : 'lazy'}
                className={`object-cover transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                  active === s.slug
                    ? 'scale-100 opacity-100'
                    : 'scale-105 opacity-0'
                }`}
              />
            ))}
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgb(30_34_38/.92)_0%,rgb(30_34_38/.55)_55%,rgb(30_34_38/.25)_100%)]" />
          </div>
          <p className="mb-auto text-sm text-inox" aria-live="polite">
            {current.nome}
          </p>
          <h2
            id="settori-title"
            className="type-display mt-16 text-[clamp(32px,3.6vw,56px)]"
          >
            {title}
          </h2>
          <p className="mt-6 max-w-[44ch] text-inox">{intro}</p>
        </div>

        <ul className="lg:col-span-7 lg:self-center">
          {settori.map(s => (
            <li key={s.slug} className="border-t border-ghisa/15 last:border-b">
              <Link
                href={href(s)}
                onPointerEnter={() => setActive(s.slug)}
                onFocus={() => setActive(s.slug)}
                aria-current={active === s.slug ? 'true' : undefined}
                className="group flex items-center gap-5 py-5 md:py-6"
              >
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-3">
                    {s.inEvidenza && (
                      <span
                        className="h-2 w-2 shrink-0 bg-fiamma"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={`type-display block text-[clamp(22px,2.6vw,40px)] transition-[color,transform] duration-500 ease-out group-hover:translate-x-3 group-focus-visible:translate-x-3 motion-reduce:transition-none ${
                        active === s.slug ? 'text-ghisa' : 'text-ghisa/70'
                      }`}
                    >
                      {s.nome}
                    </span>
                  </span>
                  {s.frase && (
                    <span className="mt-2 block max-w-[52ch] text-acciaio transition-transform delay-75 duration-500 ease-out group-hover:translate-x-3 motion-reduce:transition-none">
                      {s.frase}
                    </span>
                  )}
                </span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-2xl text-fiamma-testo transition-all duration-300 group-hover:translate-x-1 ${
                    active === s.slug ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
