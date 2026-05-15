export const siteConfig = {
  name: 'claudestack',
  url: 'https://claudestack.dev',
  tagline: 'Field reports from building production systems with Claude Code',
  description:
    'Field reports from building production systems with AI coding agents. Written by a practitioner, not an influencer.',
  version: 'v0.14.2',
  author: 'Anass',
  social: {
    rss: '/rss.xml',
    github: 'https://github.com/',
    contact: 'mailto:hello@claudestack.dev',
    twitter: '@claudestack',
  },
  defaultOgImage: '/og/default.png',
  stats: {
    essays: 62,
    subs: '2,847',
    uptime: '99.98%',
  },
  navLinks: [
    { href: '/categories/essays', label: 'essays' },
    { href: '/categories/guides', label: 'guides' },
    { href: '/categories/patterns', label: 'patterns' },
    { href: '/shop', label: 'shop' },
  ],
  footerColumns: {
    read: [
      { href: '/categories/essays', label: 'essays' },
      { href: '/categories/guides', label: 'guides' },
      { href: '/categories/patterns', label: 'patterns' },
      { href: '/articles', label: 'archive' },
    ],
    shop: [
      { href: '/shop/templates', label: 'templates' },
      { href: '/shop/skills', label: 'skills' },
      { href: '/shop/pdfs', label: 'pdfs' },
    ],
    elsewhere: [
      { href: '/rss.xml', label: 'rss' },
      { href: 'https://github.com/', label: 'github' },
      { href: 'mailto:hello@claudestack.dev', label: 'contact' },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
