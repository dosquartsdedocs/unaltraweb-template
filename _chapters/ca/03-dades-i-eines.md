---
layout: manual-chapter
title: Dades i eines
description: Espai per a datasets, notes de programari i sistemes de referència de coordenades.
lang: ca
ref: manual-data-tools
profiles: [manual]
permalink: /ca/chapters/dades-i-eines/
weight: 40
part: Recursos
manual_references: false
---

Aquest capítol mostra material operatiu habitual en manuals acadèmics.

## Sistemes de referència de coordenades

Els sistemes de referència de coordenades són més fàcils d'explicar amb exemples propers.

### Errors habituals

>>>> Barrejar coordenades geogràfiques i projectades fa que les mesures no siguin fiables.

## Notes d'eines

Les notes sobre versions han de ser curtes i lligades a l'activitat.

## Blocs de codi i codi en línia

El codi en línia com `ST_Transform`, `sf::st_read()` o `Path("data")` ha de continuar sent llegible dins dels paràgrafs. Els exemples més llargs fan servir blocs de codi amb el nom del llenguatge perquè Rouge aplique ressaltat de sintaxi.

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

### SQL i PostGIS

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
