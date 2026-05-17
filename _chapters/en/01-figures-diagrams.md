---
layout: manual-chapter
title: Figures and diagrams
description: A short chapter about figure captions, Mermaid assets and teaching callouts.
lang: en
ref: manual-figures-diagrams
profiles: [manual]
permalink: /en/chapters/figures-diagrams/
weight: 20
part: Production
manual_references: false
mermaid:
  enabled: true
  zoomable: true
---

Manual chapters often mix prose, screenshots, figures and small conceptual diagrams.

>>> Worked examples should stand apart from the main flow without becoming a decorative component.

## Figure captions

The figure plugin wraps Markdown images in a semantic `figure` element and adds localized labels.

![Software screenshot placeholder]({{ site.baseurl }}/assets/img/placeholders/manual-screenshot.svg "A reusable screenshot placeholder rendered as a numbered figure")

## Subfigure compositions

Use a compact patchwork-style block when several Markdown images need to read as one figure.

::: subfigures a+b/c "A three-panel placeholder composition for manual material"
![Software screenshot]({{ site.baseurl }}/assets/img/placeholders/manual-screenshot.svg "Software screenshot")
![Map placeholder]({{ site.baseurl }}/assets/img/placeholders/manual-map.svg "Map placeholder")
![Concept diagram]({{ site.baseurl }}/assets/img/placeholders/manual-diagram-card.svg "Concept diagram")
:::

## Mermaid sources

The `.mmd` rewrite keeps Mermaid sources readable in the repository while allowing the site to serve SVG output. Mermaid figures also receive theme-aware diagram surfaces in light, dark and coffee modes.


### Editable diagram files

Keep the `.mmd` source next to the generated SVG. If a teacher edits the SVG by hand, save it as `.mmd.edited.svg` and it will be preferred.
