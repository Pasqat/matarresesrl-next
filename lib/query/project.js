import {realizzazioniPannello, realizzazionePannello} from '../pannello'

// quattro a caso tra quelle con foto, rimescolate a ogni rigenerazione della home (max ogni 5 minuti)
export async function getLastTwoProjects() {
  const conFoto = (await realizzazioniPannello()).projects.filter(p => p.featuredImage)
  for (let i = conFoto.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[conFoto[i], conFoto[j]] = [conFoto[j], conFoto[i]]
  }
  return conFoto.slice(0, 4)
}

export async function getProjects() {
  return realizzazioniPannello()
}

export async function getProject(slug, anteprima) {
  return realizzazionePannello(slug, anteprima)
}
