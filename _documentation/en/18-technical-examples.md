---
title: Technical examples
description: Mermaid workflows, indexed figures and profile screenshots inside documentation pages.
lang: en
ref: software_technical_examples
profiles: [unaltredocs]
section: Authoring
weight: 55
permalink: /en/docs/technical-examples/
mermaid:
  enabled: true
  zoomable: false
---

Documentation pages can mix narrative text, diagrams, indexed figures and screenshots. This is useful for package docs, data dictionaries, workflow explanations and release notes.

```mermaid
flowchart LR
  core[unaltraweb core] --> template[child template]
  template --> profiles{site profile}
  profiles --> personal[personal]
  profiles --> project[project]
  profiles --> manual[manual]
  profiles --> unaltredocs[unaltredocs]
```

![Manual profile screenshot placeholder]({{ site.baseurl }}/assets/img/placeholders/manual-screenshot.svg "Indexed screenshot placeholder for a manual profile page.")

![Project profile card placeholder]({{ site.baseurl }}/assets/img/projects/unaltraweb-template.svg "Indexed illustration placeholder for a project profile page.")

Use figure captions when a screenshot or diagram is part of the argument. Keep decorative images in the hero or card design instead.
