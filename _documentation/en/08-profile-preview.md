---
title: Preview profiles
description: Run several profile builds at once without sharing output directories.
lang: en
ref: software_profile_preview
profiles: [unaltredocs]
section: Developers
weight: 310
permalink: /en/docs/profile-preview/
---

<h2 id="local-docker-profile-preview">Local Docker profile preview</h2>

Each profile server writes a separate temporary config and destination, so concurrent previews do not overwrite each other.

```bash
make serve-allprofiles
```

| Profile | Port | Destination |
|---|---|---|
| unaltreselfie | 4001 | `tmp/_site.unaltreselfie` |
| unaltreprojecte | 4002 | `tmp/_site.unaltreprojecte` |
| unaltremanual | 4003 | `tmp/_site.unaltremanual` |
| unaltredocs | 4004 | `tmp/_site.unaltredocs` |
