---
title: Perfil unaltreprojecte
description: Sitios de proyecto de investigación e infraestructura pública con equipo, resultados, publicaciones y recursos.
lang: es
ref: profile_unaltreprojecte
profiles: [unaltredocs]
section: Perfiles
weight: 120
permalink: /es/docs/unaltreprojecte/
---

![Primera vista de unaltreprojecte]({{ '/assets/img/screenshots/project-home-chromium.png' | relative_url }} "Primera vista de unaltreprojecte")

Usa `unaltreprojecte` cuando el sitio representa un proyecto colectivo, una acción financiada, una línea de laboratorio o una infraestructura pública de investigación. La portada explica primero la iniciativa y después dirige a personas, resultados y materiales reutilizables.

## Qué Prioriza

- Portada centrada en el proyecto, sin barra lateral de perfil personal.
- Equipo, congresos, tesis, resultados, recursos, repositorios y lecturas.
- Publicaciones y métricas conectadas al proyecto en vez de a una sola autoría.
- Noticias para hitos, eventos, convocatorias y actualizaciones del proyecto.

## Forma Del Contenido

Las páginas de proyecto suelen vivir en `_pages/<lang>/project-*`. Mantén la navegación superior contenida y agrupa el material detallado bajo páginas de recursos cuando de otro modo saturaría la cabecera.

## Activarlo

```yaml
unaltraweb:
  site_profile: unaltreprojecte
```
