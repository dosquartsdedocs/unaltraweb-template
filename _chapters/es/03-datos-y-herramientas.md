---
layout: manual-chapter
title: Datos y herramientas
description: Espacio para datasets, notas de software y sistemas de referencia de coordenadas.
lang: es
ref: manual-data-tools
profiles: [manual]
permalink: /es/chapters/datos-y-herramientas/
weight: 40
part: Recursos
manual_references: true
---

Este capitulo muestra material operativo habitual en manuales academicos.

## Sistemas de referencia de coordenadas

Los sistemas de referencia de coordenadas son mas faciles de explicar con ejemplos cercanos.

### Errores habituales

>>>> Mezclar coordenadas geograficas y proyectadas hace que las medidas no sean fiables.

## Notas de herramientas

Las notas sobre versiones deben ser cortas y ligadas a la actividad.

Este capítulo también cita {% cite goodchildGeographicalInformationScience1992 %} para comprobar la bibliografía final en un contexto compacto solo con CSL, sin portadas ni tarjetas de lecturas destacadas.

## Bloques de codigo y codigo en linea

El codigo en linea como `ST_Transform`, `sf::st_read()` o `Path("data")` debe seguir siendo legible dentro de los parrafos. Los ejemplos mas largos usan bloques de codigo con el nombre del lenguaje para que Rouge aplique resaltado de sintaxis.

### Terminal Linux

```bash
mkdir -p data/processed
ogrinfo data/raw/roads.gpkg -so roads
ogr2ogr -t_srs EPSG:25831 data/processed/roads_25831.gpkg data/raw/roads.gpkg roads
```

### Windows PowerShell

```powershell
New-Item -ItemType Directory -Force data\processed
ogrinfo data\raw\roads.gpkg -so roads
ogr2ogr -t_srs EPSG:25831 data\processed\roads_25831.gpkg data\raw\roads.gpkg roads
```

### SQL y PostGIS

```sql
SELECT
  name,
  ST_Area(geom::geography) AS area_m2
FROM protected_areas
WHERE ST_Intersects(
  geom,
  ST_Transform(
    ST_SetSRID(ST_MakePoint(1.244, 41.118), 4326),
    ST_SRID(geom)
  )
);
```

### Python

```python
from pathlib import Path

import geopandas as gpd

roads = gpd.read_file(Path("data") / "roads.gpkg")
roads_25831 = roads.to_crs(25831)
print(roads_25831.length.sum())
```

### R

```r
library(sf)

roads <- st_read("data/roads.gpkg", quiet = TRUE)
roads_25831 <- st_transform(roads, 25831)
sum(st_length(roads_25831))
```

### Haskell

```haskell
data Cell = Cell { row :: Int, col :: Int }

manhattan :: Cell -> Cell -> Int
manhattan a b = abs (row a - row b) + abs (col a - col b)
```
