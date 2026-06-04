---
title: Technical examples
description: Mermaid workflows, indexed figures and technical examples inside documentation pages.
lang: en
ref: software_technical_examples
profiles: [unaltredocs]
section: Standards
weight: 250
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
  profiles --> unaltreselfie[unaltreselfie]
  profiles --> unaltreprojecte[unaltreprojecte]
  profiles --> unaltremanual[unaltremanual]
  profiles --> unaltredocs[unaltredocs]
```

![unaltremanual figure placeholder]({{ site.baseurl }}/assets/img/placeholders/neutral-landscape.svg "Indexed neutral placeholder for an unaltremanual page.")

![unaltreprojecte card placeholder]({{ site.baseurl }}/assets/img/projects/unaltraweb-template.svg "Indexed illustration placeholder for an unaltreprojecte page.")

Use figure captions when a screenshot or diagram is part of the argument. Keep decorative images in the hero or card design instead.
