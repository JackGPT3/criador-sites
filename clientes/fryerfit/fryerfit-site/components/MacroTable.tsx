type Macros = {
  calorias: number
  proteina: number
  carbs: number
  gordura: number
  porcao?: string
}

export function MacroTable({ macros }: { macros: Macros }) {
  const items = [
    { label: 'Calorias', value: macros.calorias, unit: 'kcal' },
    { label: 'Proteína', value: macros.proteina, unit: 'g' },
    { label: 'Carboidratos', value: macros.carbs, unit: 'g' },
    { label: 'Gordura', value: macros.gordura, unit: 'g' },
  ]

  return (
    <div
      className="rounded-lg border p-4 my-6"
      style={{ borderColor: 'var(--divider)', background: 'var(--surface)' }}
    >
      {macros.porcao && (
        <p className="text-xs mb-3 font-medium uppercase tracking-wider" style={{ color: 'var(--subtle)' }}>
          Por porção — {macros.porcao}
        </p>
      )}
      <div className="grid grid-cols-4 gap-3">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-0.5">
            <span
              className="text-xl font-bold tabular-nums"
              style={{ color: 'var(--accent)' }}
            >
              {item.value}{item.unit}
            </span>
            <span className="text-xs uppercase tracking-wide" style={{ color: 'var(--subtle)' }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
