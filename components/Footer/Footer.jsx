import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import NewsletterFormFooter from '../Form/NewsletterFormFooter'
import ContactModal from '../Form/ContactModal'
import TitoloDueTempi from '../cinema/TitoloDueTempi'
import {newsletterGroups} from '../../data/newsletter-groups'
import {social} from '../../data/social'
import {SocialIcon} from '../icons/social-icon'

// Su ghisa l'outline globale (#995200) scende sotto 3:1: qui si usa la fiamma.
const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fiamma'
const link = clsx(
  'block w-fit py-1 text-inox transition-colors hover:text-fiamma',
  focus,
)
const heading = 'mb-5 text-base font-medium text-calce'

// `invito`: false sulle pagine che chiudono già con la propria chiamata al progetto
export default function Footer({invito = true}) {
  return (
    <footer className="text-base">
      {/* Newsletter: card bianca a raggio ampio su carta (DESIGN.md), sopra il blocco ghisa.
          Invito secondario: pulsante ghisa, la fiamma resta alla CTA "Parliamone". */}
      <section
        aria-labelledby="newsletter-title"
        className="bg-[var(--carta)] py-16 text-ghisa lg:py-24"
        data-header="light"
      >
        <div className="site-shell">
          <div className="grid gap-x-10 gap-y-10 rounded-[28px] bg-white p-8 md:p-12 lg:grid-cols-12 lg:p-16">
            <div className="lg:col-span-5">
              <span className="eyebrow-cinema" data-tono="chiaro">
                Newsletter
              </span>
              <TitoloDueTempi
                id="newsletter-title"
                tono="chiaro"
                riga="Eventi, demo e novità"
                accento="per il tuo locale."
                className="mt-6 text-[clamp(30px,3.4vw,48px)] !leading-none"
              />
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-acciaio">
                Ti scriviamo quando organizziamo showcooking e dimostrazioni, o
                quando pubblichiamo novità utili per chi lavora
                nell&apos;ho.re.ca.
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 lg:self-end">
              <NewsletterFormFooter groups={newsletterGroups} />
            </div>
          </div>
        </div>
      </section>

      <div className="bg-ghisa text-inox">
        <div className="site-shell">
          {invito && (
            <div className="border-b border-inox/20 py-20 lg:py-28">
              <TitoloDueTempi
                riga="Hai un progetto?"
                accento="Parliamone."
                className="max-w-5xl text-[clamp(36px,5.4vw,80px)] text-calce !leading-none"
              />
              <div className="mt-10 flex flex-col gap-4 text-xl md:flex-row md:items-baseline md:gap-10">
                <ContactModal
                  variant="progetto"
                  className={clsx(
                    'w-fit text-left font-medium text-fiamma underline decoration-fiamma/40 underline-offset-8 transition-colors hover:decoration-fiamma',
                    focus,
                  )}
                >
                  Raccontaci il tuo progetto
                </ContactModal>
                <p className="text-inox-muted">
                  oppure chiama il{' '}
                  <a
                    href="tel:+390804323431"
                    className={clsx(
                      'whitespace-nowrap font-medium text-calce transition-colors hover:text-fiamma',
                      focus,
                    )}
                  >
                    +39 080 4323 431
                  </a>
                </p>
              </div>
            </div>
          )}

          <div className="grid gap-x-10 gap-y-12 py-16 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link
                href="/"
                aria-label="Matarrese, pagina iniziale"
                className={clsx('block w-fit', focus)}
              >
                <Image
                  src="/img/logo-matarrese-bianco-350.png"
                  width={350}
                  height={26}
                  alt="Matarrese"
                  className="h-auto w-full max-w-[250px]"
                />
              </Link>
              <p className="mt-8 leading-relaxed text-inox-muted">
                Progetti, tecnologie e persone.
                <br />
                Al fianco di chi lavora nella ristorazione.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {social.map(([name, href]) => (
                  <li key={name}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={name}
                      title={name}
                      className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-inox transition-colors hover:border-fiamma hover:text-fiamma"
                    >
                      <SocialIcon name={name} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className={heading}>Vieni a trovarci</p>
              <address className="mb-4 not-italic leading-relaxed text-inox-muted">
                Contrada Popoleto, n.c.
                <br />
                70011 Alberobello (BA)
              </address>
              <a href="tel:+390804323431" className={link}>
                +39 080 4323 431
              </a>
              <a href="mailto:matarrese@matarrese.it" className={link}>
                matarrese@matarrese.it
              </a>
              <Link href="/contatti" className={link}>
                Come raggiungerci
              </Link>
            </div>

            <div>
              <p className={heading}>Orari e assistenza</p>
              <p className="mb-4 leading-relaxed text-inox-muted">
                Lunedì – venerdì
                <br />
                09:00 – 13:00 / 15:00 – 18:30
                <br />
                Sabato e domenica chiuso
              </p>
              <Link href="/assistenza#richiesta" className={link}>
                Assistenza tecnica
              </Link>
              <a href="tel:+390804323651" className={link}>
                +39 080 4323 651
              </a>
              <p className="mt-4 max-w-prose text-sm leading-relaxed text-inox-muted">
                Lun–ven, 08:30–13:00 / 15:00–17:30. Nei festivi risposta alle
                urgenze entro 24 ore; eventuale intervento con tariffa dedicata.
              </p>
            </div>

            <nav aria-label="Collegamenti nel footer">
              <p className={heading}>Il mondo Matarrese</p>
              <Link href="/azienda" className={link}>
                Azienda
              </Link>
              <Link href="/realizzazioni" className={link}>
                Realizzazioni
              </Link>
              <Link href="/eventi" className={link}>
                Eventi
              </Link>
              <Link href="/news" className={link}>
                News
              </Link>
              <Link href="/ricerca" className={link}>
                Ricerca e sviluppo
              </Link>
              <Link href="/faq" className={link}>
                Domande frequenti
              </Link>
              <a
                href="https://www.qucino.it/"
                target="_blank"
                rel="noreferrer"
                className={link}
              >
                Qucino
              </a>
              <a
                href="https://www.assogi.it/"
                target="_blank"
                rel="noreferrer"
                className={link}
              >
                ASSOGI
              </a>
            </nav>
          </div>

          <div className="flex flex-col gap-3 border-t border-inox/20 py-6 text-sm text-inox-muted md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              <span>© {new Date().getFullYear()} Matarrese srl</span>
              <span>P.IVA 04356890725</span>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              <Link href="/privacy-policy" className={link}>
                Privacy e condizioni
              </Link>
              <Link href="/cookie-policy" className={link}>
                Cookie policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
