---
layout: project
title: al-folio refactor
description: Keeping useful academic website features while removing inherited assumptions and external build-time work.
importance: 5
hero: /assets/img/projects/al-folio-refactor.svg
permalink: /en/projects/al-folio-refactor/
resources:
  - type: github
    label: al-folio upstream
    url: https://github.com/alshedivat/al-folio
  - type: github
    label: unaltraweb core
    url: https://github.com/dosquartsdedocs/unaltraweb
  - type: documentation
    label: Migration notes
    url: https://example.org/docs/unaltraweb-migration
---

![Theme refactor flow diagram]({{ '/assets/img/projects/al-folio-refactor.svg' | relative_url }}){: .img-fluid .rounded .z-depth-1 }

al-folio contributed many useful ideas: publication rendering, project cards, posts, bibliographies, and academic defaults. The refactor moves toward a self-owned `unaltraweb` identity: static builds, multilingual site profiles, cleaner template repositories, and explicit optional features.

## Refactor Checklist

| Area | Keep | Replace or reduce |
| --- | --- | --- |
| Publications | BibTeX rendering, metrics badges | Build-time external fetches |
| Projects | Card grid and collection pages | Expandable cards in equal-height rows |
| Blog | Posts, tags, pagination | Heavy inherited demo content |
| Docker | Reproducible commands | Manual host setup assumptions |

## Placeholder Migration Notes

- Keep useful inherited components until there is a better local replacement.
- Move reusable changes into the core, not into child sites.
- Keep the template repository thin enough to be copied safely.
- Verify each step with a static build and browser smoke tests.

## Example Decision Log

| Decision | Reason |
| --- | --- |
| Disable external sources by default | Builds must be deterministic. |
| Use `site_profile` terminology | Avoids confusing profile presets with Jekyll layouts. |
| Keep search disabled for now | Generated search needs a robust child-site path. |
