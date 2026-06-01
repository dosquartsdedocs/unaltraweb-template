---
layout: page
title: CV
lang: en
ref: cv
profiles: [unaltreselfie]
feature: cv
permalink: /en/cv/
nav: true
nav_order: 8
cv_pdf: /assets/pdf/cv.pdf
cv_preview: /assets/img/cv-preview.jpg
---

This page follows the same idea as a ModernCV PDF publication page: keep the PDF as the authoritative file, show a preview of its first page, and provide a clear download button.

{% include cv-download-card.liquid pdf=page.cv_pdf preview=page.cv_preview title="ModernCV-style CV" description="Demo preview and download card. Replace the PDF with your real CV and regenerate the preview." %}

To regenerate the preview after replacing the PDF, run:

```bash
make cv-preview CV_PDF=assets/pdf/cv.pdf CV_PREVIEW=assets/img/cv-preview.jpg
```

## Current Position

Geographer and GIS pioneer.

## Selected Roles

- Founder of the Canada Geographic Information System.
- Advocate for geographic information science and public-sector geospatial infrastructure.

## Maintaining The PDF

The recommended workflow is to keep the CV source outside the website, compile it to PDF, copy the PDF into `assets/pdf/cv.pdf`, and generate a web preview image from the first page.
