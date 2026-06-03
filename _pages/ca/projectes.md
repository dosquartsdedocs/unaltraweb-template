---
layout: page
title: Projectes
lang: ca
ref: projects
profiles: [unaltreselfie]
feature: projects
permalink: /ca/projectes/
nav: true
nav_order: 5
figure_captions: true
mermaid:
  enabled: true
  zoomable: false
---

Usa `_projects/` per a projectes de recerca, programari, datasets, laboratoris o iniciatives de llarg recorregut.

::: subfigures abc "Un exemple de subfigures en una sola fila per a una pàgina personal de recerca"
![Interfície del projecte]({{ site.baseurl }}/assets/img/placeholders/manual-screenshot.svg "Interfície del projecte")
![Mapa d'estudi]({{ site.baseurl }}/assets/img/placeholders/manual-map.svg "Mapa d'estudi")
![Diagrama metodològic]({{ site.baseurl }}/assets/img/placeholders/manual-diagram-card.svg "Diagrama metodològic")
:::

```mermaid
flowchart LR
  idea[Idea de recerca] --> page[Pàgina de projecte]
  page --> output[Resultat reutilitzable]
  output --> publication[Publicació]
```

{% include project-grid.liquid %}
