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

Los manuales combinan texto, placeholders neutros y diagramas que explican estructura, secuencia o planificación.

>>> Los ejemplos resueltos deben quedar bien separados del hilo principal.

## Pies de figura

El plugin de figuras envuelve las imágenes Markdown en un elemento `figure` semántico y añade etiquetas localizadas. El título de la imagen se convierte en el pie.

```markdown
![Placeholder neutro](/assets/img/placeholders/neutral-landscape.svg "Un placeholder horizontal mostrado como figura numerada")
```

![Placeholder neutro]({{ site.baseurl }}/assets/img/placeholders/neutral-landscape.svg "Un placeholder horizontal mostrado como figura numerada")

## Composiciones con subfiguras

Usa un bloque compacto tipo patchwork cuando varias imágenes Markdown deben leerse como una sola figura. `a+b+c` coloca paneles en una sola fila, `/` abre una fila nueva y atributos como `width` o `height` ajustan un panel concreto.

```markdown
::: subfigures a+b+c "Tres paneles verticales en una fila"
![Panel A](/assets/img/placeholders/neutral-portrait.svg "Panel A"){: width="72%" }
![Panel B](/assets/img/placeholders/neutral-portrait.svg "Panel B"){: width="72%" }
![Panel C](/assets/img/placeholders/neutral-portrait.svg "Panel C"){: width="72%" }
:::
```

::: subfigures a+b+c "Tres placeholders verticales yuxtapuestos con `a+b+c`"
![Panel vertical A]({{ site.baseurl }}/assets/img/placeholders/neutral-portrait.svg "Panel vertical A"){: width="72%" }
![Panel vertical B]({{ site.baseurl }}/assets/img/placeholders/neutral-portrait.svg "Panel vertical B"){: width="72%" }
![Panel vertical C]({{ site.baseurl }}/assets/img/placeholders/neutral-portrait.svg "Panel vertical C"){: width="72%" }
:::

Los paneles horizontales suelen leerse mejor como filas separadas, sobre todo cuando la columna de texto es estrecha.

```markdown
::: subfigures a/b "Dos paneles horizontales apilados"
![Horizontal A](/assets/img/placeholders/neutral-landscape.svg "Horizontal A")
![Horizontal B](/assets/img/placeholders/neutral-landscape.svg "Horizontal B")
:::
```

::: subfigures a/b "Dos placeholders horizontales apilados con `a/b`"
![Panel horizontal A]({{ site.baseurl }}/assets/img/placeholders/neutral-landscape.svg "Panel horizontal A")
![Panel horizontal B]({{ site.baseurl }}/assets/img/placeholders/neutral-landscape.svg "Panel horizontal B")
:::

## Fuentes Mermaid

La reescritura `.mmd` mantiene fuentes Mermaid legibles en el repositorio y permite servir SVG. Los SVG se renderizan con el estilo compartido de `diavisuals` ejecutando `make diagrams DIAVISUALS_DIR=../diavisuals`.

```markdown
![Flujo de capítulo](/assets/diagrams/manual-flow.mmd "Una fuente Mermaid renderizada como SVG con diavisuals")
```

![Flujo de capítulo como fuente Mermaid]({{ site.baseurl }}/assets/diagrams/manual-flow.mmd "Una fuente Mermaid renderizada como SVG con diavisuals")

### Diagramas De Estructura

Usa diagramas de flujo para pipelines de construcción, decisiones o estructura de repositorio. Un árbol de archivos es simplemente un flujo de arriba abajo con carpetas y archivos como nodos.

````markdown
```mermaid
flowchart TD
  site[unaltraweb-template/]
  site --> docs[_documentation/]
  site --> diagrams[assets/diagrams/]
  diagrams --> sources[diavisuals/*.mmd]
  diagrams --> rendered[*.mmd.svg]
```
````

::: subfigures a/b "Diagramas de estructura horizontales apilados con `a/b`"
![Diagrama de flujo]({{ site.baseurl }}/assets/diagrams/diavisuals/flowchart.mmd "Diagrama de flujo de un pipeline de construcción")
![Árbol de archivos]({{ site.baseurl }}/assets/diagrams/diavisuals/file-tree.mmd "Árbol de archivos y carpetas como flowchart Mermaid")
:::

### Interacción Y Tiempo

Usa un diagrama de secuencia cuando la pregunta importante es quién habla con quién. Usa Gantt o una línea de tiempo cuando la pregunta importante es cuándo pasa cada cosa.

````markdown
```mermaid
sequenceDiagram
  actor Author
  participant Template
  participant Diavisuals
  Author->>Template: edit diagram.mmd
  Template->>Diavisuals: apply shared style
```
````

![Diagrama de secuencia]({{ site.baseurl }}/assets/diagrams/diavisuals/sequence.mmd "Diagrama de secuencia de un flujo de autoría")

::: subfigures a/b "Diagramas temporales apilados con `a/b`"
![Gantt]({{ site.baseurl }}/assets/diagrams/diavisuals/gantt.mmd "Diagrama de Gantt para trabajo programado")
![Línea de tiempo]({{ site.baseurl }}/assets/diagrams/diavisuals/timeline.mmd "Línea de tiempo para eventos fechados")
:::

### Modelos Y Estado

Los diagramas de clases, entidad-relación y estados suelen ser más altos que anchos. Yuxtaponerlos con `a+b+c` conserva la comparación sin forzar una sola columna muy alta.

```markdown
::: subfigures a+b+c "Diagramas de modelo verticales"
![Clases](/assets/diagrams/diavisuals/class.mmd "Diagrama de clases"){: width="82%" }
![Entidad-relación](/assets/diagrams/diavisuals/er.mmd "Diagrama entidad-relación"){: width="68%" }
![Estados](/assets/diagrams/diavisuals/state.mmd "Diagrama de estados"){: width="78%" }
:::
```

::: subfigures a+b+c "Diagramas de modelo verticales yuxtapuestos con `a+b+c`"
![Clases]({{ site.baseurl }}/assets/diagrams/diavisuals/class.mmd "Diagrama de clases para conceptos de software"){: width="82%" }
![Entidad-relación]({{ site.baseurl }}/assets/diagrams/diavisuals/er.mmd "Diagrama entidad-relación para tablas de datos"){: width="68%" }
![Estados]({{ site.baseurl }}/assets/diagrams/diavisuals/state.mmd "Diagrama de estados para reglas de ciclo de vida"){: width="78%" }
:::

### Diagramas De Posicionamiento

Usa un cuadrante cuando el objetivo es situar opciones o comparar prioridades, no mostrar valores numéricos precisos.

````markdown
```mermaid
quadrantChart
  title Diagram selection guide
  x-axis Static structure --> Time dependent
  y-axis Local detail --> Project overview
  File tree: [0.22, 0.30]
  Timeline: [0.76, 0.84]
```
````

![Cuadrante]({{ site.baseurl }}/assets/diagrams/diavisuals/quadrant.mmd "Cuadrante para seleccionar un tipo de diagrama")

### Diagramas Editables

Mantén el archivo `.mmd` junto al SVG generado. Si el profesorado edita el SVG, se puede guardar como `.mmd.edited.svg`.
