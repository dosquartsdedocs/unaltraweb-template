---
title: Markdown syntax sugar
description: Creative shorthand for callouts, figures, tables, subfigures and Mermaid diagrams.
lang: en
ref: software_markdown_syntax_sugar
profiles: [unaltredocs]
section: Standards
weight: 240
permalink: /en/docs/markdown-syntax-sugar/
mermaid:
  enabled: true
  zoomable: false
---

`unaltraweb` keeps authoring close to ordinary Markdown. The extra syntax below is intentionally small: authors write readable text, and the core turns repeated academic patterns into structured HTML.

## Callout shorthand

Nested blockquotes become teaching callouts. A single `>` remains a normal quotation; deeper levels select the callout type.

```markdown
>> A note or tip.

>>> A worked example.

>>>> A warning.

>>>>> Learning objectives.

>>>>>> A caution or danger note.
```

>> A note or tip.

>>> A worked example.

>>>> A warning.

>>>>> Learning objectives.

>>>>>> A caution or danger note.

The labels come from `_data/i18n/*.yml`, so the same Markdown renders as `NOTE`, `NOTA`, `OBJECTIUS D'APRENENTATGE`, and so on depending on the page language.

## Numbered figures

Markdown images in configured collections become semantic figures with localized numbering. The image title becomes the caption; if no title exists, the alt text is reused.

```markdown
![Neutral placeholder](/assets/img/placeholders/neutral-landscape.svg "A reusable landscape placeholder")
```

![Neutral placeholder]({{ site.baseurl }}/assets/img/placeholders/neutral-landscape.svg "A reusable landscape placeholder")

## Numbered tables

Use a `table` block when a Markdown table needs a caption and its own counter.

```markdown
::: table "Shortcut summary"
| Syntax | Renderer | Result |
| --- | --- | --- |
| `>>` | `callouts.js` | Themed callout |
| `::: table` | `figure_captions.rb` | Numbered table |
:::
```

::: table "Shortcut summary"
| Syntax | Renderer | Result |
| --- | --- | --- |
| `>>` | `callouts.js` | Themed callout |
| `::: table` | `figure_captions.rb` | Numbered table |
:::

## Subfigure compositions

Subfigures use one compact block. The layout string can use compact row labels such as `abc`, `/` for rows, and `+` when explicit panel separators are clearer. Image attributes such as `{: width="70%" }` or `{: height="12rem" }` also work inside subfigures; they size that panel instead of forcing every item in a row to the same visual weight.

```markdown
::: subfigures a+b+c "Three portrait panels in one row"
![Panel A](/assets/img/placeholders/neutral-portrait.svg "Panel A"){: width="72%" }
![Panel B](/assets/img/placeholders/neutral-portrait.svg "Panel B"){: width="72%" }
![Panel C](/assets/img/placeholders/neutral-portrait.svg "Panel C"){: width="72%" }
:::
```

::: subfigures a+b+c "Three portrait panels in one row"
![Panel A]({{ site.baseurl }}/assets/img/placeholders/neutral-portrait.svg "Panel A"){: width="72%" }
![Panel B]({{ site.baseurl }}/assets/img/placeholders/neutral-portrait.svg "Panel B"){: width="72%" }
![Panel C]({{ site.baseurl }}/assets/img/placeholders/neutral-portrait.svg "Panel C"){: width="72%" }
:::

::: subfigures a/b "Two landscape panels stacked as rows"
![Landscape A]({{ site.baseurl }}/assets/img/placeholders/neutral-landscape.svg "Landscape A")
![Landscape B]({{ site.baseurl }}/assets/img/placeholders/neutral-landscape.svg "Landscape B")
:::

## Mermaid fences

Pages that set `mermaid.enabled: true` can keep quick sketches inline as fenced code blocks. Use `.mmd` sources for reproducible figures rendered with `diavisuals`.

````markdown
```mermaid
flowchart LR
  md[Markdown] --> build[Jekyll build]
  build --> html[Documented page]
```
````

```mermaid
flowchart LR
  md[Markdown] --> build[Jekyll build]
  build --> html[Documented page]
```

## Mermaid source files as SVG figures

When an image points to a `.mmd` source, the core rewrites it to `.mmd.edited.svg` if that file exists, otherwise to `.mmd.svg`. Authors can keep the Mermaid source readable while serving the generated or hand-edited SVG. Run `make diagrams DIAVISUALS_DIR=../diavisuals` to render these examples with the shared style package.

```markdown
![Chapter workflow](/assets/diagrams/manual-flow.mmd "Chapter workflow")
```

![Chapter workflow]({{ site.baseurl }}/assets/diagrams/manual-flow.mmd "Chapter workflow rendered through diavisuals")

Use `a/b` when landscape diagrams need the full text column.

```markdown
::: subfigures a/b "Structure diagrams"
![Flowchart](/assets/diagrams/diavisuals/flowchart.mmd "Flowchart")
![File tree](/assets/diagrams/diavisuals/file-tree.mmd "File tree")
:::
```

::: subfigures a/b "Structure diagrams rendered with the shared `diavisuals` style"
![Flowchart]({{ site.baseurl }}/assets/diagrams/diavisuals/flowchart.mmd "Flowchart")
![File tree]({{ site.baseurl }}/assets/diagrams/diavisuals/file-tree.mmd "File and folder tree")
:::

Use `a+b+c` when vertical diagrams should be compared side by side.

::: subfigures a+b+c "Vertical model diagrams rendered with the shared `diavisuals` style"
![Class]({{ site.baseurl }}/assets/diagrams/diavisuals/class.mmd "Class diagram"){: width="82%" }
![Entity relationship]({{ site.baseurl }}/assets/diagrams/diavisuals/er.mmd "Entity relationship diagram"){: width="68%" }
![State]({{ site.baseurl }}/assets/diagrams/diavisuals/state.mmd "State diagram"){: width="78%" }
:::

Use standalone figures when the diagram is a full explanation rather than a panel in a comparison.

````markdown
```mermaid
quadrantChart
  title Diagram selection guide
  x-axis Static structure --> Time dependent
  y-axis Local detail --> Project overview
```
````

![Quadrant chart]({{ site.baseurl }}/assets/diagrams/diavisuals/quadrant.mmd "Quadrant chart for selecting a diagram type")

## Why this is deliberate

These shortcuts are creative but conservative. They avoid large bespoke components, preserve readable source files and make academic patterns repeatable across personal sites, project sites, manuals and technical documentation.
