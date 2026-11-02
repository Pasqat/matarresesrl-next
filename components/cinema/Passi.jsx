// Sequenza numerata su ghisa (stile "Come lavoriamo" della landing): numero serif fiamma,
// titolo e testo tra filetti. Solo per sequenze vere (DESIGN.md).
export default function Passi({passi}) {
  return (
    <ol className="cin-passi">
      {passi.map(([titolo, testo], i) => (
        <li key={titolo}>
          <span className="cin-num" aria-hidden="true">
            {i + 1}
          </span>
          <div>
            <h3>{titolo}</h3>
            <p>{testo}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
