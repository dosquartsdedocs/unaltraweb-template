---
layout: page
title: CV
lang: ca
ref: cv
profiles: [unaltreselfie]
feature: cv
permalink: /ca/cv/
nav: true
nav_order: 4
cv_pdf: /assets/pdf/cv.pdf
cv_preview: /assets/img/cv-preview.jpg
---

Aquesta pàgina segueix la mateixa idea que una publicació de CV en PDF tipus ModernCV: conservar el PDF com a arxiu principal, mostrar una previsualització de la primera pàgina i oferir un botó clar de descàrrega.

{% include cv-download-card.liquid pdf=page.cv_pdf preview=page.cv_preview title="CV estil ModernCV" description="Targeta demo amb previsualització i descàrrega. Substitueix el PDF pel teu CV real i regenera la imatge." button="Descarrega PDF" %}

Per regenerar la previsualització després de substituir el PDF:

```bash
make cv-preview CV_PDF=assets/pdf/cv.pdf CV_PREVIEW=assets/img/cv-preview.jpg
```

## Posició actual

Geògraf i pioner dels SIG.

## Rols destacats

- Fundador del Canada Geographic Information System.
- Impulsor de la ciència de la informació geogràfica i de la infraestructura geoespacial pública.

## Manteniment del PDF

La recomanació és mantenir la font del CV fora del web, compilar-lo a PDF, copiar-lo a `assets/pdf/cv.pdf` i generar una imatge web de la primera pàgina.
