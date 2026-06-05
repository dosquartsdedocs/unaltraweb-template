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

The unaltredocs navigation is generated from the `_documentation` collection. Each document belongs to a named `section`. The primary sidebar shows those sections as the main metro stops and shows optional `subsection` labels as the second level. Individual document links stay out of the primary sidebar.

<h2 id="documentation-sidebar">Documentation sidebar</h2>

The primary sidebar sorts sections and subsections by the `weight` of their first document. The secondary table of contents appears on documentation documents when the active section or subsection contains more than one document, and then lists only those document stops.

```yaml
title: Install and run locally
section: User guides
subsection: Installation
weight: 20
profiles: [unaltredocs]
```

Use `weight` ranges to keep related sections together. For example, `10-99` for user guides, `100-199` for profiles, `200-299` for standards and `300-399` for developer documentation.
