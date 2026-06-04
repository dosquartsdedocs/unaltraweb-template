---
title: Azúcar sintáctico en Markdown
description: Atajos creativos para avisos, figuras, tablas, subfiguras y diagramas Mermaid.
lang: es
ref: software_markdown_syntax_sugar
profiles: [unaltredocs]
section: Estándares
weight: 240
permalink: /es/docs/azucar-sintactico/
mermaid:
  enabled: true
  zoomable: false
---

`unaltraweb` mantiene la autoría cerca del Markdown ordinario. La sintaxis adicional es pequeña a propósito: quien escribe conserva un texto legible y el núcleo convierte patrones académicos repetidos en HTML estructurado.

## Atajo para avisos

Las citas Markdown anidadas se convierten en avisos docentes. Un solo `>` sigue siendo una cita normal; los niveles más profundos seleccionan el tipo de aviso.

```markdown
>> Una nota o consejo.

>>> Un ejemplo resuelto.

>>>> Una advertencia.

>>>>> Objetivos de aprendizaje.

>>>>>> Una nota de precaución o peligro.
```

>> Una nota o consejo.

>>> Un ejemplo resuelto.

>>>> Una advertencia.

>>>>> Objetivos de aprendizaje.

>>>>>> Una nota de precaución o peligro.

Las etiquetas salen de `_data/i18n/*.yml`, así que el mismo Markdown se renderiza como `NOTE`, `NOTA`, `OBJECTIUS D'APRENENTATGE`, etc. según la lengua de la página.

## Figuras numeradas

Las imágenes Markdown en las colecciones configuradas se convierten en figuras semánticas con numeración localizada. El título de la imagen pasa a ser el pie; si no hay título, se reutiliza el texto alternativo.

```markdown
![Placeholder neutro](/assets/img/placeholders/neutral-landscape.svg "Un placeholder horizontal reutilizable")
```

![Placeholder neutro]({{ site.baseurl }}/assets/img/placeholders/neutral-landscape.svg "Un placeholder horizontal reutilizable")

## Tablas numeradas

Usa un bloque `table` cuando una tabla Markdown necesite pie y contador propio.

```markdown
::: table "Resumen de atajos"
| Sintaxis | Renderizador | Resultado |
| --- | --- | --- |
| `>>` | `callouts.js` | Aviso con tema |
| `::: table` | `figure_captions.rb` | Tabla numerada |
:::
```

::: table "Resumen de atajos"
| Sintaxis | Renderizador | Resultado |
| --- | --- | --- |
| `>>` | `callouts.js` | Aviso con tema |
| `::: table` | `figure_captions.rb` | Tabla numerada |
:::

## Composiciones con subfiguras

Las subfiguras usan un bloque compacto. La cadena de composición puede usar filas compactas como `abc`, `/` para filas y `+` cuando los separadores explícitos hacen más clara la composición. Los atributos de imagen como `{: width="70%" }` o `{: height="12rem" }` también funcionan dentro de subfiguras; dimensionan ese panel sin obligar a todos los elementos de una fila a tener el mismo peso visual.

```markdown
::: subfigures a+b+c "Tres paneles verticales en una fila"
![Panel A](/assets/img/placeholders/neutral-portrait.svg "Panel A"){: width="72%" }
![Panel B](/assets/img/placeholders/neutral-portrait.svg "Panel B"){: width="72%" }
![Panel C](/assets/img/placeholders/neutral-portrait.svg "Panel C"){: width="72%" }
:::
```

::: subfigures a+b+c "Tres paneles verticales en una fila"
![Panel A]({{ site.baseurl }}/assets/img/placeholders/neutral-portrait.svg "Panel A"){: width="72%" }
![Panel B]({{ site.baseurl }}/assets/img/placeholders/neutral-portrait.svg "Panel B"){: width="72%" }
![Panel C]({{ site.baseurl }}/assets/img/placeholders/neutral-portrait.svg "Panel C"){: width="72%" }
:::

::: subfigures a/b "Dos paneles horizontales apilados"
![Horizontal A]({{ site.baseurl }}/assets/img/placeholders/neutral-landscape.svg "Horizontal A")
![Horizontal B]({{ site.baseurl }}/assets/img/placeholders/neutral-landscape.svg "Horizontal B")
:::

## Bloques Mermaid

Las páginas con `mermaid.enabled: true` pueden mantener bocetos rápidos en bloques de código. Usa fuentes `.mmd` para figuras reproducibles renderizadas con `diavisuals`.

````markdown
```mermaid
flowchart LR
  md[Markdown] --> build[Construcción Jekyll]
  build --> html[Página documentada]
```
````

```mermaid
flowchart LR
  md[Markdown] --> build[Construcción Jekyll]
  build --> html[Página documentada]
```

## Fuentes Mermaid como figuras SVG

Cuando una imagen apunta a una fuente `.mmd`, el núcleo la reescribe a `.mmd.edited.svg` si ese archivo existe; si no, usa `.mmd.svg`. Así se conserva la fuente Mermaid legible y se sirve el SVG generado o editado a mano. Ejecuta `make diagrams DIAVISUALS_DIR=../diavisuals` para renderizar estos ejemplos con el estilo compartido.

```markdown
![Flujo de capítulo](/assets/diagrams/manual-flow.mmd "Flujo de capítulo")
```

![Flujo de capítulo]({{ site.baseurl }}/assets/diagrams/manual-flow.mmd "Flujo de capítulo renderizado con diavisuals")

Usa `a/b` cuando los diagramas horizontales necesitan toda la columna de texto.

```markdown
::: subfigures a/b "Diagramas de estructura"
![Diagrama de flujo](/assets/diagrams/diavisuals/flowchart.mmd "Diagrama de flujo")
![Árbol de archivos](/assets/diagrams/diavisuals/file-tree.mmd "Árbol de archivos")
:::
```

::: subfigures a/b "Diagramas de estructura renderizados con el estilo compartido de `diavisuals`"
![Diagrama de flujo]({{ site.baseurl }}/assets/diagrams/diavisuals/flowchart.mmd "Diagrama de flujo")
![Árbol de archivos]({{ site.baseurl }}/assets/diagrams/diavisuals/file-tree.mmd "Árbol de archivos y carpetas")
:::

Usa `a+b+c` cuando los diagramas verticales deben compararse lado a lado.

::: subfigures a+b+c "Diagramas de modelo verticales renderizados con el estilo compartido de `diavisuals`"
![Clases]({{ site.baseurl }}/assets/diagrams/diavisuals/class.mmd "Diagrama de clases"){: width="82%" }
![Entidad-relación]({{ site.baseurl }}/assets/diagrams/diavisuals/er.mmd "Diagrama entidad-relación"){: width="68%" }
![Estados]({{ site.baseurl }}/assets/diagrams/diavisuals/state.mmd "Diagrama de estados"){: width="78%" }
:::

Usa figuras independientes cuando el diagrama es una explicación completa y no un panel de una comparación.

````markdown
```mermaid
quadrantChart
  title Diagram selection guide
  x-axis Static structure --> Time dependent
  y-axis Local detail --> Project overview
```
````

![Cuadrante]({{ site.baseurl }}/assets/diagrams/diavisuals/quadrant.mmd "Cuadrante para seleccionar un tipo de diagrama")

## Por qué es deliberado

Estos atajos son creativos pero conservadores. Evitan componentes grandes a medida, mantienen legibles los archivos fuente y hacen repetibles patrones académicos en sitios personales, sitios de proyecto, manuales y documentación técnica.
