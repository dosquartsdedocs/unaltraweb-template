---
layout: page
title: Resources
description: Project outputs, repositories, reading notes and reusable material.
lang: en
ref: resources
profiles: [unaltreprojecte]
permalink: /en/resources/
nav: true
nav_order: 6
dropdown: true
figure_captions: true
mermaid:
  enabled: true
  zoomable: false
children:
  - title: Outputs
    permalink: /en/outputs/
  - title: Repositories
    permalink: /en/repositories/
  - title: Readings
    permalink: /en/readings/
---

This landing page groups the reusable material that a project site usually needs after the main narrative is in place.

::: subfigures ab/cd "A two-row subfigure example for project resources"
![Dataset output]({{ site.baseurl }}/assets/img/placeholders/manual-screenshot.svg "Dataset output")
![Map product]({{ site.baseurl }}/assets/img/placeholders/manual-map.svg "Map product")
![Repository workflow]({{ site.baseurl }}/assets/img/placeholders/manual-diagram-card.svg "Repository workflow")
![Reading notes]({{ site.baseurl }}/assets/img/placeholders/manual-screenshot.svg "Reading notes")
:::

```mermaid
sequenceDiagram
  participant Team
  participant Repository
  participant Website
  Team->>Repository: publish reusable material
  Repository->>Website: expose resource links
  Website-->>Team: keep outputs discoverable
```

| Resource | Use it for |
|---|---|
| [Outputs]({{ '/en/outputs/' | relative_url }}) | Datasets, maps, reports, software and reusable research products. |
| [Repositories]({{ '/en/repositories/' | relative_url }}) | GitHub organisations, code repositories and infrastructure links. |
| [Readings]({{ '/en/readings/' | relative_url }}) | Annotated books, manuals and internal reading notes. |
