import type { CollectionEntry } from 'astro:content';

type Article = CollectionEntry<'articles'>;

export function getRelated(current: Article, all: Article[], limit = 3): Article[] {
  const overrides = current.data.relatedSlugs ?? [];

  if (overrides.length > 0) {
    const byOverride = overrides
      .map((slug) => all.find((a) => a.id === slug))
      .filter((a): a is Article => Boolean(a));
    if (byOverride.length >= limit) return byOverride.slice(0, limit);
  }

  const candidates = all.filter((a) => a.id !== current.id && !a.data.draft);

  const scored = candidates.map((a) => {
    const sharedTags = a.data.tags.filter((t) => current.data.tags.includes(t)).length;
    const sameCategory = a.data.category === current.data.category ? 1 : 0;
    return { article: a, score: sharedTags * 2 + sameCategory };
  });

  scored.sort((x, y) => {
    if (y.score !== x.score) return y.score - x.score;
    return y.article.data.pubDate.getTime() - x.article.data.pubDate.getTime();
  });

  return scored.slice(0, limit).map((s) => s.article);
}
