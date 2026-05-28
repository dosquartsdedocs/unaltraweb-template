---
title: Páginas, colecciones y navegación
description: Cómo los sitios hijo organizan contenido sin editar plantillas del núcleo.
lang: es
ref: software_data_model
profiles: [techdocs, software]
section: Autoría
subsection: Modelo de contenido
weight: 40
permalink: /es/docs/modelo-contenido/
---

La mayoría de páginas son archivos Markdown normales bajo `_pages`. Las colecciones guardan contenido repetido como libros, capítulos, resultados, tesis y páginas de documentación.

| Front matter | Uso |
|---|---|
| `profiles` | Limita una página o documento a uno o más perfiles |
| `nav` | Muestra la página en la navegación superior |
| `nav_order` | Ordena los elementos visibles de navegación |
| `nav_title` | Usa una etiqueta más corta en los menús |
| `feature` | Vincula la visibilidad a `unaltraweb.features` |

Los desplegables se definen en front matter con `dropdown: true` y una lista `children`. Las barras laterales de documentación se generan desde metadatos de colección.

<h2 id="blog-posts">Entradas de blog</h2>

Las entradas de blog viven en la colección de posts y normalmente se activan en sitios personales. Los sitios de proyecto pueden mostrarlas cuando las noticias o notas de versión son útiles; los perfiles de documentación y manual suelen dejarlas fuera.

<h2 id="cv-page">Página de CV</h2>

La página de CV pertenece al perfil personal y suele apoyarse en Markdown local, datos YAML o un layout específico. Guárdala bajo `_pages/<lang>/` con `profiles: [personal]` para que los builds de proyecto y documentación no la rendericen.

<h2 id="publications-page">Página de publicaciones</h2>

Las páginas de publicaciones combinan includes de bibliografía, búsqueda opcional y bloques de resumen. Son útiles en perfiles personales y de proyecto, y leen bibliografía local sin contactar APIs externas durante la construcción de Jekyll.

<h2 id="previous-and-next-links">Enlaces anterior y siguiente</h2>

La navegación secuencial es automática en capítulos de manual y páginas de documentación. Las páginas normales pueden activarla con front matter `previous_next` o `prev_next` cuando conviene una secuencia pequeña y curada.
