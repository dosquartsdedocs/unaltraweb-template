---
layout: page
title: Publications
description: Bibliography, metrics and previews scoped to the project profile.
lang: en
ref: project_publications
profiles: [project]
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
