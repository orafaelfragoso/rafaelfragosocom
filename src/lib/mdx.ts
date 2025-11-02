import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import matter from 'gray-matter'
import { unstable_cache } from 'next/cache'
import type { Article, ArticleMetadata } from '@/types/article'

const articlesDirectory = join(process.cwd(), 'content')

const readArticleFile = async (slug: string): Promise<Article> => {
  const fullPath = join(articlesDirectory, `${slug}.mdx`)
  const fileContents = await readFile(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const metadata = data as ArticleMetadata

  return {
    slug,
    category: metadata.category,
    title: metadata.title,
    description: metadata.description,
    date: metadata.date,
    tags: metadata.tags,
    author: metadata.author,
    image: metadata.image,
    content,
  }
}

export const getAllArticleFiles = unstable_cache(
  async (): Promise<Article[]> => {
    const files = await readdir(articlesDirectory, { withFileTypes: true })
    const articles: Article[] = []

    for (const file of files) {
      const slug = file.name.replace(/\.mdx$/, '')

      try {
        const article = await readArticleFile(slug)
        articles.push(article)
      } catch (error) {
        console.error(`Error reading article ${slug}:`, error)
      }
    }

    return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  },
  ['all-articles'],
  {
    tags: ['articles'],
    revalidate: false,
  },
)

export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
  return unstable_cache(
    async () => {
      try {
        return await readArticleFile(slug)
      } catch (_error) {
        return null
      }
    },
    ['article-by-slug', slug],
    {
      tags: ['articles'],
      revalidate: false,
    },
  )()
}

export const getArticlesByCategory = async (category: string): Promise<Article[]> => {
  return unstable_cache(
    async () => {
      const allArticles = await getAllArticleFiles()

      return allArticles.filter((article) => {
        return article.category === category
      })
    },
    ['articles-by-category', category],
    {
      tags: ['articles'],
      revalidate: false,
    },
  )()
}

export const getAllCategories = unstable_cache(
  async (): Promise<string[]> => {
    const allArticles = await getAllArticleFiles()
    const categories = new Set(allArticles.map((article) => article.category))
    return Array.from(categories).sort()
  },
  ['all-categories'],
  {
    tags: ['articles'],
    revalidate: false,
  },
)
