---
title: Colección de documentación
description: El modelo de contenido usado por el perfil unaltredocs.
lang: es
ref: software_documentation_collection
profiles: [unaltredocs]
section: Estándares
weight: 200
permalink: /es/docs/coleccion-documentacion/
---

La barra lateral unaltredocs se genera desde la colección `_documentation`. Cada documento pertenece a una `section`; las etiquetas opcionales `subsection` todavía pueden agrupar enlaces dentro de esa sección cuando un sitio necesita más detalle.

<h2 id="documentation-sidebar">Barra lateral de documentación</h2>

La barra lateral muestra cada `section` como un grupo de acordeón y ordena los documentos por `weight`. El grupo activo se abre automáticamente, mientras la persona lectora puede plegar o desplegar otros grupos sin cambiar el modelo de contenido.

```yaml
title: Instalar y ejecutar localmente
section: Guías de usuario
weight: 20
profiles: [unaltredocs]
```

Usa rangos de `weight` para mantener secciones relacionadas juntas. Por ejemplo, `10-99` para guías de usuario, `100-199` para perfiles, `200-299` para estándares y `300-399` para documentación de desarrollo.
