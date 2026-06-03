---
layout: page
title: Publicacions
lang: ca
ref: publications
profiles: [unaltreselfie]
feature: publications
permalink: /ca/publicacions/
nav: true
nav_order: 3
---

{% include bib_search.liquid %}
{% include publications-summary.liquid %}
{% include publications-metrics-summary.liquid %}

<div class="publications">
  {% bibliography %}
</div>
