import Head from 'next/head'
import Lottie from 'react-lottie-player'

import Layout from '../components/Layout'
import {H2} from '../components/typography'
import lottiejson from '../public/img/illustration/error404.json'

export default function AboutUs() {
  return (
    <>
      <Head>
        <title>Matarrese srl</title>
        <link rel="canonical" href="https://www.matarrese.it" />
        <meta name="author" content="Matarrese srl" />
        <link rel="icon" href="/public/img/favicon/favicon.ico" />
      </Head>

      <Layout>
        <section className="mx-10vw mt-14">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-12 text-center md:gap-4 lg:justify-between lg:text-right">
            <H2 as="p" className="mx-auto">
              Ops, sembra che la pagina che stai cercando non esiste...
            </H2>
            <div className="mx-auto h-3/4 w-3/4">
              <Lottie loop animationData={lottiejson} play />
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
