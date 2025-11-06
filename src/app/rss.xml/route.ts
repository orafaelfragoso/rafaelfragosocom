import { siteConfig } from '@/config/site'
import { getAllArticleFiles } from '@/lib/mdx'

const escapeXml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

const formatRFC822Date = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toUTCString()
}

const generateRssFeed = async (): Promise<string> => {
  const articles = await getAllArticleFiles()
  const buildDate = new Date().toUTCString()

  const rssItems = articles
    .map((article) => {
      const articleUrl = `${siteConfig.url}/articles/${article.category}/${article.slug}`
      const pubDate = formatRFC822Date(article.date)
      const author = article.author || siteConfig.author.name

      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <description>${escapeXml(article.description)}</description>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(article.category)}</category>
      <author>${siteConfig.author.email} (${escapeXml(author)})</author>
    </item>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <description>${escapeXml(siteConfig.description)}</description>
    <link>${siteConfig.url}</link>
    <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml" />
    <language>en-US</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <copyright>Copyright ${new Date().getFullYear()} ${escapeXml(siteConfig.author.name)}</copyright>
    <webMaster>${siteConfig.author.email} (${escapeXml(siteConfig.author.name)})</webMaster>
    <managingEditor>${siteConfig.author.email} (${escapeXml(siteConfig.author.name)})</managingEditor>
    <generator>Rafael Fragoso</generator>
    <docs>https://www.rssboard.org/rss-specification</docs>
${rssItems}
  </channel>
</rss>`
}

export async function GET() {
  const rss = await generateRssFeed()

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
