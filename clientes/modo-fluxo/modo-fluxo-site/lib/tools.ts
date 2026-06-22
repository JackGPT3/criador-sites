import toolsData from '@/content/ferramentas/tools.json'
import type { Tool } from './types'

export const TOOL_CATEGORIES: Record<string, { label: string; emoji: string; color: string; gradient: string; description: string }> = {
  'automacao': {
    label: 'Automação',
    emoji: '⚡',
    color: 'text-orange-700 bg-orange-50',
    gradient: 'linear-gradient(135deg, #EA580C, #F97316)',
    description: 'Ferramentas para automatizar processos e integrar sistemas sem código',
  },
  'criacao-conteudo': {
    label: 'Criação de Conteúdo',
    emoji: '✍️',
    color: 'text-purple-700 bg-purple-50',
    gradient: 'linear-gradient(135deg, #7C3AED, #A855F7)',
    description: 'IA para criar textos, imagens, vídeos e áudios com qualidade profissional',
  },
  'atendimento': {
    label: 'Atendimento',
    emoji: '💬',
    color: 'text-teal-700 bg-teal-50',
    gradient: 'linear-gradient(135deg, #0E3A6E, #159BA8)',
    description: 'Chatbots, WhatsApp e automação de suporte ao cliente',
  },
  'produtividade': {
    label: 'Produtividade',
    emoji: '🚀',
    color: 'text-green-700 bg-green-50',
    gradient: 'linear-gradient(135deg, #15803D, #22C55E)',
    description: 'Ferramentas para organização, foco e gestão de tarefas com IA',
  },
  'analise-dados': {
    label: 'Análise de Dados',
    emoji: '📊',
    color: 'text-blue-700 bg-blue-50',
    gradient: 'linear-gradient(135deg, #1D4ED8, #3B82F6)',
    description: 'Ferramentas de BI, dashboards e análise de dados com inteligência artificial',
  },
}

export function getAllTools(): Tool[] {
  return toolsData as Tool[]
}

export function getToolsByCategory(category: string): Tool[] {
  return getAllTools().filter((t) => t.category === category)
}

export function getToolBySlug(categoria: string, slug: string): Tool | undefined {
  return getAllTools().find((t) => t.category === categoria && t.slug === slug)
}

export function getFeaturedTools(): Tool[] {
  return getAllTools().filter((t) => t.featured)
}

export function formatToolDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
