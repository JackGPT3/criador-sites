export const APARELHOS: Record<string, { label: string; imageQuery: string; gradient: string }> = {
  'air-fryer': {
    label: 'Air Fryer',
    imageQuery: 'air fryer food cooking crispy',
    gradient: 'linear-gradient(135deg, #2D5A35, #3A7D44)',
  },
  'micro-ondas': {
    label: 'Micro-ondas',
    imageQuery: 'microwave oven cooking food',
    gradient: 'linear-gradient(135deg, #1C3A4A, #2E6B8A)',
  },
  'panela-pressao-eletrica': {
    label: 'Panela de Pressão',
    imageQuery: 'electric pressure cooker meal',
    gradient: 'linear-gradient(135deg, #5C3A1A, #9A6030)',
  },
  'panela-arroz': {
    label: 'Panela de Arroz',
    imageQuery: 'rice cooker asian food',
    gradient: 'linear-gradient(135deg, #3A4A1C, #6A7A2E)',
  },
  'grill-sanduicheira': {
    label: 'Grill / Sanduicheira',
    imageQuery: 'grill sandwich panini press food',
    gradient: 'linear-gradient(135deg, #4A1C1C, #8A3030)',
  },
}

export const OBJETIVOS: Record<string, { label: string; descricao: string; imageQuery: string }> = {
  'alta-proteina': {
    label: 'Alta Proteína',
    descricao: 'Para hipertrofia e preservar massa magra',
    imageQuery: 'grilled chicken breast protein healthy meal',
  },
  'low-carb': {
    label: 'Low Carb',
    descricao: 'Menos carboidratos, mais resultado',
    imageQuery: 'low carb vegetables salad healthy food',
  },
  'snacks': {
    label: 'Snacks Rápidos',
    descricao: 'Prontos em até 15 minutos',
    imageQuery: 'healthy snacks quick bites food',
  },
  'meal-prep': {
    label: 'Meal Prep',
    descricao: 'Cozinhe uma vez, coma a semana toda',
    imageQuery: 'meal prep containers food weekly',
  },
}
