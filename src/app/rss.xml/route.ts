import RSS from "rss";
import { allPosts } from "contentlayer/generated";
import { siteConfig } from "@/config/site";

export async function GET() {
  const host = process.env.BASE_URL as string;

  const feed = new RSS({
    title: siteConfig.name,
    description: siteConfig.description,
    site_url: host,
    feed_url: `${host}/blog`,
    generator: siteConfig.name,
    language: "en-US",
  });

  allPosts.map((post) => {
    feed.item({
      title: post.title,
      guid: `${host}/${post.slug}`,
      url: `${host}/${post.slug}`,
      date: post.publishedAt,
      description: post.description,
      author: "Rafael Fragoso",
      // categories: post.categories.map(({ name }) => name) || [],
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
