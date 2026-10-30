// Chiamata leggera a fine contenuto (progetti e articoli): apre il modal di contatto. Dai
// progetti (`image`) si apre a lamelle con la foto del lavoro, dagli articoli a passi.
import ContactModal from '../Form/ContactModal'

export default function InvitoProgetto({
  title,
  cta = 'Parlaci del tuo progetto',
  image,
  caption,
}) {
  return (
    <div className="mt-16 flex flex-col gap-6 border-t border-ghisa/15 pt-10 md:flex-row md:items-center md:justify-between">
      <p className="type-display max-w-[22ch] text-[clamp(24px,2.4vw,34px)]">
        {title}
      </p>
      <ContactModal
        variant={image ? 'realizzazione' : 'progetto'}
        image={image}
        caption={caption}
        className="cta-ghisa shrink-0 self-start md:self-auto"
      >
        {cta}
      </ContactModal>
    </div>
  )
}
