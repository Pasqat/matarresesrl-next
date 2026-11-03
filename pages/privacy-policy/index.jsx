import Head from 'next/head'
import Link from 'next/link'

import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'

// Informativa ex art. 13 RGPD. I servizi elencati sono quelli che il sito usa davvero:
// se ne aggiungi o togli uno (pages/_app.js, pages/api/*, container GTM), aggiorna anche
// questa pagina e la cookie policy.
export default function PrivacyPolicy() {
  return (
    <div>
      <Head>
        <title>Trattamento dei dati | Matarrese srl</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Trattamento dei dati" />
        <meta
          property="og:description"
          content="Come Matarrese srl tratta i dati personali di chi visita il sito e lo contatta"
        />
        <meta
          property="og:url"
          content="https://www.matarrese.it/privacy-policy"
        />
      </Head>
      <Layout navbarTransparent footerInvito={false}>
        <PageHero title="Trattamento" accento="dei dati." tall={false} />
        <section className="bg-[var(--carta)] py-20 lg:py-28">
          <div className="site-shell cin-legale">
            <p className="cin-legale-versione">
              Versione 2.0 del 3 novembre 2026
            </p>
            <p>
              Questa informativa spiega quali dati personali raccogliamo quando
              visiti <Link href="/">www.matarrese.it</Link>, ci scrivi o compili
              un modulo del sito, perché lo facciamo, a chi li affidiamo e come
              puoi esercitare i tuoi diritti. È resa ai sensi dell’art. 13 del
              Regolamento UE 2016/679 (RGPD) e del D.lgs. 196/2003 come
              modificato dal D.lgs. 101/2018.
            </p>

            <h2>1. Chi è il titolare del trattamento</h2>
            <p>
              <strong>Matarrese s.r.l.</strong>
              <br />
              Sede legale: Contrada Popoleto, n.c., 70011 Alberobello (BA)
              <br />
              Codice fiscale e Partita IVA 04356890725
              <br />
              Telefono <a href="tel:+390804323431">080 4323 431</a>
              <br />
              Email{' '}
              <a href="mailto:matarrese@matarrese.it">matarrese@matarrese.it</a>{' '}
              · PEC{' '}
              <a href="mailto:matarrese.srl@pec.it">matarrese.srl@pec.it</a>
            </p>
            <p>
              <em>Referente interno per la privacy:</em> Pasquale Matarrese,{' '}
              <a href="mailto:pasquale.matarrese@matarrese.it">
                pasquale.matarrese@matarrese.it
              </a>
              , telefono <a href="tel:+390804323431">080 4323 431</a>.
            </p>
            <p>
              Non ricorrendone i presupposti (artt. 37 e seguenti del RGPD),
              Matarrese s.r.l. non ha nominato un Responsabile della protezione
              dei dati (DPO).
            </p>

            <h2>2. A cosa si applica questa informativa</h2>
            <p>
              Solo al sito www.matarrese.it. I siti esterni raggiungibili dai
              nostri link (per esempio i profili social o i siti dei marchi che
              distribuiamo) hanno le loro informative, che ti invitiamo a
              leggere.
            </p>

            <h2>3. Quali dati trattiamo, perché e per quanto tempo</h2>

            <h3>Dati di navigazione</h3>
            <p>
              Per funzionare, i server che ospitano il sito registrano alcuni
              dati tecnici: indirizzo IP, data e ora della richiesta, pagina
              richiesta, tipo di browser e di dispositivo. Servono a far
              funzionare il sito, a proteggerlo da abusi e a risolvere errori.
              Base giuridica: il nostro legittimo interesse (art. 6, par. 1,
              lett. f RGPD). Sono conservati per il tempo necessario a questi
              scopi e comunque non oltre 26 mesi, salvo richieste dell’autorità
              giudiziaria.
            </p>

            <h3>Statistiche di visita senza cookie</h3>
            <p>
              Contiamo le visite con <strong>Plausible Analytics</strong>, che
              non usa cookie, non raccoglie dati che ti identificano e conserva i
              dati su server nell’Unione europea, e misuriamo la velocità delle
              pagine con <strong>Vercel Speed Insights</strong>, che raccoglie
              solo dati tecnici anonimi. Base giuridica: legittimo interesse a
              capire come viene usato il sito e a migliorarlo.
            </p>

            <h3>Richieste inviate con i moduli del sito</h3>
            <p>
              Con i moduli puoi chiederci un progetto o un sopralluogo, segnalare
              un guasto, prenotare una visita o una demo in showroom, iscriverti
              a un evento o scriverci per altro. Raccogliamo i dati che inserisci:
              nome e cognome, email e/o telefono e, a seconda del modulo,
              attività, nome del locale o ragione sociale, indirizzo
              dell’intervento, attrezzatura e descrizione del guasto, giorno
              preferito, numero di partecipanti e il tuo messaggio.
            </p>
            <p>
              Li usiamo solo per rispondere alla tua richiesta e dare seguito a
              quello che ci chiedi. Base giuridica: l’esecuzione di misure
              precontrattuali o di un contratto su tua richiesta (art. 6, par. 1,
              lett. b RGPD); la casella sulla privacy nel modulo serve a
              confermare che hai letto questa informativa. I campi obbligatori
              sono quelli senza i quali non possiamo risponderti.
            </p>
            <p>
              Le richieste arrivano per email agli uffici competenti (le
              segnalazioni di guasto al nostro servizio di assistenza); le
              richieste commerciali sono registrate anche nel nostro gestionale
              dei contatti (CRM). Le conserviamo per non più di 2 anni
              dall’ultimo contatto, salvo che diventino un rapporto contrattuale
              o che servano più a lungo per obblighi di legge o per tutelare un
              nostro diritto.
            </p>

            <h3>Email e telefonate dirette</h3>
            <p>
              Se ci scrivi o ci chiami ai recapiti indicati sul sito, trattiamo i
              dati che ci comunichi con le stesse finalità, basi giuridiche e
              tempi delle richieste inviate con i moduli.
            </p>

            <h3>Newsletter</h3>
            <p>
              Se ti iscrivi alla newsletter raccogliamo la tua email e il settore
              che scegli, per mandarti inviti a eventi, dimostrazioni e novità
              utili per il tuo tipo di attività. Base giuridica: il tuo consenso
              (art. 6, par. 1, lett. a RGPD), che dai spuntando la casella del
              modulo. Puoi cancellarti quando vuoi con il link in fondo a ogni
              email o scrivendoci; i dati restano finché resti iscritto. Gli
              invii sono gestiti con <strong>Mailchimp</strong>, che ci dice
              quante email vengono aperte e quali link vengono cliccati.
            </p>

            <h3>Cookie e strumenti di terze parti</h3>
            <p>
              Senza il tuo consenso il sito usa solo cookie tecnici. Solo se
              scegli «Accetto tutti i cookies» nel banner vengono attivati{' '}
              <strong>Google Analytics</strong>, il{' '}
              <strong>Conversion Linker di Google Ads</strong>, il{' '}
              <strong>Meta Pixel</strong> e il{' '}
              <strong>LinkedIn Insight Tag</strong>, caricati anche tramite
              Google Tag Manager. Questi strumenti{' '}
              <strong>profilano la navigazione, ma solo dopo il tuo consenso</strong>
              : servono a misurare i risultati delle nostre campagne e a
              mostrarti nostri annunci su Google, Facebook, Instagram e LinkedIn.
              Base giuridica: il tuo consenso, che puoi revocare in ogni momento.
              Tutti i dettagli, la durata di ogni cookie e il modo per cambiare
              la tua scelta sono nella{' '}
              <Link href="/cookie-policy">cookie policy</Link>.
            </p>

            <h3>Mappa della pagina Contatti</h3>
            <p>
              La mappa nella pagina Contatti è fornita da{' '}
              <strong>Google Maps</strong>: per mostrarla il tuo browser si
              collega ai server di Google, che ricevono il tuo indirizzo IP.
            </p>

            <h2>4. A chi affidiamo i dati</h2>
            <p>
              I dati sono trattati dal nostro personale autorizzato e dai
              fornitori che ci aiutano a far funzionare il sito e a gestire le
              richieste, nominati responsabili del trattamento (art. 28 RGPD):
            </p>
            <ul>
              <li>
                <strong>Vercel Inc.</strong>: hosting del sito e misurazione
                anonima delle prestazioni;
              </li>
              <li>
                il fornitore di hosting del sistema che gestisce i contenuti del
                sito (articoli, realizzazioni, eventi);
              </li>
              <li>
                <strong>Resend</strong>: invio delle email generate dai moduli;
              </li>
              <li>il fornitore della nostra posta elettronica aziendale;</li>
              <li>
                <strong>Odoo S.A.</strong>: gestionale dei contatti commerciali
                (CRM);
              </li>
              <li>
                <strong>Intuit Inc. (Mailchimp)</strong>: invio della
                newsletter;
              </li>
              <li>
                <strong>Plausible Insights OÜ</strong>: statistiche di visita
                senza cookie;
              </li>
              <li>
                consulenti e tecnici incaricati della manutenzione del sito,
                quando serve.
              </li>
            </ul>
            <p>
              <strong>Google</strong> (Analytics, Ads, Tag Manager, Maps),{' '}
              <strong>Meta Platforms</strong> e <strong>LinkedIn</strong>{' '}
              trattano i dati raccolti dai rispettivi strumenti anche come
              titolari autonomi, secondo le proprie informative. I dati possono
              essere comunicati alle autorità quando lo prevede la legge. Non
              diffondiamo né vendiamo i tuoi dati. L’elenco aggiornato dei
              responsabili è disponibile su richiesta.
            </p>

            <h2>5. Trasferimenti fuori dall’Unione europea</h2>
            <p>
              Alcuni fornitori (Vercel, Resend, Mailchimp, Google, Meta,
              LinkedIn) possono trattare i dati anche negli Stati Uniti. In
              questi casi il trasferimento avviene sulla base della decisione di
              adeguatezza della Commissione europea per le società aderenti al
              Data Privacy Framework UE-USA o, in mancanza, delle clausole
              contrattuali standard approvate dalla Commissione (artt. 45 e 46
              RGPD).
            </p>

            <h2>6. I tuoi diritti</h2>
            <p>
              In base agli artt. 15-22 del RGPD puoi chiederci in qualsiasi
              momento di accedere ai tuoi dati, correggerli, cancellarli,
              limitarne il trattamento, riceverli in un formato leggibile
              (portabilità) e opporti al trattamento basato sul legittimo
              interesse. Puoi revocare il consenso dato per la newsletter o per i
              cookie, senza che questo tocchi quanto fatto prima della revoca.
            </p>
            <p>
              Basta scrivere a{' '}
              <a href="mailto:pasquale.matarrese@matarrese.it">
                pasquale.matarrese@matarrese.it
              </a>{' '}
              o alla PEC{' '}
              <a href="mailto:matarrese.srl@pec.it">matarrese.srl@pec.it</a>,
              oppure per posta a Matarrese s.r.l., Contrada Popoleto, n.c., 70011
              Alberobello (BA). Ti rispondiamo entro un mese.
            </p>

            <h2>7. Reclamo al Garante</h2>
            <p>
              Se ritieni che il trattamento violi la normativa, puoi proporre
              reclamo al Garante per la protezione dei dati personali, anche dal
              sito{' '}
              <a
                href="https://www.garanteprivacy.it"
                target="_blank"
                rel="noreferrer"
              >
                www.garanteprivacy.it
              </a>
              .
            </p>

            <h2>8. Decisioni automatizzate</h2>
            <p>
              Non prendiamo decisioni che ti riguardano in modo solo
              automatizzato. L’unica profilazione è quella degli strumenti di
              marketing descritti sopra, attivi solo se dai il consenso nel
              banner dei cookie.
            </p>

            <h2>9. Sicurezza</h2>
            <p>
              Il sito è servito solo in HTTPS e i moduli hanno protezioni contro
              lo spam e gli invii ripetuti. Trattiamo i dati con strumenti
              informatici e, quando serve, cartacei, adottando misure tecniche e
              organizzative adeguate al rischio (art. 32 RGPD).
            </p>

            <h2>10. Modifiche</h2>
            <p>
              Aggiorniamo questa informativa quando cambiano il sito, i servizi
              che usiamo o la normativa. La versione in vigore è sempre questa
              pagina, con la data indicata in alto.
            </p>
          </div>
        </section>
      </Layout>
    </div>
  )
}
