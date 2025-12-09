import * as React from 'react'

import Link from 'next/link'
import Image from "next/legacy/image"
import logoAssogi from '../../public/img/logos/Assogi_logo-300x119.png'
import logoQucino from '../../public/img/logos/MARCHIO-QUCINO150.png'
import logoAliGroup from '../../public/img/logos/Ali_Group_logo.png'

import {H4} from '../typography'
import {Grid} from '../grid'
import NewsletterFormFooter from '../Form/NewsletterFormFooter'

import {FacebookIcon} from '../icons/facebook-icon'
import {LinkedInIcon} from '../icons/linkedin-icon'
import {InstagramIcon} from '../icons/instagram-icon'
import {MapIcon} from '../icons/map-icon'
import {PhoneIcon} from '../icons/phone-icon'
import {BadgeCheckedIcon} from '../icons/badge-checked-icon'
import {MailIcon} from '../icons/mail-icon'

const groups = [
  {id: '101815183605761042', name: 'Altro'},
  {id: '101815183615198233', name: 'Ristorante'},
  {id: '101815183623586848', name: 'Gastronomia'},
  {id: '101815183631975460', name: 'Pizzeria'},
  {id: '101815183638266920', name: 'Pasticceria'},
  {id: '101815183643509806', name: 'Gelateria'},
  {id: '101815183649801267', name: 'Hotel - Sala Ricevimenti - B&B'},
  {id: '101815183656092727', name: 'Enti-PA'},
  {id: '101815183662384187', name: 'Supermercati ed Alimentari'},
  {id: '101815183670772802', name: 'Villaggio Turistico'},
  {id: '101815183677064262', name: 'Macelleria'},
  {id: '101815183683355723', name: 'Panificio'},
  {id: '101815183690695758', name: 'Bar'},
  {id: '101815183696987219', name: 'Agriturismo'},
  {id: '101815183705375834', name: 'Caseificio'},
  {id: '101815183713764449', name: 'Pub'},
  {id: '101815183720055909', name: 'Vineria'},
  {id: '101815183727395948', name: 'Pescheria'},
  {id: '101815183734735989', name: 'Pastificio'},
  {id: '101815183742076028', name: 'Industrie'},
  {id: '101815183749416065', name: 'No food'},
  {id: '101815183755707523', name: 'Braceria'},
  {id: '101815183761998985', name: 'Privato'},
]

export default function Footer() {
  return (
    <footer className="relative bg-gray-100 text-gray-600">
      <div className="py-8">
        <NewsletterFormFooter featured groups={groups} />
      </div>
      <Grid className="py-14">
        <div className="col-span-full mx-auto text-center lg:col-span-3">
          <Link href="/">
            <a className="items-center justify-center pb-2">
              <Image
                width={340}
                height={20}
                alt={'Logo Matarrese srl'}
                src="/img/logos/logo-matarrese-grigio-350.png"
              />
            </a>
          </Link>
          <div className="my-6 text-center">
            <a
              href="https://www.facebook.com/matarresesrl"
              target="_blank"
              rel="noreferrer"
            >
              <button className="mr-2 h-10 w-10 font-normal" type="button">
                <FacebookIcon size="30" />
              </button>
            </a>
            <a
              href="https://www.linkedin.com/company/matarrese-srl/"
              rel="noreferrer"
              target="_blank"
            >
              <button className="mr-2 h-10 w-10 font-normal" type="button">
                <LinkedInIcon size="30" />
              </button>
            </a>
            <a
              rel="noreferrer"
              href="https://www.instagram.com/matarrese.srl/"
              target="_blank"
            >
              <button className="mr-2 h-10 w-10 font-normal" type="button">
                <InstagramIcon size="30" />
              </button>
            </a>
          </div>
          <div className="my-16 flex flex-wrap justify-start">
            <a
              rel="noreferrer"
              href="https://www.istitutoeccelsa.it"
              target="_blank"
            >
              <div className="relative h-20 w-28">
                <Image
                  placeholder="blur"
                  layout="fill"
                  objectFit="contain"
                  alt="Logo Assogi"
                  src={logoAssogi}
                />
              </div>
            </a>
            <a rel="noreferrer" href="https://www.qucino.it/" target="_blank">
              <div className="relative ml-4 h-20 w-24">
                <Image
                  layout="fill"
                  objectFit="contain"
                  alt="Logo Qucino"
                  src={logoQucino}
                  placeholder="blur"
                />
              </div>
            </a>
            {/* <a rel="noreferrer" href="https://www.aligroup.it/" target="_blank">
              <div className="relative h-16 w-16">
                <Image
                  layout="fill"
                  objectFit="contain"
                  alt="Logo Aligroup"
                  src={logoAliGroup}
                  placeholder="blur"
                />
              </div>
            </a> */}
          </div>
        </div>
        <div className="col-span-full pl-4 lg:col-span-3">
          <H4 as="p" variant="secondary">
            Links
          </H4>
          <nav className="mb-10 list-none">
            <ul>
              <li>
                <Link href="/azienda">
                  <a className="text-gray-600 hover:text-gray-800">Chi siamo</a>
                </Link>
              </li>
              <li>
                <Link href="/contatti">
                  <a className="text-gray-600 hover:text-gray-800">Contatti</a>
                </Link>
              </li>
              <li>
                <Link href="/news">
                  <a className="text-gray-600 hover:text-gray-800">News</a>
                </Link>
              </li>
              <li>
                <Link href="/realizzazioni">
                  <a className="text-gray-600 hover:text-gray-800">
                    Realizzazioni
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/#assogi">
                  <a className="text-gray-600 hover:text-gray-800">Assogi</a>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy">
                  <a className="text-gray-600 hover:text-gray-800">
                    Termini e Condizioni
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="col-span-full w-full pl-4 lg:col-span-3">
          <H4 as="p" variant="secondary">
            Contatti
          </H4>
          <nav className="mb-10 list-none text-sm">
            <ul>
              <li className="mb-2 flex">
                <MapIcon />
                <span className="ml-2 text-gray-600 hover:text-gray-800">
                  Matarrese srl, Contrada Popoleto, n.c. 70011 Alberobello (BA)
                </span>
              </li>
              <li className="mb-2 flex">
                <PhoneIcon />
                <a
                  className="ml-2 text-gray-600 hover:text-gray-800"
                  href="tel:00390804323431"
                >
                  +39 080 4323431
                </a>
              </li>
              <li className="mb-2 flex">
                <MailIcon size="20" />
                <a
                  className="ml-2 text-gray-600 hover:text-gray-800"
                  href="mailto:matarrese@matarrese.it"
                >
                  matarrese@matarrese.it
                </a>
              </li>
              <li className="mb-2 flex">
                <BadgeCheckedIcon />
                <span className="ml-2 text-gray-600 hover:text-gray-800">
                  P.IVA 04356890725
                </span>
              </li>
            </ul>
          </nav>
        </div>
        <div className="col-span-full pl-4 lg:col-span-3">
          <H4 as="p" variant="secondary">
            Orari
          </H4>
          <div className="mb-10 text-sm text-gray-600">
            <div className="flex flex-row justify-between">
              <div>Lunedì - Venerdì</div>
              <div className="ml-3 font-medium text-gray-500">
                <p>09:00 - 13:00</p>
                <p> 15:00 - 18:30</p>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div>Sabato - Domenica</div>
              <div className="ml-3 font-medium text-gray-500">chiuso</div>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <p>
              Assistenza tecnica:{' '}
              <a href="tel:00300804323651" className="cursor-pointer underline">
                +39 080 4323651
              </a>
            </p>
            <p>
              {`Numero attivo dal lunedì al venerdì nelle ore 08:30 - 13:00 e 15:00 - 17:30`}
            </p>
            <p className="pt-2 italic">
              Per urgenze nei giorni festivi, il servizio di risposta verrà
              garantito entro 24 h dalla chiamata e l&apos;eventuale intervento
              tecnico verrà valutato con tariffa dedicata.
            </p>
          </div>
        </div>
      </Grid>
      <div className="mx-10vw bg-gray-100">
        <div className="mx-auto flex max-w-7xl flex-col flex-wrap items-center justify-end px-5 py-4 md:flex-row">
          <p className="sm:text-left text-center text-sm text-gray-500">
            Copyright © {new Date().getFullYear()} Matarrese srl{' '}
          </p>
          {/* <div className="sm:justify-start sm:mt-0 sm:ml-auto mt-2 inline-flex justify-center">
            <p className="text-center text-sm text-gray-500">
              by <span className="font-semibold">Pasquale Matarrese</span>
            </p>
            <a
              href="https://www.facebook.com/pasqat"
              className="ml-3 cursor-pointer text-gray-500 hover:text-yellow-500"
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-5 w-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a
              href="https://twitter.com/pasqat"
              className="ml-3 text-gray-500 hover:text-yellow-500"
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-5 w-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a
              href="https://github.com/pasqat/"
              className="ml-3 text-gray-500 hover:text-black"
            >
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="h-5 w-5"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729
                      1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0
                      1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479
                      5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/pasquale-matarrese/"
              className="ml-3 text-gray-500 hover:text-yellow-500"
            >
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="h-5 w-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H4z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  )
}
