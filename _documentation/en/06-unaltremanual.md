---
title: Demo A Manual Site
description: Book-like manuals and course handbooks with chapters, sidebar navigation
  and selected readings.
lang: en
ref: profile_unaltremanual
profiles:
- unaltredocs
documentation_profiles:
- github-publishers
- local-editors
- site-designers
section: Demo Profiles
subsection: Available profiles
weight: 330
permalink: "/en/docs/unaltremanual/"
nav_title: Manual Site
---
![unaltremanual first view]({{ '/assets/img/screenshots/manual-home-chromium.png' | relative_url }} "unaltremanual first view")

Use `unaltremanual` for sequential teaching material: manuals, course handbooks, practical guides and book-like notes. It is meant for reading in order, not for browsing a normal site menu.

## What It Emphasizes

- Cover page, chapter collection and persistent contents sidebar.
- Right-hand table of contents for long chapters.
- Manual search index scoped to the handbook.
- Bibliography without bibliometric badges, plus selected readings that can link to reviews.

## Content Shape

Chapters live in `_chapters/<lang>/` and can use figures, callouts, tables, code fences and local bibliography entries. The bibliography chapter is part of the manual reading flow rather than a generic publications page.

## Executable Examples

`_chapters/en/05-computed-python.qmd` and `_chapters/en/06-computed-r.R` are authoritative executable examples. Their same-stem `.md` files and figures under `assets/img/generated/` are reviewed and committed so web and PDF builds remain static. Edit the executable source, run `make manual-compute-render`, and verify it with `make manual-compute-check`.

## Enable It

```yaml
unaltraweb:
  site_profile: unaltremanual
```
