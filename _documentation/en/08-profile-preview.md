---
title: Preview profiles
description: Run several profile builds at once without sharing output directories.
lang: en
ref: software_profile_preview
profiles: [techdocs, software]
section: Build
weight: 25
permalink: /en/docs/profile-preview/
---

<h2 id="local-docker-profile-preview">Local Docker profile preview</h2>

Each profile server writes a separate temporary config and destination, so concurrent previews do not overwrite each other.

```bash
make serve-allprofiles LOCAL_CORE=../unaltraweb
```

| Profile | Port | Destination |
|---|---|---|
| personal | 4001 | `tmp/_site.personal` |
| project | 4002 | `tmp/_site.project` |
| manual | 4003 | `tmp/_site.manual` |
| techdocs | 4004 | `tmp/_site.techdocs` |
