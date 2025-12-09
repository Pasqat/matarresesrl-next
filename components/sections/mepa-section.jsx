import * as React from 'react'
import Image from "next/legacy/image"

import {H2} from '../typography'
import {Grid} from '../grid'
import logoConsip from '../../public/img/logos/Consip_Logo.webp'
import logoAcquistinrete from '../../public/img/logos/acquistinrete.webp'
import logoMEF from '../../public/img/logos/Logo_mef.webp'

function MepaSection() {
  return (
    <Grid featured rowGap>
      <div className="col-span-full mb-8 lg:col-span-5 lg:mb-0 lg:items-start">
        <H2 className="text-center lg:text-right">
          Siamo presenti anche su Mepa: Mercato Elettronico della Pubblica
          Amministrazione
        </H2>
      </div>
      <div className="col-span-full lg:col-span-5 lg:col-start-8 lg:mr-12">
        <div className="flex flex-col items-center justify-center gap-12">
          <div className="">
            <Image
              src={logoAcquistinrete}
              alt="logo acquistinrete"
              layout="intrinsic"
              placeholder="blur"
            />
          </div>
          <div className="">
            <Image
              src={logoConsip}
              alt="logo consig"
              layout="intrinsic"
              placeholder="blur"
            />
          </div>
          <div className="">
            <Image
              src={logoMEF}
              alt="logo ministero dell'economia"
              layout="intrinsic"
              placeholder="blur"
            />
          </div>
        </div>
        {/*   <Paragraph> */}
        {/*     Il MePA è un mercato digitale in cui le Amministrazioni abilitate */}
        {/*     possono acquistare, per valori inferiori alla soglia comunitaria, i */}
        {/*     beni e servizi offerti da fornitori abilitati a presentare i propri */}
        {/*     cataloghi sul sistema. Consip definisce con appositi bandi le */}
        {/*     tipologie di beni e servizi e le condizioni generali di fornitura, */}
        {/*     gestisce l’abilitazione dei fornitori e la pubblicazione e */}
        {/*     l’aggiornamento dei cataloghi. Accedendo alla{' '} */}
        {/*     <strong>Vetrina del Mercato Elettronico</strong> o navigando sul */}
        {/*     catalogo prodotti, le Amministrazioni possono verificare l’offerta di */}
        {/*     beni e/o servizi e, una volta abilitate, effettuare acquisti on line, */}
        {/*     confrontando le proposte dei diversi fornitori e scegliendo più */}
        {/*     rispondente alle proprie esigenze. */}
        {/*   </Paragraph> */}
      </div>
    </Grid>
  )
}

export {MepaSection}
