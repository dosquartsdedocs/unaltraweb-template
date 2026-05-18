---
layout: post
title: Testing the rendered site
date: 2026-05-03 10:00:00 +0000
lang: en
locale: en
description: Browser smoke tests catch broken navigation, missing generated pages, and mobile overflow before deployment.
tags: [testing, playwright, rendering]
categories: [testing]
related_posts: false
---

A successful Jekyll build is necessary, but it does not prove that the rendered site works. Browser smoke tests check the pages users actually see.

The template tests cover profile rendering, multilingual pages, theme modes, project-card links, the CV preview, and mobile overflow.
