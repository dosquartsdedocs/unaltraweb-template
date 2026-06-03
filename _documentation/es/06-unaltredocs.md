---
title: Perfil unaltredocs
description: Sitios de documentación técnica con colección documental, índice izquierdo y búsqueda local.
lang: es
ref: profile_unaltredocs
profiles: [unaltredocs]
section: Perfiles
weight: 140
permalink: /es/docs/unaltredocs/
---

![Primera vista de unaltredocs]({{ '/assets/img/screenshots/unaltredocs-home-chromium.png' | relative_url }} "Primera vista de unaltredocs")

Usa `unaltredocs` cuando el sitio es sobre todo documentación para una herramienta, flujo de trabajo, paquete o plataforma reutilizable. Da prioridad a la colección documental por encima de la navegación de tipo blog.

## Qué Prioriza

- Portada de documentación con tarjetas generadas desde `_documentation/`.
- Navegación izquierda agrupada por sección y subsección.
- Búsqueda documental, enlaces anterior/siguiente y controles de lectura.
- Ejemplos técnicos que pueden mezclar prosa, diagramas, callouts y código.

## Forma Del Contenido

Las entradas de documentación viven en `_documentation/<lang>/` y se filtran con `profiles: [unaltredocs]`. Mantén las páginas conceptuales separadas de las guías operativas para que la barra lateral siga siendo útil cuando la colección crezca.

## Activarlo

```yaml
unaltraweb:
  site_profile: unaltredocs
```
