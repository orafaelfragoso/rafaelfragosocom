export interface ArticleMetadata {
  title: string
  description: string
  date: string
  category: string
  tags?: string[]
  author?: string
  image?: string
}

export interface Article extends ArticleMetadata {
  slug: string
  content: string
}
