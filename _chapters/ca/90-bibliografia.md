---
layout: manual-chapter
title: Bibliografia
description: Llibres i articles que donen suport al manual sense convertir-se en un capítol numerat.
lang: ca
ref: manual-bibliography
profiles: [unaltremanual]
permalink: /ca/bibliografia/
weight: 90
part: Referència
manual_numbered: false
manual_toc: false
manual_references: false
keywords: lectures llibres articles SIG teledetecció bibliografia
---

Aquesta pàgina és la bibliografia del manual. S'alimenta des de `_bibliography/manual.bib`, mentre els capítols del curs es mantenen centrats en el material docent.

Les entrades BibTeX entren en la bibliografia del manual amb `manual = {true}`. Fes servir `manual_selected = {true}` per a les targetes destacades de la part superior, i `manual_selected = {false}` per al llistat cronològic de “Més lectures”. Camps opcionals com `preview`, `manual_badge_*`, `manual_rating`, `manual_kind_*` i `manual_comment_*` donen veu pròpia al manual sense afegir fitxers Markdown separats.

{% include manual-bibliography.liquid %}
