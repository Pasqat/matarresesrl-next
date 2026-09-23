// Settori serviti. `inEvidenza` = settori da spingere (meno saturi di offerta).
// Le frasi sono bozze da approvare con Pasquale; le pagine /settori/<slug> arrivano nella fase Settori.
const settori = [
  {
    slug: 'dark-kitchen',
    foto: '/img/settori/dark-kitchen.webp', // ponytail: segnaposto (cucina Viù), serve una foto di dark kitchen vera
    nome: 'Dark kitchen',
    frase: 'Tecnologia e organizzazione per chi entra nel delivery.',
    inEvidenza: true,
  },
  {
    slug: 'laboratori',
    foto: '/img/settori/laboratori.webp',
    nome: 'Laboratori di trasformazione alimentare',
    frase:
      'Linee di produzione, conservazione e igiene per chi trasforma materie prime.',
    inEvidenza: true,
  },
  {
    slug: 'ristoranti-pizzerie',
    foto: '/img/settori/ristoranti-pizzerie.webp',
    nome: 'Ristoranti e pizzerie',
  },
  {
    slug: 'bar-gelaterie-pasticcerie',
    foto: '/img/settori/bar-gelaterie-pasticcerie.webp',
    nome: 'Bar, gelaterie e pasticcerie',
  },
  {
    slug: 'hotel-ricevimenti',
    foto: '/img/settori/hotel-ricevimenti.webp',
    nome: 'Hotel e sale ricevimenti',
  },
  {
    slug: 'collettiva',
    foto: '/img/settori/collettiva.webp',
    nome: 'Ristorazione collettiva',
  },
  {
    slug: 'gdo-pescherie-macellerie',
    foto: '/img/settori/gdo-pescherie-macellerie.webp',
    nome: 'GDO, pescherie e macellerie',
  },
]

export default settori
