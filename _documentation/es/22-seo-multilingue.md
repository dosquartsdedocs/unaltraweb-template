---
title: SEO multilingüe
description: Cómo conviven páginas traducidas, canonicals, hreflang y sitemaps.
lang: es
ref: software_multilingual_seo
profiles: [unaltredocs]
section: Estándares
weight: 230
permalink: /es/docs/seo-multilingue/
---

Las páginas traducidas deben existir como URLs separadas. No son duplicados SEO cuando cada página declara su lengua y enlaza a las páginas equivalentes en las otras lenguas.

## Contrato de front matter

Usa el mismo `ref` para páginas equivalentes y un `lang` diferente para cada traducción.

```yaml
---
title: Páginas y layouts reutilizables para perfiles
lang: es
ref: software_reusable_profile_pages
permalink: /es/docs/paginas-reutilizables/
---
```

Las versiones inglesa y catalana conservan `ref: software_reusable_profile_pages` y cambian `lang`, `title` y `permalink`.

## URLs canónicas

Cada traducción mantiene una URL canónica que apunta a sí misma. La página inglesa apunta canónicamente a la URL inglesa, la española a la española y la catalana a la catalana. No conviene hacer que todas las traducciones tengan canonical hacia inglés, porque eso indicaría a los buscadores que ignoren las páginas localizadas.

## Alternates hreflang

Cuando páginas o documentos de colección comparten un `ref`, `unaltraweb` emite enlaces alternativos como:

```html
<link rel="alternate" hreflang="en" href="https://example.org/en/docs/reusable-profile-pages/">
<link rel="alternate" hreflang="es" href="https://example.org/es/docs/paginas-reutilizables/">
<link rel="alternate" hreflang="ca" href="https://example.org/ca/docs/pagines-reutilitzables/">
<link rel="alternate" hreflang="x-default" href="https://example.org/en/docs/reusable-profile-pages/">
```

Esta es la señal que Google necesita para entender que las páginas son traducciones o variantes localizadas, no contenido duplicado accidental.

## Sitemap y selector de idioma

`jekyll-sitemap` lista las URLs generadas, mientras que la cabecera o la barra lateral de documentación ofrecen el cambio visible de idioma. El selector visible es para lectores; `hreflang` es para rastreadores.

## Regla práctica

Si una página es una traducción, comparte el mismo `ref`. Si es una página distinta que solo trata un tema relacionado, dale otro `ref`.
