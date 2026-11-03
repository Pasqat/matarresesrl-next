// Apertura a tutto schermo della grammatica cinematica: foto che si assesta con uno zoom
// lento, scrim doppio, testi che salgono dalla sfocatura in cascata (styles/cinema.css).
// `voci` è la lista numerata a destra (solo da lg). `video`: sorgenti {src, media} di un loop
// muto sopra la foto, che fa da poster e resta sola con movimento ridotto.
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
  children,
}) {
  const videoRef = useRef(null)
  const [inPausa, setInPausa] = useState(false)
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.pause()
      setInPausa(true)
    }
  }, [])
  const alterna = () => {
    const v = videoRef.current
    if (v.paused) v.play()
    else v.pause()
    setInPausa(v.paused)
  }
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
        {video && (
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
              <source key={s.src} src={s.src} media={s.media} type="video/mp4" />
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
      {video && (
        <button
          type="button"
          className="cin-hero__pausa"
          onClick={alterna}
          aria-label={inPausa ? 'Riproduci il video' : 'Metti in pausa il video'}
        >
          {inPausa ? '▶' : '❚❚'}
        </button>
      )}
    </section>
  )
}
