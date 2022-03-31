import pantaleo from '../public/img/pantaleo-agrobistrot3.webp'
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
    category: 'pasticcerie',
  },
  {
    title: 'test1',
    slug: 'test1',
    date: '2020',
    featuredImage: '#',
    category: 'ristaranti',
  },
  {
    title: 'test3',
    slug: 'test3',
    date: '2016',
    featuredImage: '#',
    category: 'gelaterie',
  },
  {
    title: 'test4',
    slug: 'test4',
    date: '2019',
    featuredImage: '#',
    category: 'bar',
  },
]

export default projects
