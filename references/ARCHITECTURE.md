# 🏗️ ClaudeStack — Architecture & Build Plan

> Document de référence complet pour construire le site étape par étape dans VSCode + CMD.
> 
> **À garder ouvert pendant toute la durée du build.**

---

## 📋 Table des matières

1. [Vue d'ensemble](#1-vue-densemble)
2. [Prérequis et installation des outils](#2-prérequis-et-installation-des-outils)
3. [Structure complète du projet](#3-structure-complète-du-projet)
4. [Stack technique détaillée](#4-stack-technique-détaillée)
5. [Plan de build par phases](#5-plan-de-build-par-phases)
6. [Détail de chaque fichier à créer](#6-détail-de-chaque-fichier-à-créer)
7. [Design system terminal](#7-design-system-terminal)
8. [Content collections](#8-content-collections)
9. [Routes et pages](#9-routes-et-pages)
10. [SEO et performance](#10-seo-et-performance)
11. [Déploiement Cloudflare Pages](#11-déploiement-cloudflare-pages)
12. [Checklist de validation](#12-checklist-de-validation)

---

## 1. Vue d'ensemble

### 🎯 Objectif du projet

Construire un **site SEO statique** pour ClaudeStack — une publication tech focused sur Claude Code, hébergeant des articles longs (essays, patterns, guides) qui rankent sur Google et qui vendent des produits digitaux.

### 📊 Métriques de succès techniques

- **Lighthouse score** : 95+ sur Performance, SEO, Accessibility, Best Practices
- **First Contentful Paint** : < 1.0s
- **Time to Interactive** : < 1.5s
- **Cumulative Layout Shift** : < 0.05
- **Bundle JS** : < 50KB par page

### 🎨 Identité visuelle

- **Direction validée** : Terminal Brutalist (Direction 1)
- **Couleur dominante** : Noir (#000000) + Vert terminal (#00FF66)
- **Typographie** : JetBrains Mono (mono) + Inter Tight (display)
- **Vibe** : Dashboard ingénieur / Vercel docs / Linear changelog

---

## 2. Prérequis et installation des outils

### 🛠️ Outils à installer (une seule fois)

#### **A. Node.js (obligatoire)**

Astro nécessite Node.js 20.10+ ou 22+.

**Sur Windows** :
1. Va sur https://nodejs.org/
2. Télécharge la version **LTS** (Long Term Support)
3. Lance l'installateur, suis les étapes par défaut
4. Vérifie l'installation en ouvrant CMD ou PowerShell :
```bash
node --version
npm --version
```
Tu dois voir des numéros de version (genre `v22.x.x` et `10.x.x`).

#### **B. Visual Studio Code (obligatoire)**

1. Télécharge depuis https://code.visualstudio.com/
2. Installe avec les options par défaut

**Extensions VSCode à installer** (essentielles) :
- **Astro** (officielle, par Astro Build) — coloration syntaxique .astro
- **Tailwind CSS IntelliSense** (officielle) — autocomplete Tailwind
- **MDX** (par unified) — support des fichiers .mdx
- **TypeScript Vue Plugin (Volar)** — pour le TypeScript dans Astro
- **ESLint** — détection d'erreurs
- **Prettier** — formatage de code
- **GitLens** — meilleur Git dans VSCode

Pour les installer : ouvre VSCode, va dans Extensions (icône carrés à gauche, ou Ctrl+Shift+X), cherche chaque extension, clique Install.

#### **C. Git (obligatoire)**

Pour déployer sur Cloudflare Pages plus tard.

**Sur Windows** :
1. Télécharge depuis https://git-scm.com/
2. Installe avec les options par défaut
3. Vérifie dans CMD :
```bash
git --version
```

Configure ton identité Git (à faire une fois) :
```bash
git config --global user.name "Anass"
git config --global user.email "ton@email.com"
```

#### **D. Compte GitHub (obligatoire pour Cloudflare Pages)**

1. Crée un compte sur https://github.com/ si pas déjà fait
2. Tu pourras créer le repo plus tard via la commande `gh` ou directement sur le site

#### **E. Compte Cloudflare (pour déploiement)**

1. Crée un compte gratuit sur https://dash.cloudflare.com/sign-up
2. Pas besoin de carte bancaire pour Cloudflare Pages

---

## 3. Structure complète du projet

Voilà l'arborescence complète qu'on va créer :

```
claudestack/
│
├── 📄 .gitignore                   # Fichiers à ignorer par Git
├── 📄 .prettierrc                  # Config Prettier
├── 📄 astro.config.mjs             # Configuration Astro principale
├── 📄 package.json                 # Dépendances npm
├── 📄 tailwind.config.mjs          # Configuration Tailwind CSS 4
├── 📄 tsconfig.json                # Configuration TypeScript
├── 📄 README.md                    # Documentation du projet
│
├── 📁 public/                      # Assets statiques servis tels quels
│   ├── 📄 favicon.svg              # Favicon du site
│   ├── 📄 favicon.ico              # Favicon fallback
│   ├── 📄 robots.txt               # Instructions pour les crawlers
│   ├── 📁 fonts/                   # Fonts locales (optionnel)
│   └── 📁 images/                  # Images globales du site
│
├── 📁 src/                         # Code source principal
│   │
│   ├── 📁 assets/                  # Assets optimisés (images, etc.)
│   │   └── 📁 images/
│   │
│   ├── 📁 components/              # Composants Astro réutilisables
│   │   ├── 📄 Header.astro         # Nav + topbar
│   │   ├── 📄 Footer.astro         # Footer du site
│   │   ├── 📄 Logo.astro           # Logo [claudestack]
│   │   ├── 📄 MobileMenu.astro     # Menu hamburger mobile
│   │   ├── 📄 TopBar.astro         # Top bar avec status
│   │   ├── 📄 Hero.astro           # Section hero (page d'accueil)
│   │   ├── 📄 Marquee.astro        # Marquee scrolling
│   │   ├── 📄 StatsGrid.astro      # Grid des stats
│   │   ├── 📄 ArticleCard.astro    # Card d'article (mobile)
│   │   ├── 📄 ArticleRow.astro     # Row d'article (desktop)
│   │   ├── 📄 ArticleList.astro    # Liste d'articles complète
│   │   ├── 📄 ProductCard.astro    # Card produit (page d'accueil)
│   │   ├── 📄 Newsletter.astro     # Bloc newsletter
│   │   ├── 📄 Terminal.astro       # Composant terminal preview
│   │   ├── 📄 SEO.astro            # Meta tags par page
│   │   ├── 📄 TableOfContents.astro # TOC pour articles
│   │   ├── 📄 FAQ.astro            # FAQ accordéon
│   │   ├── 📄 RelatedArticles.astro # Articles connexes
│   │   ├── 📄 CodeBlock.astro      # Bloc de code stylé
│   │   ├── 📄 CategoryBadge.astro  # Badge catégorie article
│   │   └── 📄 SearchBox.astro      # Box de recherche
│   │
│   ├── 📁 layouts/                 # Layouts de page
│   │   ├── 📄 BaseLayout.astro     # Layout de base (HTML, head, body)
│   │   ├── 📄 PageLayout.astro     # Layout pages standards
│   │   └── 📄 ArticleLayout.astro  # Layout article individuel
│   │
│   ├── 📁 pages/                   # Routes du site (Astro routing)
│   │   ├── 📄 index.astro          # Page d'accueil /
│   │   ├── 📄 about.astro          # Page about /about
│   │   ├── 📄 404.astro            # Page 404 personnalisée
│   │   ├── 📄 rss.xml.ts           # Feed RSS dynamique
│   │   │
│   │   ├── 📁 articles/            # Articles
│   │   │   ├── 📄 index.astro      # Liste tous articles /articles
│   │   │   └── 📄 [...slug].astro  # Article individuel
│   │   │
│   │   ├── 📁 categories/          # Pages par catégorie
│   │   │   ├── 📄 essays.astro     # /categories/essays
│   │   │   ├── 📄 patterns.astro   # /categories/patterns
│   │   │   └── 📄 guides.astro     # /categories/guides
│   │   │
│   │   ├── 📁 tags/                # Pages par tag
│   │   │   └── 📄 [tag].astro      # /tags/claude-code
│   │   │
│   │   └── 📁 og/                  # OG images dynamiques
│   │       └── 📄 [...slug].png.ts # Génération PNG par article
│   │
│   ├── 📁 content/                 # Content collections Astro
│   │   ├── 📄 config.ts            # Schéma des collections
│   │   │
│   │   └── 📁 articles/            # Tes articles en .mdx
│   │       ├── 📄 01-orchestrator-pattern.mdx
│   │       ├── 📄 02-spec-driven-dev.mdx
│   │       └── 📄 03-claude-code-vs-cursor.mdx
│   │
│   ├── 📁 styles/                  # CSS global
│   │   └── 📄 global.css           # Reset + variables CSS + Tailwind imports
│   │
│   ├── 📁 lib/                     # Utilitaires JavaScript/TypeScript
│   │   ├── 📄 reading-time.ts      # Calcul temps de lecture
│   │   ├── 📄 format-date.ts       # Formatage des dates
│   │   ├── 📄 get-related.ts       # Trouver articles connexes
│   │   └── 📄 site-config.ts       # Config globale (nom, URL, etc.)
│   │
│   └── 📁 consts.ts                # Constantes globales
│
└── 📁 dist/                        # Build de production (généré, ignoré par Git)
```

**Total à créer** : ~35-40 fichiers répartis sur ~15 dossiers.

---

## 4. Stack technique détaillée

### Framework principal : **Astro 5.x**

Pourquoi Astro :
- Sites statiques ultra-rapides (HTML pré-généré)
- Zero JavaScript par défaut → SEO parfait
- Hot reload pendant le dev
- Content Collections natives (parfait pour un blog)
- Communauté énorme en 2026

### CSS : **Tailwind CSS 4**

Pourquoi Tailwind 4 :
- Nouveau moteur Lightning CSS (10x plus rapide que v3)
- Configuration en CSS pur (plus de fichier JS)
- Variables CSS natives
- Tree-shaking automatique → CSS final minuscule

### Markdown : **MDX (.mdx)**

Pourquoi MDX :
- Markdown + composants Astro/React si besoin
- Frontmatter typé avec Zod
- Syntax highlighting natif via Shiki

### Syntax highlighting : **Shiki**

Le meilleur lib de coloration syntaxique. Intégré nativement à Astro. Thèmes : on utilisera "github-dark" ou un custom terminal.

### Recherche : **Pagefind**

Recherche full-text 100% côté client, statique, ultra-rapide. Génère un index à la build.

### OG Images : **@vercel/og** ou **Satori**

Génération d'images Open Graph dynamiques pour chaque article. Permet d'avoir un beau visuel quand on partage un article sur X/Reddit.

### Optimisation images : **Sharp** (intégré à Astro)

Compression automatique en WebP/AVIF, lazy loading, srcset responsive.

### Hébergement : **Cloudflare Pages**

- Gratuit jusqu'à 500 builds/mois
- CDN mondial (très rapide partout)
- Déploiement automatique à chaque push Git
- Domaine custom gratuit (HTTPS inclus)

---

## 5. Plan de build par phases

On va construire le site en **5 phases successives**. Chaque phase teste quelque chose et valide une étape avant de passer à la suivante.

### 🎯 Phase 1 — Foundation (~30 min)

**Objectif** : avoir un projet Astro qui tourne en local avec la home page basique.

Étapes :
1. Créer le projet Astro avec npm
2. Installer Tailwind CSS 4 + MDX
3. Configurer `astro.config.mjs`
4. Créer la structure de dossiers
5. Créer `BaseLayout.astro` minimal
6. Créer `pages/index.astro` avec un "Hello World"
7. Lancer `npm run dev` et vérifier que ça marche

**Validation phase 1** : http://localhost:4321 affiche "Hello World"

---

### 🎨 Phase 2 — Design System (~45 min)

**Objectif** : reproduire le design Terminal Brutalist en composants Astro.

Étapes :
1. Configurer Tailwind avec les variables custom (couleurs, fonts)
2. Importer JetBrains Mono + Inter Tight via Google Fonts
3. Créer `global.css` avec les styles de base
4. Créer le composant `Logo.astro`
5. Créer `TopBar.astro` (status bar)
6. Créer `Header.astro` (nav)
7. Créer `MobileMenu.astro` (hamburger)
8. Créer `Footer.astro`
9. Assembler dans `BaseLayout.astro`

**Validation phase 2** : la home affiche header + footer fonctionnels, identiques au mockup HTML.

---

### 📝 Phase 3 — Content Collections (~30 min)

**Objectif** : système d'articles avec frontmatter typé.

Étapes :
1. Créer `src/content/config.ts` avec schéma Zod pour articles
2. Créer 1 article d'exemple `.mdx` avec frontmatter complet
3. Créer `ArticleLayout.astro`
4. Créer `pages/articles/[...slug].astro` pour générer les pages dynamiques
5. Créer `lib/reading-time.ts` et `lib/format-date.ts`

**Validation phase 3** : http://localhost:4321/articles/01-orchestrator-pattern affiche l'article formaté.

---

### 🏠 Phase 4 — Pages complètes (~1h)

**Objectif** : toutes les pages essentielles fonctionnelles.

Étapes :
1. Compléter `pages/index.astro` (homepage complète avec Hero, Marquee, Stats, Articles, Product, Newsletter)
2. Créer `pages/articles/index.astro` (liste articles)
3. Créer `pages/about.astro`
4. Créer `pages/404.astro`
5. Créer les pages catégories (`/categories/essays`, etc.)
6. Créer `pages/tags/[tag].astro`
7. Créer 2 articles supplémentaires `.mdx`

**Validation phase 4** : toutes les pages se chargent, on peut naviguer entre elles.

---

### 🚀 Phase 5 — SEO & Performance (~45 min)

**Objectif** : optimiser pour Google.

Étapes :
1. Créer `components/SEO.astro` (meta tags dynamiques)
2. Intégrer SEO dans tous les layouts
3. Configurer `@astrojs/sitemap` (sitemap.xml auto)
4. Créer `pages/rss.xml.ts` (feed RSS)
5. Créer `public/robots.txt`
6. Configurer OG images dynamiques avec Satori
7. Ajouter Schema.org Article markup
8. Configurer Pagefind pour la recherche
9. Tester le build de production (`npm run build`)
10. Vérifier score Lighthouse

**Validation phase 5** : Lighthouse 95+ partout, sitemap.xml généré, recherche fonctionne.

---

### 🌐 Phase 6 — Déploiement (~30 min)

**Objectif** : site en ligne sur Cloudflare Pages.

Étapes :
1. Créer repo GitHub (`claudestack`)
2. Pousser le code sur GitHub
3. Créer projet sur Cloudflare Pages
4. Connecter à GitHub
5. Configurer build settings
6. Premier déploiement
7. (Plus tard) Configurer le domaine custom

**Validation phase 6** : site accessible publiquement sur `claudestack.pages.dev`.

---

## 6. Détail de chaque fichier à créer

Cette section détaille **quoi mettre dans chaque fichier**. C'est ta référence pendant le build.

> **Note** : je ne mets pas le code ici (ce serait trop long), je décris **ce que fait chaque fichier** et **quelles fonctionnalités il contient**. Le code sera fourni étape par étape pendant qu'on construit ensemble.

### 📦 Fichiers racine

#### `package.json`
Liste des dépendances npm du projet. Contient les scripts (`dev`, `build`, `preview`).

**Dépendances principales** :
- `astro` ^5.0.0
- `@astrojs/mdx`
- `@astrojs/rss`
- `@astrojs/sitemap`
- `@astrojs/tailwind`
- `tailwindcss` ^4.0.0
- `@tailwindcss/typography`
- `sharp`
- `satori` + `@resvg/resvg-js`
- `pagefind`
- `reading-time`

#### `astro.config.mjs`
Configuration principale d'Astro. Active les intégrations (MDX, sitemap, Tailwind), définit l'URL du site (`https://claudestack.dev`), configure les options de build.

#### `tailwind.config.mjs`
Configuration Tailwind 4 avec :
- Couleurs custom (greens, terminal colors)
- Fonts (JetBrains Mono, Inter Tight)
- Breakpoints
- Plugin typography pour le contenu Markdown

#### `tsconfig.json`
Configuration TypeScript. Strict mode activé pour catch les erreurs early.

#### `.gitignore`
Fichiers à ignorer par Git :
```
node_modules/
dist/
.astro/
.env
.env.local
.DS_Store
```

#### `.prettierrc`
Config Prettier pour formater le code automatiquement. Tabs, semicolons, etc.

#### `README.md`
Documentation du projet : comment installer, lancer en dev, build, déployer.

---

### 🌐 Dossier `public/`

#### `favicon.svg`
Favicon vectoriel — un `[]` vert sur fond noir.

#### `robots.txt`
```
User-agent: *
Allow: /

Sitemap: https://claudestack.dev/sitemap-index.xml
```

---

### 🧩 Dossier `src/components/`

#### `Logo.astro`
Logo `[claudestack]` réutilisable. Props : `size` (small/medium/large).

#### `TopBar.astro`
Top bar avec status online, version, stats. Caché sur mobile pour les détails.

#### `Header.astro`
Navigation principale. Importe Logo, gère les liens desktop, intègre MobileMenu.

#### `MobileMenu.astro`
Menu hamburger pour mobile. Drawer animé. Inclut le script JS d'ouverture/fermeture.

#### `Footer.astro`
Footer avec colonnes (Read, Shop, Elsewhere). Logo, description, copyright.

#### `Hero.astro`
Section hero de la home page. Titre H1, subtitle, CTAs, terminal preview.

#### `Marquee.astro`
Marquee scrolling des thèmes. CSS animation pure.

#### `StatsGrid.astro`
Grid des 4 stats (essays, subs, patterns, loc). Props pour les valeurs.

#### `ArticleCard.astro` et `ArticleRow.astro`
Composant article qui s'adapte mobile (card) / desktop (row). Props : article (objet typé).

#### `ArticleList.astro`
Liste d'articles avec filtres par catégorie. Utilise les content collections.

#### `ProductCard.astro`
Card produit pour la home page. Props : product (objet).

#### `Newsletter.astro`
Bloc newsletter avec form. Pour la v1, le form aura juste un placeholder (intégration ConvertKit/Buttondown en phase 2).

#### `Terminal.astro`
Composant réutilisable de terminal preview. Props : `title`, `lines` (array de lignes de code).

#### `SEO.astro`
Composant qui génère tous les meta tags : title, description, OG, Twitter Card, Schema.org Article, canonical, etc. Props : article ou page.

#### `TableOfContents.astro`
TOC auto-générée depuis les H2/H3 de l'article. Sticky sur desktop, collapsible sur mobile.

#### `FAQ.astro`
Section FAQ accordéon. Props : `items` (array de {question, answer}). Schema.org FAQPage inclus pour le SEO.

#### `RelatedArticles.astro`
Affiche 3-4 articles connexes en bas de chaque article. Calcule la pertinence via tags partagés.

#### `CodeBlock.astro`
Bloc de code stylé avec bouton "copy". Wrap le syntax highlighting Shiki.

#### `CategoryBadge.astro`
Badge stylé par catégorie (essay = vert, pattern = cyan, guide = violet). Props : `category`.

#### `SearchBox.astro`
Box de recherche qui utilise Pagefind. UI minimaliste terminal.

---

### 🎨 Dossier `src/layouts/`

#### `BaseLayout.astro`
Layout de base avec `<html>`, `<head>`, `<body>`. Importe Header, Footer, SEO. Tous les autres layouts partent de celui-ci.

#### `PageLayout.astro`
Layout pour les pages standards (about, archive, etc.). Étend BaseLayout, ajoute padding/container.

#### `ArticleLayout.astro`
Layout dédié pour un article. Inclut : TOC, contenu, FAQ, articles connexes, CTA produit en fin. Étend BaseLayout.

---

### 🗺️ Dossier `src/pages/`

#### `index.astro` (Homepage)
La page d'accueil. Assemble : Header → Hero → Marquee → StatsGrid → ArticleList (récents) → ProductCard → Newsletter → Footer.

#### `about.astro`
Page "About / Manifest". Histoire du site, philosophie, qui écrit, pourquoi. Important pour le E-E-A-T Google.

#### `404.astro`
Page 404 personnalisée style terminal : `ERROR 404: page not found` avec un `cat /var/log/missing.log` qui suggère des liens.

#### `rss.xml.ts`
Endpoint qui génère le feed RSS dynamiquement à partir des content collections.

#### `articles/index.astro`
Liste tous les articles avec filtres et pagination. URL : `/articles`.

#### `articles/[...slug].astro`
Page dynamique pour chaque article individuel. Utilise `getStaticPaths()` pour générer une page par article.

#### `categories/essays.astro`, `patterns.astro`, `guides.astro`
Pages dédiées par catégorie. Liste les articles de cette catégorie.

#### `tags/[tag].astro`
Page dynamique par tag. `/tags/claude-code`, `/tags/multi-agent`, etc.

#### `og/[...slug].png.ts`
Endpoint qui génère dynamiquement une image PNG OG pour chaque article. Utilise Satori.

---

### 📚 Dossier `src/content/`

#### `config.ts`
Schéma TypeScript/Zod pour les content collections. Définit les champs obligatoires/optionnels des articles :

```typescript
const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    category: z.enum(['essay', 'pattern', 'guide']),
    tags: z.array(z.string()),
    image: z.string().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});
```

#### `articles/*.mdx`
Articles individuels. Format :

```mdx
---
title: "The orchestrator pattern"
description: "Why one Claude session is never enough..."
pubDate: 2026-05-12
category: essay
tags: ["claude-code", "multi-agent", "architecture"]
featured: true
---

## Introduction

Contenu de l'article en Markdown avec H2, H3, code blocks, etc.
```

---

### 🎨 Dossier `src/styles/`

#### `global.css`
- Import Tailwind
- Variables CSS custom (couleurs, fonts)
- Reset CSS
- Styles globaux (selection, scrollbar, etc.)
- Typography classes pour le contenu MDX

---

### 🔧 Dossier `src/lib/`

#### `reading-time.ts`
Fonction qui calcule le temps de lecture d'un article (mots / vitesse de lecture moyenne 200 wpm).

#### `format-date.ts`
Formate les dates au format `2026.05.12` (style terminal).

#### `get-related.ts`
Algorithme qui trouve les articles connexes à un article donné, basé sur les tags partagés et la catégorie.

#### `site-config.ts`
Configuration globale du site (nom, URL, description, social, etc.). **Modifier ici si tu changes de domaine.**

---

## 7. Design system terminal

### 🎨 Palette de couleurs

| Variable | Hex | Usage |
|---|---|---|
| `--bg` | #000000 | Background principal |
| `--bg-1` | #0A0A0A | Background sections alternées |
| `--bg-2` | #111111 | Cards, panels |
| `--bg-3` | #1A1A1A | Élevé (terminal dots) |
| `--line` | #222222 | Borders standard |
| `--line-bright` | #2E2E2E | Borders emphasés |
| `--text` | #EDEDED | Texte principal |
| `--text-soft` | #999999 | Texte secondaire |
| `--text-dim` | #666666 | Texte tertiaire |
| `--text-faint` | #444444 | Texte très discret |
| `--green` | #00FF66 | Accent principal (CTA, liens) |
| `--green-glow` | rgba(0,255,102,0.15) | Glow effects |
| `--green-dim` | rgba(0,255,102,0.5) | Borders accent |
| `--cyan` | #00E5FF | Tags pattern |
| `--violet` | #B794F4 | Tags guide |

### 🔤 Typographie

**Font Mono** : `'JetBrains Mono', 'Courier New', monospace`
- Weights utilisés : 300, 400, 500, 600, 700, 800
- Pour : nav, body, code, badges, meta, footer

**Font Display** : `'Inter Tight', -apple-system, sans-serif`
- Weights utilisés : 400, 500, 600, 700
- Pour : H1 hero, H2 sections, gros titres

### 📏 Spacing (Tailwind config)

- `--gutter` : 16px mobile / 20px tablet / 24px desktop
- `--section-pad` : 56px mobile / 72px tablet / 96px desktop
- `--container-max` : 1280px

### 📱 Breakpoints

| Nom | Min-width | Devices |
|---|---|---|
| `xs` | 480px | Petits mobiles |
| `sm` | 640px | Grands mobiles |
| `md` | 768px | Tablettes |
| `lg` | 980px | Desktop |
| `xl` | 1200px | Large desktop |

---

## 8. Content collections

### Schéma article (Zod)

```typescript
{
  title: string,                    // Titre H1 de l'article
  description: string,              // Pour SEO et list view (max 160 chars)
  pubDate: Date,                    // Date de publication
  updatedDate?: Date,               // Date de mise à jour (optionnel)
  category: 'essay' | 'pattern' | 'guide',
  tags: string[],                   // Pour navigation et SEO
  image?: string,                   // Image de couverture
  draft: boolean,                   // Si true, n'apparaît pas en prod
  featured: boolean,                // Si true, affiché en haut de home
  faq?: Array<{                     // FAQ pour le SEO
    question: string,
    answer: string
  }>,
  relatedSlugs?: string[]           // Override des articles connexes
}
```

### Workflow d'écriture

1. Tu crées un fichier `src/content/articles/14-orchestrator-pattern.mdx`
2. Tu remplis le frontmatter (métadonnées)
3. Tu écris le contenu en Markdown
4. Tu utilises des composants Astro dans le Markdown si besoin (`<FAQ items={...} />`)
5. Tu sauvegardes → Astro génère automatiquement la page
6. Tu testes en local
7. Tu push sur GitHub → déploiement automatique sur Cloudflare

---

## 9. Routes et pages

### URLs publiques

| URL | Page | Description |
|---|---|---|
| `/` | `index.astro` | Page d'accueil |
| `/articles` | `articles/index.astro` | Liste tous articles |
| `/articles/[slug]` | `articles/[...slug].astro` | Article individuel |
| `/categories/essays` | `categories/essays.astro` | Articles essays |
| `/categories/patterns` | `categories/patterns.astro` | Articles patterns |
| `/categories/guides` | `categories/guides.astro` | Articles guides |
| `/tags/[tag]` | `tags/[tag].astro` | Articles par tag |
| `/about` | `about.astro` | Page about |
| `/rss.xml` | `rss.xml.ts` | Feed RSS |
| `/sitemap-index.xml` | Auto-généré | Sitemap |
| `/og/[slug].png` | `og/[...slug].png.ts` | OG image dynamique |
| `/404` | `404.astro` | Page d'erreur 404 |

---

## 10. SEO et performance

### Meta tags par page

Chaque page doit avoir :
- `<title>` unique et descriptif (50-60 chars)
- `<meta name="description">` accrocheuse (150-160 chars)
- `<meta property="og:image">` (1200x630px)
- `<meta property="og:title">`, `<meta property="og:description">`
- `<meta property="og:type">` (article ou website)
- `<meta name="twitter:card" content="summary_large_image">`
- `<link rel="canonical">` (URL canonique)
- Schema.org Article markup en JSON-LD

### Optimisations performance

- **Images** : optimisées en WebP/AVIF par Astro, srcset responsive, lazy loading
- **CSS** : Tailwind purgé, minifié, inlined critical CSS
- **JS** : minimal, défer/async sur les scripts
- **Fonts** : preconnect Google Fonts, font-display: swap
- **Caching** : headers Cloudflare optimaux

### Objectifs Lighthouse

| Métrique | Score cible |
|---|---|
| Performance | 95+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

---

## 11. Déploiement Cloudflare Pages

### Étapes de déploiement (phase 6)

1. **Push sur GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/anass/claudestack.git
git push -u origin main
```

2. **Connecter à Cloudflare Pages**
- Va sur https://dash.cloudflare.com/
- Workers & Pages → Create → Pages → Connect to Git
- Sélectionne le repo `claudestack`
- Configure le build :
  - **Framework preset** : Astro
  - **Build command** : `npm run build`
  - **Build output directory** : `dist`
  - **Node version** : 22

3. **Premier déploiement**
- Cloudflare build automatiquement
- Site disponible sur `claudestack.pages.dev`

4. **Domaine custom (plus tard)**
- Achète le domaine sur Cloudflare Registrar (10-15$/an)
- Custom Domains → Set up a custom domain
- DNS configuré automatiquement
- HTTPS activé automatiquement

### Variables d'environnement (si besoin)

Si on intègre une API plus tard (newsletter, analytics) :
- Cloudflare Pages → Settings → Environment variables
- Ajouter `NEWSLETTER_API_KEY`, etc.

---

## 12. Checklist de validation

### ✅ Phase 1 — Foundation
- [ ] Node.js installé (v22+)
- [ ] VSCode + extensions installés
- [ ] Git installé et configuré
- [ ] Projet Astro créé
- [ ] `npm run dev` lance localhost:4321
- [ ] Page "Hello World" visible

### ✅ Phase 2 — Design System
- [ ] Tailwind 4 configuré
- [ ] Fonts JetBrains Mono + Inter Tight chargées
- [ ] Variables CSS définies
- [ ] Header + Footer fonctionnels
- [ ] Menu hamburger mobile marche
- [ ] Apparence identique au mockup HTML

### ✅ Phase 3 — Content Collections
- [ ] Schéma articles défini
- [ ] 1 article d'exemple créé
- [ ] ArticleLayout fonctionne
- [ ] URL /articles/[slug] affiche l'article

### ✅ Phase 4 — Pages
- [ ] Homepage complète identique au mockup
- [ ] /articles liste tous les articles
- [ ] /about existe et a du contenu
- [ ] /404 personnalisée
- [ ] Pages catégories fonctionnent
- [ ] Pages tags fonctionnent
- [ ] 3 articles d'exemple créés

### ✅ Phase 5 — SEO & Performance
- [ ] Meta tags par page corrects
- [ ] Sitemap.xml généré
- [ ] RSS feed fonctionne
- [ ] robots.txt présent
- [ ] OG images dynamiques
- [ ] Schema.org Article markup
- [ ] Pagefind recherche fonctionne
- [ ] Lighthouse 95+ partout

### ✅ Phase 6 — Déploiement
- [ ] Repo GitHub créé et pushé
- [ ] Cloudflare Pages connecté
- [ ] Premier build réussi
- [ ] Site accessible publiquement
- [ ] HTTPS activé

---

## 🚀 Commandes essentielles à connaître

```bash
# Créer un nouveau projet Astro
npm create astro@latest

# Lancer en développement (hot reload)
npm run dev

# Build de production
npm run build

# Preview du build de production
npm run preview

# Installer une dépendance
npm install nom-du-package

# Installer Tailwind 4
npm install tailwindcss @tailwindcss/typography

# Ajouter une intégration Astro
npx astro add mdx
npx astro add sitemap
npx astro add tailwind

# Vérifier les types TypeScript
npm run astro check

# Git basics
git status                          # Voir les changements
git add .                           # Ajouter tous les changements
git commit -m "message"             # Commit
git push                            # Push vers GitHub
```

---

## 📚 Ressources externes utiles

- **Documentation Astro** : https://docs.astro.build/
- **Tailwind CSS 4** : https://tailwindcss.com/
- **MDX** : https://mdxjs.com/
- **Cloudflare Pages docs** : https://developers.cloudflare.com/pages/
- **Pagefind** : https://pagefind.app/
- **Shiki themes** : https://shiki.style/

---

## 🎯 Prochaines étapes

Une fois ce document lu et compris, on attaque la **Phase 1 — Foundation** :

1. Tu installes Node.js, VSCode, Git (si pas déjà fait)
2. Tu ouvres un terminal CMD dans le dossier où tu veux créer le projet
3. Tu me confirmes que tu es prêt
4. Je te donne les commandes exactes étape par étape
5. On construit ensemble

**Question pour démarrer Phase 1** :
- Tu as déjà Node.js et Git installés ?
- Tu veux créer le projet où sur ton ordi (Bureau, Documents, autre) ?

Une fois ces 2 réponses, on commence le code.

---

*Document v1.0 — généré le 15 mai 2026*
