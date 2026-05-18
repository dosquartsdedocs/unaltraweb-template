---
layout: post
title: Contingut abans que integracions
date: 2026-05-06 10:00:00 +0000
lang: ca
locale: ca
description: Les integracions externes són útils, però la font durable del lloc ha de continuar sent contingut local.
tags: [contingut, integracions, bibliografia]
categories: [flux-de-treball]
related_posts: false
---

Les API externes poden enriquir una web, però no haurien de ser imprescindibles per a un build normal. Els fitxers locals són més fàcils de revisar, versionar i reparar.

En aquesta demo, les dades bibliomètriques s'actualitzen explícitament i després es renderitzen des de YAML i BibTeX locals. El build públic queda determinista.
