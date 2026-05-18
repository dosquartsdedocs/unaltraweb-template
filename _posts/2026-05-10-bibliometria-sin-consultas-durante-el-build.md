---
layout: post
title: Bibliometría sin consultas durante el build
date: 2026-05-10 10:00:00 +0000
lang: es
locale: es
description: Los cuartiles de revistas y las métricas de artículos deben prepararse antes del build estático, no mientras se renderiza el sitio.
tags: [bibliometria, scimago, publicaciones]
categories: [metricas]
related_posts: false
---

Los sitios estáticos deberían ser estáticos también durante el build. Eso significa que la página de publicaciones debe leer bibliografía y métricas locales en lugar de llamar a OpenAlex, Crossref, Scimago o Google Scholar mientras Jekyll renderiza.

`unaltraweb` mantiene esos pasos de actualización en scripts explícitos. Los archivos generados se pueden revisar, commitear y renderizar de forma previsible.
