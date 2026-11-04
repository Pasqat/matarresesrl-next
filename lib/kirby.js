// Pannello Matarrese (X:/projects/matarrese-pannello; il nome della variabile viene dal primo
// prototipo con Kirby). Con NEXT_PUBLIC_KIRBY_URL news, realizzazioni, eventi, chiusure, avviso,
// recensioni e marchi vengono dal pannello (/dati/*); senza, restano WordPress e data/*.
// Pubblica perché avviso e chiusure si leggono anche dal browser.
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

// --- News e realizzazioni nella forma di WordPress che le pagine già leggono

const slugify = s =>
  String(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[&'’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
// '2025-04-29T09:00' come lo dava WPGraphQL
const dataWP = d => (d ? `${d}:00` : null)
const escape = s =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const immagineWP = img =>
  img
    ? {
        node: {
          sourceUrl: img.url,
          mediaItemUrl: img.url,
          altText: img.alt,
          mediaDetails: {width: img.width, height: img.height, sizes: []},
        },
      }
    : null
const termine = (nome, i) => ({
  id: slugify(nome),
  categoryId: nome,
  databaseId: i,
  name: nome,
  slug: slugify(nome),
})
// categorie o tag con il conteggio, come le liste di WPGraphQL
const conteggio = (voci, campo) => {
  const n = new Map()
  voci.forEach(v => v[campo].forEach(x => n.set(x, (n.get(x) || 0) + 1)))
  return [...n].map(([nome, count], i) => ({...termine(nome, i), count}))
}

function seoWP(v, testo) {
  const descrizione =
    v.seo?.descrizione || v.riassunto || testoSemplice(testo).slice(0, 155)
  const titolo = v.seo?.titolo || v.titolo
  return {
    title: titolo,
    metaDesc: descrizione,
    focuskw: v.seo?.parolaChiave || '',
    opengraphTitle: titolo,
    opengraphDescription: descrizione,
    opengraphType: 'article',
    opengraphAuthor: v.autore || 'Matarrese srl',
    opengraphPublishedTime: dataWP(v.data),
    opengraphModifiedTime: dataWP(v.aggiornato),
    opengraphImage: v.immagine ? {sourceUrl: v.immagine.url} : null,
  }
}

function articoloWP(a) {
  return {
    id: a.slug,
    databaseId: a.slug,
    title: a.titolo,
    slug: a.slug,
    excerpt: a.riassunto ? `<p>${escape(a.riassunto)}</p>` : '',
    date: dataWP(a.data),
    modified: dataWP(a.aggiornato),
    featuredImage: immagineWP(a.immagine),
  }
}

export async function articoliKirby() {
  const lista = await kirby('articoli')
  return {
    posts: lista.map(a => ({...articoloWP(a), categories: a.categorie, tags: a.tag})),
    categories: conteggio(lista, 'categorie'),
    tags: conteggio(lista, 'tag'),
  }
}

export async function articoloKirby(slug) {
  const a = await kirby(`articoli/${encodeURIComponent(slug)}`)
  if (!a) return {post: null}
  return {
    post: {
      ...articoloWP(a),
      content: a.testo,
      categories: {edges: a.categorie.map((c, i) => ({node: termine(c, i)}))},
      tags: {nodes: a.tag.map(termine)},
      seo: seoWP(a, a.testo),
      faqs: a.faq.map(f => ({question: f.domanda, answer: f.risposta})),
    },
  }
}

// Gli altri articoli della stessa categoria (categoryId qui è il nome della categoria)
export async function altriArticoliKirby(slug, categoria) {
  const lista = await kirby('articoli')
  const edges = lista
    .filter(a => a.slug !== slug && a.categorie.includes(categoria))
    .slice(0, 3)
    .map(a => ({node: articoloWP(a)}))
  return {posts: {edges}}
}

function realizzazioneWP(r) {
  return {
    id: r.slug,
    databaseId: r.slug,
    title: r.titolo,
    slug: r.slug,
    date: dataWP(r.data),
    featuredImage: immagineWP(r.immagine),
  }
}

export async function realizzazioniKirby() {
  const lista = await kirby('realizzazioni')
  return {
    projects: lista.map(r => ({
      ...realizzazioneWP(r),
      categories: r.categorie,
      tags: r.tag,
      portfolioCategories: {nodes: r.categorie.map(termine)},
    })),
    categories: conteggio(lista, 'categorie'),
    tags: conteggio(lista, 'tag'),
  }
}

export async function realizzazioneKirby(slug) {
  const r = await kirby(`realizzazioni/${encodeURIComponent(slug)}`)
  if (!r) return null
  return {
    ...realizzazioneWP(r),
    content: r.testo,
    portfolioCategories: {edges: r.categorie.map((c, i) => ({node: termine(c, i)}))},
    portfolioTags: {edges: r.tag.map((t, i) => ({node: termine(t, i)}))},
    galleria: r.galleria.map(g => ({sourceUrl: g.url, altText: g.alt, id: g.url})),
    seo: seoWP(r, r.testo),
  }
}
