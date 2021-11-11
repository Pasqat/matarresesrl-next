import * as React from 'react'
import Link from 'next/link'
import {LinkButton} from '../button'
import {HeroSection} from './hero-section'
import {motion} from 'framer-motion'

function ListMenu() {
  const childVariants = {
    initial: {opacity: 0, y: 25},
    visible: {opacity: 1, y: 0, transition: {duration: 0.5}},
  }

  return (
    <ul className="text-secondary text-xl">
      <motion.li variants={childVariants} className="my-2">
        <LinkButton href="#lavorazione" withArrow>
          Per la Lavorazione
        </LinkButton>
      </motion.li>
      <motion.li variants={childVariants} className="my-2">
        <LinkButton href="#accoglienza" withArrow>
          Tutto per l&apos;accoglienza
        </LinkButton>
      </motion.li>
      <motion.li variants={childVariants} className="my-2">
        <LinkButton href="#igiene" withArrow>
          Igiene
        </LinkButton>
      </motion.li>
      <motion.li variants={childVariants} className="my-2">
        <LinkButton href="#trattamento-aria" withArrow>
          Trattamento dell&apos;aria
        </LinkButton>
      </motion.li>
    </ul>
  )
}

export default function ProductSection() {
  return (
    <HeroSection
      title="Prodotti"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In."
      image="/img/pastorizzatore-prodotti.jpg"
      action={ListMenu()}
    />
  )
}
