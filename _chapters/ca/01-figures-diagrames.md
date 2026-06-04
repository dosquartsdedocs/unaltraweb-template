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

Els manuals combinen text, placeholders neutres i diagrames que expliquen estructura, seqüència o planificació.

>>> Els exemples resolts han de quedar ben separats del fil principal.

## Peus de figura

El plugin de figures embolcalla les imatges Markdown en un element `figure` semàntic i afegeix etiquetes localitzades. El títol de la imatge es converteix en el peu.

```markdown
![Placeholder neutre](/assets/img/placeholders/neutral-landscape.svg "Un placeholder horitzontal mostrat com a figura numerada")
```

![Placeholder neutre]({{ site.baseurl }}/assets/img/placeholders/neutral-landscape.svg "Un placeholder horitzontal mostrat com a figura numerada")

## Composicions amb subfigures

Fes servir un bloc compacte tipus patchwork quan diverses imatges Markdown han de llegir-se com una sola figura. `a+b+c` posa panells en una sola fila, `/` obri una fila nova i atributs com `width` o `height` ajusten un panell concret.

```markdown
::: subfigures a+b+c "Tres panells verticals en una fila"
![Panell A](/assets/img/placeholders/neutral-portrait.svg "Panell A"){: width="72%" }
![Panell B](/assets/img/placeholders/neutral-portrait.svg "Panell B"){: width="72%" }
![Panell C](/assets/img/placeholders/neutral-portrait.svg "Panell C"){: width="72%" }
:::
```

::: subfigures a+b+c "Tres placeholders verticals juxtaposats amb `a+b+c`"
![Panell vertical A]({{ site.baseurl }}/assets/img/placeholders/neutral-portrait.svg "Panell vertical A"){: width="72%" }
![Panell vertical B]({{ site.baseurl }}/assets/img/placeholders/neutral-portrait.svg "Panell vertical B"){: width="72%" }
![Panell vertical C]({{ site.baseurl }}/assets/img/placeholders/neutral-portrait.svg "Panell vertical C"){: width="72%" }
:::

Els panells horitzontals sovint es llegeixen millor com a files separades, sobretot quan la columna de text és estreta.

```markdown
::: subfigures a/b "Dos panells horitzontals apilats"
![Horitzontal A](/assets/img/placeholders/neutral-landscape.svg "Horitzontal A")
![Horitzontal B](/assets/img/placeholders/neutral-landscape.svg "Horitzontal B")
:::
```

::: subfigures a/b "Dos placeholders horitzontals apilats amb `a/b`"
![Panell horitzontal A]({{ site.baseurl }}/assets/img/placeholders/neutral-landscape.svg "Panell horitzontal A")
![Panell horitzontal B]({{ site.baseurl }}/assets/img/placeholders/neutral-landscape.svg "Panell horitzontal B")
:::

## Fonts Mermaid

La reescriptura `.mmd` manté fonts Mermaid llegibles al repositori i permet servir SVG. Els SVG es renderitzen amb l'estil compartit de `diavisuals` executant `make diagrams DIAVISUALS_DIR=../diavisuals`.

```markdown
![Flux de capítol](/assets/diagrams/manual-flow.mmd "Una font Mermaid renderitzada com a SVG amb diavisuals")
```

![Flux de capítol com a font Mermaid]({{ site.baseurl }}/assets/diagrams/manual-flow.mmd "Una font Mermaid renderitzada com a SVG amb diavisuals")

### Diagrames D'Estructura

Usa diagrames de flux per a pipelines de construcció, decisions o estructura de repositori. Un arbre de fitxers és simplement un flux de dalt a baix amb carpetes i fitxers com a nodes.

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

::: subfigures a/b "Diagrames d'estructura horitzontals apilats amb `a/b`"
![Diagrama de flux]({{ site.baseurl }}/assets/diagrams/diavisuals/flowchart.mmd "Diagrama de flux d'un pipeline de construcció")
![Arbre de fitxers]({{ site.baseurl }}/assets/diagrams/diavisuals/file-tree.mmd "Arbre de fitxers i carpetes com a flowchart Mermaid")
:::

### Interacció I Temps

Usa un diagrama de seqüència quan la pregunta important és qui parla amb qui. Usa Gantt o una línia de temps quan la pregunta important és quan passa cada cosa.

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

![Diagrama de seqüència]({{ site.baseurl }}/assets/diagrams/diavisuals/sequence.mmd "Diagrama de seqüència d'un flux d'autoria")

::: subfigures a/b "Diagrames temporals apilats amb `a/b`"
![Gantt]({{ site.baseurl }}/assets/diagrams/diavisuals/gantt.mmd "Diagrama de Gantt per a treball programat")
![Línia de temps]({{ site.baseurl }}/assets/diagrams/diavisuals/timeline.mmd "Línia de temps per a esdeveniments datats")
:::

### Models I Estat

Els diagrames de classes, entitat-relació i estats solen ser més alts que amples. Juxtaposar-los amb `a+b+c` conserva la comparació sense forçar una sola columna molt alta.

```markdown
::: subfigures a+b+c "Diagrames de model verticals"
![Classes](/assets/diagrams/diavisuals/class.mmd "Diagrama de classes"){: width="82%" }
![Entitat-relació](/assets/diagrams/diavisuals/er.mmd "Diagrama entitat-relació"){: width="68%" }
![Estats](/assets/diagrams/diavisuals/state.mmd "Diagrama d'estats"){: width="78%" }
:::
```

::: subfigures a+b+c "Diagrames de model verticals juxtaposats amb `a+b+c`"
![Classes]({{ site.baseurl }}/assets/diagrams/diavisuals/class.mmd "Diagrama de classes per a conceptes de programari"){: width="82%" }
![Entitat-relació]({{ site.baseurl }}/assets/diagrams/diavisuals/er.mmd "Diagrama entitat-relació per a taules de dades"){: width="68%" }
![Estats]({{ site.baseurl }}/assets/diagrams/diavisuals/state.mmd "Diagrama d'estats per a regles de cicle de vida"){: width="78%" }
:::

### Diagrames De Posicionament

Usa un quadrant quan l'objectiu és situar opcions o comparar prioritats, no mostrar valors numèrics precisos.

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

![Quadrant]({{ site.baseurl }}/assets/diagrams/diavisuals/quadrant.mmd "Quadrant per seleccionar un tipus de diagrama")

### Diagrames Editables

Mantén el fitxer `.mmd` al costat de l'SVG generat. Si el professorat edita l'SVG, es pot guardar com `.mmd.edited.svg`.
