---
layout: page
title: Resultados
description: Productos reutilizables publicados por el proyecto.
lang: es
ref: project_outputs
profiles: [project]
permalink: /es/resultados/
nav: false
nav_order: 3
---

<div class="projects row row-cols-1 row-cols-md-2 g-4">
  {% assign visible_projects = site.projects | where_exp: "project", "project.lang == page.lang or project.lang == nil" | sort: "importance" %}
  {% for project in visible_projects %}
    {% include projects.liquid %}
  {% endfor %}
</div>
