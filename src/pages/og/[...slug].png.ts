import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const interTightBold = readFileSync(
  fileURLToPath(
    new URL('../../../node_modules/@fontsource/inter-tight/files/inter-tight-latin-700-normal.woff', import.meta.url),
  ),
);
const jetbrainsMonoMedium = readFileSync(
  fileURLToPath(
    new URL('../../../node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-500-normal.woff', import.meta.url),
  ),
);

const COLORS = {
  bg: '#000000',
  bg1: '#0A0A0A',
  line: '#222222',
  text: '#EDEDED',
  textDim: '#666666',
  green: '#00FF66',
  cyan: '#00E5FF',
  violet: '#B794F4',
};

const CAT_COLOR: Record<string, string> = {
  essay: COLORS.green,
  pattern: COLORS.cyan,
  guide: COLORS.violet,
};

interface OgInputs {
  title: string;
  category?: string;
  date?: string;
  isDefault?: boolean;
}

function el(type: string, style: Record<string, unknown>, ...children: unknown[]): unknown {
  const flat = children.flat().filter((c) => c !== null && c !== undefined && c !== false && c !== '');
  return {
    type,
    props: {
      style,
      children: flat.length === 0 ? undefined : flat.length === 1 ? flat[0] : flat,
    },
  };
}

function buildTree({ title, category, date, isDefault }: OgInputs) {
  const accentColor = category ? CAT_COLOR[category] ?? COLORS.green : COLORS.green;

  const topLogo = el(
    'div',
    { display: 'flex', color: COLORS.text, fontFamily: 'JetBrains Mono', fontSize: '22px' },
    el('span', { color: COLORS.green, display: 'flex' }, '['),
    el('span', { color: COLORS.text, display: 'flex' }, 'claudestack'),
    el('span', { color: COLORS.green, display: 'flex' }, ']'),
  );

  const topStatus = el(
    'div',
    { display: 'flex', alignItems: 'center', color: COLORS.green, fontFamily: 'JetBrains Mono', fontSize: '22px' },
    el('div', {
      width: '10px',
      height: '10px',
      background: COLORS.green,
      marginRight: '10px',
    }),
    el('span', { display: 'flex' }, 'ONLINE'),
  );

  const topRow = el(
    'div',
    { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' },
    topLogo,
    topStatus,
  );

  const badge = !isDefault && category
    ? el(
        'div',
        {
          display: 'flex',
          padding: '6px 14px',
          border: `1px solid ${accentColor}`,
          color: accentColor,
          fontFamily: 'JetBrains Mono',
          fontSize: '18px',
          letterSpacing: '0.1em',
          marginBottom: '24px',
          background: COLORS.bg1,
        },
        category.toUpperCase(),
      )
    : null;

  const titleEl = el(
    'div',
    {
      display: 'flex',
      fontFamily: 'Inter Tight',
      fontSize: isDefault ? '120px' : '72px',
      fontWeight: 700,
      letterSpacing: '-0.04em',
      lineHeight: 1.0,
      color: COLORS.text,
      marginBottom: '24px',
    },
    title,
  );

  const bottomEl = el(
    'div',
    {
      display: 'flex',
      fontFamily: 'JetBrains Mono',
      fontSize: '20px',
      color: COLORS.textDim,
      letterSpacing: '0.05em',
    },
    isDefault ? '$ field reports from production claude code' : `$ ${date ?? ''}`,
  );

  const lower = el(
    'div',
    { display: 'flex', flexDirection: 'column' },
    badge,
    titleEl,
    bottomEl,
  );

  return el(
    'div',
    {
      width: '1200px',
      height: '630px',
      background: COLORS.bg,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '64px',
      fontFamily: 'Inter Tight',
    },
    topRow,
    lower,
  );
}

async function renderPng(inputs: OgInputs): Promise<Uint8Array> {
  const tree = buildTree(inputs);

  const svg = await satori(tree as never, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Inter Tight', data: interTightBold, weight: 700, style: 'normal' },
      { name: 'JetBrains Mono', data: jetbrainsMonoMedium, weight: 500, style: 'normal' },
    ],
  });

  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getCollection('articles', (e) => !e.data.draft);
  return [
    { params: { slug: 'default' }, props: { article: null } },
    ...articles.map((article) => ({
      params: { slug: article.id },
      props: { article },
    })),
  ];
};

export const GET: APIRoute = async ({ props }) => {
  const article = props.article;
  const inputs: OgInputs = article
    ? {
        title: article.data.title,
        category: article.data.category,
        date: new Date(article.data.pubDate).toISOString().split('T')[0]!.replace(/-/g, '.'),
      }
    : { title: 'claudestack', isDefault: true };

  const png = await renderPng(inputs);

  return new Response(png as BodyInit, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
