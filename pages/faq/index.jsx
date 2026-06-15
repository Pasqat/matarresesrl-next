import Head from 'next/head'

import Layout from '../../components/Layout'
import {Grid} from '../../components/grid'
import {H1, H3, Paragraph} from '../../components/typography'
import {Spacer} from '../../components/spacer'
import {LinkButton} from '../../components/button'
import StructuredData from '../../components/StructuredData'
import {faqSchema, breadcrumbSchema} from '../../lib/seo/schema'

const FAQS = [
  {
    question: 'Quali servizi offre Matarrese srl?',
    answer:
      "Matarrese srl offre consulenza per attività ho.re.ca. e nell'industria della trasfromazione agroalimentare, progettazione tecnica di locali commerciali e cucine professionali, realizzazione di arredi su misura, progettazione di impianti di aspirazione e assistenza tecnica post-vendita.",
  },
  {
    question: 'Dove si trova lo showroom Matarrese srl?',
    answer:
      "Lo showroom e la struttura aziendale di 5.000 mq si trovano in Contrada Popoleto, 70011 Alberobello (BA), in Puglia. È possibile visitarlo per vedere le attrezzature in funzione.",
  },
  {
    question: 'Aiutate nell’apertura di un nuovo ristorante o locale?',
    answer:
      "Sì. Seguiamo il cliente dall’idea al progetto reale: sopralluogo, verifica della destinazione d’uso, progettazione degli spazi, rendering tridimensionale, realizzazione degli arredi, fornitura delle attrezzature, coordinamento dei lavori e collaudo prima dell’apertura.",
  },
  {
    question: 'Offrite assistenza tecnica e manutenzione? In quanto tempo intervenite?',
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
      'Selezioniamo i migliori marchi del settore ho.re.ca., con predilezione per il Made in Italy, tra cui Lainox, Unox, Ratioanl, Silko, Pedrali, Ciam, Qucino Optimum e altri primari produttori.',
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
          content="Risposte alle domande frequenti su attrezzature ho.re.ca., apertura di un locale, arredi su misura, assistenza tecnica, formazione e MEPA."
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
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_DOMAIN}/faq`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="it_IT" />
        <meta property="og:site_name" content="Matarrese srl" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <StructuredData data={faqSchema(FAQS)} />
      <StructuredData data={breadcrumbSchema([{name: 'FAQ', path: '/faq'}])} />
      <Layout>
        <main className="mx-10vw">
          <div className="mx-auto max-w-4xl">
            <Spacer size="2xs" />
            <H1 className="mb-4">Domande frequenti</H1>
            <Paragraph className="mb-12">
              Le risposte alle domande più comuni su servizi, attrezzature,
              arredi e assistenza per il settore ho.re.ca. Non trovi quello che
              cerchi? Contattaci, siamo a tua disposizione.
            </Paragraph>

            <Grid nested rowGap>
              {FAQS.map(faq => (
                <section
                  key={faq.question}
                  className="col-span-full border-b border-gray-200 pb-6"
                >
                  <H3 as="h2" variant="secondary" className="mb-3">
                    {faq.question}
                  </H3>
                  <Paragraph className="text-gray-600">{faq.answer}</Paragraph>
                </section>
              ))}
            </Grid>

            <Spacer size="2xs" />
            <div className="flex justify-center">
              <LinkButton href="/contatti" withArrow>
                Hai altre domande? Contattaci
              </LinkButton>
            </div>
            <Spacer size="base" />
          </div>
        </main>
      </Layout>
    </div>
  )
}
