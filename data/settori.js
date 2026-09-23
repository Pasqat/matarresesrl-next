// Settori serviti. `inEvidenza` = settori da spingere (meno saturi di offerta).
// Le frasi sono bozze da approvare con Pasquale; le pagine /settori/<slug> arrivano nella fase Settori.
const settori = [
  {
    slug: 'dark-kitchen',
    nome: 'Dark kitchen',
    frase: 'Tecnologia e organizzazione per chi entra nel delivery.',
    inEvidenza: true,
  },
  {
    slug: 'laboratori',
    nome: 'Laboratori di trasformazione alimentare',
    frase: 'Linee di produzione, conservazione e igiene per chi trasforma materie prime.',
    inEvidenza: true,
  },
  {slug: 'ristoranti-pizzerie', nome: 'Ristoranti e pizzerie'},
  {slug: 'bar-gelaterie-pasticcerie', nome: 'Bar, gelaterie e pasticcerie'},
  {slug: 'hotel-ricevimenti', nome: 'Hotel e sale ricevimenti'},
  {slug: 'collettiva', nome: 'Ristorazione collettiva'},
  {slug: 'gdo-pescherie-macellerie', nome: 'GDO, pescherie e macellerie'},
]

export default settori
