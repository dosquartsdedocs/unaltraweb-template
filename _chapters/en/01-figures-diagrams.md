---
layout: manual-chapter
title: Figures and diagrams
description: A short chapter about figure captions, Mermaid assets and teaching callouts.
lang: en
ref: manual-figures-diagrams
profiles: [unaltremanual]
permalink: /en/chapters/figures-diagrams/
weight: 20
part: Production
manual_references: false
mermaid:
  enabled: true
  zoomable: true
---

Manual chapters often mix prose, neutral placeholders and diagrams that explain structure, sequence or planning.

>>> Worked examples should stand apart from the main flow without becoming a decorative component.

## Figure captions

The figure plugin wraps Markdown images in a semantic `figure` element and adds localized labels. The image title becomes the caption.

```markdown
![Neutral placeholder](/assets/img/placeholders/neutral-landscape.svg "A reusable landscape placeholder rendered as a numbered figure")
```

![Neutral placeholder]({{ site.baseurl }}/assets/img/placeholders/neutral-landscape.svg "A reusable landscape placeholder rendered as a numbered figure")

## Subfigure compositions

Use a compact patchwork-style block when several Markdown images need to read as one figure. `a+b+c` places panels in one row, `/` starts a new row, and image attributes such as `width` or `height` tune a specific panel.

```markdown
::: subfigures a+b+c "Three portrait panels in one row"
![Panel A](/assets/img/placeholders/neutral-portrait.svg "Panel A"){: width="72%" }
![Panel B](/assets/img/placeholders/neutral-portrait.svg "Panel B"){: width="72%" }
![Panel C](/assets/img/placeholders/neutral-portrait.svg "Panel C"){: width="72%" }
:::
```

::: subfigures a+b+c "Three portrait placeholders juxtaposed with `a+b+c`"
![Portrait panel A]({{ site.baseurl }}/assets/img/placeholders/neutral-portrait.svg "Portrait panel A"){: width="72%" }
![Portrait panel B]({{ site.baseurl }}/assets/img/placeholders/neutral-portrait.svg "Portrait panel B"){: width="72%" }
![Portrait panel C]({{ site.baseurl }}/assets/img/placeholders/neutral-portrait.svg "Portrait panel C"){: width="72%" }
:::

Landscape panels often read better as separate rows, especially when the page column is narrow.

```markdown
::: subfigures a/b "Two landscape panels stacked as rows"
![Landscape A](/assets/img/placeholders/neutral-landscape.svg "Landscape A")
![Landscape B](/assets/img/placeholders/neutral-landscape.svg "Landscape B")
:::
```

::: subfigures a/b "Two landscape placeholders stacked with `a/b`"
![Landscape panel A]({{ site.baseurl }}/assets/img/placeholders/neutral-landscape.svg "Landscape panel A")
![Landscape panel B]({{ site.baseurl }}/assets/img/placeholders/neutral-landscape.svg "Landscape panel B")
:::

## Mermaid sources

The `.mmd` rewrite keeps Mermaid sources readable in the repository while allowing the site to serve SVG output. The SVGs are rendered with the shared `diavisuals` style by running `make diagrams DIAVISUALS_DIR=../diavisuals`.

```markdown
![Chapter workflow](/assets/diagrams/manual-flow.mmd "A Mermaid source rendered as SVG through diavisuals")
```

![Chapter workflow as Mermaid source]({{ site.baseurl }}/assets/diagrams/manual-flow.mmd "A Mermaid source rendered as SVG through diavisuals")

### Structure Diagrams

Use flowcharts for build pipelines, decisions or repository structure. A file tree is just a top-down flowchart with folders and files as nodes.

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

::: subfigures a/b "Landscape structure diagrams stacked with `a/b`"
![Build flowchart]({{ site.baseurl }}/assets/diagrams/diavisuals/flowchart.mmd "Flowchart for a build pipeline")
![File tree]({{ site.baseurl }}/assets/diagrams/diavisuals/file-tree.mmd "File and folder tree as a top-down Mermaid flowchart")
:::

### Interaction And Time

Use a sequence diagram when the important question is who talks to whom. Use a Gantt chart or timeline when the important question is when something happens.

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

![Sequence diagram]({{ site.baseurl }}/assets/diagrams/diavisuals/sequence.mmd "Sequence diagram for an authoring workflow")

::: subfigures a/b "Time-oriented diagrams stacked with `a/b`"
![Gantt]({{ site.baseurl }}/assets/diagrams/diavisuals/gantt.mmd "Gantt diagram for scheduled work")
![Timeline]({{ site.baseurl }}/assets/diagrams/diavisuals/timeline.mmd "Timeline diagram for dated events")
:::

### Models And State

Class, entity-relationship and state diagrams are usually taller than they are wide. Juxtaposing them with `a+b+c` keeps the comparison visible without forcing a single tall column.

```markdown
::: subfigures a+b+c "Vertical model diagrams"
![Class](/assets/diagrams/diavisuals/class.mmd "Class diagram"){: width="82%" }
![Entity relationship](/assets/diagrams/diavisuals/er.mmd "Entity relationship diagram"){: width="68%" }
![State](/assets/diagrams/diavisuals/state.mmd "State diagram"){: width="78%" }
:::
```

::: subfigures a+b+c "Vertical model diagrams juxtaposed with `a+b+c`"
![Class]({{ site.baseurl }}/assets/diagrams/diavisuals/class.mmd "Class diagram for software concepts"){: width="82%" }
![Entity relationship]({{ site.baseurl }}/assets/diagrams/diavisuals/er.mmd "Entity relationship diagram for data tables"){: width="68%" }
![State]({{ site.baseurl }}/assets/diagrams/diavisuals/state.mmd "State diagram for lifecycle rules"){: width="78%" }
:::

### Positioning Diagrams

Use a quadrant chart when the goal is to position options or compare priorities, not to show precise numeric values.

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

![Quadrant chart]({{ site.baseurl }}/assets/diagrams/diavisuals/quadrant.mmd "Quadrant chart for selecting a diagram type")

### Editable diagram files

Keep the `.mmd` source next to the generated SVG. If a teacher edits the SVG by hand, save it as `.mmd.edited.svg` and it will be preferred.
