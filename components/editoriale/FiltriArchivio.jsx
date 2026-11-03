// "Mostra altri" per gli archivi (news, realizzazioni): avanza a blocchi, il conteggio resta visibile.
export function CaricaAltri({shown, total, onClick, children}) {
  return (
    <div className="mt-20 flex flex-col items-center gap-4">
      <p className="text-sm text-acciaio">
        {shown} di {total}
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
