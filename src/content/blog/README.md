# Blog Content Directory

This is where you write your real blog posts.

The `demo-articles/` directory shows template capabilities — feel free to delete those once you've launched.

## Front-matter schema

```yaml
---
title: "Required string — used in <title> and OG"
description: "Required string ≤ 200 chars — used in meta and list views"
pubDate: 2026-05-19
updatedDate: 2026-06-01      # optional
category: essay              # essay | pattern | guide
tags: ["tag-1", "tag-2"]
author: "Your Name"          # optional, falls back to siteConfig.author.name
draft: false                 # if true, hidden from production
featured: false              # if true, surfaces in featured slots
canonicalURL: "https://..."  # optional, override canonical
ogImage: "/og/custom.png"    # optional, override auto-generated OG
faq:                         # optional, renders as accordion + Schema.org FAQPage
  - question: "..."
    answer: "..."
relatedSlugs: ["other-slug"] # optional, override related-article picker
---

Article body in Markdown / MDX.
```

## File naming

Use a numeric prefix to control natural sort:

```
01-first-article.mdx
02-second-article.mdx
```

The number appears as `№ 001` etc. in the article list.
