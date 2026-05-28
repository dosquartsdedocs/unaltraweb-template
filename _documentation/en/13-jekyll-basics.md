---
title: Jekyll basics for child sites
description: The minimum Jekyll concepts users need before editing a child repository.
lang: en
ref: software_jekyll_basics
profiles: [techdocs, software]
section: Authoring
weight: 30
permalink: /en/docs/jekyll-basics/
---

Most users only need a small part of Jekyll to maintain a child site.

| Concept | Use in unaltraweb |
|---|---|
| Front matter | Select layout, language, profile visibility and navigation metadata |
| Collections | Store repeated content such as chapters, outputs, theses and docs |
| Includes | Reuse small HTML/Liquid fragments from the core |
| Layouts | Define page families such as profile pages, manual chapters and documentation pages |
| Data files | Store structured lists under `_data` for teams, repositories and metrics |

When in doubt, edit content and front matter in the child site. Edit the core only when the behaviour should be shared by many child sites.
