---
layout: page
title: Projects
lang: en
ref: projects
profiles: [unaltreselfie]
feature: projects
permalink: /en/projects/
nav: true
nav_order: 5
figure_captions: true
mermaid:
  enabled: true
  zoomable: false
---

Use `_projects/` for personal research projects, software, datasets, labs, or long-running initiatives.

::: subfigures abc "A single-row subfigure example for a personal research page"
![Project interface]({{ site.baseurl }}/assets/img/placeholders/manual-screenshot.svg "Project interface")
![Study map]({{ site.baseurl }}/assets/img/placeholders/manual-map.svg "Study map")
![Method diagram]({{ site.baseurl }}/assets/img/placeholders/manual-diagram-card.svg "Method diagram")
:::

```mermaid
flowchart LR
  idea[Research idea] --> page[Project page]
  page --> output[Reusable output]
  output --> publication[Publication]
```

{% include project-grid.liquid %}
