// Pannello Matarrese (X:/projects/matarrese-pannello, online su cms.matarrese.it).
// News, realizzazioni ed eventi vengono solo dal pannello (/dati/*): NEXT_PUBLIC_PANNELLO_URL
// è obbligatoria. Senza, chiusure e avviso spariscono e recensioni e marchi restano quelli di data/*.
// Pubblica perché avviso e chiusure si leggono anche dal browser.
import {fetchWithRetry} from './fetchWithRetry'

export const PANNELLO_URL = process.env.NEXT_PUBLIC_PANNELLO_URL

// Gli elenchi (articoli, realizzazioni, eventi, sito) restano un minuto in memoria sul server: quando un
// crawler apre molte pagine non in cache, l'hosting condiviso del pannello non riceve una raffica di
// richieste pesanti (il sovraccarico portava le pagine oltre i 10 s di Vercel, errore 504).
const cache = new Map()
const DURATA_CACHE = 60_000

export async function datiPannello(percorso) {
  if (!PANNELLO_URL) throw new Error('NEXT_PUBLIC_PANNELLO_URL non impostata')
  const elenco = typeof window === 'undefined' && !percorso.includes('/')
  const salvato = elenco && cache.get(percorso)
  if (salvato && Date.now() - salvato.quando < DURATA_CACHE) return salvato.dati
  const dati = (async () => {
    const r = await fetchWithRetry(`${PANNELLO_URL}/dati/${percorso}`)
    if (r.status === 404) return null
    if (!r.ok) throw new Error(`Pannello ${r.status} su /dati/${percorso}`)
    return r.json()
  })()
  // si salva la promessa: richieste contemporanee aspettano la stessa risposta; un errore non resta in cache
  if (elenco) {
    cache.set(percorso, {quando: Date.now(), dati})
    dati.catch(() => cache.delete(percorso))
  }
  return dati
}

const escape = s =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const testoSemplice = html =>
  String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

// Un evento del pannello nella forma di WordPress che le pagine già leggono
export function eventoPannello(e) {
  const descrizione =
    e.descrizioneSeo || testoSemplice(e.content).slice(0, 155) || e.title
  return {
    ...e,
    // le pagine trattano il titolo come HTML (WordPress lo dava codificato)
    title: escape(e.title),
    allDay: false,
    featuredImage: e.immagine
      ? {
          node: {
            mediaItemUrl: e.immagine.url,
            altText: e.immagine.alt,
            width: e.immagine.width,
            height: e.immagine.height,
          },
        }
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

// Recensioni e marchi per le pagine: null senza pannello, così restano quelli di data/*
export async function vetrina() {
  if (!PANNELLO_URL) return {recensioni: null, marchi: null}
  const {recensioni, marchi} = await datiPannello('sito')
  return {recensioni, marchi}
}

// Con il pannello le pagine si rigenerano spesso: una modifica nel pannello si vede in pochi minuti
export const ogni = secondi => (PANNELLO_URL ? 300 : secondi)

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
    title: escape(a.titolo),
    slug: a.slug,
    excerpt: a.riassunto ? `<p>${escape(a.riassunto)}</p>` : '',
    date: dataWP(a.data),
    modified: dataWP(a.aggiornato),
    featuredImage: immagineWP(a.immagine),
  }
}

export async function articoliPannello() {
  const lista = await datiPannello('articoli')
  return {
    posts: lista.map(a => ({
      ...articoloWP(a),
      categories: a.categorie,
      tags: a.tag,
      inEvidenza: a.inEvidenza,
      settori: a.settori,
    })),
    categories: conteggio(lista, 'categorie'),
    tags: conteggio(lista, 'tag'),
  }
}

// anteprima: {scade, firma} creati dal pannello per leggere una bozza
const percorsoVoce = (tipo, slug, anteprima) =>
  anteprima
    ? `anteprima/${tipo}/${encodeURIComponent(slug)}?scade=${anteprima.scade}&firma=${anteprima.firma}`
    : `${tipo}/${encodeURIComponent(slug)}`

export async function articoloPannello(slug, anteprima) {
  const a = await datiPannello(percorsoVoce('articoli', slug, anteprima))
  if (!a) return {post: null}
  return {
    post: {
      ...articoloWP(a),
      content: a.testo,
      categories: {edges: a.categorie.map((c, i) => ({node: termine(c, i)}))},
      tags: {nodes: a.tag.map(termine)},
      seo: seoWP(a, a.testo),
      faqs: a.faq.map(f => ({question: f.domanda, answer: f.risposta})),
      inBreve: a.inBreve || '',
      settori: a.settori,
      marchi: a.marchi,
      invito: a.invito,
      correlati: a.correlati,
      autore: a.autore,
    },
  }
}

// Gli articoli scelti a mano nel pannello, altrimenti tre della stessa categoria
// (categoryId qui è il nome della categoria)
export async function altriArticoliPannello(slug, categoria, correlati = []) {
  const lista = await datiPannello('articoli')
  const scelti = correlati
    .map(s => lista.find(a => a.slug === s))
    .filter(Boolean)
  const edges = (
    scelti.length
      ? scelti
      : lista.filter(a => a.slug !== slug && a.categorie.includes(categoria)).slice(0, 3)
  ).map(a => ({node: articoloWP(a)}))
  return {posts: {edges}}
}

// Anno del lavoro: campo `anno` del pannello (il pannello di prima lo dava tra i tag). Le pagine lo
// leggono dove WordPress metteva i tag, che per le realizzazioni servivano solo all'anno.
const anni = r => {
  const anno = r.anno ? String(r.anno) : (r.tag || []).find(t => /^(19|20)\d\d$/.test(t))
  return anno ? [anno] : []
}

function realizzazioneWP(r) {
  return {
    id: r.slug,
    databaseId: r.slug,
    title: escape(r.titolo),
    slug: r.slug,
    date: dataWP(r.data),
    featuredImage: immagineWP(r.immagine),
  }
}

export async function realizzazioniPannello() {
  const lista = (await datiPannello('realizzazioni')).map(r => ({...r, anni: anni(r)}))
  return {
    projects: lista.map(r => ({
      ...realizzazioneWP(r),
      categories: r.categorie,
      tags: r.anni,
      portfolioCategories: {nodes: r.categorie.map(termine)},
    })),
    categories: conteggio(lista, 'categorie'),
    tags: conteggio(lista, 'anni'),
  }
}

export async function realizzazionePannello(slug, anteprima) {
  const r = await datiPannello(percorsoVoce('realizzazioni', slug, anteprima))
  if (!r) return null
  return {
    ...realizzazioneWP(r),
    content: r.testo,
    portfolioCategories: {edges: r.categorie.map((c, i) => ({node: termine(c, i)}))},
    portfolioTags: {edges: anni(r).map((t, i) => ({node: termine(t, i)}))},
    galleria: r.galleria.map(g => ({sourceUrl: g.url, altText: g.alt, id: g.url})),
    seo: seoWP(r, r.testo),
  }
}
