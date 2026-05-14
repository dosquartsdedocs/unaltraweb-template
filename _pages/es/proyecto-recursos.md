---
layout: page
title: Recursos
description: Datos, código, documentación y enlaces del proyecto.
lang: es
ref: project_resources
profiles: [project]
permalink: /es/recursos/
nav: true
nav_order: 3
dropdown: true
children:
  - title: Resultados
    permalink: /es/resultados/
  - title: Recursos
    permalink: /es/recursos/
  - title: Tesis
    permalink: /es/tesis/
  - title: Lecturas
    permalink: /es/lecturas/
---

{% assign visible_projects = site.projects | where_exp: "project", "project.lang == page.lang or project.lang == nil" | sort: "importance" %}
{% for project in visible_projects %}
  <h2>{{ project.title }}</h2>
  {% include project-resources.liquid project=project variant='page' %}
{% endfor %}
