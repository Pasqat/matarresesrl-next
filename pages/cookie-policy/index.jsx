import Head from 'next/head'
import Link from 'next/link'
import {resetCookieConsentValue} from 'react-cookie-consent'

import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'

// Cookie realmente impostati: banner (pages/_app.js), Meta Pixel
// (pages/_app.js) e i tag del container GTM (GA4, Conversion Linker, LinkedIn Insight).
// Se cambia il container GTM, aggiorna la tabella.
const COOKIE = [
  {
    gruppo: 'Tecnici: sempre attivi, non richiedono consenso',
    righe: [
      [
        'CookieConsent',
        'Matarrese (prima parte)',
        'Ricorda se hai accettato o rifiutato i cookie',
        '12 mesi',
      ],
    ],
  },
  {
    gruppo: 'Statistici: solo dopo il consenso',
    righe: [
      ['_ga', 'Google Analytics', 'Distingue i visitatori', '13 mesi'],
      [
        '_ga_00G4B92CP8',
        'Google Analytics',
        'Ricorda la sessione di visita',
        '13 mesi',
      ],
    ],
  },
  {
    gruppo: 'Marketing e profilazione: solo dopo il consenso',
    righe: [
      [
        '_gcl_au',
        'Google Ads',
        'Collega le visite agli annunci Google che le hanno portate',
        '3 mesi',
      ],
      [
        '_fbp',
        'Meta (Facebook, Instagram)',
        'Misura le campagne e mostra annunci a chi ha visitato il sito',
        '3 mesi',
      ],
      [
        'bcookie, li_gc',
        'LinkedIn',
        'Riconosce il browser e ricorda le scelte sui cookie di LinkedIn',
        'fino a 1 anno',
      ],
      [
        'lidc, li_sugr, UserMatchHistory, AnalyticsSyncHistory',
        'LinkedIn',
        'Misura le campagne e mostra annunci a chi ha visitato il sito',
        'da 1 giorno a 3 mesi',
      ],
      [
        '__cf_bm',
        'LinkedIn (tramite Cloudflare)',
        'Distingue le persone dai bot',
        '30 minuti',
      ],
    ],
  },
]

const INFORMATIVE = [
  ['Google', 'https://policies.google.com/technologies/cookies?hl=it'],
  ['Meta', 'https://www.facebook.com/privacy/policies/cookies/'],
  ['LinkedIn', 'https://it.linkedin.com/legal/cookie-policy'],
]

// Toglie la scelta salvata e ricarica: il banner ricompare e gli strumenti di terze parti
// restano spenti finché non si accetta di nuovo.
function cambiaScelta() {
  resetCookieConsentValue()
  window.location.reload()
}

export default function CookiePolicy() {
  return (
    <div>
      <Head>
        <title>Cookie policy | Matarrese srl</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Cookie policy" />
        <meta
          property="og:description"
          content="Quali cookie usa il sito di Matarrese srl e come cambiare la tua scelta"
        />
        <meta
          property="og:url"
          content="https://www.matarrese.it/cookie-policy"
        />
      </Head>
      <Layout navbarTransparent footerInvito={false}>
        <PageHero title="Uso" accento="dei cookie." tall={false} />
        <section className="bg-[var(--carta)] py-20 lg:py-28">
          <div className="site-shell cin-legale">
            <p className="cin-legale-versione">
              Versione 2.0 del 3 novembre 2026
            </p>
            <p>
              Questa pagina spiega quali cookie usa il sito{' '}
              <Link href="/">www.matarrese.it</Link>, gestito da Matarrese
              s.r.l. (Contrada Popoleto, n.c., 70011 Alberobello (BA), P.IVA
              04356890725), e come puoi cambiare la tua scelta. Per tutto il
              resto sul trattamento dei dati c’è l’
              <Link href="/privacy-policy">informativa privacy</Link>.
            </p>

            <h2>Cosa sono i cookie</h2>
            <p>
              Sono piccoli file di testo che un sito salva nel tuo browser per
              ricordare qualcosa tra una pagina e l’altra o tra una visita e
              l’altra. Quelli <strong>tecnici</strong> servono a far funzionare
              il sito; quelli <strong>statistici</strong> misurano come viene
              usato; quelli di <strong>marketing</strong> permettono di
              misurare le campagne pubblicitarie e di mostrarti annunci in base
              alla tua navigazione (profilazione). Possono essere di prima parte,
              cioè nostri, o di terze parti, cioè di altri fornitori.
            </p>

            <h2>Come li usiamo</h2>
            <ul>
              <li>
                <strong>Finché non scegli</strong>, e se scegli «Declino», il
                sito usa solo i cookie tecnici.
              </li>
              <li>
                <strong>Se scegli «Accetto tutti i cookies»</strong> si attivano
                anche Google Analytics, il Conversion Linker di Google Ads, il
                Meta Pixel e il LinkedIn Insight Tag, in parte tramite Google Tag
                Manager. Sono gli unici strumenti che profilano la navigazione, e
                lo fanno solo dopo il tuo consenso.
              </li>
              <li>
                Le statistiche di base (Plausible Analytics) e la misura della
                velocità delle pagine (Vercel Speed Insights) funzionano{' '}
                <strong>senza cookie</strong> e senza dati che ti identificano.
              </li>
              <li>
                I pulsanti di condivisione e i link ai nostri profili social sono
                semplici link: non caricano nulla dai social finché non ci
                clicchi.
              </li>
              <li>
                La mappa nella pagina Contatti è fornita da Google Maps: per
                mostrarla il browser si collega ai server di Google, che ricevono
                il tuo indirizzo IP. Per questo si carica solo se hai accettato i
                cookie o se premi «Mostra la mappa».
              </li>
            </ul>

            <h2>Cookie usati dal sito</h2>
            <p>
              La durata è quella massima indicata dai fornitori; i nomi e le
              durate dei cookie di terze parti possono cambiare per scelta dei
              fornitori stessi.
            </p>
            <div className="cin-legale-tabella">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Fornitore</th>
                    <th scope="col">A cosa serve</th>
                    <th scope="col">Durata</th>
                  </tr>
                </thead>
                {COOKIE.map(({gruppo, righe}) => (
                  <tbody key={gruppo}>
                    <tr>
                      <th scope="colgroup" colSpan={4}>
                        {gruppo}
                      </th>
                    </tr>
                    {righe.map(([nome, chi, scopo, durata]) => (
                      <tr key={nome}>
                        <td>
                          <code>{nome}</code>
                        </td>
                        <td>{chi}</td>
                        <td>{scopo}</td>
                        <td>{durata}</td>
                      </tr>
                    ))}
                  </tbody>
                ))}
              </table>
            </div>

            <h2>Come cambiare la tua scelta</h2>
            <p>
              Puoi cambiare idea quando vuoi: con questo pulsante cancelliamo la
              scelta salvata e il banner ricompare.
            </p>
            <p>
              <button type="button" className="cin-btn" onClick={cambiaScelta}>
                Cambia le preferenze sui cookie
              </button>
            </p>
            <p>
              Se revochi il consenso, gli strumenti di terze parti smettono di
              caricarsi; per togliere anche i cookie che hanno già salvato puoi
              cancellarli dalle impostazioni del browser:{' '}
              <a
                href="https://support.google.com/chrome/answer/95647?hl=it"
                target="_blank"
                rel="noreferrer"
              >
                Chrome
              </a>
              ,{' '}
              <a
                href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie"
                target="_blank"
                rel="noreferrer"
              >
                Firefox
              </a>
              ,{' '}
              <a
                href="https://support.apple.com/it-it/guide/safari/sfri11471/mac"
                target="_blank"
                rel="noreferrer"
              >
                Safari
              </a>
              ,{' '}
              <a
                href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                target="_blank"
                rel="noreferrer"
              >
                Edge
              </a>
              . Bloccare i cookie tecnici può impedire ad alcune parti del sito
              di funzionare.
            </p>

            <h2>Informative dei fornitori</h2>
            <p>
              Per sapere come le terze parti usano i dati raccolti dai loro
              cookie:{' '}
              {INFORMATIVE.map(([nome, href], i) => (
                <span key={nome}>
                  {i ? ', ' : ''}
                  <a href={href} target="_blank" rel="noreferrer">
                    {nome}
                  </a>
                </span>
              ))}
              .
            </p>
          </div>
        </section>
      </Layout>
    </div>
  )
}
