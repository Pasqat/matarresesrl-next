// I soci: riquadro ritratto neutro con le iniziali finché il cliente non sceglie le foto.
// Per mettere un ritratto basta aggiungere `foto` (import statico o percorso in public/) al dato.
import Image from 'next/image'

export default function Soci({soci}) {
  return (
    <ul className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-3">
      {soci.map(socio => (
        <li key={socio.email} className="group">
          <div className="relative aspect-[4/3] overflow-hidden bg-inox md:aspect-[4/5]">
            {socio.foto ? (
              <Image
                src={socio.foto}
                alt={`Ritratto di ${socio.nome}`}
                fill
                sizes="(min-width: 640px) 30vw, 100vw"
                className="object-cover"
              />
            ) : (
              <span
                className="type-display absolute inset-0 grid place-items-center text-[clamp(64px,8vw,128px)] text-ghisa/25"
                aria-hidden="true"
              >
                {socio.iniziali}
              </span>
            )}
            <span
              className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-fiamma transition-transform duration-700 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </div>
          <h3 className="type-display mt-6 text-2xl">{socio.nome}</h3>
          <p className="mt-2 text-acciaio">{socio.ruolo}</p>
          {socio.bio && <p className="mt-5 max-w-[46ch]">{socio.bio}</p>}
          <a
            href={`mailto:${socio.email}`}
            className="mt-6 inline-block break-all border-b border-ghisa py-1 transition-colors hover:text-fiamma-testo"
          >
            {socio.email}
          </a>
        </li>
      ))}
    </ul>
  )
}
