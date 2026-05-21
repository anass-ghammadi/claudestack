# ClaudeStack — Project Log

> Living document. Records what was built, what was decided, what's pending.
> **Update after each meaningful change.** Add a dated entry under "Change history".

---

## Current state (snapshot)

**Status**: Phase 1 of product-packaging complete locally (not yet pushed). Pending operator approval before Phase 2.

| Item | Value |
|---|---|
| Production URL | https://claudestack.ghammadianass.workers.dev/ |
| Custom domain | Not yet (planned) |
| GitHub repo | https://github.com/anass-ghammadi/claudestack |
| Hosting | Cloudflare (Workers static assets via wrangler.jsonc) |
| Stack | Astro 6 + Tailwind 4 + MDX + TypeScript strict |
| Lighthouse (desktop) | 100 / 95+ / 100 / 100 (perf / a11y / best / SEO) — needs re-verify after Phase 1 push |
| Blog articles | 12 (Anass, moved to `/blog/*` from `/articles/*`) |
| Demo articles | 8 (Jane Developer, `/demo/*`, noindex) |
| Themes | 3 (terminal default, amber, cyan) with switcher in header + mobile menu |
| Rollback branch | `pre-product-packaging` (pushed) |
| Last pushed commit | `2972a1d` (add PROJECT_LOG.md) |

---

## What works right now

- ✅ Static site builds & deploys on every push to `main`
- ✅ 12 blog articles at `/blog/*` (migrated from `/articles/*` with 301 redirects)
- ✅ 8 demo articles at `/demo/*` showcasing template capabilities (Jane Developer)
- ✅ 3 themes (terminal default, amber, cyan) with localStorage-persisted switcher
- ✅ Two distinct content collections enforced at schema level
- ✅ DEMO banner on every `/demo` route with link back to `/blog`
- ✅ Home page lists ONLY blog content (never demo) + empty-state handling
- ✅ All site copy driven by `src/config/site.ts` (zero hardcoded strings in components)
- ✅ Dynamic OG images per blog article (Satori → 1200×630 PNG, generated at build)
- ✅ RSS feed at `/rss.xml` (blog only, demo excluded), sitemap, `robots.txt`
- ✅ Schema.org JSON-LD: Article + FAQPage on every blog article
- ✅ Pagefind search index on `/blog` (12 blog pages indexed; demo excluded by design)
- ✅ Newsletter wired to Buttondown via provider-agnostic config
- ✅ Self-hosted fonts, Google Search Console verified
- ✅ Mobile-responsive, multi-theme, accessible (WCAG AA contrast)

## What's pending (operator action)

| Item | Status | Notes |
|---|---|---|
| Submit sitemap to Google Search Console | ⬜ TODO | Verify property → Sitemaps → `sitemap-index.xml` |
| Request indexing for top 3 articles in GSC | ⬜ TODO | URL Inspection → Request indexing |
| Bing Webmaster Tools | ⬜ TODO | Optional, import from GSC |
| Cloudflare Web Analytics | ⬜ TODO | Get token, paste in `src/lib/site-config.ts` → `cloudflareAnalyticsToken` |
| Custom domain | ⬜ TODO | Cloudflare Registrar (~$10-15/yr), then update `siteConfig.url` + `astro.config.mjs` `site` |
| Distribute articles (HN / Reddit / X) | ⬜ TODO | Start with #1 orchestrator, #10 vibe coding, #5 token economics |
| Real product to sell | ⬜ TODO | ProductCard currently points at `gumroad.com` placeholder |
| Wire actual Buttondown account | ⚠️ PARTIAL | Username set, but no Buttondown account created yet |

## What's intentionally out of scope (v1)

- Analytics integration (operator will activate when ready)
- Comments system
- Light mode / theme toggle (dark-only by design)
- Multi-language
- Product checkout (Gumroad placeholder link)

---

## Reference

### File map (where things live)

```
src/
├── content.config.ts                  Zod schema for article frontmatter
├── content/articles/                  All .mdx articles
├── lib/
│   ├── site-config.ts                 Single source of truth: nav, footer, social, integrations
│   ├── format-date.ts                 "2026.05.12" terminal-style dates
│   ├── reading-time.ts                Word count / 200 wpm
│   └── get-related.ts                 Tag + category scoring for related articles
├── layouts/
│   ├── BaseLayout.astro               HTML shell, fonts, header/footer, SEO, optional analytics
│   └── ArticleLayout.astro            Article page (title, meta, TOC, prose, FAQ, related)
├── components/
│   ├── Header.astro, TopBar.astro,    Layout chrome
│   │   Footer.astro, MobileMenu.astro,
│   │   Logo.astro
│   ├── Hero.astro, Marquee.astro,     Homepage components
│   │   StatsGrid.astro, ArticleList.astro,
│   │   ProductCard.astro, Newsletter.astro
│   ├── ArticleRow.astro,              Article list row (responsive)
│   │   CategoryBadge.astro
│   ├── TableOfContents.astro,         Article-page extras
│   │   FAQ.astro, RelatedArticles.astro,
│   │   CodeBlock.astro, Terminal.astro
│   ├── SearchBox.astro                Pagefind search input
│   └── SEO.astro                      Meta tags, OG, Twitter, Schema.org JSON-LD
├── pages/
│   ├── index.astro                    Homepage
│   ├── about.astro, 404.astro         Static pages
│   ├── articles/[...slug].astro       Dynamic article pages
│   ├── articles/index.astro           Full archive
│   ├── categories/[category].astro    Dynamic category pages (essays/patterns/guides)
│   ├── tags/[tag].astro               Dynamic tag pages
│   ├── og/[...slug].png.ts            Satori OG image generator
│   └── rss.xml.ts                     RSS feed endpoint
└── styles/global.css                  ALL design tokens + ALL component styles (single file, ~2000 lines)
```

### Where to change things (cheatsheet)

| To change… | Edit… |
|---|---|
| Site name, URL, tagline, social | `src/lib/site-config.ts` |
| Nav links | `src/lib/site-config.ts` → `navLinks` |
| Footer columns | `src/lib/site-config.ts` → `footerColumns` |
| Stats (essays, subs, uptime) | `src/lib/site-config.ts` → `stats` |
| Newsletter (Buttondown username) | `src/lib/site-config.ts` → `buttondownUsername` |
| Cloudflare Analytics token | `src/lib/site-config.ts` → `cloudflareAnalyticsToken` |
| Colors / fonts / spacing | `src/styles/global.css` (top section, CSS vars) |
| Production domain | `src/lib/site-config.ts` (`url`) + `astro.config.mjs` (`site`) |
| Add an article | Create `src/content/articles/NN-slug.mdx` with proper frontmatter |
| Featured articles | `featured: true` in article frontmatter |

### Build commands

```bash
npm run dev        # Local dev server (hot reload)
npm run build      # Production build → dist/ + runs pagefind
npm run preview    # Serve dist/ locally
```

### Deployment flow

```
git push main → GitHub → Cloudflare auto-detects → builds (npm run build) → deploys to workers.dev
```

`wrangler.jsonc` tells Cloudflare to deploy as static assets (no SSR adapter, no Workers code).

---

## Content inventory

| # | Slug | Title | Category | Date | Featured |
|---|---|---|---|---|---|
| 01 | orchestrator-pattern | The orchestrator pattern: why one Claude session is never enough | essay | 2026-05-12 | ✓ |
| 02 | spec-driven-dev | SPEC-driven development for AI-assisted codebases | pattern | 2026-05-08 | |
| 03 | claude-code-vs-cursor | Claude Code vs Cursor vs Cline: an honest year-long review | guide | 2026-05-03 | |
| 04 | context-engineering | Context engineering: 200K tokens without losing your mind | essay | 2026-04-22 | |
| 05 | token-economics | Token economics: what 6 months of production actually costs | essay | 2026-05-16 | |
| 06 | claude-md-guide | What goes in CLAUDE.md (and what absolutely shouldn't) | guide | 2026-05-15 | |
| 07 | not-prompting-delegating | You're not prompting. You're delegating to a junior team. | essay | 2026-05-14 | |
| 08 | mcp-servers-critique | MCP servers: right abstraction, wrong layer | pattern | 2026-05-13 | |
| 09 | subagents-in-practice | Claude Code subagents in practice | pattern | 2026-05-16 | |
| 10 | vibe-vs-discipline-coding | Vibe coding vs discipline coding: what survives production | essay | 2026-05-16 | ✓ |
| 11 | claude-reviews-every-pr | I let Claude review every PR for six months | essay | 2026-05-16 | |
| 12 | writing-your-first-skill-md | Writing your first SKILL.md: a practical guide | guide | 2026-05-16 | ✓ |

Distribution: 6 essays / 3 patterns / 3 guides.

---

## Change history

### 2026-05-21 — Phase 1 of product-packaging brief complete (local)
- Created rollback branch `pre-product-packaging` (pushed to remote)
- **1.1** Extracted all site copy into `src/config/site.ts` with typed schema (nav, footer, newsletter, features, SEO, analytics, hero, product, about). Deleted `src/lib/site-config.ts`. Validation gate: grep for spec-specific strings in components/pages/layouts returns empty ✓
- **1.2** New `src/styles/themes.css` defines 3 themes (terminal/amber/cyan) via `[data-theme]` attribute. Both the brief's `--color-*` vars AND the legacy `--bg/--text/--green` etc. vars are theme-aware ✓
- **1.3.a** Content collections refactored: `blog` (real content) + `demo-articles` (Jane Developer showcase) with `isDemo: true` discriminator
- **1.3.b** Moved 12 articles from `src/content/articles/` → `src/content/blog/`. Routes moved from `/articles/*` to `/blog/*`. `public/_redirects` 301s old URLs for SEO preservation
- **1.3.c** Wrote 8 demo articles by Jane Developer (~6500 words): CLI in Go, REST vs GraphQL, Node event loop, Type-safe forms with Zod, Postgres FTS, Docker multi-stage, Feature flags, Vite bundle optimization
- **1.3.d** New `/demo` route + `DemoLayout`; nav updated to expose Blog/Demo/Pricing/GitHub; `/pricing` placeholder page with two tiers (Free + Pro $49)
- **1.3.e** `DemoBanner` component shown on all `/demo` routes — drives traffic back to `/blog`
- **1.3.f** Home page lists ONLY blog posts; empty-state handling for template buyers
- **1.4** `ThemeSwitcher` component in header (desktop) + mobile menu; localStorage persistence, inline pre-paint script to avoid flash of wrong theme
- Build: 54 HTML pages, Pagefind indexes 12 blog pages only (correct)
- **Not yet pushed** — awaits operator approval before Phase 2

### 2026-05-16 — Trending batch + project log
- Published 4 trending articles: #9 subagents, #10 vibe coding, #11 PR review case study, #12 SKILL.md guide (commit `550d0c0`)
- Created this PROJECT_LOG.md

### 2026-05-16 — Second content batch + a11y push
- Published 4 articles: #5 token economics, #6 CLAUDE.md guide, #7 prompting→delegating, #8 MCP critique (commit `6317638`)
- Fixed accessibility: bumped `--text-dim` contrast (#666 → #8a, now 5.7:1), footer h4 → h3 (heading order)
- Self-hosted fonts via @fontsource (eliminated render-blocking Google Fonts, saved 293ms TTFB)
- Lighthouse desktop: 100 / 95 / 100 / 100

### 2026-05-16 — Integrations + analytics scaffolding
- Wired Newsletter to Buttondown via no-JS form embed (commit `054e4e9`)
- Added Cloudflare Web Analytics support (conditional on token in `site-config.ts`)
- Published article #4 (context-engineering)
- Added `wrangler.jsonc` static-assets config (fixed Cloudflare deploy that was auto-adding @astrojs/cloudflare SSR adapter)

### 2026-05-16 — Initial deploy
- First Cloudflare deploy succeeded (after the wrangler.jsonc fix)
- Google Search Console meta tag added

### 2026-05-15 — Phase 6: Git & deployment prep
- `git init -b main`, wrote full README.md, set up .gitignore properly
- First production build + preview test passed (20 pages, all routes 200 OK)
- Site ready to deploy

### 2026-05-15 — Phase 5: SEO + performance
- SEO component with full meta + Schema.org JSON-LD
- RSS feed via @astrojs/rss
- robots.txt
- Dynamic OG images via Satori + @resvg/resvg-js + @fontsource fonts (1200×630 PNG per article)
- Pagefind search index, SearchBox component on /articles
- Build: 20 pages + 4 OG PNGs + RSS + sitemap in ~5s

### 2026-05-15 — Phase 4: Pages & components
- Built Hero, Marquee, StatsGrid, ArticleRow, ArticleList, CategoryBadge, ProductCard, Newsletter, Terminal
- Built TableOfContents, FAQ (accordion + Schema.org), RelatedArticles (tag-scored), CodeBlock (copy button)
- Built homepage (full layout), /articles, /categories/[category], /tags/[tag], /about, /404
- Wrote articles #2 (SPEC-driven) and #3 (Cursor/Cline comparison)
- 22 routes total at this point

### 2026-05-15 — Phase 3: Content collections
- Astro Content Layer API (`src/content.config.ts`) with full Zod schema
- ArticleLayout + `[...slug].astro` dynamic route
- Custom prose styles in global.css (green `##` h2 prefixes, `─` ul bullets, terminal code blocks)
- Wrote article #1 (orchestrator pattern, ~1300 words)

### 2026-05-15 — Phase 2: Design system
- Ported all CSS variables, fonts (Google → later self-hosted in Phase 5b), scanline effect
- Built TopBar, Header, MobileMenu, Footer, Logo, BaseLayout
- Mobile menu drawer with overlay + Astro-bundled toggle script
- `site-config.ts` as single source of truth

### 2026-05-15 — Phase 1: Foundation
- `npm create astro@latest .` with --template minimal --typescript strict
- Added Tailwind 4 (Vite plugin), MDX, sitemap integrations
- Initial Hello World renders on localhost:4321

---

## Key decisions log

### Site pivot: personal blog → sellable template + personal blog
**Decision**: Refactor the existing personal blog into a dual-purpose site — template demo (for sale) + author's real SEO content (for traffic and authority). Two separate content collections, two separate route trees.
**Why:** The brief from 2026-05-18 (v1.1 of `logclaudfare`) reframes the site as a Gumroad product. To avoid losing the existing 12 articles + their Google indexing, we keep them as `blog/` content with 301 redirects from old paths.
**Impact:** Architecture now has clean separation: `/blog/*` for Anass, `/demo/*` for showcase, never mixed. RSS only carries blog. Home page only lists blog.

### 301 redirects via Cloudflare _redirects
**Decision**: `public/_redirects` does `/articles/* → /blog/:splat 301` to preserve SEO.
**Why:** Anass's 12 articles were indexed (or starting to be) at `/articles/*`. Migrating without redirects = losing all that SEO equity.
**Impact:** Old URLs forever redirect to new ones. Search engines update their index over the next crawl cycle.

### Config schema extended beyond brief spec
**Decision**: Extended `siteConfig` beyond what the brief specified to preserve existing integrations: `buttondown` as newsletter provider, `cloudflareToken` for analytics, `googleSiteVerification` for GSC, `hero` block, `product` block, `about` block.
**Why:** Brief's minimal schema would have meant losing functionality already shipped (Phase 5 SEO + Phase 3 Newsletter wiring).
**Impact:** Template buyers get a more complete config out of the box. Brief's 8 base vars still present at the root.

### Astro 6 vs Astro 5
**Decision**: Stay on Astro 6 (latest stable as of build time).
**Why**: `npm create astro@latest` shipped v6. Downgrading would mean fighting the install + missing fixes.
**Impact**: Required using Content Layer API (`glob` loader) instead of legacy `type: 'content'`. Same Zod schema works.

### Tailwind 4 without `tailwind.config.mjs`
**Decision**: No JS config file. All config via CSS variables in `global.css`.
**Why**: Tailwind 4 is CSS-first by design. JS config is legacy from v3.
**Impact**: Brief mentioned `tailwind.config.mjs` (contradiction with stack spec). Ignored, went with CSS approach.

### Single `[category].astro` instead of 3 separate files
**Decision**: One dynamic route for essays/patterns/guides via `getStaticPaths`.
**Why**: Three near-identical files = three places to keep in sync. DRYer to use one.
**Impact**: Same public URLs (`/categories/essays` etc.), one file to maintain.

### All CSS in one file (global.css) instead of scoped per-component
**Decision**: Hoist everything to global.css. Components stay clean.
**Why**: Mockup uses well-named classes (`.topbar`, `.footer-col`); easier to grep / port / debug when CSS lives in one place.
**Impact**: ~2000-line global.css. Worth it for the navigability.

### Self-host fonts (Phase 5b after first Lighthouse)
**Decision**: Replace Google Fonts `<link>` with @fontsource CSS imports.
**Why**: Lighthouse flagged Google Fonts as render-blocking (293ms). Self-hosted = same domain, properly cached.
**Impact**: CSS bundle grew ~70KB, eliminated one network round-trip + Google privacy concern.

### Static-only Cloudflare deploy via wrangler.jsonc
**Decision**: Pure static deploy. No SSR adapter.
**Why**: First deploy failed because Cloudflare auto-installed @astrojs/cloudflare, switched to server mode, broke the Satori OG endpoint (which uses node:fs). `wrangler.jsonc` with `[assets]` tells Cloudflare "just upload dist/".
**Impact**: Build pipeline stays simple. Pre-built OG images, no runtime cost.

### Newsletter via Buttondown no-JS form embed
**Decision**: Form action directly to Buttondown's endpoint, no API key in client.
**Why**: Simpler than building a backend. No auth needed. Buttondown handles double-opt-in.
**Impact**: Form requires `siteConfig.buttondownUsername` to be set. Disabled with placeholder if empty.

### Numeric prefixes on article slugs (`01-orchestrator-pattern`)
**Decision**: Keep numeric prefix in filename and URL.
**Why**: Sorts naturally in the filesystem. Doubles as a "field report №" display in the article list.
**Impact**: URLs look like `/articles/01-orchestrator-pattern` (not just `/articles/orchestrator-pattern`). Acceptable.

---

## How to update this log

After any meaningful change:

1. Update **Current state** snapshot (last commit, article count, etc.)
2. Update **Content inventory** if you added/removed articles
3. Move any completed items from **Pending** to a checkmark
4. Add a dated entry at the top of **Change history**
5. If you made a non-obvious architectural decision, add it to **Key decisions log** with the *why*

Keep the log focused on *what* changed and *why*, not *how*. The how lives in the code.
