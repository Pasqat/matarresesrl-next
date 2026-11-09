// "Mostra altri" per gli archivi (news, realizzazioni): avanza a blocchi, dice quanti ne restano.
// `nomi`: [singolare, plurale] di un sostantivo maschile, es. ['progetto', 'progetti'].
export function CaricaAltri({shown, total, nomi, onClick, children}) {
  const restano = total - shown
  return (
    <div className="mt-20 flex flex-col items-center gap-4">
      <p className="text-sm text-acciaio">
        {restano === 1 ? `Un altro ${nomi[0]}` : `Altri ${restano} ${nomi[1]}`}
      </p>
      <button
        type="button"
        onClick={onClick}
        className="inline-flex min-h-[52px] items-center rounded-full border border-ghisa px-7 font-medium text-ghisa transition-colors hover:bg-ghisa hover:text-white"
      >
        {children}
      </button>
    </div>
  )
}
