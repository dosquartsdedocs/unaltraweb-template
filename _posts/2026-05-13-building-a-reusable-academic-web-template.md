---
layout: post
title: Building a reusable academic web template
date: 2026-05-13 10:00:00 +0000
lang: en
locale: en
description: Why this scaffold keeps content thin and moves reusable behavior into the unaltraweb core.
tags: [unaltraweb, jekyll, template]
categories: [development]
related_posts: false
---

This demo site is intentionally small. The useful parts live in `unaltraweb`: layouts, includes, styles, metrics tooling, theme handling, and site profiles.

The template repository should mostly contain configuration and content. That keeps updates simple and makes it possible to reuse the same core for a personal site, a research project, a software site, or a manual.

The next step is to make site profiles explicit enough that switching between `personal`, `project`, `software`, and `manual` is mostly a configuration change.
