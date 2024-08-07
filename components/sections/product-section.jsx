import * as React from 'react'
import {LinkButton} from '../button'
import {HeroSection} from './hero-section'
import {motion} from 'framer-motion'

function ListMenu() {
  const childVariants = {
    initial: {opacity: 0, y: 25},
    visible: {opacity: 1, y: 0, transition: {duration: 0.5}},
  }

  return (
    <motion.ul
      className="text-secondary text-xl"
      variants={{
        initial: {opacity: 0},
        visible: {opacity: 1, transition: {staggerChildren: 0.2}},
      }}
    >
      <motion.li variants={childVariants} className="my-2">
        <LinkButton href="#lavorazione" withArrow>
          Per la lavorazione
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
    </motion.ul>
  )
}

export default function ProductSection() {
  return (
    <HeroSection
      subtitle="Prodotti"
      title="Tecnologie e innovazione irrinunciabili in cucina"
      image="/img/pastorizzatore-prodotti.png"
      action={ListMenu()}
    />
  )
}
