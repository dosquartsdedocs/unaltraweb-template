---
layout: page
title: Recursos
description: Dades, codi, documentació i enllaços del projecte.
lang: ca
ref: project_resources
profiles: [project]
permalink: /ca/recursos/
nav: true
nav_order: 3
dropdown: true
children:
  - title: Resultats
    permalink: /ca/resultats/
  - title: Recursos
    permalink: /ca/recursos/
  - title: Tesis
    permalink: /ca/tesis/
  - title: Lectures
    permalink: /ca/lectures/
---

{% assign visible_projects = site.projects | where_exp: "project", "project.lang == page.lang or project.lang == nil" | sort: "importance" %}
{% for project in visible_projects %}
  <h2>{{ project.title }}</h2>
  {% include project-resources.liquid project=project variant='page' %}
{% endfor %}
