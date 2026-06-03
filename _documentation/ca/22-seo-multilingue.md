---
title: SEO multilingüe
description: Com conviuen pàgines traduïdes, canonicals, hreflang i sitemaps.
lang: ca
ref: software_multilingual_seo
profiles: [unaltredocs]
section: Estàndards
weight: 230
permalink: /ca/docs/seo-multilingue/
---

Les pàgines traduïdes han d'existir com a URLs separades. No són duplicats SEO quan cada pàgina declara la seua llengua i enllaça a les pàgines equivalents en les altres llengües.

## Contracte de front matter

Usa el mateix `ref` per a pàgines equivalents i un `lang` diferent per a cada traducció.

```yaml
---
title: Pàgines i layouts reutilitzables per a perfils
lang: ca
ref: software_reusable_profile_pages
permalink: /ca/docs/pagines-reutilitzables/
---
```

Les versions anglesa i castellana conserven `ref: software_reusable_profile_pages` i canvien `lang`, `title` i `permalink`.

## URLs canòniques

Cada traducció manté una URL canònica que apunta a si mateixa. La pàgina anglesa apunta canònicament a la URL anglesa, la castellana a la castellana i la catalana a la catalana. No convé fer que totes les traduccions tinguen canonical cap a l'anglès, perquè això indicaria als cercadors que ignoren les pàgines localitzades.

## Alternates hreflang

Quan pàgines o documents de col·lecció comparteixen un `ref`, `unaltraweb` emet enllaços alternatius com:

```html
<link rel="alternate" hreflang="en" href="https://example.org/en/docs/reusable-profile-pages/">
<link rel="alternate" hreflang="es" href="https://example.org/es/docs/paginas-reutilizables/">
<link rel="alternate" hreflang="ca" href="https://example.org/ca/docs/pagines-reutilitzables/">
<link rel="alternate" hreflang="x-default" href="https://example.org/en/docs/reusable-profile-pages/">
```

Aquesta és la senyal que Google necessita per entendre que les pàgines són traduccions o variants localitzades, no contingut duplicat accidental.

## Sitemap i selector d'idioma

`jekyll-sitemap` llista les URLs generades, mentre que la capçalera o la barra lateral de documentació ofereixen el canvi visible d'idioma. El selector visible és per als lectors; `hreflang` és per als rastrejadors.

## Regla pràctica

Si una pàgina és una traducció, comparteix el mateix `ref`. Si és una pàgina diferent que només tracta un tema relacionat, dona-li un altre `ref`.
