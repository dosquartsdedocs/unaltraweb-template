---
title: Demo A Documentation Portal
description: Technical documentation sites with a documentation collection, left index
  and local search.
lang: en
ref: profile_unaltredocs
profiles:
- unaltredocs
section: Demo Profiles
subsection: Available profiles
weight: 340
permalink: "/en/docs/unaltredocs/"
documentation_profiles:
- github-publishers
- local-editors
- site-designers
- template-maintainers
nav_title: Documentation Portal
---
![unaltredocs first view]({{ '/assets/img/screenshots/unaltredocs-home-chromium.png' | relative_url }} "unaltredocs first view")

Use `unaltredocs` when the site is primarily documentation for a reusable tool, workflow, package or platform. It gives the documentation collection priority over blog-like navigation.

## What It Emphasizes

- Documentation home page with cards generated from `_documentation/`.
- Left-hand navigation for primary sections and subsections, plus a secondary table of contents for the active subsection's document stops.
- Documentation search, a reader-profile dropdown in the table of contents and reading controls.
- Technical examples that can mix prose, diagrams, callouts and code.

## Content Shape

Documentation entries live in `_documentation/<lang>/` and are filtered by `profiles: [unaltredocs]`. Keep conceptual pages separate from operational guides so the sidebar stays useful as the collection grows.

Add optional metadata when the documentation should appear only under one or more documentation profiles:

```yaml
documentation_profiles: [local-editors, site-designers]
```

## Enable It

```yaml
unaltraweb:
  site_profile: unaltredocs
```
