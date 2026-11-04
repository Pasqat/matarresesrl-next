// Apertura a tutto schermo della grammatica cinematica: foto che si assesta con uno zoom
// lento, scrim doppio, testi che salgono dalla sfocatura in cascata (styles/cinema.css).
// `voci` è la lista numerata a destra (solo da lg). `video`: sorgenti {src, media} di un loop
// muto sopra la foto, che fa da poster e resta sola con movimento ridotto: in quel caso il video
// non viene nemmeno inserito, così non si scarica.
import {useEffect, useRef, useState} from 'react'
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
  video,
  // titoli da WordPress: vanno a capo e partono più piccoli
  titoloLungo,
  children,
}) {
  const videoRef = useRef(null)
  const [inPausa, setInPausa] = useState(false)
  const [conVideo, setConVideo] = useState(false)
  useEffect(() => {
    setConVideo(
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    )
  }, [])
  const alterna = () => {
    const v = videoRef.current
    if (v.paused) v.play()
    else v.pause()
    setInPausa(v.paused)
  }
  return (
    <section
      className={titoloLungo ? 'cin-hero cin-hero--lungo' : 'cin-hero'}
      data-header="dark"
      aria-label="Introduzione"
    >
      <div className="cin-hero__media cin-in-zoom">
        <Image
          // senza foto (un articolo che non l'ha): l'arena del gusto della sede
          src={image || '/img/og/home.jpg'}
          alt={alt}
          fill
          priority
          sizes="100vw"
          // un percorso (es. dai dati dei settori) non ha l'anteprima sfocata degli import statici
          placeholder={image && typeof image !== 'string' ? 'blur' : 'empty'}
          style={{objectPosition}}
        />
        {video && conVideo && (
          <video
            ref={videoRef}
            className="cin-hero__video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            {video.map(s => (
              <source
                key={s.src}
                src={s.src}
                media={s.media}
                type="video/mp4"
              />
            ))}
          </video>
        )}
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
            {voci.map((voce, i) => {
              // una voce è un testo o [testo, ancora]: con l'ancora diventa l'indice della pagina
              const [testo, href] = Array.isArray(voce) ? voce : [voce]
              const corpo = (
                <>
                  <span className="cin-num">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {testo}
                </>
              )
              return (
                <li key={testo}>{href ? <a href={href}>{corpo}</a> : corpo}</li>
              )
            })}
          </ul>
        )}
      </div>
      {video && conVideo && (
        <button
          type="button"
          className="cin-hero__pausa"
          onClick={alterna}
          aria-label={
            inPausa ? 'Riproduci il video' : 'Metti in pausa il video'
          }
        >
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            {inPausa ? (
              <path d="M3 1.5v9l7.5-4.5z" fill="currentColor" />
            ) : (
              <path
                d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z"
                fill="currentColor"
              />
            )}
          </svg>
        </button>
      )}
    </section>
  )
}
