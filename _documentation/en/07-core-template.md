---
title: Maintain Core And Template Boundaries
description: Why reusable behaviour lives in the core and local content lives in child
  sites.
lang: en
ref: software_core_template
profiles:
- unaltredocs
documentation_profiles:
- template-maintainers
section: Maintain The Template
weight: 700
permalink: "/en/docs/core-template/"
nav_title: Core And Template
---
`unaltraweb` should contain shared behaviour. A child site should contain content, configuration and assets. This separation keeps updates small and makes it possible to test the core through a realistic consumer repository.

```text
unaltraweb
  layouts, includes, styles, scripts, workflows

unaltraweb-template
  _config.yml, pages, collections, bibliography, assets
```
