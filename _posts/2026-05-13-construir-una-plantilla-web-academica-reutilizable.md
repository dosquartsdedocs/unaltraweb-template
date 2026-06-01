---
layout: post
title: Construir una plantilla web académica reutilizable
date: 2026-05-13 10:00:00 +0000
lang: es
locale: es
description: Por qué este scaffold mantiene poco contenido y mueve el comportamiento reutilizable al core de unaltraweb.
tags: [unaltraweb, jekyll, plantilla]
categories: [desarrollo]
related_posts: false
---

Este sitio demo es intencionadamente pequeño. Las partes útiles viven en `unaltraweb`: layouts, includes, estilos, herramientas de métricas, gestión de temas y perfiles de sitio.

El repositorio de plantilla debería contener sobre todo configuración y contenido. Eso simplifica las actualizaciones y hace posible reutilizar el mismo core para una web personal, un proyecto de investigación, un manual o un sitio de documentación.

El siguiente paso es hacer suficientemente explícitos los perfiles para que cambiar entre `unaltreselfie`, `unaltreprojecte`, `unaltremanual` y `unaltredocs` sea sobre todo una cuestión de configuración.
