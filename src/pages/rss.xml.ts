import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { siteConfig } from '../lib/site-config';

export async function GET(context: APIContext) {
  const articles = (await getCollection('articles', (e) => !e.data.draft)).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  );

  return rss({
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    site: context.site ?? siteConfig.url,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.pubDate,
      link: `/articles/${article.id}/`,
      categories: [article.data.category, ...article.data.tags],
    })),
    customData: `<language>en-us</language>`,
  });
}
