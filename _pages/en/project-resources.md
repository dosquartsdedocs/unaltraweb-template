---
layout: page
title: Resources
description: Datasets, code, documentation and project links rendered from project metadata.
lang: en
ref: project_resources
profiles: [project]
permalink: /en/resources/
nav: true
nav_order: 3
dropdown: true
children:
  - title: Outputs
    permalink: /en/outputs/
  - title: Resources
    permalink: /en/resources/
  - title: Theses
    permalink: /en/theses/
  - title: Readings
    permalink: /en/readings/
---

{% assign visible_projects = site.projects | where_exp: "project", "project.lang == page.lang or project.lang == nil" | sort: "importance" %}
{% for project in visible_projects %}
  <h2>{{ project.title }}</h2>
  {% include project-resources.liquid project=project variant='page' %}
{% endfor %}
