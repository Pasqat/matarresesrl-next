import * as React from 'react'
import Image from 'next/image'

import {H2, Paragraph} from '../typography'
import {Grid} from '../grid'
import logoAssogi from '../../public/img/logos/Assogi_logo-300x119.png'

function AssogiSection() {
  return (
    <Grid featured>
      <div className="col-span-full flex flex-col items-stretch lg:col-span-5 lg:mb-0 lg:items-start">
        <H2 className="">
          Matarrese è fiera di far parte di un prestigioso consorzio: Assogi
        </H2>
        <div className="my-auto">
          <Image
            src={logoAssogi}
            alt="logo acquistinrete"
            layout="intrinsic"
            placeholder="blur"
          />
        </div>
      </div>
      <div className="col-span-full lg:col-span-5 lg:col-start-8 lg:mr-12">
        <div className="flex flex-col items-center justify-center gap-12">
          <div>
            <H2 variant="accent" as="h3">
              Qualità italiana
            </H2>
            <Paragraph className="mt-8">
              Da trenta anni ASSOGI rappresenta la qualità italiana nelle cucine
              professionali per ristoranti, nei grandi impianti di ristorazione,
              nelle cucine per comunità e per mense. ASSOGI assicura che i
              prodotti e le soluzioni fornite dai propri soci vadano oltre le
              norme e rappresentino al meglio la qualità italiana che da sempre
              distingue la ristorazione nel nostro Paese.
            </Paragraph>
          </div>

          <div>
            <H2 as="h3" variant="accent">
              La forza della rete nazionale
            </H2>
            <Paragraph className="mt-8">
              ASSOGI ha un ruolo di primo piano nel tessuto distributivo del
              settore e si è imposta come l’unica rete di vendita nazionale
              indipendente specializzata in grandi impianti di ristorazione:
              cucine professionali, cucine per ristoranti, impianti per bar,
              pizzerie, take away, pasticcerie, mense e cucine industriali. Per
              queste attività ASSOGI propone delle soluzioni personalizzate, che
              valorizzano i locali con la qualità italiana che contraddistingue
              i nostri prodotti.
            </Paragraph>
          </div>
        </div>
      </div>
    </Grid>
  )
}

export {AssogiSection}
