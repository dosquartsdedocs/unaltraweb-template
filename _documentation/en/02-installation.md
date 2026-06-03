---
title: Install and run locally
description: The smallest local workflow for previewing a child site with the packaged core.
lang: en
ref: software_installation
profiles: [unaltredocs]
section: User guides
weight: 20
permalink: /en/docs/installation/
---

The normal child-site workflow uses the `unaltraweb` dependency declared in `Gemfile`. You do not need a sibling `../unaltraweb` checkout to preview a site.

```bash
make bootstrap
make serve-unaltreselfie
make serve-unaltreprojecte
make serve-unaltremanual
make serve-unaltredocs
```

| Input | Meaning |
|---|---|
| `SITE_PROFILE` | Build profile selected by the Makefile overlay |
| `tmp/_site.<profile>` | Isolated output directory for concurrent profile servers |

Set `LOCAL_CORE=../unaltraweb` only when you are actively editing the core and want this child site to consume those local changes before updating the gem dependency.
