---
title: Prerrequisitos antes de publicar
description: Ficheros y servicios que revisar antes de publicar un sitio hijo.
lang: es
ref: software_prerequisites
profiles: [techdocs, software]
section: Construcción
weight: 22
permalink: /es/docs/prerequisitos/
---

Antes de publicar un sitio hijo, revisa los ficheros que definen el entorno de construcción y la ruta pública de despliegue.

| Área | Ficheros | Por qué importa |
|---|---|---|
| Desarrollo local | `Makefile`, `docker-compose.yml`, `docker-compose.profiles.yml` | Documenta cómo servir y comparar perfiles |
| Dependencias Ruby | `Gemfile`, `Gemfile.lock` | Controla la versión de `unaltraweb` usada por el sitio hijo |
| Configuración | `_config.yml` | Define URL, baseurl, idiomas, logos, características y perfil |
| GitHub Pages | `.github/workflows/deploy.yml` | Llama el flujo de trabajo reutilizable de despliegue en GitHub |
| Métricas | `.github/workflows/metrics-update.yml`, `_data/metrics.yml` | Mantiene las métricas explícitas y revisables |

Si el sitio no se publica en GitHub Pages, conserva el flujo local con Docker y Makefile, pero sustituye el adaptador de despliegue por el paso específico del host.
