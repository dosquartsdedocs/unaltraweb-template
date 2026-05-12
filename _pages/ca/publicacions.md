---
layout: page
title: Publicacions
lang: ca
ref: publications
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
