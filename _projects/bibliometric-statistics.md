---
layout: project
title: Journal and article statistics
description: Local-first compilation of Scimago quartiles, article-level metrics, and bibliography summaries.
importance: 6
hero: /assets/img/projects/bibliometric-statistics.svg
permalink: /en/projects/bibliometric-statistics/
resources:
  - type: zenodo
    label: Metrics export
    url: https://zenodo.org/records/1000006
    doi: 10.5281/zenodo.1000006
  - type: dataset
    label: Scimago cache
    url: https://example.org/data/scimago-cache
  - type: code
    label: Metrics scripts
    url: https://github.com/dosquartsdedocs/unaltraweb/tree/main/scripts/biblio
---

![Bibliometric dashboard placeholder]({{ '/assets/img/projects/bibliometric-statistics.svg' | relative_url }}){: .img-fluid .rounded .z-depth-1 }

The bibliometrics workflow prepares data before the static build. Scripts can fetch or merge journal and article metadata, then write local bibliography and metrics files. That keeps `jekyll build` deterministic while still allowing rich publication pages with Scimago quartiles, citation counts, FWCI/CNP indicators, and summary badges.

## Example Metric Table

| Metric | Source | Build-time behavior |
| --- | --- | --- |
| Journal quartile | Local Scimago CSV | Read from `_data/metrics.yml` |
| Citation count | Manual or explicit update script | Never fetched during `jekyll build` |
| FWCI/CNP | Local override or exported dataset | Rendered as static bibliography metadata |
| Summary badges | Aggregated YAML | Displayed on publication pages |

## Placeholder Workflow

1. Update source bibliography and override files.
2. Run the explicit metrics update command locally.
3. Review changed BibTeX and YAML files.
4. Build the static site without network calls.

## What To Replace

Swap the placeholder dashboard with screenshots of real metric panels, a data-flow diagram, or a table explaining which indicators are authoritative for your field.
