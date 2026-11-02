// Apertura a tutto schermo della grammatica cinematica: foto che si assesta con uno zoom
// lento, scrim doppio, testi che salgono dalla sfocatura in cascata (styles/cinema.css).
// `voci` è la lista numerata a destra (solo da lg).
import Image from 'next/image'
import TitoloDueTempi from './TitoloDueTempi'

export default function HeroCinema({
  image,
  alt,
  objectPosition = '62% 40%',
  eyebrow,
  riga,
  accento,
  sottotitolo,
  voci,
  children,
}) {
  return (
    <section className="cin-hero" data-header="dark" aria-label="Introduzione">
      <div className="cin-hero__media cin-in-zoom">
        <Image
          src={image}
          alt={alt}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          style={{objectPosition}}
        />
      </div>
      <div className="cin-hero__scrim" />
      <div className="cin-hero__stage site-shell">
        <div className="min-w-0">
          <span className="eyebrow-cinema cin-in-fade" style={{'--d': '250ms'}}>
            {eyebrow}
          </span>
          <TitoloDueTempi
            as="h1"
            riga={riga}
            accento={accento}
            rigaClassName="cin-in-blur"
            rigaStyle={{'--d': '400ms'}}
            accentoClassName="cin-in-blur"
            accentoStyle={{'--d': '580ms'}}
          />
          <p className="cin-hero__sub cin-in-fade" style={{'--d': '780ms'}}>
            {sottotitolo}
          </p>
          <div
            className="cin-hero__actions cin-in-fade"
            style={{'--d': '950ms'}}
          >
            {children}
          </div>
        </div>
        {voci && (
          <ul
            className="cin-hero__list cin-in-fade"
            style={{'--d': '1200ms'}}
            aria-label="Servizi"
          >
            {voci.map((voce, i) => (
              <li key={voce}>
                <span className="cin-num">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {voce}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
