// Prototipo del pannello Kirby (cartella matarrese-cms). Con NEXT_PUBLIC_KIRBY_URL eventi,
// chiusure, avviso, recensioni e marchi vengono da Kirby (/dati/*); senza, restano le fonti di
// sempre (WordPress e data/*). Pubblica perché avviso e chiusure si leggono anche dal browser.
export const KIRBY_URL = process.env.NEXT_PUBLIC_KIRBY_URL

export async function kirby(percorso) {
  const r = await fetch(`${KIRBY_URL}/dati/${percorso}`)
  if (r.status === 404) return null
  if (!r.ok) throw new Error(`Kirby ${r.status} su /dati/${percorso}`)
  return r.json()
}

const testoSemplice = html =>
  String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

// Un evento di Kirby nella forma di WordPress che le pagine già leggono
export function eventoKirby(e) {
  const descrizione =
    e.descrizioneSeo || testoSemplice(e.content).slice(0, 155) || e.title
  return {
    ...e,
    allDay: false,
    featuredImage: e.immagine
      ? {node: {mediaItemUrl: e.immagine.url, altText: e.immagine.alt}}
      : null,
    external_link: {link: e.linkEsterno || null},
    seo: {
      title: e.title,
      metaDesc: descrizione,
      opengraphTitle: e.title,
      opengraphDescription: descrizione,
      opengraphType: 'article',
      opengraphImage: e.immagine ? {sourceUrl: e.immagine.url} : null,
    },
  }
}

// Recensioni e marchi per le pagine: null senza Kirby, così restano quelli di data/*
export async function vetrina() {
  if (!KIRBY_URL) return {recensioni: null, marchi: null}
  const {recensioni, marchi} = await kirby('sito')
  return {recensioni, marchi}
}

// Con Kirby le pagine si rigenerano spesso: una modifica nel pannello si vede in pochi minuti
export const ogni = secondi => (KIRBY_URL ? 300 : secondi)
