---
title: unaltremanual profile
description: Book-like manuals and course handbooks with chapters, sidebar navigation and selected readings.
lang: en
ref: profile_unaltremanual
profiles: [unaltredocs]
section: Profiles
weight: 130
permalink: /en/docs/unaltremanual/
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

## Enable It

```yaml
unaltraweb:
  site_profile: unaltremanual
```
