// Capitolo di categorie (pattern di home/SectorList): pannello con titolo sopra la foto della voce
// indicata, elenco sempre leggibile accanto. Le voci senza foto lasciano la foto corrente.
// Su touch il pannello resta sulla prima foto e ogni voce mostra la sua miniatura.
import {useState} from 'react'
import Image from 'next/image'

export default function CategoryChapter({
  id,
  titleId = `${id}-title`,
  title,
  intro,
  items,
  dark = false,
  reverse = false,
  children,
}) {
  const withPhoto = items.filter(item => item.foto)
  const [active, setActive] = useState(withPhoto[0]?.foto)

  return (
    <section
      id={id}
      className={dark ? 'bg-ghisa text-white' : 'bg-calce text-ghisa'}
      data-header={dark ? 'dark' : 'light'}
      aria-labelledby={titleId}
    >
      <div className="site-shell py-24 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div
            className={`relative isolate flex min-h-[420px] flex-col justify-end overflow-hidden bg-grafite p-7 text-white md:p-10 lg:sticky lg:top-24 lg:col-span-5 lg:min-h-[min(560px,calc(100svh-8rem))] lg:self-start ${
              reverse ? 'lg:order-last' : ''
            }`}
          >
            <div className="absolute inset-0 -z-10" aria-hidden="true">
              {withPhoto.map(item => (
                <Image
                  key={item.foto}
                  src={item.foto}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className={`object-cover transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                    active === item.foto
                      ? 'scale-100 opacity-100'
                      : 'scale-105 opacity-0'
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgb(30_34_38/.92)_0%,rgb(30_34_38/.55)_55%,rgb(30_34_38/.2)_100%)]" />
            </div>
            <h2
              id={titleId}
              className="type-display text-[clamp(30px,3.2vw,52px)]"
            >
              {title}
            </h2>
            {intro && <p className="mt-6 max-w-[44ch] text-inox">{intro}</p>}
          </div>

          <ul className="lg:col-span-7">
            {items.map(item => (
              <li
                key={item.nome}
                onPointerEnter={() => item.foto && setActive(item.foto)}
                className={`group relative border-t py-7 md:py-9 ${
                  dark ? 'border-inox/25' : 'border-ghisa/15'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute -top-px left-0 h-px transition-[width] duration-700 ease-out group-hover:w-full motion-reduce:transition-none ${
                    dark ? 'bg-fiamma' : 'bg-fiamma-testo'
                  } ${item.foto && active === item.foto ? 'w-full' : 'w-0'}`}
                />
                <h3 className="type-display text-[clamp(22px,2.2vw,32px)] leading-tight">
                  {item.nome}
                </h3>
                <p
                  className={`mt-4 max-w-[60ch] ${
                    dark ? 'text-inox-muted' : 'text-acciaio'
                  }`}
                >
                  {item.testo}
                </p>
                {item.foto && (
                  <div className="relative mt-6 aspect-[3/2] overflow-hidden [@media(hover:hover)_and_(pointer:fine)]:hidden">
                    <Image
                      src={item.foto}
                      alt={item.alt}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        {children}
      </div>
    </section>
  )
}
