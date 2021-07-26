import Head from "next/head";
import Link from "next/link";

import Container from "../components/Container";
import Header from "../components/Header/Header";
import Layout from "../components/Layout";

export default function PrivacyPolicy() {
  return (
    <div>
      <Head>
        <title>Trattamento dei dati | Matarrese srl</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Trattamento dei dati" />
        <meta
          property="og:description"
          content="Questa pagina descrive le modalità di trattamento dei dati personali degli utenti"
        />
        <meta
          property="og:url"
          content="https://www.matarrese.it/privacy-policy"
        />
      </Head>
      <Layout>
        <Container>
          <Header>Trattamento dei dati - privacy policy</Header>
          <main className="container px-8 pb-20 mx-auto text-justify text-gray-900">
            <h2 className="text-3xl text-center">Privacy policy sito web</h2>
            <p className="py-4 text-sm italic text-center">
              Versione 1.0 del 01/01/2019
            </p>
            <div className="pb-4">
              Questa pagina descrive le modalità di trattamento dei dati
              personali degli utenti che consultano il Sito Web{" "}
              <Link href="https://www.matarrese.it">
                <a className="text-yellow-600">www.matarrese.it</a>
              </Link>{" "}
              oppure inviano messaggi di posta elettronica (e-mail) agli
              indirizzi disponibili sul Sito medesimo o ancora compilano ed
              inoltrano moduli di contatto presenti anch’essi sul Sito.
            </div>
            <section>
              <h3 className="pb-3 text-2xl underline">
                Sezione 1 – Perché questa Privacy Policy?
              </h3>
              <div className="pb-4">
                <p>
                  A partire dal 25 maggio 2018 in tutti gli Stati dell’Unione
                  europea si applicano nuove regole sulla privacy, imposte dal
                  Regolamento UE 2016/679 (d’ora in poi, anche RGPD), oltre che
                  da leggi nazionali. Il RGPD prevede una maggiore tutela degli
                  utenti e impone nuovi obblighi e responsabilità a carico di
                  chi tratta dati personali, anche attraverso i Siti Web.
                </p>
                <p>
                  Per maggiori informazioni sul RGPD può consultare l’utile e
                  approfondita Sezione a cura del Garante italiano per la
                  Protezione dei Dati Personali: La aiuterà a comprendere meglio
                  le nuove regole e a conoscere i Suoi diritti. Un principio
                  fondamentale è quello della trasparenza: gli utenti devono
                  sapere in anticipo, in modo chiaro e completo quali
                  informazioni personali saranno raccolte, chi le tratterà, per
                  quali motivi e per quanto tempo, se saranno utilizzate per
                  scopi commerciali o per scopi di profilazione, se saranno
                  comunicate a terzi, ecc. e poter controllare, in modo
                  efficace, la gestione dei propri dati.
                </p>
                <p>
                  Questa informativa è fornita in conformità all’articolo 13 del
                  RGPD e si ispira anche alle Linee Guida del Gruppo di lavoro
                  ex Articolo 29 sulla Trasparenza.
                </p>
                <p>
                  L’informativa è rivolta a tutti coloro che interagiscono con
                  il Sito{" "}
                  <Link href="https://www.matarrese.it">
                    <a className="text-yellow-600">www.matarrese.it</a>
                  </Link>
                  , ire dall’indirizzo{" "}
                  <Link href="https://www.matarrese.it">
                    <a className="text-yellow-600">www.matarrese.it</a>
                  </Link>{" "}
                  consultazione del presente Sito, oltre che con l’invio di
                  comunicazioni ai contatti presenti sul Sito{" "}
                  <Link href="https://www.matarrese.it">
                    <a className="text-yellow-600">www.matarrese.it</a>
                  </Link>{" "}
                  e con pecifiche, possono essere trattati dati che consentano
                  di identificare – direttamente o indirettamente – gli utenti.
                </p>
              </div>
            </section>
            <section>
              <h3 className="pb-3 text-2xl underline">
                Sezione 2 – Siti Web ai quali si applica la presente Privacy
                Policy.
              </h3>
              <div className="pb-4">
                L’informativa è riferita solo al Sito{" "}
                <Link href="htts://www.matarrese.it">
                  <a className="text-yellow-600">www.matarrese.it</a>
                </Link>{" "}
                e non riguarda altri Siti Web eventualmente consultati dagli
                utenti mediante i link (collegamenti ipertestuali) in esso
                contenuti, totalmente estranei alla sfera del Titolare del
                trattamento <strong>Marattese s.r.l.</strong>
              </div>
            </section>
            <section>
              <h3 className="pb-3 text-2xl underline">
                Sezione 3 – Titolare del trattamento e contatti.
              </h3>
              <div className="pb-4">
                Il Titolare del trattamento dei Suoi dati personali di cui alla
                presente Informativa è <strong>Marattese s.r.l.</strong>,
                accessibile per ogni comunicazione o richiesta in merito ai Suoi
                dati ai seguenti contatti:
                <p className="my-2">
                  Sede legale in Alberobello,
                  <p>C.da Popoleto, n.c.</p>
                  <p>Cod. Fisc. e P. IVA 04356890725</p>
                </p>
                <p className="my-2">
                  Tel.{" "}
                  <a href="tel:00390804323431" className="text-yellow-600">
                    0804323431
                  </a>
                  , Fax <span className="text-yellow-600">0804322662</span>{" "}
                </p>
                PEC{" "}
                <a
                  href="mailto:matarrese.srl@pec.it"
                  className="text-yellow-500 "
                >
                  matarrese.srl@pec.it
                </a>{" "}
                <div className="py-2">
                  <p className="italic">Referente interno designato:</p>
                  <p>Matarrese Roberto</p>
                  <a
                    href="mailto:ufficio.tecnico@matarrese.it"
                    className="text-yellow-500"
                  >
                    ufficio.tecnico@matarrese.it
                  </a>
                  {" - "}
                  <a href="tel:00393939776735" className="text-yellow-500">
                    3939776735
                  </a>{" "}
                </div>
              </div>
            </section>
            <section>
              <h3 className="pb-3 text-2xl underline">
                Sezione 4 – Responsabile della Protezione dei Dati Personali
                (Data Protection Officer o DPO).
              </h3>
              <div className="pb-4">
                Non ricorrendo i presupposti di Regolamento,{" "}
                <strong>Marattese s.r.l.</strong>
                non ha nominato il Responsabile della Protezione dei dati
                personali ai sensi e per gli effetti di cui agli artt. 37 e ss.
                del Regolamento cit.
              </div>
            </section>
            <section>
              <h3 className="pb-3 text-2xl underline">
                Sezione 5 – Tipologia di dati trattati, finalità e base
                giuridica del trattamento.
              </h3>
              <div className="pb-4">
                <ol className="pl-6 list-alpha">
                  <li className="pb-2">
                    <span className="font-bold text-gray-700">
                      Dati di navigazione.
                    </span>{" "}
                    I sistemi informatici e le procedure software connesse al
                    funzionamento del Sito{" "}
                    <Link href="htts://www.matarrese.it">
                      <a className="text-yellow-600">www.matarrese.it</a>
                    </Link>{" "}
                    potranno avere la necessità di memorizzare alcuni Suoi dati
                    di navigazione, la raccolta dei quali – comunque legata
                    all’uso dei protocolli di comunicazione di Internet – non è
                    effettuata al diretto fine di associare i dati medesimi alla
                    Sua identità ma è connessa a necessità di funzionamento del
                    Sito internet. Tuttavia, i dati di navigazione così
                    raccolti, mediante elaborazioni e associazioni anche con
                    dati eventualmente detenuti da terzi, potrebbero consentire
                    la Sua identificazione (es. indirizzi IP, dominio dei
                    computer, risorse o orari delle richieste, altri parametri
                    comunque connessi al sistema operativo dell’utente, ecc.). I
                    dati in questione, strettamente utilizzati al fine di
                    consentire all’utente medesimo l’utilizzo delle funzionalità
                    del Sito Web, consentono anche di ottenere informazioni
                    statistiche anonime sull’uso del Sito e di monitorare il
                    corretto funzionamento dei servizi offerti. La base
                    giuridica di tali trattamenti è il legittimo interesse del
                    Titolare (art. 6, c. 1, lett. f) Regolamento UE 2016/679)
                    purché non prevalgano interessi, diritti e libertà
                    fondamentali dell’interessato. I dati di navigazione
                    persisteranno per 26 mesi e verranno cancellati
                    automaticamente, salvo motivi di verifiche e/o accertamenti
                    da parte dell’Autorità Giudiziaria.
                  </li>
                  <li className="pb-2">
                    <span className="font-bold text-gray-700">
                      Cookies e altri sistemi di tracciamento.
                    </span>{" "}
                    Il Sito Web utilizza cookies tecnici (cookies di
                    navigazione, analytics, di funzionalità); le tipologie di
                    cookies utilizzati sono:
                    <ul className="py-4 pl-8 list-disc">
                      <li>Cookies di prima parte;</li>
                      <li>Cookies di terzi;</li>
                      <li>Cookies di sessione; </li>
                      <li>Cookies persistenti; </li>
                      <li>Cookies essenziali; </li>
                      <li>Cookies funzionali; </li>
                      <li>Cookies di condivisone sui Social Network;</li>
                    </ul>
                    Il Sito Web non utilizza cookies per profilazione utenti e
                    non sono utilizzati altri metodi di tracciamento. Per
                    saperne di più leggi la nostra{" "}
                    <Link href="/cookie-policy">
                      <a className="text-yellow-500">Cookie Policy</a>
                    </Link>
                  </li>
                  <li>
                    <span className="font-bold text-gray-700">
                      Dati forniti volontariamente dall’utente.
                    </span>{" "}
                    <strong>Marattese s.r.l.</strong>
                    potrà acquisire il Suo nome e i Suoi dati di contatto nonché
                    eventuali altri Suoi dati personali, da Lei volontariamente
                    trasmessi tramite l’invio di messaggi di posta elettronica
                    agli indirizzi presenti sul Sito{" "}
                    <Link href="htts://www.matarrese.it">
                      <a className="text-yellow-600">www.matarrese.it</a>
                    </Link>{" "}
                    o tramite la compilazione e successivo inoltro di moduli
                    contatto presenti anch’essi su alcune pagine del Sito Web.
                    Il trattamento di tali dati personali è requisito necessario
                    per rispondere alle Sue richieste e la base giuridica è il
                    Suo consenso espresso in qualità di interessato. I dati
                    verranno conservati per un termine non superiore a 2 anni
                    per consentire una corretta gestione del rapporto, salvo che
                    emerga una ulteriore finalità in grado di legittimare il
                    trattamento dei dati per più lunghi periodi (es. tutela di
                    un diritto in giudizio od obblighi di legge)
                  </li>
                </ol>
              </div>
            </section>
            <section>
              <h3 className="pb-3 text-2xl underline">
                Sezione 6 – Destinatari dei dati personali (anche individuati
                per categorie).
              </h3>
              <div className="pb-4">
                <em>Dati di navigazione</em>, i cui destinatari sono:
                <ul className="list-disc py-4 pl-6">
                  <li>
                    dipendenti/collaboratori/addetti di{" "}
                    <strong>Marattese s.r.l.</strong>,
                  </li>
                  <li>
                    fornitori di servizi legati alla gestione e al funzionamento
                    del sito{" "}
                    <Link href="htts://www.matarrese.it">
                      <a className="text-yellow-600">www.matarrese.it</a>
                    </Link>{" "}
                  </li>
                </ul>
                <em>Dati forniti volontariamente dall’utente</em>, i cui
                destinatari sono:
                <ul className="list-disc py-4 pl-6">
                  <li>
                    dipendenti/collaboratori/addetti di{" "}
                    <strong>Marattese s.r.l.</strong>;
                  </li>
                  <li>
                    fornitori di servizi e-mail, servizi legati alla gestione e
                    al funzionamento del sito{" "}
                    <Link href="htts://www.matarrese.it">
                      <a className="text-yellow-600">www.matarrese.it</a>
                    </Link>{" "}
                    (tra cui anche Google Adwords, Google Analytics), servizi di
                    cloud (Dropbox, Amazon Drive, Google Drive), servizi di
                    hosting e server virtuali, servizi di connettività e
                    telefonia, servizi di chat e comunicazione (es. skype,
                    whatsapp, gmail), servizi di mailing list, servizi di
                    trasferimento file (es. wetransfer), servizi di assistenza
                    da remoto (es. teamviewer);
                  </li>
                  <li>social network (es. Facebook, Instagram, Twitter);</li>
                  <li>
                    eventuali addetti a occasionali operazioni di manutenzione e
                    riparazione;
                  </li>
                  <li>
                    autorità competenti se previsto dalla normativa vigente o su
                    richiesta di soggetti legittimati.
                  </li>
                </ul>
                I soggetti sopra indicati, talvolta operano in totale autonomia
                cioè come autonomi titolari del trattamento, altre volte come
                responsabili del trattamento nominati da{" "}
                <strong>Marattese s.r.l.</strong> l’elenco completo e aggiornato
                dei soggetti destinatari dei dati personali è a disposizione
                presso la sede di <strong>Marattese s.r.l.</strong>
              </div>
            </section>
            <seciton>
              <h3 className="pb-3 text-2xl underline">
                Sezione 7 – Eventuale trasferimento dei dati verso Paesi Terzi.
              </h3>
              <div className="pb-4">
                I suoi dati personali sono trattati da{" "}
                <strong>Marattese s.r.l.</strong>
                all’interno dell’Unione Europea e non vengono diffusi. Se
                necessario, per ragioni di natura tecnico/operativa e comunque
                nell’ambito delle finalità di cui sopra, i dati di navigazione e
                i dati inviati spontaneamente dagli utenti attraverso i diversi
                canali messi a disposizione dal Sito{" "}
                <Link href="htts://www.matarrese.it">
                  <a className="text-yellow-600">www.matarrese.it</a>
                </Link>{" "}
                potrebbero essere trasferiti su server ubicati in Paesi
                extra-UE, qualora i fornitori di servizi informatici e i
                programmi impiegati da <strong>Marattese s.r.l.</strong>, sopra
                indicati quali destinatari, lo prevedano o impieghino tecnologia
                di <em>cloud computing.</em> Tuttavia, Le ricordiamo che{" "}
                <strong>Marattese s.r.l.</strong> ha selezionato attentamente
                solo fornitori di servizi in grado di offrire un elevato livello
                di sicurezza e protezione dei dati personali.
              </div>
            </seciton>
            <section>
              <h3 className="pb-3 text-2xl underline">
                Sezione 8 – I Suoi diritti come interessato.
              </h3>
              <div className="pb-4">
                La informiamo che Lei, in qualità di Interessato, può esercitare
                tutti i diritti riconosciuti dal Regolamento UE 2016/679, artt.
                15-21, in particolare: diritto di accesso; diritto di rettifica;
                diritto alla cancellazione (c.d. “diritto all’oblio”); diritto
                di limitazione di trattamento; diritto a che il Titolare
                notifichi la rettifica o la cancellazione ai destinatari;
                diritto alla portabilità dei dati; diritto di opposizione che
                potrà essere esercitato in qualsiasi momento salvo che
                sussistano motivi legittimi che consentano al Titolare di
                continuare il trattamento perché prevalenti sui diritti /
                interessi / libertà dell’interessato; diritto di revocare il
                consenso precedentemente accordato, anche semplicemente inviando
                la revoca al seguente indirizzo:{" "}
                <strong>Marattese s.r.l.</strong>, C.da Popoleto, n.c. 70011
                Alberobello (BA), salva la liceità del trattamento dati basata
                sul consenso ed effettuato prima della revoca. Tutti i diritti
                sopra descritti potranno essere esercitati con richiesta rivolta
                senza formalità, anche via e-mail all’indirizzo{" "}
                <a
                  href="mailto:ufficio.tecnico@matarrese.it"
                  className="text-yellow-600"
                >
                  ufficio.tecnico@matarrese.it
                </a>
                .
              </div>
            </section>
            <section>
              <h3 className="pb-3 text-2xl underline">
                Sezione 9 – Diritto di proporre reclamo ad un’Autorità di
                Controllo.
              </h3>
              <div className="pb-4">
                Ogni interessato ha la facoltà, in caso di violazione consumata
                a pregiudizio dei propri diritti e delle proprie libertà, di
                proporre reclamo al Garante Privacy via web attraverso la
                compilazione dell’apposito modulo, disponibile sul sito
                www.garanteprivacy.it
              </div>
            </section>
            <section>
              <h3 className="pb-3 text-2xl underline">
                Sezione 10 – Profilazione e processi decisionali automatizzati.
              </h3>
              <div className="pb-4">
                <h4 className="italic">Dati di navigazione e Cookies.</h4> I
                Suoi dati di navigazione non saranno utilizzati per scopi di
                profilazione, né per attivare processi decisionali
                automatizzati.
                <h4 className="italic pt-4">
                  Dati forniti volontariamente dall’utente.
                </h4>{" "}
                I dati da Lei spontaneamente e volontariamente forniti mediante
                gli indirizzi e-mail presenti sul Sito
                <Link href="htts://www.matarrese.it">
                  <a className="text-yellow-600">www.matarrese.it</a>
                </Link>{" "}
                e/o mediante la compilazione di moduli presenti in specifiche
                pagine del Sito{" "}
                <Link href="htts://www.matarrese.it">
                  <a className="text-yellow-600 ">www.matarrese.it</a>
                </Link>{" "}
                non saranno utilizzati per scopi di profilazione, né per
                attivare processi decisionali automatizzati. L’eventuale
                attività di profilazione per scopi commerciali e/o promozionali
                sarà oggetto di richiesta di espresso consenso.
              </div>
            </section>
            <section>
              <h3 className="pb-3 text-2xl">Sez. 11 – Misure di sicurezza.</h3>{" "}
              <div className="pb-4">
                <strong>Marattese s.r.l.</strong> come Titolare del trattamento
                dei Suoi dati adotta adeguate misure di sicurezza tecniche e
                organizzative, in conformità a quanto disposto dal RGPD, al fine
                di ridurre al minimo i rischi che potrebbero incombere sui Suoi
                dati personali.
              </div>
            </section>
            <section>
              <h3 className="pb-3 text-2xl">
                Sez. 12 – Modalità di trattamento.
              </h3>
              <div className="pb-4">
                Il trattamento dei dati sarà effettuato in conformità con quanto
                previsto dall’art. 32 del RGPD e avverrà mediante l’ausilio di
                mezzi informatici e telematici, oltre che manuali e cartacei.
              </div>
            </section>
            <section>
              <h3 className="pb-3 text-2xl">
                Sez. 13 – Modifiche alla Privacy Policy.
              </h3>
              <div className="pb-4">
                La presente Privacy Policy potrà essere modificata in occasione
                di nuove funzionalità aggiunte al Sito{" "}
                <Link href="htts://www.matarrese.it">
                  <a className="text-yellow-600">www.matarrese.it</a>
                </Link>{" "}
                , modifiche e/o integrazioni della normativa di riferimento, o a
                seguito di commenti e suggerimenti inviati dai nostri utenti. La
                stessa Privacy Policy può essere modificata in qualsiasi momento
                con la pubblicazione di una versione aggiornata sul Sito Web,
                efficace dalla data di decorrenza della pubblicazione della
                stessa.
              </div>
            </section>
          </main>
        </Container>
      </Layout>
    </div>
  );
}
