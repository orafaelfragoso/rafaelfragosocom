import { MetadataRoute } from "next";
import { allPosts } from "contentlayer/generated";
import { navConfig } from "@/config/navigation";

export default function Sitemap(): MetadataRoute.Sitemap {
  const host = process.env.BASE_URL as string;

  const posts = allPosts.map((post) => ({
    url: `${host}/${post.slug}`,
    lastModified: post.publishedAt,
    priority: 0.5,
  }));

  const pages = navConfig.main.map((page) => ({
    url: `${host}/${page.href}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  const links = navConfig.social.map((page) => ({
    url: page.href,
    lastModified: new Date(),
    priority: 0.7,
  }));

  return [
    {
      url: host,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...pages,
    ...posts,
    ...links,
  ];
}
