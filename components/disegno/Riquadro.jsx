// Riquadro che si disegna attorno alla foto al passaggio del mouse sul `.group` (o subito,
// con `draw`). Colore dalla classe `text-*` in `className`; il genitore è `relative`. Solo CSS.
export default function Riquadro({className = '', draw = false, pad = 8}) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute overflow-visible ${className}`}
      style={{
        left: -pad,
        top: -pad,
        width: `calc(100% + ${pad * 2}px)`,
        height: `calc(100% + ${pad * 2}px)`,
      }}
    >
      <rect
        width="100%"
        height="100%"
        pathLength="100"
        className={draw ? 'riquadro-draw' : 'riquadro-hover'}
      />
    </svg>
  )
}
