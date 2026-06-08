---
title: Structure A Documentation Collection
description: The content model used by the unaltredocs profile.
lang: en
ref: software_documentation_collection
profiles:
- unaltredocs
section: Build Content
weight: 240
permalink: "/en/docs/documentation-collection/"
documentation_profiles:
- local-editors
- site-designers
- template-maintainers
nav_title: Documentation Collection
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
documentation_profiles: [local-editors]
```

Use `weight` ranges to keep related sections together. This demo uses early weights for start/local/content pages, mid-range weights for profile and design pages, and later weights for publishing and maintenance pages.
