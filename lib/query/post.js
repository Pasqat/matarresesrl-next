import {articoliPannello, articoloPannello, altriArticoliPannello} from '../pannello'

export async function getAllPosts() {
  return articoliPannello()
}

export async function getPost(slug, preview, previewData) {
  return articoloPannello(slug, preview ? previewData : null)
}

// categoryId è il nome della categoria; correlati gli slug scelti a mano nel pannello
export async function getMorePosts(slug, categoryId, correlati) {
  return altriArticoliPannello(slug, categoryId, correlati)
}
