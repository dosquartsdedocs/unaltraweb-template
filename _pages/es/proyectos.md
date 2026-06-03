---
layout: page
title: Proyectos
lang: es
ref: projects
profiles: [unaltreselfie]
feature: projects
permalink: /es/proyectos/
nav: true
nav_order: 5
figure_captions: true
mermaid:
  enabled: true
  zoomable: false
---

Usa `_projects/` para proyectos de investigación, software, datasets, laboratorios o iniciativas de largo recorrido.

::: subfigures abc "Un ejemplo de subfiguras en una sola fila para una página personal de investigación"
![Interfaz del proyecto]({{ site.baseurl }}/assets/img/placeholders/manual-screenshot.svg "Interfaz del proyecto")
![Mapa de estudio]({{ site.baseurl }}/assets/img/placeholders/manual-map.svg "Mapa de estudio")
![Diagrama metodológico]({{ site.baseurl }}/assets/img/placeholders/manual-diagram-card.svg "Diagrama metodológico")
:::

```mermaid
flowchart LR
  idea[Idea de investigación] --> page[Página de proyecto]
  page --> output[Resultado reutilizable]
  output --> publication[Publicación]
```

{% include project-grid.liquid %}
