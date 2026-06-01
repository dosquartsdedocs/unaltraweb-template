---
title: Documentation collection
description: The content model used by the unaltredocs profile.
lang: en
ref: software_documentation_collection
profiles: [unaltredocs]
section: Authoring
subsection: Content model
weight: 45
permalink: /en/docs/documentation-collection/
---

The unaltredocs sidebar is generated from the `_documentation` collection. Each document can belong directly to a section or inside a subsection.

<h2 id="documentation-sidebar">Documentation sidebar</h2>

The sidebar groups documents by `section`, then by optional `subsection`, and sorts each group by `weight`. The active branch opens automatically, while the reader can collapse or expand other branches without changing the content model.

```yaml
title: Install and run locally
section: Build
subsection: Local setup
weight: 20
profiles: [unaltredocs]
```

Use `weight` ranges to keep related sections together. For example, `10-19` for concepts, `20-29` for local setup and `80-89` for maintenance.
