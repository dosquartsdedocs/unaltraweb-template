---
title: Colección de documentación
description: El modelo de contenido usado por el perfil unaltredocs.
lang: es
ref: software_documentation_collection
profiles: [unaltredocs]
section: Autoría
subsection: Modelo de contenido
weight: 45
permalink: /es/docs/coleccion-documentacion/
---

La barra lateral unaltredocs se genera desde la colección `_documentation`. Cada documento puede pertenecer directamente a una sección o estar dentro de una subsección.

<h2 id="documentation-sidebar">Barra lateral de documentación</h2>

La barra lateral agrupa documentos por `section`, después por `subsection` opcional, y ordena cada grupo por `weight`. La rama activa se abre automáticamente, mientras la persona lectora puede plegar o desplegar otras ramas sin cambiar el modelo de contenido.

```yaml
title: Instalar y ejecutar localmente
section: Construcción
subsection: Entorno local
weight: 20
profiles: [unaltredocs]
```

Usa rangos de `weight` para mantener secciones relacionadas juntas. Por ejemplo, `10-19` para conceptos, `20-29` para entorno local y `80-89` para mantenimiento.
