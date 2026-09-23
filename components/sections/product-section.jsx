import {HeroSection} from './hero-section'
import Link from 'next/link'
export default function ProductSection() {
  return (
    <HeroSection
      subtitle="Prodotti"
      title="Ogni strumento, al posto giusto."
      titleAs="h1"
      image="/img/matarrese_srl_home_02.webp"
      imageAlt="Attrezzature e cucina professionale Matarrese"
      action={
        <nav className="product-jumps" aria-label="Categorie di prodotto">
          <Link href="#lavorazione">Lavorazione e conservazione</Link>
          <Link href="#accoglienza">Accoglienza</Link>
          <Link href="#igiene">Igiene</Link>
          <Link href="#trattamento-aria">Trattamento dell’aria</Link>
        </nav>
      }
    />
  )
}
