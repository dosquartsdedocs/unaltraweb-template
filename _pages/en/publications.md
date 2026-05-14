---
layout: page
title: Publications
lang: en
ref: publications
profiles: [personal]
feature: publications
permalink: /en/publications/
nav: true
nav_order: 5
---

{% include bib_search.liquid %}
{% include publications-summary.liquid %}
{% include publications-metrics-summary.liquid %}

<div class="publications">
  {% bibliography %}
</div>
