import Head from 'next/head'

import Link from 'next/link'
import {useState} from 'react'

import Layout from '../../components/Layout'
import PageHero from '../../components/PageHero'
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
          content="Risposte alle domande frequenti su attrezzature ho.re.ca., apertura di un locale, arredi su misura, assistenza tecnica, marchi trattati, prove One to One e MEPA."
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
      <Layout navbarTransparent>
        <PageHero
          title="Domande frequenti"
          intro="Le risposte alle domande più comuni su servizi, attrezzature, arredi e assistenza per il settore ho.re.ca."
          tall={false}
        />

        <section
          className="bg-white text-ghisa"
          data-header="light"
          aria-label="Domande e risposte"
        >
          <div className="site-shell grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
            <div className="lg:col-span-8 lg:col-start-5 lg:row-start-1">
              {FAQS.map((faq, i) => (
                <FaqItem key={faq.question} faq={faq} index={i} />
              ))}
            </div>
            <div className="lg:col-span-4 lg:row-start-1 lg:pr-12">
              <div className="lg:sticky lg:top-32">
                <p className="max-w-[34ch] text-lg text-acciaio">
                  Non trovi quello che cerchi? Contattaci, siamo a tua
                  disposizione.
                </p>
                <Link href="/contatti" className="cta-ghisa mt-6">
                  Hai altre domande? Contattaci
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </div>
  )
}

// Accordion: pulsante con aria-expanded dentro l'h2; il pannello chiuso è
// `invisible` (fuori da tab e albero di accessibilità) e si apre animando le
// righe della griglia da 0fr a 1fr. Niente animazione con movimento ridotto.
function FaqItem({faq, index}) {
  const [open, setOpen] = useState(false)
  const buttonId = `faq-q-${index}`
  const panelId = `faq-a-${index}`
  return (
    <div className="border-t border-ghisa/15 last:border-b">
      <h2 className="type-display text-[clamp(19px,1.7vw,24px)] leading-tight">
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen(o => !o)}
          className="group flex w-full items-start justify-between gap-6 py-6 text-left transition-colors [font-stretch:inherit] hover:text-fiamma-testo"
        >
          <span>{faq.question}</span>
          <span
            aria-hidden="true"
            className="relative mt-1 h-4 w-4 shrink-0 text-current"
          >
            <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
            <span
              className={`absolute left-1/2 top-0 h-4 w-px bg-current transition-transform duration-300 motion-reduce:transition-none ${
                open ? 'scale-y-0' : 'scale-y-100'
              }`}
            />
          </span>
        </button>
      </h2>
      <div
        id={panelId}
        className={`grid transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none ${
          open ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <p className="max-w-[65ch] pb-8 text-lg text-acciaio">{faq.answer}</p>
        </div>
      </div>
    </div>
  )
}
