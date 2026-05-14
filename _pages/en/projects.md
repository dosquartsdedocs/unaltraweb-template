---
layout: page
title: Projects
lang: en
ref: projects
profiles: [personal]
feature: projects
permalink: /en/projects/
nav: true
nav_order: 8
---

Use `_projects/` for personal research projects, software, datasets, labs, or long-running initiatives.

<div class="projects row row-cols-1 row-cols-md-2 g-4">
  {% assign visible_projects = site.projects | where_exp: "project", "project.lang == page.lang or project.lang == nil" | sort: "importance" %}
  {% for project in visible_projects %}
    {% include projects.liquid %}
  {% endfor %}
</div>
