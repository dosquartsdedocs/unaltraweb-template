---
layout: page
title: Recursos
description: Resultats, repositoris, lectures i materials reutilitzables del projecte.
lang: ca
ref: resources
profiles: [unaltreprojecte]
permalink: /ca/recursos/
nav: true
nav_order: 6
dropdown: true
figure_captions: true
mermaid:
  enabled: true
  zoomable: false
children:
  - title: Resultats
    permalink: /ca/resultats/
  - title: Repositoris
    permalink: /ca/repositoris/
  - title: Lectures
    permalink: /ca/lectures/
---

Aquesta pàgina agrupa els materials reutilitzables que un lloc de projecte sol necessitar quan la narrativa principal ja està definida.

::: subfigures ab/cd "Un exemple de subfigures en dues files per a recursos de projecte"
![Resultat de dades]({{ site.baseurl }}/assets/img/placeholders/manual-screenshot.svg "Resultat de dades")
![Producte cartogràfic]({{ site.baseurl }}/assets/img/placeholders/manual-map.svg "Producte cartogràfic")
![Flux del repositori]({{ site.baseurl }}/assets/img/placeholders/manual-diagram-card.svg "Flux del repositori")
![Notes de lectura]({{ site.baseurl }}/assets/img/placeholders/manual-screenshot.svg "Notes de lectura")
:::

```mermaid
sequenceDiagram
  participant Equip
  participant Repositori
  participant Web
  Equip->>Repositori: publica material reutilitzable
  Repositori->>Web: exposa enllaços de recursos
  Web-->>Equip: manté els resultats localitzables
```

| Recurs | Per a què serveix |
|---|---|
| [Resultats]({{ '/ca/resultats/' | relative_url }}) | Dades, mapes, informes, programari i productes de recerca reutilitzables. |
| [Repositoris]({{ '/ca/repositoris/' | relative_url }}) | Organitzacions de GitHub, repositoris de codi i enllaços d'infraestructura. |
| [Lectures]({{ '/ca/lectures/' | relative_url }}) | Llibres anotats, manuals i notes internes de lectura. |
