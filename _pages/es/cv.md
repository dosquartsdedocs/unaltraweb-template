---
layout: page
title: CV
lang: es
ref: cv
profiles: [unaltreselfie]
feature: cv
permalink: /es/cv/
nav: true
nav_order: 4
cv_pdf: /assets/pdf/cv.pdf
cv_preview: /assets/img/cv-preview.jpg
---

Esta página sigue la misma idea que una publicación de CV en PDF tipo ModernCV: conservar el PDF como archivo principal, mostrar una previsualización de la primera página y ofrecer un botón claro de descarga.

{% include cv-download-card.liquid pdf=page.cv_pdf preview=page.cv_preview title="CV estilo ModernCV" description="Tarjeta demo con previsualización y descarga. Sustituye el PDF por tu CV real y regenera la imagen." button="Descargar PDF" %}

Para regenerar la previsualización después de sustituir el PDF:

```bash
make cv-preview CV_PDF=assets/pdf/cv.pdf CV_PREVIEW=assets/img/cv-preview.jpg
```

## Posición actual

Geógrafo y pionero de los SIG.

## Roles destacados

- Fundador del Canada Geographic Information System.
- Impulsor de la ciencia de la información geográfica y de la infraestructura geoespacial pública.

## Mantenimiento del PDF

La recomendación es mantener la fuente del CV fuera de la web, compilarlo a PDF, copiarlo en `assets/pdf/cv.pdf` y generar una imagen web de la primera página.
