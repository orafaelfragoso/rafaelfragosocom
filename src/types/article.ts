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

export interface ArticleListItem {
  slug: string
  category: string
  title: string
  description: string
  date: string
  tags?: string[]
  image?: string
}

export interface StackingValues {
  layer1: {
    rotate: number
    translateX: number
    translateY: number
    hoverX: number
    hoverY: number
    hoverRotate: number
  }
  layer2: {
    rotate: number
    translateX: number
    translateY: number
    hoverX: number
    hoverY: number
    hoverRotate: number
  }
}

export interface Pack {
  title: string
  description: string
  author: string
  contributors?: string[]
  category: string
  date?: string
  articleSlug?: string
}
