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
