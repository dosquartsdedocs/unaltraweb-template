---
layout: manual-chapter
title: Figures i diagrames
description: Un capítol breu sobre peus de figura, actius Mermaid i callouts docents.
lang: ca
ref: manual-figures-diagrams
profiles: [unaltremanual]
permalink: /ca/chapters/figures-diagrames/
weight: 20
part: Producció
manual_references: false
mermaid:
  enabled: true
  zoomable: true
---

Els manuals combinen text, captures, figures i diagrames conceptuals.

>>> Els exemples resolts han de quedar ben separats del fil principal.

## Peus de figura

![Placeholder de captura]({{ site.baseurl }}/assets/img/placeholders/manual-screenshot.svg "Un placeholder de captura mostrat com a figura numerada")


## Composicions amb subfigures

Fes servir un bloc compacte tipus patchwork quan diverses imatges Markdown han de llegir-se com una sola figura.

::: subfigures a+b/c "Una composició de tres panells per a materials de manual"
![Captura de programari]({{ site.baseurl }}/assets/img/placeholders/manual-screenshot.svg "Captura de programari")
![Placeholder de mapa]({{ site.baseurl }}/assets/img/placeholders/manual-map.svg "Placeholder de mapa")
![Diagrama conceptual]({{ site.baseurl }}/assets/img/placeholders/manual-diagram-card.svg "Diagrama conceptual")
:::

## Mermaid i temes

Les figures Mermaid tenen superfícies adaptades als modes clar, fosc i cafè.

### Diagrames editables

Mantén el fitxer `.mmd` al costat de l'SVG generat. Si el professorat edita l'SVG, es pot guardar com `.mmd.edited.svg`.
