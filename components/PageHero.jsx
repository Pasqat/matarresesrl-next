// Apertura delle pagine interne: fondo ghisa, foto opzionale a tutta larghezza, titolo "da targa".
// Da usare con <Layout navbarTransparent>: l'header si appoggia sopra e segue data-header.
import Image from 'next/image'

export default function PageHero({title, intro, image, children, tall = true}) {
  return (
    <section
      className={`relative isolate flex flex-col justify-end overflow-hidden bg-ghisa text-white ${
        image && tall ? 'min-h-[560px] lg:h-[78svh] lg:max-h-[960px]' : 'min-h-[420px]'
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
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(30_34_38/.9)_0%,rgb(30_34_38/.55)_55%,rgb(30_34_38/.2)_100%),linear-gradient(0deg,rgb(30_34_38/.8)_0%,transparent_50%),linear-gradient(180deg,rgb(30_34_38/.7)_0%,transparent_25%)]" />
        </div>
      )}
      <div className="site-shell pb-14 pt-32 lg:pb-20">
        <h1
          id="page-title"
          className="type-display max-w-[16ch] text-[clamp(40px,6vw,104px)]"
        >
          {title}
        </h1>
        {intro && (
          <p className="mt-7 max-w-[52ch] text-lg text-inox lg:text-xl">
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
