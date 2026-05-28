---
title: Install and run locally
description: The smallest local workflow for developing a child site against a local core checkout.
lang: en
ref: software_installation
profiles: [techdocs, software]
section: Build
weight: 20
permalink: /en/docs/installation/
---

The template can consume a local checkout of the core without publishing a gem. This is the normal development loop while changing `unaltraweb` itself.

```bash
make serve-personal LOCAL_CORE=../unaltraweb
make serve-project LOCAL_CORE=../unaltraweb
make serve-manual LOCAL_CORE=../unaltraweb
make serve-techdocs LOCAL_CORE=../unaltraweb
```

| Input | Meaning |
|---|---|
| `LOCAL_CORE` | Path to the local `unaltraweb` checkout |
| `SITE_PROFILE` | Build profile selected by the Makefile overlay |
| `tmp/_site.<profile>` | Isolated output directory for concurrent profile servers |
