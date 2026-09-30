// Cartiglio: il riquadro dati di ogni tavola tecnica, col titolo della pagina. Da lg sta sulla
// foto in basso a destra (il genitore è `relative`), sotto lg segue la foto.
// `rows`: [[etichetta, valore]]; `title` da WordPress (può contenere entità HTML).
import Image from 'next/image'

const CELL = 'type-label border-r border-ghisa/15 px-5 py-4 text-acciaio'

export default function Cartiglio({id, title, rows}) {
  return (
    <div className="site-shell mt-8 lg:absolute lg:bottom-10 lg:right-[var(--gutter)] lg:mt-0">
      <div className="w-full border-2 border-ghisa bg-calce text-ghisa lg:ml-auto lg:w-[min(440px,90vw)]">
        <div className="border-b-2 border-ghisa px-5 py-5">
          <Image
            src="/img/logos/logo-matarrese-grigio-350.png"
            alt="Matarrese srl"
            width={343}
            height={23}
            className="h-auto w-[170px]"
          />
        </div>
        <div className="grid grid-cols-[7.5rem_1fr] border-b border-ghisa/15">
          <span className={CELL}>Progetto</span>
          <h1
            id={id}
            className="type-display min-w-0 px-5 py-4 text-[28px]"
            dangerouslySetInnerHTML={{__html: title}}
          />
        </div>
        <dl>
          {rows.map(([k, v]) => (
            <div
              key={k}
              className="grid grid-cols-[7.5rem_1fr] border-b border-ghisa/15 last:border-b-0"
            >
              <dt className={CELL}>{k}</dt>
              <dd className="px-5 py-3.5 text-[16px]">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
