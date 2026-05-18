---
layout: post
title: Bibliometria sense consultes durant el build
date: 2026-05-10 10:00:00 +0000
lang: ca
locale: ca
description: Els quartils de revistes i les mètriques d'articles s'han de preparar abans del build estàtic, no mentre es renderitza el lloc.
tags: [bibliometria, scimago, publicacions]
categories: [metriques]
related_posts: false
---

Els llocs estàtics haurien de ser estàtics també durant el build. Això vol dir que la pàgina de publicacions ha de llegir bibliografia i mètriques locals en lloc de cridar OpenAlex, Crossref, Scimago o Google Scholar mentre Jekyll renderitza.

`unaltraweb` manté aquests passos d'actualització en scripts explícits. Els fitxers generats es poden revisar, commitejar i renderitzar de manera previsible.
