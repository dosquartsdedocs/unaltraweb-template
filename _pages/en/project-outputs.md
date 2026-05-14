---
layout: page
title: Outputs
description: Reusable products published by the project.
lang: en
ref: project_outputs
profiles: [project]
permalink: /en/outputs/
nav: false
nav_order: 3
---

Outputs reuse the existing project-card and resource metadata pipeline instead of a separate preview component.

<div class="projects row row-cols-1 row-cols-md-2 g-4">
  {% assign visible_projects = site.projects | where_exp: "project", "project.lang == page.lang or project.lang == nil" | sort: "importance" %}
  {% for project in visible_projects %}
    {% include projects.liquid %}
  {% endfor %}
</div>
