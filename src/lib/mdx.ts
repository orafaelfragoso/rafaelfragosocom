import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import matter from 'gray-matter'
import { cacheLife, cacheTag } from 'next/cache'
import type { Article, ArticleMetadata } from '@/types/article'

const articlesDirectory = join(process.cwd(), 'content')

const readArticleFile = async (slug: string): Promise<Article> => {
  const fullPath = join(articlesDirectory, `${slug}.mdx`)
  const fileContents = await readFile(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const metadata = data as ArticleMetadata

  // Return a plain object by explicitly spreading to ensure it's serializable
  return JSON.parse(JSON.stringify({
    slug,
    category: metadata.category,
    title: metadata.title,
    description: metadata.description,
    date: metadata.date,
    tags: metadata.tags,
    author: metadata.author,
    image: metadata.image,
    content,
  }))
}

export const getAllArticleFiles = async (): Promise<Article[]> => {
  'use cache'
  cacheTag('articles-list')
  cacheLife('hours')

  const files = await readdir(articlesDirectory, { withFileTypes: true })

  const articlePromises = files.map((file) => {
    const slug = file.name.replace(/\.mdx$/, '')
    return readArticleFile(slug).catch((error) => {
      console.error(`Error reading article ${slug}:`, error)
      return null
    })
  })

  const articles = (await Promise.all(articlePromises)).filter((article): article is Article => article !== null)

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
  'use cache'
  cacheTag(`article-${slug}`)
  cacheLife('hours')

  try {
    return await readArticleFile(slug)
  } catch (_error) {
    return null
  }
}

export const getArticlesByCategory = async (category: string): Promise<Article[]> => {
  const allArticles = await getAllArticleFiles()
  return allArticles.filter((article) => {
    return article.category === category
  })
}

export const getAllCategories = async (): Promise<string[]> => {
  const allArticles = await getAllArticleFiles()
  const categories = new Set(allArticles.map((article) => article.category))
  return Array.from(categories).sort()
}
