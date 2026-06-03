---
title: Documentation collection
description: The content model used by the unaltredocs profile.
lang: en
ref: software_documentation_collection
profiles: [unaltredocs]
section: Standards
weight: 200
permalink: /en/docs/documentation-collection/
---

The unaltredocs sidebar is generated from the `_documentation` collection. Each document belongs to a named `section`; optional `subsection` labels can still group links inside that section when a site needs more detail.

<h2 id="documentation-sidebar">Documentation sidebar</h2>

The sidebar renders each `section` as an accordion group and sorts documents by `weight`. The active group opens automatically, while the reader can collapse or expand other groups without changing the content model.

```yaml
title: Install and run locally
section: User guides
weight: 20
profiles: [unaltredocs]
```

Use `weight` ranges to keep related sections together. For example, `10-99` for user guides, `100-199` for profiles, `200-299` for standards and `300-399` for developer documentation.
