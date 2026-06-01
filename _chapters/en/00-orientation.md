---
layout: manual-chapter
title: How this manual works
description: A first chapter that checks the manual structure, callouts, figures, Mermaid diagrams and references.
lang: en
ref: manual-orientation
profiles: [unaltremanual]
permalink: /en/chapters/orientation/
weight: 10
part: Orientation
manual_references: true
mermaid:
  enabled: true
  zoomable: true
---

This chapter is a compact smoke test for the pieces that come from `tig` and now live in `unaltraweb`.

>> A note can be written as a nested Markdown quote. The script upgrades it into a themed teaching callout.

>>>>> Learning objectives
>>>>>
>>>>> - Understand the manual layout.
>>>>> - See how chapters stay scoped by language.
>>>>> - Check that references at the end avoid bibliometric panels.

## Reading path

The sidebar lists the cover and the chapters for the current language. The search box is useful when manuals grow past a dozen chapters.

::: table "Manual components checked in this chapter"
| Component | Purpose | Where to look |
| --- | --- | --- |
| Sidebar | Keeps the chapter sequence visible | Left rail |
| Callouts | Highlights teaching notes and objectives | Main text |
| References | Shows the lean manual bibliography | Chapter end |
:::

![Reading path placeholder]({{ site.baseurl }}/assets/img/placeholders/manual-reading-path.svg "A reusable placeholder for chapter reading paths")

## Diagram workflow

The Markdown below points to a `.mmd` source, but the core rewrites it to the generated SVG if it exists.

![Chapter production workflow]({{ site.baseurl }}/assets/diagrams/manual-flow.mmd "Chapter production workflow")

## References in chapters

A chapter can cite a source such as {% cite goodchildGeographicalInformationScience1992 %}. When `manual_references: true` is set, the bibliography appears here without metrics cards or badges.


### Search and reading settings

Use the search box for terms such as coordinates, services or assessment. The A controls in the navigation bar change the reading size without changing the global site theme.
