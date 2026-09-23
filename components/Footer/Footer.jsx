import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import NewsletterFormFooter from '../Form/NewsletterFormFooter'
import {newsletterGroups} from '../../data/newsletter-groups'

// Su ghisa l'outline globale (#995200) scende sotto 3:1: qui si usa la fiamma.
const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-fiamma'
const link = clsx(
  'block w-fit py-1 text-inox transition-colors hover:text-fiamma',
  focus,
)
const heading = 'mb-5 text-base font-medium text-calce'

const social = [
  ['Instagram', 'https://www.instagram.com/matarrese.srl/'],
  ['LinkedIn', 'https://www.linkedin.com/company/matarrese-srl/'],
  ['Facebook', 'https://www.facebook.com/matarresesrl'],
  ['YouTube', 'https://www.youtube.com/@matarresesrl'],
]

export default function Footer() {
  return (
    <footer className="text-base">
      {/* Newsletter: fascia calce chiara sopra il blocco scuro. Il form è
          pensato per fondi chiari; qui si adattano solo le classi visive:
          input bianchi (featured), link privacy in fiamma-testo (AA su
          chiaro), margini allineati a .site-shell. */}
      <div className="border-t border-ghisa/10 bg-calce py-14 text-ghisa">
        <div className="site-shell [&>div]:mx-0 [&_a]:text-fiamma-testo [&_form]:max-w-none">
          <NewsletterFormFooter groups={newsletterGroups} featured />
        </div>
      </div>

      <div className="bg-ghisa text-inox">
        <div className="site-shell">
          <div className="border-b border-inox/20 py-20 lg:py-28">
            {/* copy da approvare */}
            <h2 className="type-display max-w-5xl text-[1.875rem] text-calce md:text-5xl lg:text-7xl">
              Hai un progetto? Parliamone.
            </h2>
            <div className="mt-10 flex flex-col gap-4 text-xl md:flex-row md:items-baseline md:gap-10">
              <Link
                href="/contatti"
                className={clsx(
                  'w-fit font-medium text-fiamma underline decoration-fiamma/40 underline-offset-8 transition-colors hover:decoration-fiamma',
                  focus,
                )}
              >
                {/* copy da approvare */}
                Scrivici dalla pagina contatti
              </Link>
              <p className="text-inox-muted">
                {/* copy da approvare */}
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

          <div className="grid gap-x-10 gap-y-12 py-16 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link
                href="/"
                aria-label="Matarrese, pagina iniziale"
                className={clsx('block w-fit', focus)}
              >
                <Image
                  src="/img/logo-matarrese-bianco-350.png"
                  width={263}
                  height={35}
                  alt="Matarrese"
                  className="h-auto w-full max-w-[250px]"
                />
              </Link>
              <p className="mt-8 leading-relaxed text-inox-muted">
                Progetti, tecnologie e persone.
                <br />
                Al fianco di chi lavora nella ristorazione.
              </p>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                {social.map(([name, href]) => (
                  <li key={name}>
                    <a href={href} target="_blank" rel="noreferrer" className={link}>
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className={heading}>Vieni a trovarci</h2>
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
              <h2 className={heading}>Orari e assistenza</h2>
              <p className="mb-4 leading-relaxed text-inox-muted">
                Lunedì – venerdì
                <br />
                09:00 – 13:00 / 15:00 – 18:30
                <br />
                Sabato e domenica chiuso
              </p>
              <Link href="/assistenza" className={link}>
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
              <h2 className={heading}>Il mondo Matarrese</h2>
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
              <a href="https://www.qucino.it/" target="_blank" rel="noreferrer" className={link}>
                Qucino
              </a>
              <a href="https://www.assogi.it/" target="_blank" rel="noreferrer" className={link}>
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
