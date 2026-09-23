// Chiamata leggera a fine contenuto (progetti e articoli): la CTA forte resta nel footer.
import Link from 'next/link'

export default function InvitoProgetto({
  title,
  cta = 'Parlaci del tuo progetto',
}) {
  return (
    <div className="mt-16 flex flex-col gap-6 border-t border-ghisa/15 pt-10 md:flex-row md:items-center md:justify-between">
      <p className="type-display max-w-[22ch] text-[clamp(24px,2.4vw,34px)]">
        {title}
      </p>
      <Link
        href="/contatti"
        className="cta-ghisa shrink-0 self-start md:self-auto"
      >
        {cta}
      </Link>
    </div>
  )
}
