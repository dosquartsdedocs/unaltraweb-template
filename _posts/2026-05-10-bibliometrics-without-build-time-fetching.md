---
layout: post
title: Bibliometrics without build-time fetching
date: 2026-05-10 10:00:00 +0000
lang: en
description: Journal quartiles and article metrics should be prepared before the static build, not fetched while rendering the site.
tags: [bibliometrics, scimago, publications]
categories: [metrics]
related_posts: false
---

Static sites should be static at build time. That means the publication page should read local bibliography and metrics files instead of calling OpenAlex, Crossref, Scimago, or Google Scholar during `jekyll build`.

`unaltraweb` keeps those update steps in explicit scripts. The generated files can then be reviewed, committed, and rendered predictably.
