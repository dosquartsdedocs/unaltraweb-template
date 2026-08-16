#!/usr/bin/env python3
"""Validate the template's executable manual computation fixture."""

from __future__ import annotations

import json
import sys
from pathlib import Path


EXPECTED = {
    "_chapters/en/05-computed-python.qmd": {
        "engine": "python",
        "output": "_chapters/en/05-computed-python.md",
        "marker": "Generated from _chapters/en/05-computed-python.qmd",
        "figure": "assets/img/generated/en/manual-computed-python/05-computed-python_files/figure-commonmark/fig-python-trend-output-1.png",
    },
    "_chapters/en/06-computed-r.qmd": {
        "engine": "r",
        "output": "_chapters/en/06-computed-r.md",
        "marker": "Generated from _chapters/en/06-computed-r.qmd",
        "figure": "assets/img/generated/en/manual-computed-r/06-computed-r_files/figure-commonmark/fig-r-stopping-distance-1.png",
    },
}


def fail(message: str) -> None:
    print(message, file=sys.stderr)
    raise SystemExit(1)


def main() -> int:
    if len(sys.argv) != 2:
        fail("Usage: check_manual_computations.py STATUS_JSON")
    project = Path.cwd()
    data = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    if not data.get("ok"):
        fail(f"manual computation status is not ok: {data.get('orphaned_records', [])}")
    sources = {item.get("source"): item for item in data.get("sources", [])}
    if set(sources) != set(EXPECTED):
        fail(f"unexpected computation sources: {sorted(sources)}")
    for source, expected in EXPECTED.items():
        item = sources[source]
        if item.get("engine") != expected["engine"] or item.get("mode") != "chapter" or not item.get("current"):
            fail(f"unexpected status for {source}: {item}")
        if item.get("output") != expected["output"]:
            fail(f"unexpected output for {source}: {item.get('output')}")
        output = project / expected["output"]
        if expected["marker"] not in output.read_text(encoding="utf-8"):
            fail(f"generated marker missing in {expected['output']}")
        figure = project / expected["figure"]
        if not figure.is_file() or figure.stat().st_size == 0:
            fail(f"generated figure missing or empty: {expected['figure']}")
    print("manual computation fixture ok")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
