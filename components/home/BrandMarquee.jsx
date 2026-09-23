// Fascia continua dei marchi: si ferma al passaggio del mouse, il logo sotto il cursore si colora.
// Con movimento ridotto diventa una griglia statica.
import Image from 'next/image'

export default function BrandMarquee({logos}) {
  const row = logos.map(logo => (
    <li key={logo.name} className="relative h-14 w-36 shrink-0 md:h-16 md:w-44">
      <Image
        src={logo.url}
        alt={logo.name}
        fill
        sizes="176px"
        className="object-contain opacity-60 mix-blend-multiply grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
      />
    </li>
  ))
  return (
    <div className="group overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <div className="marquee flex w-max gap-16 group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center">
        <ul className="flex shrink-0 items-center gap-16 motion-reduce:flex-wrap motion-reduce:justify-center">
          {row}
        </ul>
        {/* Seconda copia per il giro continuo: nascosta agli screen reader e col movimento ridotto. */}
        <ul
          className="flex shrink-0 items-center gap-16 motion-reduce:hidden"
          aria-hidden="true"
        >
          {row}
        </ul>
      </div>
    </div>
  )
}
