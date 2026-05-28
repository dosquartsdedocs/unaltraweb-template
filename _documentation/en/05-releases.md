---
title: Release updates
description: How child sites can consume newer versions of the core.
lang: en
ref: software_releases
profiles: [techdocs, software]
section: Operations
weight: 85
permalink: /en/docs/releases/
---

| Step | Purpose |
|---|---|
| Update the core checkout | Test changes locally before publishing |
| Rebuild a child template | Verify profile behaviour from a consumer repo |
| Tag or publish the gem | Make the release available to child sites |
| Update child locks | Move production sites deliberately |

The template is intentionally thin so release testing exercises the real consumer path rather than only the core repository.
