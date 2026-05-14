---
layout: page
title: Projectes
lang: ca
ref: projects
profiles: [personal]
feature: projects
permalink: /ca/projectes/
nav: true
nav_order: 8
---

Usa `_projects/` per a projectes de recerca, programari, datasets, laboratoris o iniciatives de llarg recorregut.

<div class="projects row row-cols-1 row-cols-md-2 g-4">
  {% assign visible_projects = site.projects | where_exp: "project", "project.lang == page.lang or project.lang == nil" | sort: "importance" %}
  {% for project in visible_projects %}
    {% include projects.liquid %}
  {% endfor %}
</div>
