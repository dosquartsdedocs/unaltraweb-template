---
title: Prerrequisitos antes de publicar
description: Ficheros y servicios que revisar antes de publicar un sitio hijo.
lang: es
ref: software_prerequisites
profiles: [unaltredocs]
section: Operaciones
weight: 390
permalink: /es/docs/prerequisitos/
---

Antes de publicar un sitio hijo, revisa los ficheros que definen el entorno de construcción y la ruta pública de despliegue.

| Área | Ficheros | Por qué importa |
|---|---|---|
| Desarrollo local | `Makefile`, `docker-compose.yml`, `docker-compose.profiles.yml` | Documenta cómo servir y comparar perfiles |
| Dependencias Ruby | `Gemfile`, `Gemfile.lock` | Controla la versión de `unaltraweb` usada por el sitio hijo |
| Configuración | `_config.yml` | Define URL, baseurl, idiomas, logos, características y perfil |
| Publicación local | `Makefile`, rama generada `gh-pages` | Publica con `make publish` sin gastar minutos de Actions |
| GitHub Pages Actions | `.github/workflows/deploy.yml` | Llama manualmente el flujo de trabajo reutilizable de despliegue en GitHub |
| Métricas | `.github/workflows/metrics-update.yml`, `_data/metrics.yml` | Mantiene las métricas explícitas y revisables |

Para la ruta recomendada con GitHub Pages, configura Pages para que publique desde la rama `gh-pages` y la carpeta `/`. Si el sitio no se publica en GitHub Pages, conserva el flujo local con Docker y Makefile, pero sustituye el paso final de despliegue por el comando específico del alojamiento.
