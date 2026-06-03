---
title: Preguntas frecuentes
description: Respuestas cortas sobre perfiles, builds, previsualizaciones locales y responsabilidad de la documentación.
lang: es
ref: documentation_faq
profiles: [unaltredocs]
section: Preguntas frecuentes
weight: 500
permalink: /es/docs/preguntas-frecuentes/
---

## ¿Un perfil es lo mismo que un layout?

No. Un perfil es la familia de sitio seleccionada en tiempo de construcción para el sitio hijo. Los layouts siguen siendo layouts normales de Jekyll usados dentro de ese perfil.

## ¿Puede un sitio hijo renombrar las secciones de la barra lateral?

Sí. La barra lateral lee los nombres desde el front matter `section` de cada página de documentación, así que un sitio hijo puede usar etiquetas como `Guías de usuario`, `Soporte`, `Desarrolladores` o su propio vocabulario.

## ¿Conviene mezclar guías de usuario y notas de desarrollo?

Mejor no. Mantén la documentación orientada a visitantes en `Guías de usuario` y los detalles de mantenimiento o construcción en `Desarrolladores` u `Operaciones` para que cada lector encuentre su recorrido rápido.

## ¿De dónde salen los datos de búsqueda?

El índice de búsqueda de documentación se genera durante el build de Jekyll a partir de la colección de documentación. No llama a servicios externos en tiempo de construcción.
