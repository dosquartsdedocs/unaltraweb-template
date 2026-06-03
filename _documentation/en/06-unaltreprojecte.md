---
title: unaltreprojecte profile
description: Research project and public infrastructure sites with teams, outputs, publications and resources.
lang: en
ref: profile_unaltreprojecte
profiles: [unaltredocs]
section: Profiles
weight: 120
permalink: /en/docs/unaltreprojecte/
---

![unaltreprojecte first view]({{ '/assets/img/screenshots/project-home-chromium.png' | relative_url }} "unaltreprojecte first view")

Use `unaltreprojecte` when the site represents a collective project, funded action, lab line or public research infrastructure. The home page explains the initiative first, then routes visitors to people, outputs and reusable material.

## What It Emphasizes

- Project-focused home page without the personal profile sidebar.
- Team, conferences, theses, outputs, resources, repositories and readings.
- Publications and metrics connected to the project instead of one author.
- News for milestones, events, calls and project updates.

## Content Shape

Project pages usually live under `_pages/<lang>/project-*`. Keep the top navigation narrow and group detailed material under resource pages when it would otherwise crowd the header.

## Enable It

```yaml
unaltraweb:
  site_profile: unaltreprojecte
```
