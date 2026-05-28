---
layout: manual-chapter
title: Bibliografía
description: Libros y artículos que apoyan el manual sin convertirse en un capítulo numerado.
lang: es
ref: manual-bibliography
profiles: [manual]
permalink: /es/bibliografia/
weight: 90
part: Referencia
manual_numbered: false
manual_references: false
keywords: lecturas libros artículos SIG teledetección bibliografía
---

Esta página es la bibliografía del manual. Se alimenta desde `_bibliography/manual.bib`, mientras los capítulos del curso se mantienen centrados en el material docente.

Las entradas BibTeX entran en la bibliografía del manual con `manual = {true}`. Usa `manual_selected = {true}` para las tarjetas destacadas de la parte superior, y `manual_selected = {false}` para el listado cronológico de “Más lecturas”. Campos opcionales como `preview`, `manual_badge_*`, `manual_rating`, `manual_kind_*` y `manual_comment_*` dan voz propia al manual sin añadir ficheros Markdown separados.

{% include manual-bibliography.liquid %}
