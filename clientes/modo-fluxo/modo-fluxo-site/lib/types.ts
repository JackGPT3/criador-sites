export interface ToolPricing {
  hasFree: boolean
  freeTier?: string
  startingPrice?: string
  model: 'freemium' | 'subscription' | 'usage-based' | 'one-time'
}

export interface Tool {
  slug: string
  name: string
  category: string
  tagline: string
  description: string
  pros: string[]
  cons: string[]
  useCases: string[]
  whoFor: string
  whoNotFor: string
  pricing: ToolPricing
  websiteUrl: string
  affiliateUrl?: string
  logoUrl?: string
  tags: string[]
  lastUpdated: string
  featured?: boolean
  relatedPosts?: string[]
}

export interface PostFrontmatter {
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  image?: string
  author?: string
  featured?: boolean
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  readingTime: string
}

export interface PostWithContent extends Post {
  content: string
}
