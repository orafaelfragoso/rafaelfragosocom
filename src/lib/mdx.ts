import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import matter from 'gray-matter'
import { unstable_cache } from 'next/cache'
import type { Article, ArticleListItem, ArticleMetadata } from '@/types/article'
import { getCategorySlug } from './category'

const articlesDirectory = join(process.cwd(), 'content', 'articles')

const readArticleFile = async (category: string, slug: string): Promise<Article> => {
  const fullPath = join(articlesDirectory, category, `${slug}.mdx`)
  const fileContents = await readFile(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const metadata = data as ArticleMetadata

  return {
    slug,
    category: metadata.category || category,
    title: metadata.title,
    description: metadata.description,
    date: metadata.date,
    tags: metadata.tags,
    author: metadata.author,
    image: metadata.image,
    content,
  }
}

const getAllArticleFiles = unstable_cache(
  async (): Promise<Article[]> => {
    const categories = await readdir(articlesDirectory, { withFileTypes: true })

    const articles: Article[] = []

    for (const category of categories) {
      if (!category.isDirectory()) continue

      const categoryName = category.name
      const categoryPath = join(articlesDirectory, categoryName)

      const files = await readdir(categoryPath)
      const mdxFiles = files.filter((file) => file.endsWith('.mdx'))

      for (const file of mdxFiles) {
        const slug = file.replace(/\.mdx$/, '')
        try {
          const article = await readArticleFile(categoryName, slug)
          articles.push(article)
        } catch (error) {
          console.error(`Error reading article ${categoryName}/${slug}:`, error)
        }
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

export const getAllArticles = unstable_cache(
  async (): Promise<Article[]> => {
    return getAllArticleFiles()
  },
  ['get-all-articles'],
  {
    tags: ['articles'],
    revalidate: false,
  },
)

export const getArticleBySlug = async (category: string, slug: string): Promise<Article | null> => {
  return unstable_cache(
    async () => {
      try {
        return await readArticleFile(category, slug)
      } catch (_error) {
        return null
      }
    },
    ['article-by-slug', category, slug],
    {
      tags: ['articles'],
      revalidate: false,
    },
  )()
}

export const getArticlesByCategory = async (category: string): Promise<ArticleListItem[]> => {
  return unstable_cache(
    async () => {
      const allArticles = await getAllArticleFiles()
      const categorySlug = getCategorySlug(category)
      return allArticles
        .filter((article) => {
          const articleCategorySlug = getCategorySlug(article.category)
          return articleCategorySlug === categorySlug
        })
        .map(({ content, ...rest }) => rest)
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
    const categories = new Set(allArticles.map((article) => getCategorySlug(article.category)))
    return Array.from(categories).sort()
  },
  ['all-categories'],
  {
    tags: ['articles'],
    revalidate: false,
  },
)

export const getAllArticlePaths = unstable_cache(
  async (): Promise<Array<{ category: string; slug: string }>> => {
    const allArticles = await getAllArticleFiles()
    return allArticles.map((article) => ({
      category: article.category,
      slug: article.slug,
    }))
  },
  ['all-article-paths'],
  {
    tags: ['articles'],
    revalidate: false,
  },
)
