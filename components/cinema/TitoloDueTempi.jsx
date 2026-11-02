// Titolo a due tempi (DESIGN.md): prima riga in Inter Tight, seconda in Instrument Serif
// corsivo più chiaro. `tono="chiaro"` su fondo calce.
import clsx from 'clsx'

export default function TitoloDueTempi({
  as: Tag = 'h2',
  riga,
  accento,
  tono = 'scuro',
  className,
  rigaClassName,
  accentoClassName,
  rigaStyle,
  accentoStyle,
  ...props
}) {
  return (
    <Tag
      {...props}
      data-tono={tono}
      className={clsx('cin-titolo type-display', className)}
    >
      <span className={rigaClassName} style={rigaStyle}>
        {riga}
      </span>{' '}
      <span
        className={clsx('type-accento', accentoClassName)}
        style={accentoStyle}
      >
        {accento}
      </span>
    </Tag>
  )
}
