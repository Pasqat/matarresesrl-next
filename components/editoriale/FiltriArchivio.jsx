// Filtri degli archivi (news, realizzazioni): chip delle categorie e campo di ricerca a linea.
// Solo presentazione: stato, query string e tracciamento restano nelle pagine.
import {forwardRef} from 'react'
import {SearchIcon} from '../icons/search-icon'

export function ChipCategorie({
  label,
  categories,
  isSelected,
  isDisabled,
  onToggle,
}) {
  if (!categories?.length) return null
  return (
    <div role="group" aria-labelledby="filtri-label">
      <p id="filtri-label" className="text-sm text-acciaio">
        {label}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {categories.map(category => {
          const selected = isSelected(category)
          return (
            <li key={category}>
              <button
                type="button"
                aria-pressed={selected}
                disabled={isDisabled(category)}
                onClick={() => onToggle(category)}
                className={`min-h-[44px] border px-4 text-[15px] transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                  selected
                    ? 'border-ghisa bg-ghisa text-white'
                    : 'border-ghisa/20 text-ghisa enabled:hover:border-ghisa'
                }`}
              >
                {category}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export const CampoRicerca = forwardRef(function CampoRicerca(
  {label, value, onChange, onKeyUp, count, isSearching, buttonProps},
  ref,
) {
  return (
    <form role="search" onSubmit={e => e.preventDefault()}>
      <label htmlFor="archivio-q" className="sr-only">
        {label}
      </label>
      <div className="group relative flex items-center border-b border-ghisa/30 transition-colors focus-within:border-ghisa hover:border-ghisa">
        <button
          type="button"
          aria-label={value === '' ? 'Cerca' : 'Pulisci ricerca'}
          title={value === '' ? 'Cerca' : 'Pulisci ricerca'}
          className="flex h-11 w-11 shrink-0 items-center justify-center text-acciaio hover:text-ghisa"
          {...buttonProps}
        >
          <SearchIcon />
        </button>
        <input
          ref={ref}
          id="archivio-q"
          type="search"
          name="q"
          value={value}
          onChange={onChange}
          onKeyUp={onKeyUp}
          placeholder="Cerca"
          className="min-w-0 flex-1 bg-transparent py-4 pl-2 text-xl text-ghisa placeholder:text-acciaio md:text-2xl"
        />
        <span aria-live="polite" className="shrink-0 pl-4 text-sm text-acciaio">
          {isSearching
            ? `${count} ${count === 1 ? 'risultato' : 'risultati'}`
            : null}
        </span>
      </div>
    </form>
  )
})

export function CaricaAltri({shown, total, onClick, children}) {
  return (
    <div className="mt-20 flex flex-col items-center gap-4">
      <p className="text-sm text-acciaio">
        {shown} di {total}
      </p>
      <button
        type="button"
        onClick={onClick}
        className="inline-flex min-h-[52px] items-center border border-ghisa px-7 font-medium text-ghisa transition-colors hover:bg-ghisa hover:text-white"
      >
        {children}
      </button>
    </div>
  )
}
