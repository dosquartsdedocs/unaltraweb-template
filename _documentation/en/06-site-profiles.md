---
title: Site profiles
description: Prepared website families selected at build time.
lang: en
ref: software_site_profiles
profiles: [unaltredocs]
section: Concepts
weight: 15
permalink: /en/docs/site-profiles/
---

Profiles are high-level website families, not Jekyll layouts. The active profile is selected before Jekyll writes the site, then pages and documents are filtered by their `profiles` front matter.

| Profile | Use |
|---|---|
| `unaltreselfie` | Academic or professional personal site |
| `unaltreprojecte` | Research project or public infrastructure site |
| `unaltremanual` | Book-like manual or course handbook |
| `unaltredocs` | Technical documentation with a left index |

<h2 id="profile-specific-home">Profile-specific home</h2>

Each profile can expose a different home page while sharing the same repository. Put the page under `_pages/<lang>/`, assign the relevant `profiles` value and use the page permalink for that language. The Makefile profile overlay selects which set is rendered.

<h2 id="book-like-chapters">Book-like chapters</h2>

The `unaltremanual` profile is for sequential material: chapters, course notes or handbooks. It uses manual layouts and previous/next navigation so the site behaves more like a book than a project landing page.
