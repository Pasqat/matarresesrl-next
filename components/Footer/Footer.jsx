import Image from 'next/image'
import Link from 'next/link'
import NewsletterFormFooter from '../Form/NewsletterFormFooter'
import {newsletterGroups} from '../../data/newsletter-groups'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-newsletter">
        <NewsletterFormFooter groups={newsletterGroups} />
      </div>
      <div className="site-shell footer-grid">
        <div className="footer-brand">
          <Link href="/" aria-label="Matarrese, pagina iniziale">
            <Image
              src="/img/logo-matarrese-bianco-350.png"
              width={263}
              height={35}
              alt="Matarrese"
            />
          </Link>
          <p>
            Progetti, tecnologie e persone.
            <br />
            Al fianco di chi lavora nella ristorazione.
          </p>
          <div className="footer-social">
            <a
              href="https://www.instagram.com/matarrese.srl/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/company/matarrese-srl/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://www.facebook.com/matarresesrl"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://www.youtube.com/@matarresesrl"
              target="_blank"
              rel="noreferrer"
            >
              YouTube
            </a>
          </div>
        </div>
        <div>
          <h2>Vieni a trovarci</h2>
          <p>
            Contrada Popoleto, n.c.
            <br />
            70011 Alberobello (BA)
          </p>
          <a href="tel:+390804323431">+39 080 4323 431</a>
          <a href="mailto:matarrese@matarrese.it">matarrese@matarrese.it</a>
          <Link href="/contatti">Come raggiungerci</Link>
        </div>
        <div>
          <h2>Orari e assistenza</h2>
          <p>
            Lunedì – venerdì
            <br />
            09:00 – 13:00 / 15:00 – 18:30
            <br />
            Sabato e domenica chiuso
          </p>
          <Link href="/assistenza">Assistenza tecnica</Link>
          <a href="tel:+390804323651">+39 080 4323 651</a>
          <p className="footer-small">
            Lun–ven, 08:30–13:00 / 15:00–17:30. Nei festivi risposta alle
            urgenze entro 24 ore; eventuale intervento con tariffa dedicata.
          </p>
        </div>
        <nav aria-label="Collegamenti nel footer">
          <h2>Il mondo Matarrese</h2>
          <Link href="/azienda">Azienda</Link>
          <Link href="/realizzazioni">Realizzazioni</Link>
          <Link href="/eventi">Eventi</Link>
          <Link href="/news">News</Link>
          <Link href="/ricerca">Ricerca e sviluppo</Link>
          <Link href="/faq">Domande frequenti</Link>
          <a href="https://www.qucino.it/" target="_blank" rel="noreferrer">
            Qucino
          </a>
          <a href="https://www.assogi.it/" target="_blank" rel="noreferrer">
            ASSOGI
          </a>
        </nav>
      </div>
      <div className="site-shell footer-bottom">
        <span>
          © {new Date().getFullYear()} Matarrese srl · P.IVA 04356890725
        </span>
        <div>
          <Link href="/privacy-policy">Privacy e condizioni</Link>
          <Link href="/cookie-policy">Cookie policy</Link>
        </div>
      </div>
    </footer>
  )
}
