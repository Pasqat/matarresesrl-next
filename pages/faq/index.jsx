import Head from 'next/head'

import Link from 'next/link'

import Layout from '../../components/Layout'
import ContactModal from '../../components/Form/ContactModal'
import PageHero from '../../components/PageHero'
import {Freccia} from '../../components/cinema/BottoneFreccia'
import StructuredData from '../../components/StructuredData'
import {faqSchema, breadcrumbSchema} from '../../lib/seo/schema'

const FAQS = [
  {
    question: 'Quali servizi offre Matarrese srl?',
    answer:
      "Matarrese srl offre consulenza per attività ho.re.ca. e nell'industria della trasformazione agroalimentare, progettazione tecnica di locali commerciali e cucine professionali, realizzazione di arredi su misura, progettazione di impianti di aspirazione e assistenza tecnica post-vendita.",
  },
  {
    question: 'Dove si trova lo showroom Matarrese srl?',
    answer:
      'Lo showroom e la struttura aziendale di 5.000 mq si trovano in Contrada Popoleto, 70011 Alberobello (BA), in Puglia. È possibile visitarlo per vedere le attrezzature in funzione.',
  },
  {
    question: 'Aiutate nell’apertura di un nuovo ristorante o locale?',
    answer:
      'Sì. Seguiamo il cliente dall’idea al progetto reale: sopralluogo, verifica della destinazione d’uso, progettazione degli spazi, rendering tridimensionale, realizzazione degli arredi, fornitura delle attrezzature, coordinamento dei lavori e collaudo prima dell’apertura.',
  },
  {
    question:
      'Offrite assistenza tecnica e manutenzione? In quanto tempo intervenite?',
    answer:
      'Sì. Disponiamo di un ampio magazzino ricambi e di tecnici specializzati. Il servizio di risposta per l’assistenza tecnica è tipicamente entro 48 ore dalla richiesta su tutto il territorio regionale.',
  },
  {
    question: 'Vendete tramite MEPA?',
    answer:
      'Sì. Matarrese srl è presente sul MEPA (Mercato Elettronico della Pubblica Amministrazione) per la fornitura di attrezzature e arredi a enti e amministrazioni pubbliche.',
  },
  {
    question: 'Quali marchi di attrezzature trattate?',
    answer:
      'Selezioniamo i migliori marchi del settore ho.re.ca., con predilezione per il Made in Italy, tra cui Lainox, Unox, Rational, Silko, Pedrali, Ciam, Qucino Optimum e altri primari produttori.',
  },
  {
    question: 'Realizzate arredi su misura?',
    answer:
      'Sì. Nel nostro laboratorio tecnico un team di esperti sviluppa e realizza arredi su misura per bar, ristoranti, pasticcerie, gelaterie e strutture alberghiere, adattandoli agli spazi e alle esigenze dell’attività.',
  },
  {
    question: 'È possibile provare le attrezzature?',
    answer:
      'Sì. Disponiamo di un laboratorio attrezzato in cui è possibile provare la attrezzature anche con la formula One to One',
  },
  {
    question: 'In quali aree operate?',
    answer:
      'Operiamo principalmente in Puglia, dove garantiamo assistenza tecnica tempestiva, e in tutta Italia per progettazione, forniture e allestimenti attraverso il consorzio Assogi',
  },
]

export default function Faq() {
  return (
    <div>
      <Head>
        <title>Domande frequenti (FAQ) | Matarrese srl</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/faq`} />
        <meta name="author" content="Matarrese srl" />
        <meta
          name="description"
          content="Servizi, marchi trattati, tempi di assistenza, arredi su misura, vendita MEPA e aree servite: le risposte alle domande più frequenti."
        />
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <meta property="og:title" content="Domande frequenti (FAQ)" />
        <meta
          property="og:description"
          content="Le risposte alle domande più comuni su servizi, attrezzature e assistenza ho.re.ca."
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/img/piazza_grande_61.jpg`}
        />
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_DOMAIN}/faq`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Matarrese srl" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <StructuredData data={faqSchema(FAQS)} />
      <StructuredData data={breadcrumbSchema([{name: 'FAQ', path: '/faq'}])} />
      <Layout navbarTransparent footerInvito={false}>
        <PageHero
          title="Domande"
          accento="frequenti."
          intro="Le risposte alle domande più comuni su servizi, attrezzature, arredi e assistenza per il settore ho.re.ca."
          tall={false}
        />

        <section
          className="bg-[var(--carta)] text-ghisa"
          data-header="light"
          aria-label="Domande e risposte"
        >
          <div className="site-shell grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
            <div className="lg:col-span-8 lg:col-start-5 lg:row-start-1">
              {/* Righe che si aprono (<details>), come nelle pagine settore: la risposta resta nell'HTML */}
              <div className="cin-faq" data-tono="chiaro">
                {FAQS.map((faq, i) => (
                  <details key={faq.question} open={i === 0}>
                    <summary>
                      <h2>{faq.question}</h2>
                      <span className="cin-faq__segno" aria-hidden="true" />
                    </summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4 lg:row-start-1 lg:pr-12">
              <div className="rounded-[28px] bg-[#121315] p-8 text-white lg:sticky lg:top-32">
                <p className="type-display max-w-[20ch] text-[24px] leading-tight">
                  Non trovi quello che cerchi? Contattaci, siamo a tua
                  disposizione.
                </p>
                <ContactModal
                  variant="info"
                  className="cin-btn mt-6"
                  title="Fai la tua domanda."
                  subtitle="Ti risponde un nostro consulente, per email o al telefono."
                >
                  Contattaci
                  <Freccia />
                </ContactModal>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  )
}
