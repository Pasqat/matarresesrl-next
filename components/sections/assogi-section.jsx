import * as React from 'react'
import Image from "next/image"

import {H2, Paragraph} from '../typography'
import {Grid} from '../grid'
import logoAssogi from '../../public/img/logos/Assogi_logo-300x119.png'
import {LinkButton} from '../button'

function AssogiSection() {
  return (
    <Grid featured>
      <div className="col-span-full mb-14 flex flex-col-reverse gap-8 lg:col-span-5 lg:mb-0 lg:flex-col">
        <H2>
          Matarrese è fiera di far parte di un prestigioso consorzio:{' '}
          <LinkButton
            href="https://www.assogi.it"
            target="_blank"
            rel="noreferrer"
          >
            Assogi
          </LinkButton>
        </H2>
        <a
          className="my-auto"
          href="https://www.assogi.it"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            src={logoAssogi}
            alt="logo Assogi"
            placeholder="blur"
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        </a>
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
  );
}

export {AssogiSection}
