---
title: Demo A Personal Site
description: Personal academic sites with identity, publications, projects, posts,
  news and readings.
lang: en
ref: profile_unaltreselfie
profiles:
- unaltredocs
documentation_profiles:
- github-publishers
- local-editors
- site-designers
section: Demo Profiles
subsection: Available profiles
weight: 310
permalink: "/en/docs/unaltreselfie/"
nav_title: Personal Site
---
![unaltreselfie first view]({{ '/assets/img/screenshots/home-light-chromium.png' | relative_url }} "unaltreselfie first view")

Use `unaltreselfie` when the site represents a person: an academic, researcher, professional profile or public portfolio. The home page foregrounds identity, links and selected activity instead of behaving like a project landing page.

## What It Emphasizes

- Profile sidebar with avatar, affiliation and social links.
- Recent news, recent posts, selected publications and active projects on the home page.
- Optional CV, blog, news, projects, readings and publications pages.
- Multilingual pages that still feel like one personal site.

## Content Shape

Start with `_pages/<lang>/index.md` using the profile layout, then add only the sections the person really needs. News works well for press, interviews and public appearances, while posts remain better for authored updates or essays.

## Enable It

```yaml
unaltraweb:
  site_profile: unaltreselfie
```
