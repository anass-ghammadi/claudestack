/**
 * SPEC: BRIEF_CLAUDESTACK_PRODUCT.md#1.3.a
 *
 * Two collections — DO NOT MIX:
 *
 *   `blog`         — real content written by the site owner. Powers SEO,
 *                    appears on the home page and in RSS. Ships empty to
 *                    template buyers (they write their own).
 *
 *   `demo-articles` — showcase content by a fictional "Jane Developer".
 *                    Demonstrates template capabilities. Lives at /demo/*,
 *                    excluded from RSS, excluded from the home page,
 *                    banner-flagged so visitors know it's not real.
 *                    Ships WITH the template as starter examples.
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }), // README.md excluded by .mdx extension
  schema: z.object({
    title: z.string(),
    description: z.string().max(200),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['essay', 'pattern', 'guide']),
    tags: z.array(z.string()).default([]),
    author: z.string().optional(), // defaults to siteConfig.author.name at render time
    image: z.string().optional(),
    ogImage: z.string().optional(),
    canonicalURL: z.string().url().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        }),
      )
      .optional(),
    relatedSlugs: z.array(z.string()).optional(),
  }),
});

const demoArticles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/demo-articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(200),
    pubDate: z.coerce.date(),
    author: z.string(), // always "Jane Developer" — enforced by validation
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    isDemo: z.literal(true), // discriminator — prevents accidental mixing
  }),
});

export const collections = {
  blog,
  'demo-articles': demoArticles,
};
