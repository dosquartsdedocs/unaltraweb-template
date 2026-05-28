---
title: Multilingual SEO
description: How translated pages, canonicals, hreflang and sitemaps work together.
lang: en
ref: software_multilingual_seo
profiles: [techdocs, software]
section: Authoring
subsection: Content model
weight: 47
permalink: /en/docs/multilingual-seo/
---

Translated pages should exist as separate URLs. They are not SEO duplicates when each page declares its own language and links to the equivalent pages in the other languages.

## Front matter contract

Use the same `ref` for equivalent pages and a different `lang` for each translation.

```yaml
---
title: Reusable profile pages and layouts
lang: en
ref: software_reusable_profile_pages
permalink: /en/docs/reusable-profile-pages/
---
```

The Spanish and Catalan versions keep `ref: software_reusable_profile_pages` and change `lang`, `title` and `permalink`.

## Canonical URLs

Each translation keeps a self-referencing canonical URL. The English page points canonically to the English URL, the Spanish page points to the Spanish URL, and the Catalan page points to the Catalan URL. Do not canonical all translations to English; that would tell search engines to ignore the localized pages.

## hreflang alternates

When pages or collection documents share a `ref`, `unaltraweb` emits alternate links such as:

```html
<link rel="alternate" hreflang="en" href="https://example.org/en/docs/reusable-profile-pages/">
<link rel="alternate" hreflang="es" href="https://example.org/es/docs/paginas-reutilizables/">
<link rel="alternate" hreflang="ca" href="https://example.org/ca/docs/pagines-reutilitzables/">
<link rel="alternate" hreflang="x-default" href="https://example.org/en/docs/reusable-profile-pages/">
```

This is the signal Google needs to understand that the pages are translations or localized variants, not accidental duplicate content.

## Sitemap and language switcher

`jekyll-sitemap` lists the generated URLs, while the header or documentation sidebar provides visible language switching. The visible switcher is for readers; `hreflang` is for crawlers.

## Practical rule

If a page is a translation, share the same `ref`. If it is a different page that only covers a related topic, give it a different `ref`.
