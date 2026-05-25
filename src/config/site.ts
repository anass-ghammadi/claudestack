/**
 * SPEC: BRIEF_CLAUDESTACK_PRODUCT.md#1.1
 * Single source of truth for all site copy, branding, and integrations.
 * Template buyers edit this file. Components NEVER hardcode these values.
 */

export const siteConfig = {
  // === BRAND ===
  name: 'ClaudeStack',
  tagline: 'Field reports from building production systems with Claude Code',
  description:
    'Field reports from building production systems with AI coding agents. Written by a practitioner, not an influencer.',
  url: 'https://claudestack.ghammadianass.workers.dev',
  version: 'v0.14.2',

  // === AUTHOR ===
  author: {
    name: 'Anass',
    bio: 'Practitioner shipping production systems with Claude Code. Source of the patterns and field notes published here.',
    twitter: '@claudestack',
    github: 'https://github.com/anass-ghammadi',
    email: 'hello@claudestack.dev',
  },

  // === SOCIAL ===
  social: {
    twitter: '@claudestack',
    github: 'https://github.com/anass-ghammadi/claudestack',
    rss: '/rss.xml',
  },

  // === NAVIGATION ===
  nav: [
    { label: 'Blog', href: '/blog' },
    { label: 'Demo', href: '/demo' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'GitHub', href: 'https://github.com/anass-ghammadi/claudestack' },
  ],

  // === FOOTER ===
  footer: {
    columns: [
      {
        title: 'Read',
        links: [
          { label: 'Blog', href: '/blog' },
          { label: 'Demo articles', href: '/demo' },
          { label: 'Archive', href: '/blog' },
        ],
      },
      {
        title: 'Shop',
        links: [
          { label: 'Template (Pro)', href: '/pricing' },
          { label: 'All template variants', href: '/templates' },
          { label: 'GitHub (free)', href: 'https://github.com/anass-ghammadi/claudestack' },
        ],
      },
      {
        title: 'Elsewhere',
        links: [
          { label: 'RSS', href: '/rss.xml' },
          { label: 'GitHub', href: 'https://github.com/anass-ghammadi' },
          { label: 'Contact', href: 'mailto:hello@claudestack.dev' },
        ],
      },
    ],
  },

  // === HERO (homepage) ===
  hero: {
    tag: 'NEW · MULTI-AGENT ORCHESTRATION',
    titleSmall: '// production notes',
    titleLine1: 'Ship',
    titleAccent: 'serious',
    titleLine2: 'software with',
    titleTech: 'claude code', // rendered as <claude code/>
    subtitle:
      'Field reports from shipping <span class="highlight">40,000+ lines</span> of production Python with AI coding agents. No theory. No fluff. Just patterns that hold up under load.',
    ctaPrimary: { label: 'read_latest', href: '/blog' },
    ctaSecondary: { label: '$ ls archive/', href: '/blog' },
    terminalTitle: '~ /orchestrator',
    terminalStatus: 'live',
  },

  // === STATS (homepage display) ===
  // Optional template feature. Set null/empty to hide.
  stats: {
    label: 'SYSTEM_METRICS / LAST_30D',
    items: [
      { label: 'essays', num: '62', delta: '+3 this month' },
      { label: 'subs', num: '2,847', delta: '+12.4% MoM' },
      { label: 'patterns', num: '14', delta: 'production' },
      { label: 'loc shipped', num: '40k+', delta: 'claude-assisted' },
    ],
  },

  // === NEWSLETTER ===
  newsletter: {
    enabled: true,
    provider: 'buttondown' as 'convertkit' | 'emailoctopus' | 'buttondown' | 'none',
    // For buttondown: this is the username (https://buttondown.com/USERNAME)
    // For convertkit/emailoctopus: this is the form ID
    formId: 'claudestack',
    headline: 'One letter, every Sunday.',
    subtext:
      "The week's most useful patterns and field notes from building with AI coding agents. No fluff. Just signal.",
    subscriberCount: '2,847',
  },

  // === FEATURES (toggle on/off) ===
  features: {
    search: true,
    rss: true,
    sitemap: true,
    comments: false,
    themeSwitcher: true,
  },

  // === SEO ===
  seo: {
    defaultOgImage: '/og/default.png',
    googleSiteVerification: 'TYQDM9XCgPopcnWZZ5NUZYT7Oz8No41CKil1FSEBTyI',
  },

  // === ANALYTICS ===
  // SPEC: BRIEF_ADDENDUM_LAUNCH_READY.md#2 — provider-gated beacon injection.
  // If provider === 'none' or token is empty, NO beacon is injected.
  analytics: {
    provider: 'cloudflare' as 'cloudflare' | 'none',
    // Get from: dash.cloudflare.com → Analytics & Logs → Web Analytics → Add a site → copy token
    cloudflareToken: '',
  },

  // === GUMROAD ===
  // SPEC: BRIEF_ADDENDUM_LAUNCH_READY.md#3 — all Pro CTAs read from here.
  gumroadUrl: 'https://gumroad.com/l/claudestack',
  launchDiscount: {
    enabled: true,
    code: 'LAUNCH20',
    percentOff: 20,
  },

  // === PRODUCT (homepage ProductCard) ===
  // The product you're selling. Set to null to hide the section.
  product: {
    metaTag: 'LAUNCH_PRICE · 72H LEFT',
    title: 'The complete guide to',
    titleAccent: 'production AI coding',
    description:
      '40 pages of patterns, workflows, and templates used daily to ship serious projects. Multi-agent setups, SPEC-driven development, real-world case studies.',
    features: [
      'Multi-agent workflow templates (Spec / Dev / Auditor)',
      'SKILL.md library — 12 production-tested skills',
      'SPEC traceability system with copy-paste templates',
      'Lifetime updates as the tooling evolves',
    ],
    price: '$29',
    priceOld: '$49',
    ctaLabel: 'download_now.pdf',
    ctaHref: 'https://gumroad.com/l/claudestack',
    visualTitle: 'PROJECT.md',
  },

  // === ABOUT (the /about page) ===
  about: {
    metaTag: 'manifest / why this exists',
    headline: 'written by a',
    headlineAccent: 'practitioner',
    body: [
      'This site is a publication, not a content farm. It exists because the gap between weekend AI experiments and the lived experience of shipping a real product is enormous, and almost nothing public is filling it.',
      'Every article is written from the seat of someone running production code that handles real users or real money. Patterns are tested for at least three months before they become essays. Numbers are real. Failures are documented.',
    ],
    sections: [
      {
        heading: "What you'll find here",
        intro: 'Three kinds of writing, deliberately:',
        bullets: [
          '**Essays** — opinionated arguments about how to build with AI agents.',
          '**Patterns** — reusable techniques tested in production.',
          '**Guides** — walk-through references for specific tools or workflows.',
        ],
      },
      {
        heading: "What you won't find",
        bullets: [
          '"10 prompts that will change your life" lists.',
          'Hot takes on yesterday\'s announcement.',
          'Affiliate-laundered tool reviews.',
        ],
      },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
