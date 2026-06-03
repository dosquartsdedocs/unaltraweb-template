---
title: unaltredocs profile
description: Technical documentation sites with a documentation collection, left index and local search.
lang: en
ref: profile_unaltredocs
profiles: [unaltredocs]
section: Profiles
weight: 140
permalink: /en/docs/unaltredocs/
---

![unaltredocs first view]({{ '/assets/img/screenshots/unaltredocs-home-chromium.png' | relative_url }} "unaltredocs first view")

Use `unaltredocs` when the site is primarily documentation for a reusable tool, workflow, package or platform. It gives the documentation collection priority over blog-like navigation.

## What It Emphasizes

- Documentation home page with cards generated from `_documentation/`.
- Left-hand navigation grouped by section and subsection.
- Documentation search, previous/next links and reading controls.
- Technical examples that can mix prose, diagrams, callouts and code.

## Content Shape

Documentation entries live in `_documentation/<lang>/` and are filtered by `profiles: [unaltredocs]`. Keep conceptual pages separate from operational guides so the sidebar stays useful as the collection grows.

## Enable It

```yaml
unaltraweb:
  site_profile: unaltredocs
```
