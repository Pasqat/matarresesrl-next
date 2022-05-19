import pantaleo from '../public/img/pantaleo-agrobistrot3.webp'
import pasticceriaNoiDue from '../public/img/posticceria-noi-due.webp'
import dettagliDiMare from '../public/img/DETTAGLI-DI-MARE-9.webp'
import barPupiEPupe from '../public/img/pupepupi1.webp'

const projects = [
  {
    title: 'Agrobistrot Pantaleo',
    slug: 'agrobistrot-pantaleo',
    date: '2022',
    featuredImage: {
      node: {
        altText: 'cucine agrobistrot Pantaleo realizzate da Matarrese srl',
        // sourceUrl: '/../public/img/pantaleo-agrobistrot3.webp',
        sourceUrl: pantaleo,
      },
    },
    category: 'ristaranti',
  },
  {
    title: 'Pasticceria noi due',
    slug: 'pasticceria-noi-due',
    date: '2018',
    featuredImage: {
      node: {
        altText: 'pasticceria noi due realizzata da Matarrese srl',
        sourceUrl: pasticceriaNoiDue,
      },
    },
    category: 'pasticcerie',
  },
  {
    title: 'Dettagli di mare',
    slug: 'ristorante-dettagli-di-mare',
    date: '2011',
    featuredImage: {
      node: {
        altText: 'ristorante Dettagli di  mare realizzato da Matarrese srl',
        sourceUrl: dettagliDiMare,
      },
    },
    category: 'gelaterie',
  },
  {
    title: 'Pupi e pupe',
    slug: 'pupi-e-pupe',
    date: '2010',
    featuredImage: {
      node: {
        altText: 'bar Pupi e pupe realizzato da Matarrese srl',
        sourceUrl: barPupiEPupe,
      },
    },
    category: 'bar',
  },
]

export default projects
