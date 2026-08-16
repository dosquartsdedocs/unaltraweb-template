# unaltraweb-template

Starter repository for academic, research project, manual and documentation websites based on [`dosquartsdedocs/unaltraweb`](https://github.com/dosquartsdedocs/unaltraweb).

## Quick start

Use this repository as a GitHub template, choose one site profile in `_config.yml`, then edit content.

```yaml
unaltraweb:
  site_profile: unaltreselfie
```

Available profiles:

- `unaltreselfie`: personal academic or professional site.
- `unaltreprojecte`: research project site.
- `unaltremanual`: manual, course or book-like site.
- `unaltredocs`: documentation site.

If you only need to edit content, you can work entirely in GitHub. Use the local Docker workflow when you want previews, larger edits, screenshots or tests.

## Edit this

- `_config.yml`
- `_pages/`
- `_chapters/`
- `_projects/`
- `_posts/`
- `_bibliography/papers.bib` and `_bibliography/manual.bib`
- `_data/`
- `_sass/_site-custom.scss`
- `assets/img/`
- `assets/pdf/`

The `author` block in `_config.yml` powers pages that use `layout: profile`, such as the localized home pages in `_pages/*/index.md`. The prepared website family is selected with `unaltraweb.site_profile`, and standard sections can be toggled with `unaltraweb.features`.

### Executable manual chapters

Advanced manuals can keep authoritative `.qmd`, `.Rmd`, `.R`, `.py`, or `.ipynb` sources under `_chapters/`. Edit the executable source, not its generated same-stem `.md`, then run:

```bash
make manual-compute-status
make manual-compute-render
make manual-compute-check
make manual-compute-smoke
```

Review and commit the source, generated Markdown, figures under `assets/img/generated/`, and `.unaltraweb/computations.lock.json` together. Configuration, including local or CI image selection, lives in `.unaltraweb/computations.yml`. See the core [unaltremanual](https://dosquartsdedocs.github.io/unaltraweb/profiles/unaltremanual/) and [computation image](https://dosquartsdedocs.github.io/unaltraweb/docker-image/) references.

The template includes one Quarto Python chapter and one Quarto R chapter. `make manual-compute-smoke` validates that both examples are current, that their generated Markdown still points back to the executable sources, and that their generated figures are present.

For reusable figures that are referenced from hand-written chapters, set `unaltraweb_compute.mode: figure` and list the generated SVG/PNG files under `unaltraweb_compute.outputs`.

Do not run `quarto render` directly on the host for publishable manual sources. If Quarto reports missing Jupyter packages, read-only runtime directories below `/run/user`, or local socket failures, use `make manual-compute-render` instead. For project-specific packages, add a project Dockerfile in `.unaltraweb/computations.yml` and build it with `make manual-compute-image-python` or `make manual-compute-image-r` before rendering.

### Selector-based web captures

Use `assets/**/*.capture.yml` recipes for reproducible screenshots of local previews. Recipes declare the route, viewport, theme, waits, source dependencies, and CSS selectors used to place vector annotations:

```bash
make web-capture-status
make web-capture-render WEB_CAPTURE_SITE_PROFILE=unaltremanual
make web-capture-check
```

Commit each recipe with its untouched `.capture.png`, generated self-contained `.capture.svg`, and `.unaltraweb/web-captures.lock.json`. Save small hand corrections as `.capture.edited.svg`; web and PDF prefer that override, while freshness checks reject it after the underlying PNG changes.

## Do not usually edit this

- `Gemfile`
- `Makefile`
- `docker-compose.yml`
- `.github/workflows/`

Core layouts, includes, styles, plugins and bibliometric scripts come from `dosquartsdedocs/unaltraweb`. The local Docker runtime comes from `ghcr.io/dosquartsdedocs/unaltraweb:main` by default.

## Custom styles and layouts

Use `_sass/_site-custom.scss` for local colors, fonts and small CSS changes. It is loaded after the core styles, so you can customize the site without editing or forking `unaltraweb`.

For a local layout, create a file such as `_layouts/my-layout.liquid` in this repository and use `layout: my-layout` in a page front matter. Site layouts override or extend core layouts while the rest of the theme still comes from `unaltraweb`.

See the core customization notes in [`docs/customization.md`](https://github.com/dosquartsdedocs/unaltraweb/blob/main/docs/customization.md).

## GitHub-only workflow

Use this template to create a new repository, then edit content directly in GitHub:

- `_config.yml` selects the site profile and public URL.
- `_data/` contains structured content such as team members, teachers, metrics and repositories.
- `_pages/`, `_posts/`, `_projects/`, `_chapters/` and `_bibliography/` contain the editable site content.

Commits to `main` do not deploy automatically. When the site should go live, run the manual deploy workflow from GitHub Actions. Dependabot can open pull requests when GitHub Actions or Bundler dependencies can be updated, but those pull requests do not trigger a deploy by default.

This workflow is enough for adding a bibliography entry, editing page text, updating posts, changing project data or making small configuration changes. It does not require Docker, Make or a local development environment.

## Local workflow

Routine local preview, freshness checks, builds, and tests require Git, Docker, and GNU Make. When an `unaltraweb` factory checkout is available at `../unaltraweb`, the Makefile uses it automatically as `LOCAL_CORE` and avoids fetching the theme gem from GitHub during Docker builds. You can override this with `LOCAL_CORE=/path/to/unaltraweb`; if no local core is available, the workflow falls back to the Git dependency declared in `Gemfile`. Computation checks also use the local factory through `LOCAL_CORE`/`COMPUTE_CORE` when available; otherwise status/check can run inside the selected control image. Explicit computation rendering, project image preparation, RStudio, and PDF authoring require the factory checkout. On Windows, use WSL2 with Docker Desktop and Docker's WSL integration enabled, then run the same commands inside the WSL Linux shell.

```bash
make serve
make metrics-update
make build
make publish
make test
make down
```

`make serve` pulls `ghcr.io/dosquartsdedocs/unaltraweb:main` by default and starts the site locally. The GHCR package must be public before unauthenticated users can pull that image. The image is only the runtime environment; layouts, styles and plugins come from the `unaltraweb` gem.

When developing the core and template together, use this port convention:

- `unaltraweb`: `http://localhost:4000/unaltraweb/`.
- `unaltreselfie`: `http://localhost:4001/unaltraweb-template/en/`.
- `unaltreprojecte`: `http://localhost:4002/unaltraweb-template/en/`.
- `unaltremanual`: `http://localhost:4003/unaltraweb-template/en/`.
- `unaltredocs`: `http://localhost:4004/unaltraweb-template/en/`.

Publication metrics can also be updated from GitHub Actions with the manual `Update publication metrics` workflow. It calls the reusable metrics workflow from `dosquartsdedocs/unaltraweb` and opens a pull request by default.

The metrics workflow keeps Scimago caches and diagnostics out of pull requests. When PR creation is enabled, it commits only versionable generated data: `_bibliography/**/*.bib` and `_data/metrics.yml`.

Local metrics commands accept the same core script arguments:

```bash
make metrics-update METRICS_ARGS="--strict-external --require-scimago"
make metrics-scimago-fetch SCIMAGO_INPUT=path/to/scimagojr.csv
```

The default local workflow runs through Docker, using `ghcr.io/dosquartsdedocs/unaltraweb:main`, and uses the `unaltraweb` gem declared in `Gemfile`. While developing `unaltraweb` and this template side by side, point `LOCAL_CORE` to the local core checkout. This does not require pushing core changes to GitHub:

```bash
make serve LOCAL_CORE=../unaltraweb
make build LOCAL_CORE=../unaltraweb
make test LOCAL_CORE=../unaltraweb
```

Publish locally when possible:

```bash
make publish
```

`make publish` requires a clean git working tree, builds the site into `_site`, prepares a generated commit in `tmp/publish-gh-pages`, adds `.nojekyll`, preserves `CNAME` when present and force-pushes the result to `gh-pages`. Configure GitHub Pages to deploy from the `gh-pages` branch and `/` folder. To inspect the generated branch without pushing, run:

```bash
make publish PUBLISH_DRY_RUN=1
```

`make test` serves the site with the local core, runs Playwright in Docker, tests desktop/mobile rendering and the light/sepia/dark theme modes, and writes screenshots to `tmp/render-smoke/`.

The profile published by GitHub is the one in `_config.yml`:

```yaml
unaltraweb:
  site_profile: unaltreselfie
```

For local testing, pass `SITE_PROFILE` to `make serve`, `make build` or `make test`. The Makefile writes a temporary config overlay in `tmp/_config.profile.yml`, so you can test another profile without editing `_config.yml` or changing what GitHub Pages will publish:

```bash
make serve SITE_PROFILE=unaltreprojecte
make serve SITE_PROFILE=unaltredocs
make test SITE_PROFILE=unaltreprojecte
```

When working directly in the `unaltraweb-template` checkout, `make serve` also enables a local developer mode overlay that is not loaded by `make build`. Child sites keep the floating developer switcher disabled by default; pass `DEVELOPER_MODE=true` only when you need to debug profile rendering.

For faster profile-specific development, the template also provides Docker Compose targets with fixed ports and automatic browser opening:

```bash
make serve-unaltreselfie LOCAL_CORE=../unaltraweb  # http://localhost:4001/unaltraweb-template/en/
make serve-unaltreprojecte LOCAL_CORE=../unaltraweb   # http://localhost:4002/unaltraweb-template/en/
make serve-unaltremanual LOCAL_CORE=../unaltraweb    # http://localhost:4003/unaltraweb-template/en/
make serve-unaltredocs LOCAL_CORE=../unaltraweb  # http://localhost:4004/unaltraweb-template/en/
make down-profiles
```

`make serve-allprofiles LOCAL_CORE=../unaltraweb` starts `unaltreselfie`, `unaltreprojecte`, `unaltremanual` and `unaltredocs` at the same time. This is useful as a final visual comparison, but it runs multiple Jekyll servers and can be heavy on smaller machines.

The `unaltredocs` profile uses the `_documentation` collection. Add documents with `section`, optional `subsection` and `weight` front matter to control the primary sidebar and the active subsection page table of contents without editing navigation templates.

## Visual review

Use profile overlays to inspect a single profile quickly:

```bash
make serve SITE_PROFILE=unaltreselfie
make serve SITE_PROFILE=unaltreprojecte
make serve SITE_PROFILE=unaltremanual
make serve SITE_PROFILE=unaltredocs
```

Generate screenshots for all demo profiles and shared features:

```bash
make screenshots
```

The screenshots are written to `tmp/render-smoke/` and cover the profile column, color themes, multilingual pages, project team and output cards, manual structure, callouts, Mermaid-backed figures and subfigures. To regenerate the screenshots embedded in the documentation and copy them to `assets/img/screenshots/`, use:

```bash
make docs-screenshots
```

While developing the core theme locally, use:

```bash
make screenshots LOCAL_CORE=../unaltraweb
make docs-screenshots LOCAL_CORE=../unaltraweb
```

After replacing the demo CV PDF, regenerate the first-page preview used by the CV pages:

```bash
make cv-preview CV_PDF=assets/pdf/cv.pdf CV_PREVIEW=assets/img/cv-preview.jpg
```

## GitHub Pages

Small content edits can be done directly in GitHub. Publishing is explicit: use `make publish` locally, or run the manual `Deploy site` workflow when contributors cannot publish from a local checkout.
