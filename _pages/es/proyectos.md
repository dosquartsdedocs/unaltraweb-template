---
layout: page
title: Proyectos
lang: es
ref: projects
profiles: [personal]
feature: projects
permalink: /es/proyectos/
nav: true
nav_order: 8
---

Usa `_projects/` para proyectos de investigación, software, datasets, laboratorios o iniciativas de largo recorrido.

<div class="projects row row-cols-1 row-cols-md-2 g-4">
  {% assign visible_projects = site.projects | where_exp: "project", "project.lang == page.lang or project.lang == nil" | sort: "importance" %}
  {% for project in visible_projects %}
    {% include projects.liquid %}
  {% endfor %}
</div>
