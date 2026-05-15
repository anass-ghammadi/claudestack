# CLAUDE_CODE_BRIEF.md — ClaudeStack Build Mission

## 🎯 MISSION

You are tasked with building **ClaudeStack** — a production-grade Astro static site optimized for SEO, targeting developers who build serious software with Claude Code. This is a long-form publication site (essays, patterns, guides) that will host markdown articles and sell digital products.

**Your role**: senior full-stack developer executing a pre-designed plan. You implement, validate, and report back. You do NOT make architectural decisions without consulting the human operator (Anass).

---

## 📋 OPERATING PROTOCOL — READ THIS FIRST

This mission has a **strict phase-by-phase execution protocol**. Violating this protocol wastes the operator's time and creates debugging nightmares.

### Rules of engagement

1. **NEVER execute multiple phases in one go.** Each phase must be completed, validated, and approved before moving to the next.

2. **After completing each phase**, you MUST:
   - Run a validation command (specified per phase)
   - Report what you built (files created, key decisions, deviations from plan if any)
   - Wait for explicit operator approval before continuing
   - The operator will say "go phase X" or similar to authorize the next phase

3. **If you encounter ambiguity**, STOP and ask the operator. Do not guess. Do not pick "reasonable defaults" without asking.

4. **If something fails**, STOP immediately. Report the exact error. Do not "try alternative approaches" silently.

5. **Reference materials** are in `.references/` folder:
   - `ARCHITECTURE.md` — complete project architecture and file specifications
   - `direction-1-responsive.html` — validated visual mockup (this is the source of truth for design)
   
   **You MUST read both files before starting Phase 1.** No exceptions.

6. **Design fidelity**: the final Astro site must visually match `direction-1-responsive.html` exactly. Same colors, same fonts, same spacing, same layout, same responsive behavior. Use the mockup as a pixel-perfect reference.

---

## 🛠️ TECHNICAL STACK (NON-NEGOTIABLE)

- **Framework**: Astro 5.x (latest stable)
- **Styling**: Tailwind CSS 4.x with the new Lightning CSS engine
- **Content**: MDX (`.mdx` files) with content collections
- **Syntax highlighting**: Shiki (built into Astro)
- **Search**: Pagefind (Phase 5)
- **OG images**: Satori + @resvg/resvg-js (Phase 5)
- **Image optimization**: Sharp (built into Astro)
- **TypeScript**: strict mode enabled
- **Node.js**: 22+ (already installed on operator's machine)
- **Package manager**: npm (operator preference)

**Why these choices**: see `ARCHITECTURE.md` section 4. Don't deviate.

---

## 📐 PROJECT SPECIFICATIONS

### Site identity

- **Name**: ClaudeStack
- **Tagline**: "Field reports from building production systems with Claude Code"
- **Audience**: developers using Claude Code for serious projects
- **Languages**: English only (for v1)
- **URL placeholder**: `https://claudestack.dev` (will be changed before deployment)

### Design system (from mockup)

**Colors** (use these CSS variables):
```
--bg: #000000
--bg-1: #0A0A0A
--bg-2: #111111
--bg-3: #1A1A1A
--line: #222222
--line-bright: #2E2E2E
--text: #EDEDED
--text-soft: #999999
--text-dim: #666666
--text-faint: #444444
--green: #00FF66       (primary accent)
--green-glow: rgba(0, 255, 102, 0.15)
--green-dim: rgba(0, 255, 102, 0.5)
--cyan: #00E5FF        (pattern category)
--violet: #B794F4      (guide category)
```

**Fonts**:
- Mono: `'JetBrains Mono', monospace` (weights 300-800) — for body, nav, code, meta
- Display: `'Inter Tight', sans-serif` (weights 400-700) — for hero H1, section H2

Both loaded from Google Fonts.

**Responsive breakpoints**:
- `xs`: 480px
- `sm`: 640px
- `md`: 768px
- `lg`: 980px
- `xl`: 1200px

Mobile-first approach. The mockup `direction-1-responsive.html` has fully validated mobile + desktop layouts. Match it exactly.

### Feature scope for v1

Implement these 18 features (in this order, phase-grouped):

**Phase 1 — Foundation**
- Astro project initialized
- Tailwind 4 + MDX integration configured
- Basic file structure
- "Hello World" page rendering

**Phase 2 — Design System & Layout**
- Global CSS with custom variables
- Google Fonts integration
- Logo, TopBar, Header, MobileMenu, Footer components
- BaseLayout assembled
- Visual match with mockup header/footer

**Phase 3 — Content Collections**
- Content schema with Zod (articles)
- ArticleLayout
- Dynamic [slug] routing
- 1 example article (`01-orchestrator-pattern.mdx`) — full content

**Phase 4 — Pages & Components**
- Complete homepage (Hero, Marquee, StatsGrid, ArticleList, ProductCard, Newsletter)
- Articles index page
- Category pages (essays, patterns, guides)
- Tag pages ([tag].astro)
- About page
- 404 page (custom terminal style)
- 2 additional example articles
- Table of Contents component
- FAQ accordion component
- Related Articles component
- Code Block component with copy button
- Category Badge component

**Phase 5 — SEO & Performance**
- SEO component (meta tags, OG, Schema.org)
- Sitemap auto-generation (@astrojs/sitemap)
- RSS feed (rss.xml.ts)
- robots.txt
- OG image dynamic generation (Satori)
- Pagefind search integration
- Reading time calculation
- Lighthouse audit & optimization

**Phase 6 — Git & Deployment Prep**
- Git repo initialization
- .gitignore configured
- README.md with deployment instructions
- Build test (`npm run build`)
- Preview test (`npm run preview`)

**Note**: Phase 6 stops at "ready to deploy". The operator will handle GitHub push + Cloudflare Pages connection manually.

### Out of scope for v1

- Newsletter service integration (placeholder form only)
- Analytics integration (operator will add later)
- Product checkout (placeholder links to Gumroad)
- Comments system
- Dark/light mode toggle (design is dark-only)
- Multi-language

---

## 📂 PROJECT LOCATION

The project root is the current working directory when you start. Verify with `pwd` (or `cd` on Windows). Expected path: `C:\dev\claudestack\`

The `.references/` folder contains:
- `ARCHITECTURE.md`
- `direction-1-responsive.html`

**Do not modify or delete these reference files.**

---

## 🚀 PHASE 1 — FOUNDATION (START HERE)

### Goal
A working Astro project with Tailwind 4 + MDX, displaying a "Hello World" page on `localhost:4321`.

### Tasks

1. **Read references** (mandatory):
   - Read `.references/ARCHITECTURE.md` fully
   - Read `.references/direction-1-responsive.html` (at minimum scan the structure to understand the layout you'll need to replicate later)

2. **Initialize Astro project**:
   - Use `npm create astro@latest` in current directory
   - When prompted, choose:
     - Empty template (we'll build from scratch)
     - TypeScript: Yes, Strict
     - Install dependencies: Yes
     - Git: No (we'll init manually later in Phase 6)

3. **Add integrations**:
   - `npx astro add tailwind` (Tailwind 4 via Vite plugin)
   - `npx astro add mdx`
   - `npx astro add sitemap` (we'll configure in Phase 5)

4. **Create folder structure** as specified in `ARCHITECTURE.md` section 3:
   ```
   src/
     assets/images/
     components/
     content/articles/
     layouts/
     lib/
     pages/
     styles/
   ```
   Leave empty for now except `pages/index.astro` (Hello World).

5. **Configure base files**:
   - `astro.config.mjs` with site URL placeholder, integrations enabled
   - `tsconfig.json` strict mode
   - `tailwind.config.mjs` minimal (we'll extend in Phase 2)
   - `.gitignore` standard for Astro/Node

6. **Create minimal `pages/index.astro`**:
   - Just a black background, green text "Hello ClaudeStack" centered
   - Verify it loads without errors

7. **Validation**:
   - Run `npm run dev`
   - Confirm `localhost:4321` displays without errors
   - Check terminal output for any warnings

### Reporting (after Phase 1 complete)

Report back to the operator with:
- ✅ List of files/folders created
- ✅ Versions of installed packages (Astro, Tailwind, etc.)
- ✅ Any deviations from the plan (and why)
- ✅ Screenshot description: what `localhost:4321` looks like
- ⚠️ Any warnings or errors encountered (even if non-blocking)

Then **STOP and wait for operator approval** before starting Phase 2.

Approval format expected: operator says "go phase 2" or "proceed to phase 2" or similar explicit authorization.

---

## 📞 COMMUNICATION RULES

- Be concise in reports. No fluff, no marketing speak.
- Use bullet points for status updates.
- If you make a decision that wasn't explicitly specified, flag it: "⚠️ Decision made: X because Y. Confirm or override?"
- If you skip a task because you think it's unnecessary, flag it: "⚠️ Skipped: X because Y. Confirm or override?"
- When asking for clarification, propose 2-3 options with tradeoffs. Don't ask open-ended questions.

---

## 🎓 OPERATOR CONTEXT (for your awareness)

The operator (Anass) is building this site as a passive income source — a SEO blog that sells digital products about Claude Code. He has zero Astro experience but strong technical background (he's building an algo trading hedge fund using Claude Code with sophisticated multi-agent workflows).

He validated the design direction (Terminal Brutalist) and the architecture plan. His role now is **orchestration and validation**, not coding.

He's working from CMD/PowerShell on Windows with VSCode. He invokes you for each phase. He may not have answers to deep technical questions — when in doubt, default to industry best practices for 2026 (mobile-first, accessibility, SEO).

---

## ✅ READY?

Confirm you've read this brief, then:

1. Acknowledge the operating protocol
2. Read both reference files (`ARCHITECTURE.md` and `direction-1-responsive.html`)
3. Briefly summarize (2-3 sentences) what you understood about the project and the design direction
4. Begin Phase 1
5. Stop after Phase 1 validation and wait for "go phase 2"

Let's build something solid.
