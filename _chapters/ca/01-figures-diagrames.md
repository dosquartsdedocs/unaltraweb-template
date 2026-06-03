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

Fes servir un bloc compacte tipus patchwork quan diverses imatges Markdown han de llegir-se com una sola figura. `abc` posa panells en una sola fila, `/` obri una fila nova i `+` continua disponible quan els separadors explícits ajuden a llegir la composició.

::: subfigures abc "Una composició en una sola fila amb sintaxi compacta `abc`"
![Captura de programari]({{ site.baseurl }}/assets/img/placeholders/manual-screenshot.svg "Captura de programari")
![Placeholder de mapa]({{ site.baseurl }}/assets/img/placeholders/manual-map.svg "Placeholder de mapa")
![Diagrama conceptual]({{ site.baseurl }}/assets/img/placeholders/manual-diagram-card.svg "Diagrama conceptual")
:::

::: subfigures a+b/c "Una composició de dues files amb separadors explícits"
![Estat de la interfície]({{ site.baseurl }}/assets/img/placeholders/manual-screenshot.svg "Estat de la interfície")
![Context espacial]({{ site.baseurl }}/assets/img/placeholders/manual-map.svg "Context espacial")
![Resum conceptual]({{ site.baseurl }}/assets/img/placeholders/manual-diagram-card.svg "Resum conceptual")
:::

## Mermaid i temes

Les figures Mermaid tenen superfícies adaptades als modes clar, fosc i cafè.

La figura següent apunta a la font `.mmd` llegible; la compilació serveix l'SVG generat i l'embolcalla amb la superfície de diagrama del manual.

![Flux de capítol com a font Mermaid]({{ site.baseurl }}/assets/diagrams/manual-flow.mmd "Una font Mermaid renderitzada com a SVG adaptat al tema")

### Diagrames editables

Mantén el fitxer `.mmd` al costat de l'SVG generat. Si el professorat edita l'SVG, es pot guardar com `.mmd.edited.svg`.
