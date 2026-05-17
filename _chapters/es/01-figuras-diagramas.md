---
layout: manual-chapter
title: Figuras y diagramas
description: Un capitulo breve sobre pies de figura, activos Mermaid y callouts docentes.
lang: es
ref: manual-figures-diagrams
profiles: [manual]
permalink: /es/chapters/figuras-diagramas/
weight: 20
part: Produccion
manual_references: false
mermaid:
  enabled: true
  zoomable: true
---

Los manuales combinan texto, capturas, figuras y diagramas conceptuales.

>>> Los ejemplos resueltos deben quedar bien separados del hilo principal.

## Pies de figura

![Placeholder de captura]({{ site.baseurl }}/assets/img/placeholders/manual-screenshot.svg "Un placeholder de captura mostrado como figura numerada")


## Composiciones con subfiguras

Usa un bloque compacto tipo patchwork cuando varias imágenes Markdown deben leerse como una sola figura.

::: subfigures a+b/c "Una composición de tres paneles para materiales de manual"
![Captura de software]({{ site.baseurl }}/assets/img/placeholders/manual-screenshot.svg "Captura de software")
![Placeholder de mapa]({{ site.baseurl }}/assets/img/placeholders/manual-map.svg "Placeholder de mapa")
![Diagrama conceptual]({{ site.baseurl }}/assets/img/placeholders/manual-diagram-card.svg "Diagrama conceptual")
:::

## Mermaid y temas

Las figuras Mermaid tienen superficies adaptadas a los modos claro, oscuro y café.

### Diagramas editables

Mantén el archivo `.mmd` junto al SVG generado. Si el profesorado edita el SVG, se puede guardar como `.mmd.edited.svg`.
