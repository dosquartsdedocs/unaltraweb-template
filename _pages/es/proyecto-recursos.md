---
layout: page
title: Recursos
description: Resultados, repositorios, lecturas y materiales reutilizables del proyecto.
lang: es
ref: resources
profiles: [unaltreprojecte]
permalink: /es/recursos/
nav: true
nav_order: 6
dropdown: true
figure_captions: true
mermaid:
  enabled: true
  zoomable: false
children:
  - title: Resultados
    permalink: /es/resultados/
  - title: Repositorios
    permalink: /es/repositorios/
  - title: Lecturas
    permalink: /es/lecturas/
---

Esta página agrupa los materiales reutilizables que un sitio de proyecto suele necesitar cuando la narrativa principal ya está definida.

::: subfigures ab/cd "Un ejemplo de subfiguras en dos filas para recursos de proyecto"
![Resultado de datos]({{ site.baseurl }}/assets/img/placeholders/manual-screenshot.svg "Resultado de datos")
![Producto cartográfico]({{ site.baseurl }}/assets/img/placeholders/manual-map.svg "Producto cartográfico")
![Flujo del repositorio]({{ site.baseurl }}/assets/img/placeholders/manual-diagram-card.svg "Flujo del repositorio")
![Notas de lectura]({{ site.baseurl }}/assets/img/placeholders/manual-screenshot.svg "Notas de lectura")
:::

```mermaid
sequenceDiagram
  participant Equipo
  participant Repositorio
  participant Web
  Equipo->>Repositorio: publica material reutilizable
  Repositorio->>Web: expone enlaces de recursos
  Web-->>Equipo: mantiene los resultados localizables
```

| Recurso | Para qué sirve |
|---|---|
| [Resultados]({{ '/es/resultados/' | relative_url }}) | Datos, mapas, informes, software y productos de investigación reutilizables. |
| [Repositorios]({{ '/es/repositorios/' | relative_url }}) | Organizaciones de GitHub, repositorios de código y enlaces de infraestructura. |
| [Lecturas]({{ '/es/lecturas/' | relative_url }}) | Libros anotados, manuales y notas internas de lectura. |
