// Pianta 1200×800 della cucina sopra la foto finita (dentro i muri). Ogni forma con data-draw
// si traccia, data-fade compare, data-photo è la foto: l'animazione è di chi la usa
// (home/HeroPianta). `lines`: colore delle linee (con movimento ridotto già quello finale),
// `veil`: velo sulla foto perché le linee restino leggibili.
import Image from 'next/image'

const FUOCHI = [140, 260, 380, 500]

function Disegno({className}) {
  return (
    <svg
      viewBox="0 0 1200 800"
      className={`pianta absolute inset-0 h-full w-full ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect data-draw x="40" y="40" width="1120" height="720" strokeWidth="4" />
      <rect data-fade x="100" y="100" width="560" height="130" strokeDasharray="10 8" />
      <rect data-draw x="120" y="120" width="520" height="90" />
      {FUOCHI.map(x => (
        <g key={x}>
          <rect data-draw x={x} y="125" width="80" height="80" />
          <circle data-draw cx={x + 40} cy="165" r="22" />
        </g>
      ))}
      <rect data-draw x="120" y="300" width="520" height="60" />
      <rect data-draw x="760" y="120" width="300" height="90" />
      <circle data-draw cx="820" cy="165" r="28" />
      <circle data-draw cx="900" cy="165" r="28" />
      <rect data-draw x="760" y="520" width="360" height="200" />
      <path data-draw d="M760 620 A100 100 0 0 1 860 720" />
      <line data-draw x1="760" y1="620" x2="760" y2="720" />
      <rect data-draw x="120" y="520" width="520" height="200" />
      {[250, 380, 510].map(x => (
        <line key={x} data-draw x1={x} y1="520" x2={x} y2="720" />
      ))}
      <g strokeWidth="1.5">
        <line data-draw x1="40" y1="785" x2="1160" y2="785" />
        <line data-draw x1="40" y1="778" x2="40" y2="792" />
        <line data-draw x1="1160" y1="778" x2="1160" y2="792" />
        <line data-draw x1="20" y1="40" x2="20" y2="760" />
        <line data-draw x1="13" y1="40" x2="27" y2="40" />
        <line data-draw x1="13" y1="760" x2="27" y2="760" />
      </g>
      <text x="600" y="778" textAnchor="middle">18.400</text>
      <text x="12" y="400" textAnchor="middle" transform="rotate(-90 12 400)">
        12.000
      </text>
      <text x="380" y="90" textAnchor="middle">CAPPA</text>
      <text x="380" y="270" textAnchor="middle">LINEA COTTURA</text>
      <text x="380" y="338" textAnchor="middle">PASSE</text>
      <text x="910" y="250" textAnchor="middle">LAVAGGIO</text>
      <text x="380" y="748" textAnchor="middle">DISPENSA</text>
      <text x="940" y="748" textAnchor="middle">CELLA</text>
    </svg>
  )
}

export default function Pianta({photo, className = '', lines, veil}) {
  return (
    <div data-plan className={`relative aspect-[3/2] ${className}`}>
      <div
        data-photo
        className="absolute inset-[5%_3.33%] opacity-0 motion-reduce:opacity-90"
      >
        <Image
          src={photo}
          alt=""
          fill
          preload
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover"
        />
        <div className={`absolute inset-0 ${veil}`} />
      </div>
      <Disegno className={lines} />
    </div>
  )
}
