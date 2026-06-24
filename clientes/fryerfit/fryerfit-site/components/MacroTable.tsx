type Macros = {
  calorias: number
  proteina: number
  carbs: number
  gordura: number
  porcao?: string
}

export function MacroTable({ macros }: { macros: Macros }) {
  const rows = [
    { label: 'Valor energético', value: macros.calorias, unit: 'kcal', bold: true },
    { label: 'Proteínas', value: macros.proteina, unit: 'g', bold: false },
    { label: 'Carboidratos totais', value: macros.carbs, unit: 'g', bold: false },
    { label: 'Gorduras totais', value: macros.gordura, unit: 'g', bold: false },
  ]

  return (
    <div
      className="rounded-xl my-8 overflow-hidden"
      style={{ border: '2px solid var(--fg)' }}
    >
      {/* Header */}
      <div className="px-4 py-3" style={{ background: 'var(--fg)' }}>
        <p className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--bg)' }}>
          Informação Nutricional
        </p>
      </div>

      {/* Porção */}
      {macros.porcao && (
        <div className="px-4 py-2 border-b" style={{ borderColor: 'var(--divider)', background: 'var(--surface)' }}>
          <p className="text-sm" style={{ color: 'var(--subtle)' }}>
            Por porção: <span style={{ color: 'var(--fg)' }} className="font-medium">{macros.porcao}</span>
          </p>
        </div>
      )}

      {/* Rows */}
      <div style={{ background: 'var(--surface)' }}>
        {rows.map((row, i) => (
          <div
            key={row.label}
            className="flex justify-between items-baseline px-4 py-2.5"
            style={{
              borderTop: i === 0 ? '3px solid var(--fg)' : '1px solid var(--divider)',
            }}
          >
            <span
              className={`text-sm ${row.bold ? 'font-bold' : 'font-normal'}`}
              style={{ color: 'var(--fg)' }}
            >
              {row.label}
            </span>
            <span
              className="text-sm font-bold tabular-nums"
              style={{ color: row.bold ? 'var(--accent)' : 'var(--fg)' }}
            >
              {row.value} {row.unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
