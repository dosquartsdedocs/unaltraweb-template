---
layout: manual-chapter
title: Figuras y diagramas
description: Un capitulo breve sobre pies de figura, activos Mermaid y callouts docentes.
lang: es
ref: manual-figures-diagrams
profiles: [unaltremanual]
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

Usa un bloque compacto tipo patchwork cuando varias imágenes Markdown deben leerse como una sola figura. `abc` coloca paneles en una sola fila, `/` abre una fila nueva y `+` sigue disponible cuando los separadores explícitos ayudan a leer la composición.

::: subfigures abc "Una composición en una sola fila con sintaxis compacta `abc`"
![Captura de software]({{ site.baseurl }}/assets/img/placeholders/manual-screenshot.svg "Captura de software")
![Placeholder de mapa]({{ site.baseurl }}/assets/img/placeholders/manual-map.svg "Placeholder de mapa")
![Diagrama conceptual]({{ site.baseurl }}/assets/img/placeholders/manual-diagram-card.svg "Diagrama conceptual")
:::

::: subfigures a+b/c "Una composición de dos filas con separadores explícitos"
![Estado de la interfaz]({{ site.baseurl }}/assets/img/placeholders/manual-screenshot.svg "Estado de la interfaz")
![Contexto espacial]({{ site.baseurl }}/assets/img/placeholders/manual-map.svg "Contexto espacial")
![Resumen conceptual]({{ site.baseurl }}/assets/img/placeholders/manual-diagram-card.svg "Resumen conceptual")
:::

## Mermaid y temas

Las figuras Mermaid tienen superficies adaptadas a los modos claro, oscuro y café.

La figura siguiente apunta a la fuente `.mmd` legible; la compilación sirve el SVG generado y lo envuelve con la superficie de diagrama del manual.

![Flujo de capítulo como fuente Mermaid]({{ site.baseurl }}/assets/diagrams/manual-flow.mmd "Una fuente Mermaid renderizada como SVG adaptado al tema")

### Diagramas editables

Mantén el archivo `.mmd` junto al SVG generado. Si el profesorado edita el SVG, se puede guardar como `.mmd.edited.svg`.
