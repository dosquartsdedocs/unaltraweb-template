---
layout: manual-chapter
title: Data and tools
description: A compact place for datasets, software notes and coordinate reference system guidance.
lang: en
ref: manual-data-tools
profiles: [manual]
permalink: /en/chapters/data-tools/
weight: 40
part: Resources
manual_references: true
---

This chapter models the kind of operational material that often appears in academic handbooks.

## Coordinate reference systems

Coordinate reference systems are easier to teach when examples, warnings and diagrams live near the exercise.

### Common mistakes

>>>> Mixing geographic coordinates with projected coordinates will make measurements unreliable.

## Tool notes

Keep version-specific advice short and close to the activity that needs it.

This chapter also cites {% cite goodchildGeographicalInformationScience1992 %} so the end-of-chapter bibliography can be checked in a compact CSL-only context, without preview covers or featured reading cards.

## Code fences and inline code

Inline code such as `ST_Transform`, `sf::st_read()` or `Path("data")` should stay readable inside paragraphs. Longer examples use fenced code blocks with a language name so Rouge can apply syntax highlighting.

### Linux shell

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

### SQL and PostGIS

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
