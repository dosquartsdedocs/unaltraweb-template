---
layout: project
title: Minimal Mistakes profile pattern
description: A design reference for personal academic pages with a clear sidebar and readable archives.
importance: 4
hero: /assets/img/projects/minimal-mistakes-profile.svg
permalink: /en/projects/minimal-mistakes-profile/
resources:
  - type: website
    label: Minimal Mistakes
    url: https://mmistakes.github.io/minimal-mistakes/
  - type: documentation
    label: Author profile docs
    url: https://mmistakes.github.io/minimal-mistakes/docs/layouts/
  - type: report
    label: Pattern notes
    url: https://example.org/reports/profile-patterns
---

![Profile layout wireframe]({{ '/assets/img/projects/minimal-mistakes-profile.svg' | relative_url }}){: .img-fluid .rounded .z-depth-1 }

Minimal Mistakes is a useful reference for the `unaltreselfie` site profile because it handles author identity calmly: profile sidebar, navigation, blog archive, and content pages each have a clear role.

## Pattern Inventory

| Pattern | Why it matters | unaltraweb counterpart |
| --- | --- | --- |
| Profile sidebar | Keeps identity and contact links stable. | `profile-card.liquid` |
| Archive list | Makes posts scannable before search exists. | `blog-list.liquid` |
| Optional sections | Avoids forcing CV or projects on every site. | `unaltraweb.features` |
| Calm typography | Supports long-lived personal pages. | Core profile styles |

## Placeholder Comparison

The goal is not to clone its CSS, but to keep the information architecture: home as profile, optional blog, optional CV, and optional projects. Real project pages can use this area for screenshots, annotated wireframes, or before/after captures.

## Open Questions

- Should personal sites default to two-column profile pages on desktop?
- Which social links deserve first-class icons?
- How much typography should be profile-specific and how much should remain global?
