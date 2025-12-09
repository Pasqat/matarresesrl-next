import Head from 'next/head'
import Link from 'next/link'

import Container from '../../components/Container'
import Header from '../../components/Header/Header'
import Layout from '../../components/Layout'

import {H3, H4} from '../../components/typography'

export default function CookiePolicy() {
  return (
    <div>
      <Head>
        <title>Tipologie ed utilizzo dei cookies | Matarrese srl</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Tipologie ed utilizzo dei Cookies" />
        <meta
          property="og:description"
          content="Questa pagina descrive il funzionamento e le modalità di utilizzo dei cookies"
        />
        <meta
          property="og:url"
          content="https://www.matarrese.it/cookie-policy"
        />
      </Head>
      <Layout>
        <Container>
          <Header>Tipologie ed utilizzo dei Cookies</Header>
          <main className="container mx-auto pb-20 text-justify text-gray-900">
            <div className="flex flex-col space-y-14">
              <section>
                <H3 className="pb-3">Utilizzo dei Cookie</H3>
                <div className="md:columns-2">
                  <p className="pb-2">
                    I cookie sono righe di testo che fungono da marcatori
                    informatici inviati da un server (in questo caso, quello del
                    presente sito) all’apparecchio di un utente (generalmente al
                    browser Internet) nel momento in cui questi accede ad una
                    data pagina di un sito web; i cookie sono memorizzati
                    automaticamente dal browser dell’utente e ritrasmessi al
                    server che li ha generati ogni volta che l’utente accede
                    alla stessa pagina Internet. In tal modo, ad esempio, i
                    cookie consentono e/o facilitano l’accesso ad alcune pagine
                    Internet per migliorare la navigazione dell’utente, ovvero
                    permettono la memorizzazione di pagine visitate e di altre
                    informazioni specifiche, come ad esempio pagine consultate
                    più frequentemente, errori di connessione, etc. Pertanto,
                    per un utilizzo agevolato e completo di questo sito, sarebbe
                    opportuno che l’utente configurasse il proprio browser in
                    modo che accetti la ricezione di tali cookie.
                  </p>
                  <p className="pb-2">
                    Spesso i browser sono impostati per accettare
                    automaticamente i cookie. Tuttavia gli utenti possono
                    modificare la configurazione predefinita, in modo da
                    disabilitare o cancellare i cookie (di volta in volta o una
                    volta per tutte), con la conseguenza, però, che la fruizione
                    ottimale di alcune aree del sito potrebbe essere preclusa. È
                    anche possibile verificare le modalità e tipologie di cookie
                    memorizzati sul proprio browser modificando le impostazioni
                    sui cookie del proprio browser.
                  </p>
                </div>
              </section>
              <section>
                <H3 className="pb-3">Tipologie e gestione dei cookies</H3>
                <div className="md:columns-2">
                  <p className="pb-2">
                    La presente Cookie Policy è relativa al sito{' '}
                    <Link href="/" className="text-yellow-600">
                      www.matarrese.it
                    </Link>{' '}
                    (“Sito”) gestito e operato dalla società Matarrese srl, con
                    sede in c.da Popoleto nc, 70011 Alberobello (Bari), Italia,
                    P.IVA: 04356890725
                  </p>
                  <p className="pb-2">
                    Esistono diverse tipologie di cookies. Alcuni sono necessari
                    per poter navigare sul Sito, altri hanno scopi diversi come
                    garantire la sicurezza interna, amministrare il sistema,
                    effettuare analisi statistiche, comprendere quali sono le
                    sezioni del Sito che interessano maggiormente gli utenti o
                    offrire una visita personalizzata del Sito.
                  </p>
                  <p className="pb-2">
                    Il Sito utilizza cookies tecnici e non di profilazione.
                    Quanto precede si riferisce sia al computer dell’utente sia
                    ad ogni altro dispositivo che l’utente può utilizzare per
                    connettersi al Sito.
                  </p>
                  <H4 className="pt-4 pb-2" variant="secondary">
                    Cookies tecnici
                  </H4>
                  <p className="pb-2">
                    I cookies tecnici sono quelli utilizzati al solo fine di
                    effettuare la trasmissione di una comunicazione su una rete
                    di comunicazione elettronica, o nella misura strettamente
                    necessaria al fornitore di un servizio della società
                    dell’informazione esplicitamente richiesto dall’abbonato o
                    dall’utente a erogare tale servizio. Essi non vengono
                    utilizzati per scopi ulteriori e sono normalmente installati
                    direttamente dal titolare o gestore del sito web.
                  </p>
                  <p className="pb-2">
                    Possono essere suddivisi in cookies di navigazione o di
                    sessione, che garantiscono la normale navigazione e
                    fruizione del sito web (permettendo, ad esempio, di
                    realizzare un acquisto o autenticarsi per accedere ad aree
                    riservate); cookies analytics, assimilati ai cookies tecnici
                    laddove utilizzati direttamente dal gestore del sito per
                    raccogliere informazioni, in forma aggregata, sul numero
                    degli utenti e su come questi visitano il sito stesso;
                    cookies di funzionalità, che permettono all’utente la
                    navigazione in funzione di una serie di criteri selezionati
                    (ad esempio, la lingua, i prodotti selezionati per
                    l’acquisto) al fine di migliorare il servizio reso allo
                    stesso.
                  </p>
                  <p className="pb-2">
                    La disabilitazione dei cookies potrebbe limitare la
                    possibilità di usare il Sito e impedire di beneficiare in
                    pieno delle funzionalità e dei servizi presenti sul Sito.
                    Per decidere quali accettare e quali rifiutare, è illustrata
                    di seguito una descrizione dei cookies utilizzati sul Sito.
                  </p>
                </div>
              </section>
              <section>
                <H3 className="pt-4 pb-2">Tipologie di cookies utilizzati</H3>
                <div className="columns">
                  <H4 className="pt-4 pb-2" variant="secondary">
                    Cookies di prima parte
                  </H4>
                  <div>
                    <p className="pb-2">
                      I cookies di prima parte (ovvero i cookies che
                      appartengono al sito dell’editore che li ha creati) sono
                      impostati dal sito web visitato dall’utente, il cui
                      indirizzo compare nella finestra URL. L’utilizzo di tali
                      cookies ci permette di far funzionare il sito in modo
                      efficiente e di tracciare i modelli di comportamento dei
                      visitatori.
                    </p>
                  </div>
                  <H4 className="pt-4 pb-2" variant="secondary">
                    Cookies di terzi
                  </H4>
                  <div>
                    <p className="pb-2">
                      I cookies di terzi sono impostati da un dominio differente
                      da quello visitato dall’utente. Se un utente visita un
                      sito e una società diversa invia l’informazione sfruttando
                      quel sito, si è in presenza di cookies di terze parti.
                    </p>
                  </div>
                  <H4 className="pt-4 pb-2" variant="secondary">
                    Cookies di sessione
                  </H4>
                  <div>
                    <p className="pb-2">
                      I c.d. ‘cookies di sessione’ sono memorizzati
                      temporaneamente e vengono cancellati quando l’utente
                      chiude il browser. Se l’utente si registra al Sito, può
                      utilizzare cookies che raccolgono dati personali al fine
                      di identificare l’utente in occasione di visite successive
                      e di facilitare l’accesso – login al Sito (per esempio
                      conservando username e password dell’utente) e la
                      navigazione sullo stesso. Inoltre Matarrese srl utilizza i
                      cookies per finalità di amministrazione del sistema. Il
                      Sito potrebbe contenere link ad altri siti. Matarrese srl
                      non ha alcun accesso o controllo su cookies, web bacon e
                      altre tecnologie di tracciamento usate sui siti di terzi
                      cui l’utente può accedere dal Sito, sulla disponibilità,
                      su qualsiasi contenuto e materiale che è pubblicato o
                      ottenuto attraverso tali siti e sulle relative modalità di
                      trattamento dei dati personali; Matarrese srl a questo
                      proposito, considerata la mole di tali siti terzi, declina
                      espressamente ogni relativa responsabilità. L’utente
                      dovrebbe verificare la privacy policy dei siti di terzi
                      cui accede dal Sito per conoscere le condizioni
                      applicabili al trattamento dei dati personali poiché la
                      Privacy Policy di Matarrese srl si applica solo al Sito
                      come sopra definito.
                    </p>
                  </div>
                  <H4 className="pt-4 pb-2" variant="secondary">
                    Cookies persistenti
                  </H4>
                  <div>
                    <p className="pb-2">
                      I cookies persistenti sono memorizzati sul dispositivo
                      degli utenti tra le sessioni del browser, consentendo di
                      ricordare le preferenze o le azioni dell’utente in un
                      sito. Possono essere utilizzati per diversi scopi, ad
                      esempio per ricordare le preferenze e le scelte quando si
                      utilizza il Sito.
                    </p>
                  </div>
                  <H4 className="pt-4 pb-2" variant="secondary">
                    Cookies essenziali
                  </H4>
                  <div>
                    <p className="pb-2">
                      Questi cookies sono strettamente necessari per il
                      funzionamento del Sito. Senza l’uso di tali cookies alcune
                      parti del Sito non funzionerebbero. Comprendono, ad
                      esempio, i cookies che consentono di accedere in aree
                      protette del Sito. Questi cookies non raccolgono
                      informazioni per scopi di marketing e non possono essere
                      disattivati.
                    </p>
                  </div>
                  <H4 className="pt-4 pb-2" variant="secondary">
                    Cookies funzionali
                  </H4>
                  <div>
                    <p className="pb-2">
                      Questi cookies sono strettamente necessari per il
                      funzionamento del Sito. Senza l’uso di tali cookies alcune
                      parti del Sito non funzionerebbero. Comprendono, ad
                      esempio, i cookies che consentono di accedere in aree
                      protette del Sito. Questi cookies non raccolgono
                      informazioni per scopi di marketing e non possono essere
                      disattivati.
                    </p>
                  </div>
                  <H4 className="pt-4 pb-2" variant="secondary">
                    Cookies di condivisone sui Social Network
                  </H4>
                  <div>
                    <p className="pb-2">
                      Questi cookies facilitano la condivisione dei contenuti
                      del sito attraverso social network quali Facebook e
                      Twitter. Per prendere visione delle rispettive privacy e
                      cookies policies è possibile visitare i siti web dei
                      social networks. Nel caso di Facebook e Twitter, l’utente
                      può visitare https://www.facebook.com/help/cookies e
                      https://twitter.com/privacy.
                    </p>
                  </div>
                </div>
              </section>
              <section>
                <H3 className="pb-3">
                  Come modificare le impostazioni sui cookies
                </H3>
                <div className="md:columns-2">
                  <p className="pb-2">
                    La maggior parte dei browser accetta automaticamente i
                    cookies, ma l’utente normalmente può modificare le
                    impostazioni per disabilitare tale funzione. E’ possibile
                    bloccare tutte le tipologie di cookies, oppure accettare di
                    riceverne soltanto alcuni e disabilitarne altri. La sezione
                    “Opzioni” o “Preferenze” nel menu del browser permettono di
                    evitare di ricevere cookies e altre tecnologie di
                    tracciamento utente, e come ottenere notifica dal browser
                    dell’attivazione di queste tecnologie. In alternativa, è
                    anche possibile consultare la sezione “Aiuto” della barra
                    degli strumenti presente nella maggior parte dei browser.
                  </p>
                  <p className="pb-2">
                    Per maggiori informazioni sui cookie e per gestire le
                    preferenze sui cookie (di prima e/o terza parte) si invitano
                    gli utenti a visitare anche la piattaforma{' '}
                    <a
                      className="text-yellow-600"
                      href="www.youronlinechoices.com"
                    >
                      www.youronlinechoices.com
                    </a>
                    . Si ricorda però che la disabilitazione dei cookie di
                    navigazione o quelli funzionali può causare il
                    malfunzionamento del Sito e/o limitare il servizio offerto
                    daMatarrese srl.
                  </p>
                </div>
              </section>
            </div>
          </main>
        </Container>
      </Layout>
    </div>
  );
}
