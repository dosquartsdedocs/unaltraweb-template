---
layout: manual-chapter
title: Bibliography
description: Books and articles that support the manual without becoming a numbered chapter.
lang: en
ref: manual-bibliography
profiles: [unaltremanual]
permalink: /en/bibliography/
weight: 90
part: Reference
manual_numbered: false
manual_references: false
keywords: readings books articles GIS remote sensing bibliography
---

This page is the manual bibliography. It is driven by `_bibliography/manual.bib`, while keeping the course chapters focused on teaching material.

BibTeX entries join the manual bibliography with `manual = {true}`. Use `manual_selected = {true}` for the featured cards at the top, and `manual_selected = {false}` for the chronological “More readings” list. Optional fields such as `preview`, `manual_badge_*`, `manual_rating`, `manual_kind_*` and `manual_comment_*` give the manual its own voice without adding separate Markdown files.

{% include manual-bibliography.liquid %}
