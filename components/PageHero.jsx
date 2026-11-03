// Apertura compatta delle pagine di servizio (contatti, FAQ, ricerca, pagine legali): fondo
// quasi nero, titolo a due tempi (DESIGN.md) con `accento` opzionale in corsivo, foto opzionale.
// Da usare con <Layout navbarTransparent>: l'header si appoggia sopra e segue data-header.
import Image from 'next/image'

export default function PageHero({
  title,
  accento,
  intro,
  image,
  children,
  tall = true,
}) {
  return (
    <section
      className={`relative isolate flex flex-col justify-end overflow-hidden bg-[#0d0e0f] text-white [&_:focus-visible]:outline-fiamma ${
        image && tall
          ? 'min-h-[560px] lg:h-[78svh] lg:max-h-[960px]'
          : 'min-h-[440px]'
      }`}
      data-header="dark"
      aria-labelledby="page-title"
    >
      {image && (
        <div className="absolute inset-0 -z-10">
          <Image
            src={image.src}
            alt={image.alt || ''}
            fill
            preload
            fetchPriority="high"
            sizes="100vw"
            className="object-cover"
            style={{objectPosition: image.position || '50% 50%'}}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(13_14_15/.9)_0%,rgb(13_14_15/.55)_55%,rgb(13_14_15/.2)_100%),linear-gradient(0deg,rgb(13_14_15/.8)_0%,transparent_50%),linear-gradient(180deg,rgb(13_14_15/.7)_0%,transparent_25%)]" />
        </div>
      )}
      <div className="site-shell pb-14 pt-36 lg:pb-20">
        <h1
          id="page-title"
          className="cin-titolo type-display max-w-[18ch] text-[clamp(40px,6vw,96px)] !leading-none"
        >
          <span>{title}</span>
          {accento && (
            <>
              {' '}
              <span className="type-accento">{accento}</span>
            </>
          )}
        </h1>
        {intro && (
          <p className="mt-7 max-w-[52ch] text-lg text-[rgb(243_238_230/.75)] lg:text-xl">
            {intro}
          </p>
        )}
        {children && (
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
