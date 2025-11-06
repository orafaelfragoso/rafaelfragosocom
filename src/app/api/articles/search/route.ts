import { getAllArticleFiles } from '@/lib/mdx'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')?.toLowerCase() || ''

  const articles = await getAllArticleFiles()

  const searchData = articles.map((article) => ({
    slug: article.slug,
    title: article.title,
    category: article.category,
  }))

  const filtered = query
    ? searchData.filter((a) => a.title.toLowerCase().includes(query) || a.category.toLowerCase().includes(query))
    : searchData

  return Response.json(filtered, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
