---
title: Configuración y perfiles
description: Cómo se combinan defaults del núcleo, configuración hija y overlays de perfil.
lang: es
ref: software_configuration_profiles
profiles: [unaltredocs]
section: Desarrolladores
weight: 320
permalink: /es/docs/configuracion-perfiles/
---

Los sitios `unaltraweb` se construyen con configuración por capas. El `_config.yml` del núcleo aporta defaults compartidos, el `_config.yml` hijo aporta contenido y publicación, y el Makefile puede añadir un overlay temporal para previsualizar perfiles.

| Capa | Responsabilidad habitual |
|---|---|
| Config del núcleo | Colecciones, defaults, plugins compartidos y convenciones |
| Config hija | Título, URL, idiomas, autorías, activos y características activas |
| Overlay de perfil | `unaltraweb.site_profile`, título y destino temporales para pruebas locales |

Mantén la configuración de producción en el `_config.yml` hijo. Usa overlays solo para comparaciones locales.

## Marca de unaltredocs

El perfil de documentación lee sus logos desde `unaltraweb.documentation`:

```yaml
unaltraweb:
  documentation:
    logo: /assets/img/brand/dosquartsdedocs-logo.svg
    logo_inverse: /assets/img/brand/dosquartsdedocs-logo-white.svg
    logo_sepia: /assets/img/brand/dosquartsdedocs-logo.svg
```

Los idiomas activos siguen saliendo de la lista global `languages`. El hero de inicio se cambia con front matter de página, o se omite cuando la documentación debe ser más textual.
