/**
 * SPEC: BRIEF_CLAUDESTACK_PRODUCT.md#2.1 — types for programmatic SEO variants
 */

export interface TemplateVariant {
  slug: string;
  category: 'persona' | 'style' | 'feature' | 'tech';
  h1: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  intro: string;
  useCases: [string, string, string];
  features: [string, string, string, string, string];
  faq: { q: string; a: string }[];
  ctaCopy: string;
  /** 3-4 related variant slugs for internal mesh */
  related?: string[];
}

export type TemplateVariantsFile = {
  variants: TemplateVariant[];
};
