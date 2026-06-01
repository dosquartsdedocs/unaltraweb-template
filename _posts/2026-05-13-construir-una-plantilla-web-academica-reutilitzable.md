---
layout: post
title: Construir una plantilla web acadèmica reutilitzable
date: 2026-05-13 10:00:00 +0000
lang: ca
locale: ca
description: Per què aquest scaffold manté poc contingut i mou el comportament reutilitzable al core d'unaltraweb.
tags: [unaltraweb, jekyll, plantilla]
categories: [desenvolupament]
related_posts: false
---

Aquest lloc demo és intencionadament petit. Les parts útils viuen a `unaltraweb`: layouts, includes, estils, eines de mètriques, gestió de temes i perfils de lloc.

El repositori de plantilla hauria de contindre sobretot configuració i contingut. Això simplifica les actualitzacions i fa possible reutilitzar el mateix core per a una web personal, un projecte de recerca, un manual o un lloc de documentació.

El pas següent és fer prou explícits els perfils perquè canviar entre `unaltreselfie`, `unaltreprojecte`, `unaltremanual` i `unaltredocs` siga sobretot una qüestió de configuració.
