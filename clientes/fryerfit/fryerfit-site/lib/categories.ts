export const APARELHOS: Record<string, { label: string; emoji: string; gradient: string }> = {
  'air-fryer': {
    label: 'Air Fryer',
    emoji: '💨',
    gradient: 'linear-gradient(135deg, #2D5A35, #3A7D44)',
  },
  'micro-ondas': {
    label: 'Micro-ondas',
    emoji: '📡',
    gradient: 'linear-gradient(135deg, #1C3A4A, #2E6B8A)',
  },
  'panela-pressao-eletrica': {
    label: 'Panela de Pressão',
    emoji: '♨️',
    gradient: 'linear-gradient(135deg, #5C3A1A, #9A6030)',
  },
  'panela-arroz': {
    label: 'Panela de Arroz',
    emoji: '🍚',
    gradient: 'linear-gradient(135deg, #3A4A1C, #6A7A2E)',
  },
  'grill-sanduicheira': {
    label: 'Grill / Sanduicheira',
    emoji: '🥪',
    gradient: 'linear-gradient(135deg, #4A1C1C, #8A3030)',
  },
}

export const OBJETIVOS: Record<string, { label: string; emoji: string; descricao: string }> = {
  'alta-proteina': {
    label: 'Alta Proteína',
    emoji: '💪',
    descricao: 'Para hipertrofia e preservar massa magra',
  },
  'low-carb': {
    label: 'Low Carb',
    emoji: '🥗',
    descricao: 'Menos carboidratos, mais resultado',
  },
  'snacks': {
    label: 'Snacks Rápidos',
    emoji: '⚡',
    descricao: 'Prontos em até 15 minutos',
  },
  'meal-prep': {
    label: 'Meal Prep',
    emoji: '📦',
    descricao: 'Cozinhe uma vez, coma a semana toda',
  },
}
