---
layout: project
title: unaltraweb template
description: A thin scaffold that demonstrates how a site can consume the reusable unaltraweb core.
importance: 3
github: https://github.com/dosquartsdedocs/unaltraweb-template
hero: /assets/img/projects/unaltraweb-template.svg
permalink: /en/projects/unaltraweb-template/
resources:
  - type: github
    label: Template repository
    url: https://github.com/dosquartsdedocs/unaltraweb-template
  - type: documentation
    label: Customization docs
    url: https://github.com/dosquartsdedocs/unaltraweb/blob/main/docs/customization.md
  - type: website
    label: Demo site
    url: https://dosquartsdedocs.github.io/unaltraweb-template/
---

![Template repository architecture diagram]({{ '/assets/img/projects/unaltraweb-template.svg' | relative_url }}){: .img-fluid .rounded .z-depth-1 }

This project is the working scaffold for testing `unaltraweb` as a reusable core. It should stay thin: configuration, content, demo pages, bibliography, and local overrides only.

## Repository Boundary

| Responsibility | Template repo | Core repo |
| --- | --- | --- |
| Content | Pages, posts, projects, CV PDF, bibliography | Demo defaults only |
| Behavior | Configuration and local overrides | Layouts, includes, plugins, scripts |
| Styling | `_sass/_site-custom.scss` | Standard components and profiles |
| Testing | Render smoke tests for the child site | Reusable build behavior |

## Example Local Files

```text
_pages/en/index.md
_posts/2026-05-13-building-a-reusable-academic-web-template.md
_projects/unaltraweb-template.md
assets/pdf/cv.pdf
assets/img/cv-preview.jpg
```

## What This Page Tests

- Code blocks inside project pages.
- A table comparing local and reusable responsibilities.
- A hero image reused as the project-card background.
- Repository links that remain separate from the main card click target.
