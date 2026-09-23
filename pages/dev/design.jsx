// Solo sviluppo: campione della direzione visiva (DESIGN.md) su foto reali, da approvare prima
// di applicarla alle pagine.
import Image from 'next/image'
import hero from '../../public/img/matarrese_srl_home_01.webp'
import plate from '../../public/img/matarrese_srl_home_03.webp'
import project from '../../public/img/Piazza-Grande_61.webp'
import project2 from '../../public/img/pantaleo-agrobistrot3.webp'

export async function getServerSideProps() {
  if (process.env.NODE_ENV === 'production') return {notFound: true}
  return {props: {}}
}

const SWATCHES = [
  ['Ghisa', '--ghisa', '#1e2226'],
  ['Grafite', '--grafite', '#2b3136'],
  ['Inox', '--inox', '#c9ced2'],
  ['Calce', '--calce', '#f4f5f3'],
  ['Fiamma', '--fiamma', '#de7c00'],
  ['Fiamma testo', '--fiamma-testo', '#995200'],
]

const DARK_KITCHEN = [
  ['Layout dei flussi', 'Postazioni per piattaforma di consegna, percorsi separati per rider e cucina.'],
  ['Tecnologia di cottura', 'Forni combinati e abbattitori dimensionati sui picchi degli ordini serali.'],
  ['Aspirazione e impianti', 'Cappe, trattamento aria e climatizzazione in locali spesso senza affaccio.'],
  ['Assistenza programmata', 'Manutenzione e ricambi in sede: una cucina ferma è un turno perso.'],
]

export default function DesignSpecimen() {
  return (
    <main className="bg-calce text-ghisa">
      {/* Apertura: scuro, foto a tutta altezza, titolo "da targa" */}
      <section className="relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden bg-ghisa text-white">
        <Image src={hero} alt="Bancone bar realizzato da Matarrese" fill priority placeholder="blur" className="-z-10 object-cover object-[55%_50%]" sizes="100vw" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(30_34_38/.92)_0%,rgb(30_34_38/.55)_55%,rgb(30_34_38/.15)_100%)]" />
        <div className="site-shell pb-12 pt-40 lg:pb-16">
          <h1 className="type-display max-w-[14ch] text-[clamp(44px,7.4vw,128px)]">
            Cucine professionali costruite per il servizio vero.
          </h1>
          <p className="mt-8 max-w-[46ch] text-lg text-inox lg:text-xl">
            Progettiamo, costruiamo e assistiamo cucine, laboratori e locali ho.re.ca. da Alberobello, dal 1983.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a href="#" className="inline-flex min-h-[52px] items-center bg-fiamma px-7 font-medium text-ghisa transition-colors hover:bg-white">
              Parla con un progettista
            </a>
            <a href="#" className="border-b border-inox/60 py-2 text-white hover:border-white">
              Guarda i progetti
            </a>
          </div>
          <dl className="mt-16 grid gap-6 border-t border-inox/25 pt-6 text-sm text-inox-muted md:grid-cols-3">
            <div>
              <dt className="sr-only">Sede</dt>
              <dd><span className="type-display block text-3xl text-white">5.000 m²</span>showroom, officina arredi, magazzino ricambi e aula formazione</dd>
            </div>
            <div>
              <dt className="sr-only">Esperienza</dt>
              <dd><span className="type-display block text-3xl text-white">1983</span>oltre quarant&rsquo;anni di cucine professionali in Puglia</dd>
            </div>
            <div>
              <dt className="sr-only">Assistenza</dt>
              <dd><span className="type-display block text-3xl text-white">In sede</span>tecnici e ricambi pronti, anche dopo la consegna</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Capitolo chiaro, editoriale: prove */}
      <section className="site-shell grid gap-12 py-24 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-5">
          <h2 className="type-display text-[clamp(32px,3.6vw,56px)]">Luoghi finiti, pieni di clienti.</h2>
          <p className="mt-6 max-w-[42ch] text-acciaio">
            Ogni progetto parte da come lavorerà la brigata e finisce quando il locale è aperto. Le foto sono dei nostri clienti.
          </p>
          <figure className="mt-12 border-t border-ghisa/15 pt-8">
            <blockquote className="type-editorial text-[clamp(24px,2.3vw,34px)] leading-snug">
              “Ci hanno disegnato la cucina attorno al nostro menù, non il contrario.”
            </blockquote>
            <figcaption className="mt-5 text-sm text-acciaio">Testimonianza di esempio — da sostituire con una reale</figcaption>
          </figure>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:col-span-7">
          {[
            [project, 'Piazza Grande', 'Ristorante ad Alberobello'],
            [project2, 'Pantaleo Agribistrot', 'Agribistrot in Puglia'],
          ].map(([src, title, meta], i) => (
            <a key={title} href="#" className={`group block ${i === 1 ? 'md:mt-24' : ''}`}>
              <div className="relative aspect-[4/5] overflow-hidden bg-inox">
                <Image src={src} alt={title} fill placeholder="blur" sizes="(min-width:1024px) 30vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none" />
              </div>
              <h3 className="type-display mt-5 text-2xl">{title}</h3>
              <p className="mt-1 text-sm text-acciaio">{meta}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Capitolo scuro, tecnico: un settore di punta */}
      <section className="bg-ghisa py-24 text-white lg:py-32">
        <div className="site-shell grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="type-display text-[clamp(32px,3.6vw,56px)]">Dark kitchen pronte a reggere il venerdì sera.</h2>
            <p className="mt-6 max-w-[42ch] text-inox">
              Tecnologia e organizzazione per chi entra nel delivery: dal layout alla manutenzione.
            </p>
            <a href="#" className="mt-10 inline-block border-b border-fiamma py-2 text-fiamma hover:text-white">
              Scopri la soluzione dark kitchen
            </a>
          </div>
          <ul className="lg:col-span-6 lg:col-start-7">
            {DARK_KITCHEN.map(([title, copy]) => (
              <li key={title} className="grid gap-2 border-t border-inox/20 py-7 md:grid-cols-[14rem_1fr]">
                <h3 className="font-medium text-white">{title}</h3>
                <p className="text-inox-muted">{copy}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="site-shell mt-24">
          <div className="relative h-[46vh] min-h-[320px] overflow-hidden">
            <Image src={plate} alt="Piatto preparato durante uno showcooking" fill placeholder="blur" sizes="100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Specifica: palette e scala */}
      <section className="site-shell py-24">
        <h2 className="type-display text-3xl">Specifica</h2>
        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-6">
          {SWATCHES.map(([name, token, hex]) => (
            <li key={token}>
              <div className="h-24 border border-ghisa/10" style={{background: `var(${token})`}} />
              <p className="mt-2 text-sm font-medium">{name}</p>
              <p className="text-xs text-acciaio">{token} · {hex}</p>
            </li>
          ))}
        </ul>
        <div className="mt-16 space-y-4 border-t border-ghisa/15 pt-8">
          {[128, 96, 64, 44, 32, 24].map(size => (
            <p key={size} className="type-display truncate" style={{fontSize: size}}>
              {size} — Cucine su misura
            </p>
          ))}
          <p className="type-editorial text-3xl">Newsreader — il racconto di un progetto, la voce di un cliente.</p>
          <p className="max-w-prose text-lg">Matter 18 — testo corrente per spiegare servizi, tempi e modalità di lavoro in modo chiaro e diretto.</p>
        </div>
      </section>
    </main>
  )
}
