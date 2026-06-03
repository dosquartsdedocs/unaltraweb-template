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
![Software screenshot](/assets/img/placeholders/manual-screenshot.svg "A reusable screenshot placeholder")
```

![Software screenshot]({{ site.baseurl }}/assets/img/placeholders/manual-screenshot.svg "A reusable screenshot placeholder")

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

Subfigures use one compact block. The layout string can use compact row labels such as `abc`, `/` for rows, and `+` when explicit panel separators are clearer.

```markdown
::: subfigures abc "Three panels in one row"
![Interface](/assets/img/placeholders/manual-screenshot.svg "Interface")
![Map](/assets/img/placeholders/manual-map.svg "Map")
![Diagram](/assets/img/placeholders/manual-diagram-card.svg "Diagram")
:::
```

::: subfigures abc "Three panels in one row"
![Interface]({{ site.baseurl }}/assets/img/placeholders/manual-screenshot.svg "Interface")
![Map]({{ site.baseurl }}/assets/img/placeholders/manual-map.svg "Map")
![Diagram]({{ site.baseurl }}/assets/img/placeholders/manual-diagram-card.svg "Diagram")
:::

::: subfigures a+b/c "Two-row composition with explicit separators"
![Step one]({{ site.baseurl }}/assets/img/placeholders/manual-screenshot.svg "Step one")
![Step two]({{ site.baseurl }}/assets/img/placeholders/manual-map.svg "Step two")
![Step three]({{ site.baseurl }}/assets/img/placeholders/manual-diagram-card.svg "Step three")
:::

## Mermaid fences

Pages that set `mermaid.enabled: true` can keep diagrams inline as fenced code blocks.

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

When an image points to a `.mmd` source, the core rewrites it to `.mmd.edited.svg` if that file exists, otherwise to `.mmd.svg`. Authors can keep the Mermaid source readable while serving the generated or hand-edited SVG.

```markdown
![Chapter workflow](/assets/diagrams/manual-flow.mmd "Chapter workflow")
```

![Chapter workflow]({{ site.baseurl }}/assets/diagrams/manual-flow.mmd "Chapter workflow")

## Why this is deliberate

These shortcuts are creative but conservative. They avoid large bespoke components, preserve readable source files and make academic patterns repeatable across personal sites, project sites, manuals and technical documentation.
