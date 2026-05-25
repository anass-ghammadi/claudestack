# ClaudeStack

> Field reports from building production systems with Claude Code.

A long-form publication site (essays, patterns, guides) targeting developers who use Claude Code for serious projects. Static, fast, SEO-optimized.

---

## Stack

- **Astro 6** — static site generator
- **Tailwind CSS 4** — via Vite plugin (CSS-first config in `src/styles/global.css`)
- **MDX** — content with embedded components
- **Shiki** — syntax highlighting (github-dark theme)
- **Satori + resvg** — dynamic OG image generation at build time
- **Pagefind** — static full-text search
- **@astrojs/sitemap + rss** — auto sitemap and RSS feed
- **TypeScript strict**

Designed to deploy to **Cloudflare Pages** (or any static host).

---

## Quick start

```bash
npm install        # one-off
npm run dev        # http://localhost:4321 with hot reload
npm run build      # production build → ./dist (also runs Pagefind)
npm run preview    # serve ./dist locally to verify
```

Requires **Node.js ≥ 22.12**.

---

## Project structure

```
.
├── public/                 # Static assets (favicon, robots.txt, fonts if local)
├── src/
│   ├── assets/             # Astro-optimized images
│   ├── components/         # .astro UI components
│   ├── content/
│   │   └── articles/       # All articles as .mdx files
│   ├── layouts/            # BaseLayout, ArticleLayout
│   ├── lib/                # site-config, utilities (reading-time, format-date, get-related)
│   ├── pages/              # Routes (file-based)
│   │   ├── articles/
│   │   ├── categories/
│   │   ├── tags/
│   │   ├── og/             # Dynamic OG PNGs (Satori)
│   │   ├── rss.xml.ts
│   │   ├── about.astro
│   │   └── 404.astro
│   ├── styles/global.css   # Design system + all component styles
│   └── content.config.ts   # Zod schema for article frontmatter
├── astro.config.mjs
└── package.json
```

---

## Writing an article

1. Create `src/content/articles/04-my-article.mdx` (numeric prefix sets sort + display №).
2. Frontmatter:

   ```mdx
   ---
   title: "My article title"
   description: "Hook copy under 200 chars — used for SEO and list views."
   pubDate: 2026-06-01
   category: essay        # essay | pattern | guide
   tags: ["claude-code", "topic-tag"]
   featured: false
   draft: false
   faq:                   # optional — surfaces as accordion + Schema.org FAQPage
     - question: "..."
       answer: "..."
   relatedSlugs: []       # optional — override automatic related picker
   ---

   Article body in Markdown / MDX.
   ```

3. Save. The dev server hot-reloads. Article appears at `/articles/04-my-article`, in the homepage list, in `/categories/<category>`, in `/tags/<tag>` for each tag, and in the RSS feed.

4. Run `npm run build` to regenerate the OG image and refresh the search index.

---

## Customizing the site

- **Site name, URL, social, copy**: `src/lib/site-config.ts` is the single source of truth.
- **Design tokens** (colors, fonts, spacing, breakpoints): CSS variables at the top of `src/styles/global.css`.
- **Component styles**: all in `global.css` (no scoped styles per component, by convention).

---

## Deployment to Cloudflare Pages

This project is ready to deploy. Steps:

1. **Push to GitHub** (one-off):

   ```bash
   git add .
   git commit -m "initial commit"
   git remote add origin git@github.com:<your-handle>/claudestack.git
   git push -u origin main
   ```

2. **Connect Cloudflare Pages**:
   - https://dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git
   - Select the `claudestack` repo
   - Build settings:
     - **Framework preset**: Astro
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
     - **Node version**: `22`

3. **First deploy** runs automatically. Site goes live at `https://<project-name>.pages.dev`.

4. **Custom domain** (optional): in the project's Settings → Custom domains. Cloudflare handles HTTPS automatically.

5. **Update the production URL**: when you have the final domain, change `siteConfig.url` in `src/lib/site-config.ts` and the `site` field in `astro.config.mjs`. Both feed into canonical tags, OG URLs, sitemap, and RSS.

---

## Notes

- **Search** (`/articles`) only works after `npm run build` — Pagefind builds its index against the static HTML in `dist/`.
- **OG images** are generated once per build into `dist/og/<slug>.png` (1200×630 PNG). Each article gets its own; non-article pages share `default.png`.
- **Newsletter form** has no backend — it's a placeholder. Wire it to ConvertKit / Buttondown / your provider of choice in `src/components/Newsletter.astro`.
- **Analytics** are not included — add Plausible / Fathom / Cloudflare Web Analytics in `BaseLayout.astro` when needed.

---

## License

The Free version (this repository) is released under the [MIT License](./LICENSE). Use it for personal, client, or commercial projects — modify freely, no attribution required (though appreciated).

A separate **Pro version** is available for purchase. It includes additional themes, premium components, full documentation, and email support. The Pro version ships under its own commercial license, [LICENSE-PRO.md](./LICENSE-PRO.md). Find it on Gumroad: <https://gumroad.com/l/claudestack>.
