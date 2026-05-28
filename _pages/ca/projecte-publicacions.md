---
layout: page
title: Publicacions
description: Bibliografia i mètriques del perfil de projecte.
lang: ca
ref: project_publications
profiles: [project]
feature: publications
permalink: /ca/publicacions/
nav: true
nav_order: 5
---

{% include bib_search.liquid %}
{% include publications-summary.liquid %}
{% include publications-metrics-summary.liquid %}

<div class="publications">
  {% bibliography %}
</div>
