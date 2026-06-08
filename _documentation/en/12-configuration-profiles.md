---
title: Configure Site Features And Profiles
description: How core defaults, child configuration and profile overlays combine.
lang: en
ref: software_configuration_profiles
profiles:
- unaltredocs
documentation_profiles:
- local-editors
- site-designers
- template-maintainers
section: Design The Site
weight: 400
permalink: "/en/docs/configuration-profiles/"
nav_title: Configuration
---
`unaltraweb` sites are built from layered configuration. The core `_config.yml` provides shared defaults, the child `_config.yml` provides site content and publishing settings, and the Makefile can add a temporary profile overlay for local preview.

| Layer | Typical responsibility |
|---|---|
| Core config | Collections, defaults, shared plugins and feature conventions |
| Child config | Title, URL, languages, author data, assets and enabled features |
| Profile overlay | Temporary `unaltraweb.site_profile`, title and destination for local testing |

Keep production settings in the child `_config.yml`. Use profile overlays for local comparisons only.

## unaltredocs Branding

The documentation profile reads its brand assets from `unaltraweb.documentation`:

```yaml
unaltraweb:
  documentation:
    logo: /assets/img/brand/dosquartsdedocs-logo.svg
    logo_inverse: /assets/img/brand/dosquartsdedocs-logo-white.svg
    logo_sepia: /assets/img/brand/dosquartsdedocs-logo.svg
```

The active languages still come from the normal site-level `languages` list. The home hero can be changed with page front matter, or omitted when the documentation should be text-first.
