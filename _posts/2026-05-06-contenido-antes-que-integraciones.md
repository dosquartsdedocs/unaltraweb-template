---
layout: post
title: Contenido antes que integraciones
date: 2026-05-06 10:00:00 +0000
lang: es
locale: es
description: Las integraciones externas son útiles, pero la fuente durable del sitio debe seguir siendo contenido local.
tags: [contenido, integraciones, bibliografia]
categories: [flujo-de-trabajo]
related_posts: false
---

Las API externas pueden enriquecer una web, pero no deberían ser imprescindibles para un build normal. Los archivos locales son más fáciles de revisar, versionar y reparar.

En esta demo, los datos bibliométricos se actualizan explícitamente y después se renderizan desde YAML y BibTeX locales. El build público queda determinista.
