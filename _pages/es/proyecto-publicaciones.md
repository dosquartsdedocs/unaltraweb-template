---
layout: page
title: Publicaciones
description: Bibliografía y métricas del perfil de proyecto.
lang: es
ref: project_publications
profiles: [project]
feature: publications
permalink: /es/publicaciones/
nav: true
nav_order: 5
---

{% include bib_search.liquid %}
{% include publications-summary.liquid %}
{% include publications-metrics-summary.liquid %}

<div class="publications">
  {% bibliography %}
</div>
